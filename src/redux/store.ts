import { createStore } from "redux";
import { persistReducer } from "redux-persist";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage: storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default createStore(persistedReducer);
