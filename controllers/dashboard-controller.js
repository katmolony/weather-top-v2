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
    //  for (const station of stations) {
    //    const latestReading = stationAnalytics.getLatestReading(station);
    //    station.latestReading = latestReading;
    //    }

    const viewData = {
      title: "Station Dashboard",
      stations: sortedList,
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