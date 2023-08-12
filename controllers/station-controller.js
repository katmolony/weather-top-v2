import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { conversions } from "../utils/conversions.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    // const reading = await readingStore.getReadingsByStationId(request.params.readingid);
    const latestReading = stationAnalytics.getLatestReading(station);
    const latestTemp = stationAnalytics.getLatestTemp(station);
    const latestWindSpeed = stationAnalytics.getLatestWindSpeed(station);
    // const minTemp = await stationAnalytics.minTemp(station);
    // const maxTemp = await stationAnalytics.maxTemp(station);
    const viewData = {
      title: "Station",
      station: station,
      latestReading: latestReading,
      fahrenheit: conversions.tempConversion(latestTemp),
      beafourt: conversions.beafourt(latestWindSpeed),
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
      // fahrenheit: conversions.tempConversion(request.body.temperature),
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