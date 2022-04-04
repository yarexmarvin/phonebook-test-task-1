import { configureStore } from "@reduxjs/toolkit"
import contactsSlice from "./slices/contactsSlice";
import userSlice from "./slices/userSlice"


const store = configureStore({
    reducer:{
        user: userSlice.reducer,
        contacts: contactsSlice.reducer
    }
})


export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;