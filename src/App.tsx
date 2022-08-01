import { Component } from "solid-js";

//@ts-ignore
const engine = window.engine;

const systemCall = ( _type: string, _param1?: string, _param2?: string, _param3?: string, _param4?: string ) => {
    if ( _param1 === undefined || _param1 === null ) _param1 = "";
    if ( _param2 === undefined || _param2 === null ) _param2 = "";
    if ( _param3 === undefined || _param3 === null ) _param3 = "";
    if ( _param4 === undefined || _param4 === null ) _param4 = "";
    engine.call( "CVRAppCallSystemCall", _type, _param1, _param2, _param3, _param4 );
};

const Button = ( props: {onClick: () => void, children: any} ) => <button class="bg-cyan-400" onClick={() => props.onClick()}>{props.children}</button>;

const App: Component = () => {
    const handleClick = () => {
        systemCall( "AppToggleMute" );
    };

    return (
        <div id="quickmenu-wrapper" class="bg-slate-900 bg-opacity-80 text-white">
            <h1>Hello QuickMenu!</h1>
            <h2>UI Created with SolidJS</h2>
            
            <Button onClick={handleClick}>Toggle Mute</Button>
        </div>
    );
};

export default App;
