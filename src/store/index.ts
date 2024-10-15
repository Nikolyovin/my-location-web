import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { appReducer, appSlice } from "./app.slice";

export const store = configureStore({
    reducer: {
        app: appReducer
    },

})

setupListeners(store.dispatch)                                    //need for refetchOnFocus

///создаем тип чтобы знать с какимми данными работать в стейте
export type RootState = ReturnType<typeof store.getState>