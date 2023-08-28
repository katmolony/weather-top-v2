import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

// const db = initStore("readings");

export const maxMin = {

    getMaxTemp(station) {
        let maxTemp = 0;
        if (station.readings.length > 0) {
            maxTemp = station.readings[0].temperature;
            for (let i = 0; i < station.readings.length; i++) {
                if (station.readings[i].temperature > maxTemp) {
                    maxTemp = station.readings[i].temperature;
                }
            }
        }
        return maxTemp;
    },

    getMinTemp(station) {
        let minTemp = 0;
        if (station.readings.length > 0) {
            minTemp = station.readings[0].temperature;
            for (let i = 0; i < station.readings.length; i++) {
                if (station.readings[i].temperature < minTemp) {
                    minTemp = station.readings[i].temperature;
                }
            }
        }
        return minTemp;
    },

    getMaxWind(station) {
        let maxWind = 0;
        if (station.readings.length > 0) {
            maxWind = station.readings[0].windSpeed;
            for (let i = 0; i < station.readings.length; i++) {
                if (station.readings[i].windSpeed > maxWind) {
                    maxWind = station.readings[i].windSpeed;
                }
            }
        }
        return maxWind;
    },

    getMinWind(station) {
        let minWind = 0;
        if (station.readings.length > 0) {
            minWind = station.readings[0].windSpeed;
            for (let i = 0; i < station.readings.length; i++) {
                if (station.readings[i].windSpeed < minWind) {
                    minWind = station.readings[i].windSpeed;
                }
            }
        }
        return minWind;
    },

    getMaxPressure(station) {
        let maxPressure = 0;
        if (station.readings.length > 0) {
            maxPressure = station.readings[0].pressure;
            for (let i = 0; i < station.readings.length; i++) {
                if (station.readings[i].pressure > maxPressure) {
                    maxPressure = station.readings[i].pressure;
                }
            }
        }
        return maxPressure;
    },

    getMinPressure(station) {
        let minPressure = 0;
        if (station.readings.length > 0) {
            minPressure = station.readings[0].pressure;
            for (let i = 0; i < station.readings.length; i++) {
                if (station.readings[i].pressure < minPressure) {
                    minPressure = station.readings[i].pressure;
                }
            }
        }
        return minPressure;
    },
}
