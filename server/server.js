// NOTE: This will render the react-app on server side using express to create HTML

import path from 'path'
import fs from 'fs'

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider, ServerStyleSheets } from '@material-ui/styles';
import THEME from "../src/material-theme";
import storeBuilder from '../src/_helpers/store-builder'
import reducers from '../src/reducers'
import App from '../src/app'
import { ChunkExtractor } from '@loadable/server'
import { renderRoutes } from 'react-router-config'


const PORT = 8080
const app = express()


const serverRenderer = (req, res) => {
    fs.readFile(path.resolve('./dist/index.html'), 'utf8', (err, data) => {

        if (err) {
            console.error(err)
            return res.status(500).send('An error occurred')
        }

        // Injecting store
        const store = storeBuilder(reducers)
        const preloadedState = store.getState()

        // Injecting material UI

        const sheets = new ServerStyleSheets();
        
        // eslint-disable-line
        // const filePath = path.resolve(__dirname, '.', 'build', 'index.html');

        const html = ReactDOMServer.renderToString(
            sheets.collect(
                <ThemeProvider theme={THEME}>
                    <ReduxProvider store={store}>
                        <StaticRouter>
                            <App />
                        </StaticRouter>
                    </ReduxProvider>
                </ThemeProvider>,
            ))

        const css = sheets.toString();


        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root">
                    ${html}
                </div>`
            ).replace('</head>',
                `<style id="jss-server-side">${css}</style>
                </head>`
            ).replace(
                '<body>',
                `<script>
                    window.SERVER_RENDER= true
                    // replacing to secure from script injections
                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
                </script>
                <body>`
            )
        )
    })
}


app.use(
    express.static(path.resolve(__dirname, '..', 'dist'), { maxAge: '30d' })
)

app.get('/*', serverRenderer)

// app.use(express.static('./build'))
app.listen(PORT, () => {
    console.log(`SSR running on port ${PORT}`)
})
