import { createSignal, onCleanup, onMount, For } from "solid-js";
import type { Component } from "solid-js";
import { IconButtonRound, IconButton } from "..";

import { UIEngine, systemCall } from "../../Utils/engine";

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
    const [showNotifications, setShowNotifications] = createSignal( false );

    let notificationWindowRef;

    UIEngine.on( "LoadInviteList", ( props: TInviteListItem[] ) => {
        setNotifications( props );
    } );

    const closeNotifications = ( event ) => notificationWindowRef && !notificationWindowRef.contains( event.target ) && setShowNotifications( false );

    onMount( () => document.addEventListener( "mousedown", closeNotifications ) );
    onCleanup( () => document.removeEventListener( "mousedown", closeNotifications ) );
    const handleClick = () => setShowNotifications( prev => !prev );

    const acceptInvite = ( id ) => systemCall( "accept-invite", id );
    const rejectInvite = ( id ) => systemCall( "reject-invite", id );

    return (
        <div ref={notificationWindowRef} class="relative z-20">
            {notifications().length > 0 ? (
                <IconButtonRound icon="belldot" active={showNotifications()} onClick={() => handleClick()} />
            ) : (
                <IconButtonRound icon="bell" active={showNotifications()} onClick={() => handleClick()} />
            )}
            <div class={`notification-wrapper ${showNotifications() ? "block" : "hidden"} absolute top-0 right-0 text-cvr-white bg-cvr-black px-8 pt-32 pb-6 -z-10 rounded-4xl rounded-tr-5xl`}>
                {notifications().length > 0 ? (
                    <For each={notifications()}>{( item: TInviteListItem ) => (
                        <div class="flex items-center justify-between w-full">
                            <div class="flex items-center">
                                <div class="notification-image flex w-96 h-52 rounded-3xl">
                                    <img class="w-full" src={item.WorldImageUrl} />
                                </div>
                                <div class="ml-6">
                                    <span>{item.SenderUsername}</span>
                                    <h1>{item.WorldName}</h1>
                                </div>
                            </div>
                            <div class="notification-action flex">
                                <IconButton icon="checkmark" onClick={() => acceptInvite( item.InviteMeshId )} />
                                <IconButton icon="cancel" onClick={() => rejectInvite( item.InviteMeshId )} />
                            </div>
                        </div>
                    )}</For>
                ) : (
                    "No Notifications"
                )}
            </div>
        </div>
    );
};

// export const NotificationViewAlt: Component = () => {
//     const [notifications, setNotifications] = createSignal<TInviteListItem[]>( [
//         // {
//         //     __Type: "",
//         //     InviteMeshId: "",
//         //     SenderMeshId: "",
//         //     SenderUsername: "R4ver",
//         //     WorldImageUrl: "https://files.abidata.io/user_content/worlds/2fc9693f-99a1-40e9-815a-fb227eaf6fbc/2fc9693f-99a1-40e9-815a-fb227eaf6fbc.png",
//         //     WorldMeshId: "",
//         //     WorldName: "Sleep Vault",
//         //     InstanceMeshId: "i+66f611f9cedab4b0-553101-5419b2-144d29ed",
//         //     InstanceName: "Sleep Vault (#814370)",
//         // }
//     ] );

//     UIEngine.on( "LoadInviteList", ( props: TInviteListItem[] ) => {
//         setNotifications( props );
//     } );

//     return (
//         <div class="flex h-80 mb-10 w-full">
//             <For each={notifications()}>{( item: TInviteListItem ) => (
//                 <div class="relative overflow-hidden rounded-4xl bg-cvr-dark text-cvr-white z-30 ">
//                     <div class="absolute w-full h-full -z-10">
//                         <div class="absolute top-0 left-0 bg-gradient-to-r from-black w-full h-full" />
//                         <img src={item.WorldImageUrl} class="w-full h-full " />
//                     </div>
//                     <div class="flex flex-col h-full justify-center px-10 py-10 pr-60">
//                         <p class="">{item.SenderUsername}</p>
//                         <h1 class="text-8xl text-cvr-orange">{item.WorldName}</h1>
//                     </div>
//                 </div>
//             )}</For>
//         </div>
//     );
// };