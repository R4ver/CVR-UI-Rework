/* @refresh reload */
import "./index.scss";

import { render } from "solid-js/web";
import { update1Sec, update10Sec } from "./Utils/engine";

import { fetch as fetchPolyfill } from "whatwg-fetch";

import { SettingsStoreProvider } from "./Store/SettingsStore";
import { CoreUpdateStoreProvider } from "./Store/CoreUpdate";

import App from "./App";

const isDev = Boolean( window.IS_DEV_BUILD );
if ( isDev ) {
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
        .then( ( res: Response ) => res.json() )
        .then( ( data: {chunks: string[], refresh: boolean } ) => {
            const chunks = data.chunks || [];
            localStorage.setItem( "last_chunks", JSON.stringify( chunks ) );
    
            if ( data.refresh ) location.reload();
        } )
    , 2000 );
}

update1Sec();
update10Sec();

render( () => (
    <SettingsStoreProvider>
        <CoreUpdateStoreProvider>
            <App />
        </CoreUpdateStoreProvider>
    </SettingsStoreProvider>
), document.getElementById( "root" ) as HTMLElement );


// const ws = new WebSocket( "ws://localhost:8080" );
// ws.addEventListener( "open", function open() {
//     ws.send( JSON.stringify( { test: true } ) ); 

//     setInterval( () => {
//         ws.send( JSON.stringify( { msg: "message from client" } ) );
//     }, 2000 );
// } );

// ws.addEventListener( "message", function message( data: any ) {
    
//     console.log( "received from server: ", JSON.stringify( data ) ); 
// } );

// ws.addEventListener( "close", () => {
//     console.log( "Connection closed" );
// } );

// ws.addEventListener( "error", ( error ) => {
//     console.log( "Connection error: ", error );
// } );