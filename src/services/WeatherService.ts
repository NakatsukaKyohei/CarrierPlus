import { openWeather } from '../network/OpenWeather';
import weather from '../models/Weather';
import { Postgre } from '../network/PostgreSQL';


export const getWeatherDescription = async(city: string): Promise<weather> => {
    const weatherData = await openWeather.getThreeHourForecastByCityName({
        cityName: city,
        state: 'Aichi',
        countryCode: 'JP'
    });
    const connection = await Postgre.createConnection();
    const weatherRepository = await connection.getRepository(weather);
    const weatherDescription = await weatherRepository.findOne({ id: weatherData.list[0].weather[0].id })
    return weatherDescription!
}