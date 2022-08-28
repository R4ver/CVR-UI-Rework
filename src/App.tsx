import type { Component } from "solid-js";

import { useSettings } from "./Store/SettingsStore";
import { UIView } from "./Views";

const App: Component = () => {
    const { initialized, initSettings } = useSettings();

    if ( !initialized() ) {
        initSettings();
    }

    return (
        <div class ="flex flex-col items-start justify-center mt-44">
            <div id="quickmenu-wrapper" class="flex flex-col rounded-4xl">
                <div class="background-waves" />
                <UIView />
            </div>
        </div>
    );
};



export default App;
