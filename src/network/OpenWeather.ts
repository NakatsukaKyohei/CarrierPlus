import OpenWeatherMap from 'openweathermap-ts';
import * as AppConstant from '../AppConstant';

export const openWeather = new OpenWeatherMap({ apiKey: AppConstant.openWeatherMap , language: 'ja' });