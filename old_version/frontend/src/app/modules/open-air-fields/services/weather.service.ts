import {Injectable} from '@angular/core';
import {fetchWeatherApi} from 'openmeteo';

@Injectable()
export class WeatherService {

  url = "https://api.open-meteo.com/v1/forecast";

  constructor() {
  }

  getWeatherDescription(weatherCode: number): string {
    switch (weatherCode) {
      case 0:
        return "Clear sky";
      case 1:
        return "Mainly clear";
      case 2:
        return "Partly cloudy";
      case 3:
        return "Overcast";
      case 51:
        return "Drizzle: Light";
      case 53:
        return "Drizzle: Moderate";
      case 55:
        return "Drizzle: Dense intensity";
      case 56:
        return "Freezing Drizzle: Light";
      case 57:
        return "Freezing Drizzle: Dense intensity";
      case 61:
        return "Rain: Slight";
      case 63:
        return "Rain: Moderate";
      case 65:
        return "Rain: Heavy intensity";
      case 66:
        return "Freezing Rain: Light";
      case 67:
        return "Freezing Rain: Heavy intensity";
      case 71:
        return "Snow fall: Slight";
      case 73:
        return "Snow fall: Moderate";
      case 75:
        return "Snow fall: Heavy intensity";
      case 77:
        return "Snow grains";
      case 80:
        return "Rain showers: Slight";
      case 81:
        return "Rain showers: Moderate";
      case 82:
        return "Rain showers: Violent";
      case 85:
        return "Snow showers: Slight";
      case 86:
        return "Snow showers: Heavy";
      case 95:
        return "Thunderstorm";
      case 96:
        return "Thunderstorm slight";
      case 99:
        return "Thunderstorm heavy hail";
      default:
        return "Unknown";
    }
  }

  getWindDirection(degrees: number): string {
    const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }


  async fetchCurrentWeatherData(latitude: number, longitude: number) {
    const params = {
      "latitude": latitude,
      "longitude": longitude,
      "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "rain", "weather_code", "cloud_cover", "surface_pressure", "wind_speed_10m"]
    };

    const responses = await fetchWeatherApi(this.url, params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const current = response.current()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0)!.value(),
        relativeHumidity2m: current.variables(1)!.value(),
        apparentTemperature: current.variables(2)!.value(),
        isDay: current.variables(3)!.value(),
        precipitation: current.variables(4)!.value(),
        rain: current.variables(5)!.value(),
        weatherCode: current.variables(6)!.value(),
        cloudCover: current.variables(7)!.value(),
        surfacePressure: current.variables(8)!.value(),
        windSpeed10m: current.variables(9)!.value(),
        windDirection10m: this.getWindDirection(current.variables(10)!.value()),
        windDirection: current.variables(10)!.value(),
        weather: this.getWeatherDescription(current.variables(6)!.value())
      },
    };

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    // console.log('current', weatherData.current);

    return weatherData.current
  }

  // async fetchWeatherData(hour?: any) {
  //   const params = {
  //     "latitude": 30.509620574000426,
  //     "longitude": -8.798369765281679,
  //     "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "rain", "weather_code", "cloud_cover", "surface_pressure", "wind_speed_10m"]
  //     // "hourly": ["temperature_2m", "rain", "temperature_80m", "temperature_120m", "temperature_180m", "soil_temperature_0cm"],
  //   };
  //
  //   const responses = await fetchWeatherApi(this.url, params);
  //
  //   // Helper function to form time ranges
  //   const range = (start: number, stop: number, step: number) =>
  //     Array.from({length: (stop - start) / step}, (_, i) => start + i * step);
  //
  //   // Process first location. Add a for-loop for multiple locations or weather models
  //   const response = responses[0];
  //
  //   // Attributes for timezone and location
  //   const utcOffsetSeconds = response.utcOffsetSeconds();
  //   const timezone = response.timezone();
  //   const timezoneAbbreviation = response.timezoneAbbreviation();
  //   const latitude = response.latitude();
  //   const longitude = response.longitude();
  //
  //   const current = response.current()!;
  //   const hourly = response.hourly()!;
  //
  //   // Note: The order of weather variables in the URL query and the indices below need to match!
  //   const weatherData = {
  //     current: {
  //       time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
  //       temperature2m: current.variables(0)!.value(),
  //       relativeHumidity2m: current.variables(1)!.value(),
  //       apparentTemperature: current.variables(2)!.value(),
  //       isDay: current.variables(3)!.value(),
  //       precipitation: current.variables(4)!.value(),
  //       rain: current.variables(5)!.value(),
  //       weatherCode: current.variables(6)!.value(),
  //       cloudCover: current.variables(7)!.value(),
  //       surfacePressure: current.variables(8)!.value(),
  //       windSpeed10m: current.variables(9)!.value(),
  //     },
  //     // hourly: {
  //     //   time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
  //     //     (t) => new Date((t + utcOffsetSeconds) * 1000)
  //     //   ),
  //     //   temperature2m: hourly.variables(0)!.valuesArray()!,
  //     //   rain: hourly.variables(1)!.valuesArray()!,
  //     //   temperature80m: hourly.variables(2)!.valuesArray()!,
  //     //   temperature120m: hourly.variables(3)!.valuesArray()!,
  //     //   temperature180m: hourly.variables(4)!.valuesArray()!,
  //     //   soilTemperature0cm: hourly.variables(5)!.valuesArray()!,
  //     // },
  //   };
  //
  //   // `weatherData` now contains a simple structure with arrays for datetime and weather data
  //   // for (let i = 0; i < weatherData.hourly.time.length; i++) {
  //   console.log(
  //     {
  //       'current': weatherData.current
  //     }
  //   );
  //   // }
  //
  //   return weatherData.current
  // }
}
