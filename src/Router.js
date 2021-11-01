import React from "react";
import { Route} from "react-router-dom";
import Loadable from 'react-loadable'


const ClipBoard = Loadable({
    loader: ()=> import(/* webpackChunkName: "clipboard" */'./components/clipboard'),
    loading: ()=> <div>Loading...</div>
})

const Visualization = Loadable({
    loader: ()=> import(/* webpackChunkName: "home" */'./containers/visualization/index.jsx'),
    loading: ()=> <div>Loading...</div>
})

const Selfie = Loadable({
	loader: ()=> import(/* webpackChunkName: "home" */'./components/selfie'),
	loading: ()=> <div>Loading...</div>
})


export default class RouterOutlet extends React.PureComponent{
    render() {

        return(
            <React.Fragment>
                <Route path="/" exact component={Visualization}/>
								<Route path="/clipboard" exact component={ClipBoard}/>
                <Route path="/selfie" exact component={Selfie}/>
            </React.Fragment>
        )
    }

}

