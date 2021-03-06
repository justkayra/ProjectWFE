import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Word from "./components/Word";
import './App.css';
import store from './store/store.js';
import {Provider} from "react-redux";
import AppEditor from "./components/AppEditor";
import {Container, ThemeProvider} from "@mui/material";
import {createTheme} from '@mui/material/styles';
import Bar from "./components/Bar";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ffc01e",
            contrastText: "#393c3c"
        },
        secondary: {
            main: "#0b66ce",
            contrastText: "#f3f3f7"
        }
    },
});

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Container disableGutters={true}>
                    <Router>
                        <Bar/>
                        <div className="App">
                            <Switch>
                                <Route path="/" exact component={AppEditor}/>
                                <Route path="/words" exact component={AppEditor}/>
                                <Route path="/words/:wordValue" exact component={Word}/>
                            </Switch>
                        </div>
                    </Router>
                </Container>
            </ThemeProvider>
        </Provider>

    );
}

export default App;

