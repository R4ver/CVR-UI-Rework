import type { Component } from "solid-js";

import { useSettings } from "./Store/SettingsStore";
import { UIView } from "./Components";

const App: Component = () => {
    const { initialized, initSettings } = useSettings();

    if ( !initialized() ) {
        initSettings();
    }

    return (
        <div id="quickmenu-wrapper" class="flex flex-col rounded-4xl">
            <div class="background-waves" />
            <UIView />
        </div>
    );
};



export default App;
