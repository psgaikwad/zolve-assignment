import React from 'react';
import ReactDOM from "react-dom";
import Main from './main'
import * as swManager from './_helpers/service-worker-manager'


let parser = ReactDOM.render
if (window.SERVER_RENDER){
    parser = ReactDOM.hydrate
}

parser(<Main />, document.getElementById('root'));

let deferredPrompt = null

window.addEventListener('beforeinstallprompt', (e)=>{
    e.preventDefault()
    deferredPrompt = e
})

export function promptToInstall(successCallback,dismissCallback) {
    if (deferredPrompt){
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choice)=>{
            if (choice==="accepted" && successCallback){
                successCallback()
            } else if(choice === "dismissed" && dismissCallback){
                dismissCallback()
            }
            deferredPrompt = null
        }).catch((e)=>{
            console.log(e)
        })
    }

}

promptToInstall()