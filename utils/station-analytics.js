export const stationAnalytics = {
    getLatestReading(station) {
      let latestReading = null;
      if (station.readings.length > 0) {
        for (let i = station.readings.length; i <= station.readings.length; i++) { 
          {
            latestReading = station.readings[i-1];
          }
        }
      } 
      return latestReading;
  },

  getLatestTemp(station) {
    let latestTemp = null;
    if (station.readings.length > 0) {
      for (let i = station.readings.length; i <= station.readings.length; i++) { 
        {
          latestTemp = station.readings[i-1].temperature;
        }
      }
    } 
    return latestTemp;
  },

  getLatestWindSpeed(station) {
    let latestWindSpeed = null;
    if (station.readings.length > 0) {
      for (let i = station.readings.length; i <= station.readings.length; i++) { 
        {
          latestWindSpeed = station.readings[i-1].windSpeed;
        }
      }
    } 
    return latestWindSpeed;
  },

  getLatestWindDirection(station) {
    let latestWindDirection = null;
    if (station.readings.length > 0) {
      for (let i = station.readings.length; i <= station.readings.length; i++) { 
        {
          latestWindDirection = station.readings[i-1].windDirection;
        }
      }
    } 
    return latestWindDirection;
  },

  getWindChill(temp, windspeed) {
    if (temp  != null) {
      const windChill = 13.12 + 0.6215 * temp -  11.37 * (Math.pow(windspeed, 0.16)) + 0.3965 * temp * (Math.pow(windspeed, 0.16));
      return windChill.toFixed(2);
    }
  else return null;
},
}
