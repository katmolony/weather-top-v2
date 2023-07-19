import { readingStore } from "./reading-store.js";
import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("stations");

export const stationStore = {
  async getAllStations() {
    await db.read();
    return db.data.stationCollection;
  },

  async addStation(station) {
    await db.read();
    station._id = v4();
    db.data.stationCollection.push(station);
    await db.write();
    return station;
  },

  async getStationById(id) {
    await db.read();
    const list = db.data.stationCollection.find((station) => station._id === id);
    list.readings = await readingStore.getReadingsByStationId(list._id);
    return list;
  },

  async deleteStationById(id) {
    await db.read();
    const index = db.data.stationCollection.findIndex((station) => station._id === id);
    db.data.stationCollection.splice(index, 1);
    await db.write();
  },

  async deleteAllStations() {
    db.data.stationCollection = [];
    await db.write();
  },
};