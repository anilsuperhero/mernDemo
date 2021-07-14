import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"

import rootReducer from "../reducers/index"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["isAuth", "userInfo", "userParams"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

const persistor = persistStore(store)

const storeConfig = { store, persistor }

export default storeConfig
