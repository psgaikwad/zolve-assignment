import React from "react";
import RouterOutlet from "./Router"

export default class App extends React.Component{

    render(){
        return(
            <React.Fragment>
              	<RouterOutlet />
            </React.Fragment>
        )
    }
}