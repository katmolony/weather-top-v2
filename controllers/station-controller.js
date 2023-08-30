import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { conversions } from "../utils/conversions.js";
import { maxMin } from "../utils/maxMin.js";
import axios from "axios";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);

    //Latest Reading Variables
    const latestReading = stationAnalytics.getLatestReading(station);
    const latestCode = stationAnalytics.getLatestCode(station);
    const latestTemp = stationAnalytics.getLatestTemp(station);
    const latestWindSpeed = stationAnalytics.getLatestWindSpeed(station);
    const latestWindDirection = stationAnalytics.getLatestWindDirection(station);

    //Max and Min Variables
    const maxTemp = maxMin.getMaxTemp(station);
    const minTemp = maxMin.getMinTemp(station);
    const maxWind = maxMin.getMaxWind(station);
    const minWind = maxMin.getMinWind(station);
    const maxPressure = maxMin.getMaxPressure(station);
    const minPressure = maxMin.getMinPressure(station);

    //Trend Variables
    const tempTrend = stationAnalytics.getTempTrend(station);
    const windTrend = stationAnalytics.getWindTrend(station);
    const pressureTrend = stationAnalytics.getPressureTrend(station);

    const lat = station.lat;
    const lng = station.lng;
    const name = station.name;

    const viewData = {
      title: "Station",
      station: station,
      latestReading: latestReading,
      codeConversion: conversions.codeConversion(latestCode),
      fahrenheit: conversions.tempConversion(latestTemp),
      beafourt: conversions.beafourt(latestWindSpeed),
      windChill: stationAnalytics.getWindChill(latestTemp, latestWindSpeed),
      windCompass: conversions.degreesToCompass(latestWindDirection),
      maxTemp: maxTemp,
      minTemp: minTemp,
      maxWind: maxWind,
      minWind: minWind,
      maxPressure: maxPressure,
      minPressure: minPressure,
      tempTrend: tempTrend,
      windTrend: windTrend,
      pressureTrend: pressureTrend,
      lat: lat,
      lng: lng,
      name: name,
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const date = new Date();

    const lat = station.lat;
    const lng = station.lng;

    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=6f31a0fd23d1415ef151dd57611408aa`

    const newReading = {
      date: date.toISOString().replace('T', ' ').replace('Z', '').replace(/\.\d+/, ""),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      newReading.tempTrend = [];
      newReading.windTrend = [];
      newReading.pressureTrend = [];
      newReading.trendLabels = [];
      const trends = result.data.daily;
      for (let i = 0; i < trends.length; i++) {
        newReading.tempTrend.push(trends[i].temp.day);
        newReading.windTrend.push(trends[i].wind_speed);
        newReading.pressureTrend.push(trends[i].pressure);
        const date = new Date(trends[i].dt * 1000);
        newReading.trendLabels.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
      }
    }
    console.log(`adding reading ${newReading.code}`);
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  },

  async addreport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const date = new Date();
    console.log("rendering new autogenerated report");
    let report = {
      date: date.toISOString().replace('T', ' ').replace('Z', '').replace(/\.\d+/, ""),
    };

    const lat = station.lat;
    const lng = station.lng;

    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=6f31a0fd23d1415ef151dd57611408aa`

    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      // console.log(result.data);
      const reading = result.data.current;
      report.code = reading.weather[0].id;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.windDirection = reading.wind_deg;
      report.pressure = reading.pressure;

      report.tempTrend = [];
      report.trendLabels = [];
      report.windTrend = [];
      report.pressureTrend = [];

      const trends = result.data.daily;
      for (let i = 0; i < trends.length; i++) {
        report.tempTrend.push(trends[i].temp.day);

        report.windTrend.push(trends[i].wind_speed);
        report.pressureTrend.push(trends[i].pressure);
        const date = new Date(trends[i].dt * 1000);
        report.trendLabels.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
      }
      console.log(report);
    };
    await readingStore.addReading(station._id, report);
    response.redirect("/station/" + station._id);
  },

  async deleteReading(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Deleting Reading ${readingId} from Station ${stationId}`);
    await readingStore.deleteReading(readingId);
    response.redirect("/station/" + stationId);
  },

};