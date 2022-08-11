import type { JSX, Component } from "solid-js";

type UIGroupProps = {
    tailwind?: string;
    children: JSX.Element;
}

export const UIGroup: Component<UIGroupProps> = ( props ) => {
    return (
        <div class={`flex flex-col z-10 relative ${props.tailwind ? props.tailwind : ""}`}>
            {props.children}
        </div>
    );
};

export const UIRow: Component<UIGroupProps> = ( props ) => {

    return (
        <div class={`flex px-16 py-16 ${props.tailwind ? props.tailwind : ""}`}>
            {props.children}
        </div>
    );
};