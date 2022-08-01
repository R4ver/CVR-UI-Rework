import type { Component } from "solid-js";
import { createSignal } from "solid-js";

const App: Component = () => {
    const [count, setCount] = createSignal( 0 );

    const newCount = () => setCount( ( prev ) => prev + 1 );

    setInterval( newCount, 1000 );

    return (
        <div id="quickmenu-wrapper" class="bg-slate-900 bg-opacity-80 text-white">
            <h1>Hello QuickMenu!</h1>
            <h2>UI Created with SolidJS</h2>
            <p>Cool Counter: {count()}</p>
        </div>
    );
};

export default App;
