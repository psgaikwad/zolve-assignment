import React from 'react';
import App from './app';
import { ThemeProvider } from '@material-ui/styles';
import THEME from "./material-theme";
import storeBuilder from "./_helpers/store-builder";
import reducers from "./reducers";
import { BrowserRouter } from "react-router-dom";
import {Provider as ReduxProvider} from "react-redux";
import './assets/styles/_global.scss'


export default function Main() {

    const store = storeBuilder(reducers, window.__PRELOADED_STATE__, window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    delete window.__PRELOADED_STATE__
    delete window.SERVER_RENDER

    return(
        <ReduxProvider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={THEME}>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </ReduxProvider>
    )

}