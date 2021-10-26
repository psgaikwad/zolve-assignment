import { createStore, applyMiddleware, compose} from 'redux'
import reducers from "../reducers"
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()

const middlewareEnhancer = applyMiddleware(thunkMiddleware, loggerMiddleware)

export default function (reducer, initialState, enhancer) {
    if (!initialState){
        initialState = {}
    }
    return createStore(reducers, initialState, middlewareEnhancer)
}