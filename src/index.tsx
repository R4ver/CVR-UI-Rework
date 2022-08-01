/* @refresh reload */
import "./index.css";

import { render } from "solid-js/web";
//@ts-ignore
import { fetch as fetchPolyfill } from "whatwg-fetch";

import App from "./App";

//@ts-ignore
const isDev = window.IS_DEV_BUILD;
if ( isDev === "true" ) {
    setInterval( () => fetchPolyfill( "http://localhost:3001/ping", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            type: "file_check",
            chunks: JSON.parse( localStorage.getItem( "last_chunks" ) || "[]" )
        } )
    } )
        .then( ( res: any ) => res.json() )
        .then( ( data: any ) => {
            const chunks = data.chunks || [];
            localStorage.setItem( "last_chunks", JSON.stringify( chunks ) );
    
            if ( data.refresh ) location.reload();
        } )
    , 2000 );
}

render( () => <App />, document.getElementById( "root" ) as HTMLElement );
