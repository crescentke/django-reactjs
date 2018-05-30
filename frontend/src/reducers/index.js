import { combineReducers } from 'redux';
import notes from "./notes";


const marketApp = combineReducers({
    notes,
})

export default marketApp;