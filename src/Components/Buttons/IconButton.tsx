import { JSX, Component } from "solid-js";
import UIActions from "../../Utils/actions";
import { TIcons } from "./icons";

import { playSoundCore } from "../../Utils/engine";

type ButtonProps = {
    onClick?: () => void;
    action?: string;
    category?: string;
    content?: string;
    icon: TIcons;
    label?: string;
    disabled?: boolean;
    playSound?: boolean;
    active?: boolean;
    children: JSX.Element;
}

type Props = Partial<ButtonProps> & {
  onClick: {onClick: () => void},
  action: {action: string},
  category: {category: string}
}["onClick" | "action" | "category"]

// let lastHoverTarget = {};

// document.addEventListener( "mousemove", ( e ) => {
//     const currentTarget = e.target as Element;
//     let hoverTarget = null;

//     if ( currentTarget.hasAttribute( "data-x" ) ){
//         hoverTarget = e.target;
//     } else {
//         let element = e.target as Element;
//         while ( element.parentNode ){
//             element = element.parentNode as Element;

//             if ( element == document ) break;
//             if ( element.hasAttribute( "data-x" ) ){
//                 hoverTarget = element;
//                 break;
//             }
//         }
//     }

//     if ( hoverTarget && hoverTarget != lastHoverTarget ){
//         playSoundCore( "Hover" );
//     }

//     lastHoverTarget = hoverTarget; 
// } );

export const IconButton: Component<Props> = ( props ) => {

    const handleClick = () => {
        if ( props.onClick ){
            props.onClick();
            return;
        }
        
        if ( props.category ) {
            UIActions["showMainMenuPage"]( props.category );
            return;
        }

        UIActions[props.action]();
    };

    const handleMouseEnter = () => {
        if ( props.playSound ) playSoundCore( "Hover" );
    };
    return <button 
        class={`ui-button group flex flex-col items-center justify-center px-5 py-5 font-normal ${props.disabled ? "is-disabled" : ""} ${props.active ? "active" : ""}`}
        onClick={() => handleClick()}
        onMouseEnter={() => handleMouseEnter()}
        data-x={props.action || "hover"}
        disabled={props.disabled ? props.disabled : false}
    >
        <div class={`icon-wrapper w-20 h-20`}>
            <div 
                class={`icon icon-${props.icon}`}
            />
        </div>
        {props.label && <span class="text-white text-CVRUI group-hover__text-orange-600 mt-8">{props.label}</span> }
    </button>;
};  

export const BigIconButton: Component<Props> = ( props ) => {

    const handleClick = () => {
        if ( props.onClick ){
            props.onClick();
            return;
        }
        
        if ( props.category ) {
            UIActions["showMainMenuPage"]( props.category );
            return;
        }

        UIActions[props.action]();
    };

    const handleMouseEnter = () => {
        if ( props.playSound ) playSoundCore( "Hover" );
    };

    return <button 
        class={`ui-button group big flex flex-col items-center justify-center px-14 py-5 font-normal ${props.disabled ? "is-disabled" : ""} ${props.active ? "active" : ""}`} 
        onClick={() => handleClick()}
        data-x={props.action || "hover"}
        onMouseEnter={() => handleMouseEnter()}
        disabled={props.disabled ? props.disabled : false}
    >
        <div class={`icon-wrapper w-cvr-icon-big h-cvr-icon-big`}>
            <div 
                class={`icon icon-${props.icon}-md`}
            />
        </div>
        {props.label && <span class="text-white text-CVRUI group-hover__text-orange-600 mt-8">{props.label}</span> }
    </button>;
};  

export const IconButtonRound: Component<Props> = ( props ) => {

    const handleClick = () => {
        if ( props.onClick ){
            props.onClick();
            return;
        }
        
        if ( props.category ) {
            UIActions["showMainMenuPage"]( props.category );
            return;
        }

        UIActions[props.action]();
    };

    const handleMouseEnter = () => {
        if ( props.playSound ) playSoundCore( "Hover" );
    };

    return <button 
        class={`ui-button group flex flex-col items-center justify-center px-5 py-5 font-normal rounded-full bg-cvr-black ${props.disabled ? "is-disabled" : ""} ${props.active ? "active" : ""}`}
        onClick={() => handleClick()}
        onMouseEnter={() => handleMouseEnter()}
        data-x={props.action || "hover"}
        disabled={props.disabled ? props.disabled : false}
    >
        <div class={`icon-wrapper w-20 h-20`}>
            <div 
                class={`icon icon-${props.icon}`}
            />
        </div>
        {props.label && <span class="text-white text-CVRUI group-hover__text-orange-600 mt-8">{props.label}</span> }
    </button>;
}; 