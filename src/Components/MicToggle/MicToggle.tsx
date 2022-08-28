// import { createSignal } from "solid-js";

import { useCoreUpdate } from "../../Store/CoreUpdate";
import { IconButton } from "../";

export const MicToggle = () => {
    const { coreUpdate } = useCoreUpdate();
    // const [micOn, setMicOn] = createSignal( false );

    return (
        <div class={`mic-toggle flex justify-end rounded-3xl min-w-fit px-10 ml-28 ${coreUpdate().core.muted ? "bg-cvr-red" : "bg-cvr-green"} py-5`}>
            <IconButton playSound icon="mic" action="toggleMute" label="Mic Off" />
        </div>  
    );
};