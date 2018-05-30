import React, {Component} from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Market from './components/Market';
import NotFound from './components/NotFound';
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import marketApp from "./reducers";

import './App.css';
import {Provider} from "react-redux";

let store = createStore(marketApp, applyMiddleware(thunk));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Market}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
