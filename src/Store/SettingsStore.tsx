import { createSignal, createContext, useContext } from "solid-js";
import type { JSX, Component } from "solid-js";

type TSettings = {
    [key: string]: unknown
}

type TContextType = {
    settings: () => TSettings;
    saveSetting: ( key: string, value: unknown ) => void;
    initSettings: () => void;
    initialized: () => boolean;
}

const SettingsStore = createContext<TContextType | null>( null );
const SettingsProvider = SettingsStore.Provider;

export interface SettingsStoreProviderProps {
  children: JSX.Element;
}
 
const SETTING_PREFIX = "com.r4ver."; 

export const SettingsStoreProvider: Component<SettingsStoreProviderProps> = ( props ) => {
    const [settings, setUISettings] = createSignal( {} );
    const [initialized, setInitialized] = createSignal( false );

    const saveSetting = ( key: string, value: unknown ) => {
        let oldSettings = { ...settings() };
        const FORMATED_KEY = `${SETTING_PREFIX}.${key}`;
        oldSettings = {
            ...oldSettings,
            [FORMATED_KEY]: value
        };

        setUISettings( oldSettings );
        localStorage.setItem( FORMATED_KEY, JSON.stringify( value ) );
    };

    const initSettings = () => {
        const currentLocalState = { ...localStorage };
        Object.keys( currentLocalState ).forEach( key => {
            if ( key.match( SETTING_PREFIX ) ) return;
                
            delete currentLocalState[key];
        } );

        setUISettings( {
            ...currentLocalState,
            test: 0
        } );
        setInitialized( true );
    };

    return (
        <SettingsProvider value={{ settings, saveSetting, initSettings, initialized }}>
            {props.children}
        </SettingsProvider>
    );
};

export const useSettings = () => useContext( SettingsStore );