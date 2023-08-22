import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { conversions } from "../utils/conversions.js";
import { maxMin } from "../utils/maxMin.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    // const reading = await readingStore.getReadingsByStationId(request.params.readingid);
    const latestReading = stationAnalytics.getLatestReading(station);
    const latestTemp = stationAnalytics.getLatestTemp(station);
    const latestWindSpeed = stationAnalytics.getLatestWindSpeed(station);
    const latestWindDirection = stationAnalytics.getLatestWindDirection(station);
    const maxTemp = maxMin.getMaxTemp(station);
    const minTemp = maxMin.getMinTemp(station);
    const maxWind = maxMin.getMaxWind(station);
    const minWind = maxMin.getMinWind(station);
    const maxPressure = maxMin.getMaxPressure(station);
    const minPressure = maxMin.getMinPressure(station);
    const tempTrend = stationAnalytics.getTempTrend(station);
    const windTrend = stationAnalytics.getWindTrend(station);
    const pressureTrend = stationAnalytics.getPressureTrend(station);

    const viewData = {
      title: "Station",
      station: station,
      latestReading: latestReading,
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
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const date = new Date();
    const newReading = {
      date: date.toISOString().replace('T', ' ').replace('Z', '').replace(/\.\d+/, ""),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    console.log(`adding reading ${newReading.code}`);
    await readingStore.addReading(station._id, newReading);
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