import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { readingStore } from "../models/reading-store.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationsByUserId(loggedInUser._id);
    //sort list of stations in alphabetical order
    const sortedList = stations.sort((a, b) =>
    a.name.localeCompare(b.name));
   
    // for (const station of stations) {
    //    const latestReading = stationAnalytics.getLatestReading(station);
    //   station.latestReading = latestReading;
    //   }
    
    // const station = await stationStore.getStationById(request.params.id);
    // const reading = await readingStore.getReadingsByStationId(request.params.readingid);
    // const latestReading = stationAnalytics.getLatestReading(station);
    // const latestTemp = stationAnalytics.getLatestTemp(station);
    // const latestWindSpeed = stationAnalytics.getLatestWindSpeed(station);
    // const latestWindDirection = stationAnalytics.getLatestWindDirection(station);
    // const maxTemp = maxMin.getMaxTemp(station);
    // const minTemp = maxMin.getMinTemp(station);
    // const maxWind = maxMin.getMaxWind(station);
    // const minWind = maxMin.getMinWind(station);
    // const maxPressure = maxMin.getMaxPressure(station);
    // const minPressure = maxMin.getMinPressure(station);

    const viewData = {
      title: "Station Dashboard",
      stations: sortedList,

      // station: station,
      // latestReading: latestReading,
      // fahrenheit: conversions.tempConversion(latestTemp),
      // beafourt: conversions.beafourt(latestWindSpeed),
      // windChill: stationAnalytics.getWindChill(latestTemp, latestWindSpeed),
      // windCompass: conversions.degreesToCompass(latestWindDirection),
      // maxTemp: maxTemp,
      // minTemp: minTemp,
      // maxWind: maxWind,
      // minWind: minWind,
      // maxPressure: maxPressure,
      // minPressure: minPressure,
      // reading: reading,
    };
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