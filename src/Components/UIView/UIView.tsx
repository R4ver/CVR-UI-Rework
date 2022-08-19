import { createSignal, createEffect, onCleanup } from "solid-js";

import { 
    IconButton,
    BigIconButton
} from "..";
import { useCoreUpdate } from "../../Store/CoreUpdate";

const Clock = ( props: {timeFormat: string} ) => {
    const [clock, setClock] = createSignal( new Date() );

    createEffect( () => {
        const callback = () => setClock( new Date() );

        addEventListener( "eventUpdate10sec", callback );
        onCleanup( () => removeEventListener( "eventUpdate10sec", callback ) );
    } );

    const formatTime = () => {
        const isTwelweHour = props.timeFormat == "12";

        const h = isTwelweHour  ? clock().getHours() % 12 : clock().getHours();
        const m = clock().getMinutes();
        const format = isTwelweHour ? ( clock().getHours() >= 12 ? "PM" : "AM" ) : "";

        return (
            <p>
                <span class="text-CVRClock text-orange-600 font-light">{h < 10 ? ( isTwelweHour ? `${h}` : `0${h}` ) : h}:{m < 10 ? `0${m}` : m}</span>
                <span class="text-white text-CVRBigger ml-2 pt-4 ">{format}</span>
            </p>
        );
    };

    return (
        <div>{formatTime()}</div>
    );
};

export const UIView = () => {
    const { coreUpdate } = useCoreUpdate();

    return (
        <div class="flex flex-col z-10 relative h-full justify-between">
            <div class="flex px-16 py-16">
                <div>
                    <Clock timeFormat={coreUpdate().gameSettings.generalClockFormat || "12"} />
                    <div class="stats flex text-white tabular-nums text-3xl -ml-5 relative opacity-50">
                        <p class="flex justify-center text-center">{coreUpdate().core.fps} FPS</p>
                        <span class="text-center">|</span>
                        <p class="flex justify-center text-center">{coreUpdate().core.ping} PING</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col z-10 relative justify-center -mt-14">
                <div class="flex px-16 justify-around flex-wrap py-16">
                    <BigIconButton playSound icon="fly" action="toggleFlyightMode" label="Fly" />
                    <BigIconButton playSound icon="tpose" action="seatedPlayOrRecalibrate" label="Recalibrate" />
                    <BigIconButton playSound icon="group" disabled={true} action="respawn" label="Groups" />
                    <BigIconButton playSound icon="calender" disabled={true} action="respawn" label="Events" />
                </div>
                <div class="flex px-16 justify-around flex-wrap py-16">
                    <BigIconButton playSound icon="house" category="exit" label="Go Home" />
                    <BigIconButton playSound icon="cube" category="props" label="Props" />
                    <BigIconButton playSound icon="bottle" action="respawn" label="Avatar Settings" />
                    <BigIconButton playSound icon="dance" action="respawn" label="Emotes" />
                </div>
            </div>

            <div class="flex px-16 flex-row justify-between bg-cvr-black relative py-2">
                <IconButton playSound icon="jacket" category="avatars" label="Avatars" />
                <IconButton playSound icon="world" category="worlds" label="Worlds" />
                <IconButton playSound icon="friends" category="friends" label="Friends" />
                <IconButton playSound icon="camera" action="toggleCamera" label="Camera" />
                <IconButton playSound icon="map" category="currentInstance" label="Instance Info" />
                <IconButton playSound icon="pin" action="respawn" label="Respawn" />
                <div class="mic-toggle flex justify-end rounded-3xl min-w-fit px-10 ml-28 bg-cvr-red py-5">
                    <IconButton playSound icon="mic" action="toggleMute" label="Mic Off" />
                </div>                    
            </div>
        </div>
    );
};