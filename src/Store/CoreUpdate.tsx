import { createSignal, createContext, useContext } from "solid-js";
import type { JSX, Component } from "solid-js";
import { UIEngine } from "../Utils/engine";
import type { TCoreUpdate, DeepPartial } from "../../typings";

type TContextType = {
    coreUpdate: () => DeepPartial<TCoreUpdate>;
}

const CoreUpdatesContext = createContext<TContextType | null>( null );
const CoreUpdateProvider = CoreUpdatesContext.Provider;

export interface CoreUpdateProviderProps {
  children: JSX.Element;
}

export const CoreUpdateStoreProvider: Component<CoreUpdateProviderProps> = ( props ) => {
    const [coreUpdate, setCoreUpdate] = createSignal<DeepPartial<TCoreUpdate>>( {
        core: {
            fps: 0,
            ping: 0,
        },
        gameSettings: {
            generalClockFormat: "24"
        }
    } );

    UIEngine.on( "ReceiveCoreUpdate", ( props: string ) => {
        const parsedString = JSON.parse( props );
        setCoreUpdate( prev => ( { ...prev, ...parsedString } ) );
    } );

    return (
        <CoreUpdateProvider value={{ coreUpdate }}>
            {props.children}
        </CoreUpdateProvider>
    );
};

export const useCoreUpdate = () => useContext( CoreUpdatesContext );