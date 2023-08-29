import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { readingStore } from "../models/reading-store.js";
import { conversions } from "../utils/conversions.js";
import { maxMin } from "../utils/maxMin.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationsByUserId(loggedInUser._id);

    //  Add latest readings to each station
    for (const station of stations) {
      const latestReading = await stationAnalytics.getLatestReadingAllStation(station._id);
      station.latestReading = latestReading;

      if (latestReading != null) {
        station.fahrenheit = conversions.tempConversion(latestReading.temperature);
        station.beafourt = conversions.beafourt(latestReading.windSpeed);
        station.windChill = stationAnalytics.getWindChill(latestReading.temperature, latestReading.windSpeed);
        station.windCompass = conversions.degreesToCompass(latestReading.windDirection);
        station.codeConversion = conversions.codeConversion(latestReading.code);
      }

      const readings = await stationStore.getStationById(station._id)

      //Max and Min Variables
      const maxTemp = maxMin.getMaxTemp(readings);
      station.maxTemp = maxTemp;
      const minTemp = maxMin.getMinTemp(readings);
      station.minTemp = minTemp;
      const maxWind = maxMin.getMaxWind(readings);
      station.maxWind = maxWind;
      const minWind = maxMin.getMinWind(readings);
      station.minWind = minWind;
      const maxPressure = maxMin.getMaxPressure(readings);
      station.maxPressure = maxPressure;
      const minPressure = maxMin.getMinPressure(readings);
      station.minPressure = minPressure;

      //Trend Variables
      const tempTrend = stationAnalytics.getTempTrend(readings);
      station.tempTrend = tempTrend
      const windTrend = stationAnalytics.getWindTrend(readings);
      station.windTrend = windTrend;
      const pressureTrend = stationAnalytics.getPressureTrend(readings);
      station.pressureTrend = pressureTrend;

    };

    //sort list of stations in alphabetical order
    const sortedList = stations.sort((a, b) =>
      a.name.localeCompare(b.name));

    const viewData = {
      title: "Station Dashboard",
      stations: sortedList,
      user: loggedInUser,
    };

    let viewDataString = JSON.stringify(viewData); // Debug Remove Later
    let viewDateObject = JSON.parse(viewDataString); // Debug Remove Later
    console.dir(viewDateObject, { depth: null, colors: true }); // Debug Remove Later

    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      name: request.body.name,
      lat: request.body.lat,
      lng: request.body.lng,
      userid: loggedInUser._id,
    };
    console.log(`adding station ${newStation.name}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station called`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },
};