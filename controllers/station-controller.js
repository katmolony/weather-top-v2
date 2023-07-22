import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);

    let latestReading = null;
    if (station.readings.length > 0) {
      for (let i = station.readings.length; i <= station.readings.length; i++) { 
        {
          latestReading = station.readings[i-1];
        }
      }
    }
    console.log(latestReading);

    const viewData = {
      title: "Station",
      station: station,
      latestReading: latestReading,
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReading = {
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      pressure: Number(request.body.pressure),
    };
    console.log(`adding reading ${newReading.code}`);
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  },
};