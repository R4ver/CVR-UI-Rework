import { createSignal, onCleanup, onMount, For } from "solid-js";
import type { Component } from "solid-js";
import { IconButtonRound } from "../../Components";

import { UIEngine } from "../../Utils/engine";

type TInviteListItem = {
    __Type: string;
    InviteMeshId: string;
    SenderMeshId: string;
    SenderUsername: string;
    WorldImageUrl: string;
    WorldMeshId: string;
    WorldName: string;
    InstanceMeshId: string;
    InstanceName: string;
}

export const NotificationView: Component = () => {
    const [notifications, setNotifications] = createSignal<TInviteListItem[]>( [] );
    const [showNotifications, setShowNotifications] = createSignal( false );

    let notificationWindowRef;

    UIEngine.on( "LoadInviteList", ( props: TInviteListItem[] ) => {
        setNotifications( props );
    } );

    const closeNotifications = ( event ) => notificationWindowRef && !notificationWindowRef.contains( event.target ) && setShowNotifications( false );

    onMount( () => document.addEventListener( "mousedown", closeNotifications ) );

    onCleanup( () => document.removeEventListener( "mousedown", closeNotifications ) );

    const handleClick = () => setShowNotifications( prev => !prev );

    return (
        <div ref={notificationWindowRef} class="relative z-20">
            <IconButtonRound icon="bell" onClick={() => handleClick()} />
            <div class={`${showNotifications() ? "block" : "hidden"} absolute top-0 right-0 bg-cvr-black px-8 pt-32 pb-6 -z-10 rounded-4xl rounded-tr-5xl`}>
                {notifications.length > 0 ? (
                    notifications().map( ( item: TInviteListItem ) => (
                        <p>{item.SenderUsername}</p>
                    ) )
                ) : (
                    "No Notifications"
                )}
            </div>
        </div>
    );
};

function arraysAreIdentical( arr1, arr2 ){
    if ( arr1.length !== arr2.length ) return false;
    for ( let i = 0, len = arr1.length; i < len; i++ ){
        if ( arr1[i] !== arr2[i] ){
            return false;
        }
    }
    return true; 
}

export const NotificationViewAlt: Component = () => {
    const [notifications, setNotifications] = createSignal<TInviteListItem[]>( [
        // {
        //     __Type: "",
        //     InviteMeshId: "",
        //     SenderMeshId: "",
        //     SenderUsername: "R4ver",
        //     WorldImageUrl: "https://files.abidata.io/user_content/worlds/2fc9693f-99a1-40e9-815a-fb227eaf6fbc/2fc9693f-99a1-40e9-815a-fb227eaf6fbc.png",
        //     WorldMeshId: "",
        //     WorldName: "Sleep Vault",
        //     InstanceMeshId: "i+66f611f9cedab4b0-553101-5419b2-144d29ed",
        //     InstanceName: "Sleep Vault (#814370)",
        // }
    ] );

    UIEngine.on( "LoadInviteList", ( props: TInviteListItem[] ) => {
        setNotifications( props );
    } );

    return (
        <div class="flex h-80 mb-10 w-full">
            <For each={notifications()}>{( item: TInviteListItem ) => (
                <div class="relative overflow-hidden rounded-4xl bg-cvr-dark text-cvr-white z-30 ">
                    <div class="absolute w-full h-full -z-10">
                        <div class="absolute top-0 left-0 bg-gradient-to-r from-black w-full h-full" />
                        <img src={item.WorldImageUrl} class="w-full h-full " />
                    </div>
                    <div class="flex flex-col h-full justify-center px-10 py-10 pr-60">
                        <p class="">{item.SenderUsername}</p>
                        <h1 class="text-8xl text-cvr-orange">{item.WorldName}</h1>
                    </div>
                </div>
            )}</For>
        </div>
    );
};