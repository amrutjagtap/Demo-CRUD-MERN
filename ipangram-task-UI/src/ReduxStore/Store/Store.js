import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../Reducer/Index";

const store = configureStore({ reducer: rootReducer });

export default store;
