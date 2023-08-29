import { initStore } from "./store-utils.js";

const db = initStore("readings");

export const weatherConditions = new Map();
weatherConditions.set(100, { description: "Clear", icon: ">icons/clear" });
weatherConditions.set(200, { description: "Partial Clouds", icon: "../clouds.hbs" });
weatherConditions.set(300, { description: "Cloudy", icon: "../images/cloudy.jpg" });
weatherConditions.set(400, { description: "Light Showers", icon: "../images/lightShowers.jpg" });
weatherConditions.set(500, { description: "Heavy Showers", icon: "../images/heavyShowers.jpg" });
weatherConditions.set(600, { description: "Rain", icon: "../images/rain.jpg" });
weatherConditions.set(700, { description: "Snow", icon: "../images/snow.jpg" });
weatherConditions.set(800, { description: "Thunder", icon: "../images/thunder.jpg" });

export const weatherCondition = {
    weatherDescription(code) {
        return weatherConditions.get(code).description;

    },

    weatherIcon(code) {

        return weatherConditions.get(code).icon;
        }
    }