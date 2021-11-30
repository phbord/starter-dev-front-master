import { createStore, combineReducers } from "redux";

import { rootReducers } from "./reducers";


//STORE: attaché à React - accessible depuis tous les composants
export const store = createStore(rootReducers)

// store = {
//   tasksList: [{id: 1, title: "Init task", isCompleted: false}]
// }