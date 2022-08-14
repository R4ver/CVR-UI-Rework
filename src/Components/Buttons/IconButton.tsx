import { JSX, Component } from "solid-js";
import UIActions from "../../Utils/actions";
import { TIcons } from "./icons";

type ButtonProps = {
    onClick?: () => void;
    action?: string;
    category?: string;
    content?: string;
    icon: TIcons;
    label: string;
    children: JSX.Element;
}

type Props = Partial<ButtonProps> & {
  onClick: {onClick: () => void},
  action: {action: string},
  category: {category: string}
}["onClick" | "action" | "category"]

// printStyle();

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

    return <button 
        class="ui-button group flex flex-col items-center justify-center px-5 py-5 font-normal" 
        onClick={() => handleClick()}
        data-x={props.action || "hover"}
    >
        <div class={`icon-wrapper w-20 h-20 mb-8`}>
            <div 
                class={`icon icon-${props.icon}`}
            />
        </div>
        <span class="text-white text-CVRUI group-hover__text-orange-600">{props.label}</span>
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

    return <button 
        class="ui-button group big flex flex-col items-center justify-center px-14 py-5 font-normal" 
        onClick={() => handleClick()}
        data-x={props.action || "hover"}
    >
        <div class={`icon-wrapper w-cvr-icon-big h-cvr-icon-big mb-8`}>
            <div 
                class={`icon icon-${props.icon}-md`}
            />
        </div>
        <span class="text-white text-CVRUI group-hover__text-orange-600">{props.label}</span>
    </button>;
};  