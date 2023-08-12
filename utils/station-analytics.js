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

}
