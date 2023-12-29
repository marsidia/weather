import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { weatherApi } from "./weatherApi";

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(weatherApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useLazyFetchCitiesQuery, useGetWeatherQuery } from "./weatherApi";
