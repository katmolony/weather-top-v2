export const conversions = {
  getFahrenheit(station) {
    let fahrenheit = null;
    if (station.readings.length > 0) {
      fahrenheit = tempToFahrenheit(station.readings.temperature);
    }
    return fahrenheit;
  },
};

export function tempToFahrenheit(temperature)
{
  fahrenheit = (temperature * 1.8) + 32;
  return fahrenheit
};
