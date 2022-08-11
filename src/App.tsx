import { Component, createEffect, onCleanup } from "solid-js";
import { createSignal } from "solid-js";
import { 
    IconButton,
    BigIconButton,
    UIGroup,
    UIRow
} from "./Components";
import UIEngine, { playSoundCore } from "./Utils/engine";

let lastHoverTarget: {};

document.addEventListener( "mousemove", ( e ) => {
    const currentTarget = e.target as Element;
    var hoverTarget = null;

    if ( currentTarget.hasAttribute( "data-x" ) ){
        hoverTarget = e.target;
    } else {
        var element = e.target as Element;
        while ( element.parentNode ){
            element = element.parentNode as Element;
            //@ts-ignore
            if ( element == document ) break;
            if ( element.hasAttribute( "data-x" ) ){
                hoverTarget = element;
                break;
            }
        }
    }

    if ( hoverTarget && hoverTarget != lastHoverTarget ){
        playSoundCore( "Hover" );
    }

    lastHoverTarget = hoverTarget; 
} );

const Clock = ( props: any ) => {
    const [clock, setClock] = createSignal( new Date() );

    createEffect( () => {
        const callback = () => setClock( new Date() );

        addEventListener( "eventUpdate10sec", callback );
        onCleanup( () => removeEventListener( "eventUpdate10sec", callback ) );
    } );

    const formatTime = () => {
        let h = props.timeFormat == 12  ? clock().getHours() % 12 : clock().getHours();
        let m = clock().getMinutes();
        let format = props.timeFormat == 12 ? ( clock().getHours() >= 12 ? "PM" : "AM" ) : "";

        return (
            <p>
                <span class="text-CVRClock text-orange-600 font-light">{h < 10 ? `0${h}` : h}:{m < 10 ? `0${m}` : m}</span>
                <span class="text-white text-CVRBigger ml-2 pt-4 ">{format}</span>
            </p>
        );
    };

    return (
        <div>{formatTime()}</div>
    );
};

const App: Component = () => {
    const [json, setJson] = createSignal( {
        core: {
            fps: 0,
            ping: 0,
        },
        gameSettings: {
            generalClockFormat: 24
        }
    } );

    UIEngine.on( "ReceiveCoreUpdate", props => {
        
        setJson( JSON.parse( props ) ); 
    } );

    return (
        <div id="quickmenu-wrapper" class="flex flex-col rounded-4xl">
            <div class="background-waves" />
            <UIGroup tailwind="h-full justify-between">
                <UIRow>
                    <div>
                        <Clock timeFormat={json().gameSettings.generalClockFormat} />
                        <div class="stats flex text-white tabular-nums text-3xl -ml-5 relative opacity-50">
                            <p class="flex justify-center text-center">{json().core.fps} FPS</p>
                            <span class="text-center">|</span>
                            <p class="flex justify-center text-center">{json().core.ping} PING</p>
                        </div>
                    </div>
                </UIRow>
                <UIGroup tailwind="justify-center">
                    <UIRow tailwind="justify-around flex-wrap mb-32">
                        <BigIconButton icon="fly" action="toggleFlyightMode" label="Fly" />
                        <BigIconButton icon="tpose" action="seatedPlayOrRecalibrate" label="Recalibrate" />
                        <BigIconButton icon="group" action="respawn" label="Groups" />
                        <BigIconButton icon="calender" action="respawn" label="Events" />
                    </UIRow>
                    <UIRow tailwind="justify-around flex-wrap">
                        <BigIconButton icon="house" category="exit" label="Go Home" />
                        <BigIconButton icon="cube" category="props" label="Props" />
                        <BigIconButton icon="bottle" action="respawn" label="Avatar Settings" />
                        <BigIconButton icon="dance" action="respawn" label="Emotes" />
                    </UIRow>
                </UIGroup>

                <UIRow tailwind="flex-row justify-between bg-cvr-black">
                    <div class="flex justify-around w-fit">
                        <IconButton icon="jacket" category="avatars" label="Avatars" />
                        <IconButton icon="world" category="worlds" label="Worlds" />
                        <IconButton icon="friends" category="friends" label="Friends" />
                        <IconButton icon="camera" action="toggleCamera" label="Camera" />
                        <IconButton icon="map" category="currentInstance" label="Instance Info" />
                        <IconButton icon="pin" action="respawn" label="Respawn" />
                    </div>
                    <div class="flex justify-end rounded-3xl">
                        <IconButton icon="mic" action="toggleMic" label="Mic Off" />
                    </div>
                </UIRow>
            </UIGroup>
        </div>
    );
};



export default App;
