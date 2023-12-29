import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const weatherApi = createApi({
  reducerPath: "weather",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.openweathermap.org",
  }),
  endpoints(builder) {
    return {
      fetchCities: builder.query({
        query: (enteredCity) => {
          return {
            url: "/geo/1.0/direct",
            params: {
              q: enteredCity,
              appid: "XXXXXX",
              limit: 4,
            },
            method: "GET",
          };
        },
      }),
      getWeather: builder.query({
        query: (city) => {
          return {
            url: "/data/2.5/weather",
            params: {
              lat: city.lat,
              lon: city.lon,
              appid: "XXXXXX",
            },
            method: "GET",
          };
        },
      }),
    };
  },
});
export const { useLazyFetchCitiesQuery, useGetWeatherQuery } = weatherApi;
export { weatherApi };
