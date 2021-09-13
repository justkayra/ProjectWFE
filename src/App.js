import React from 'react';
import Home from "./components/Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Word from "./components/Word";
import {Provider} from 'react-redux';
import store from './store/store';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/word/:wordValue" exact component={Word}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;

