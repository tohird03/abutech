import { createStore } from "redux";
import { authReducer } from "./Reducer"

const AuthStore = createStore(authReducer)

export { AuthStore }