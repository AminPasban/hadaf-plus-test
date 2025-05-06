import { configureStore } from "@reduxjs/toolkit";
// slices
import manageDomainDrawerReducer from "./manageDomainDrawerSlice";
// services
import { domainApi } from "../services/domain";

export const store = configureStore({
    reducer: {
        manageDomainDrawer: manageDomainDrawerReducer,
        [domainApi.reducerPath]: domainApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(domainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
