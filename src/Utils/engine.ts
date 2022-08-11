/* eslint-disable no-unused-vars */
export {};

declare global {
  interface Window {
    engine: {
        SendMessage: ( name: string, id: string ) => void,
        call: () => void,
    } | any;
  }
}


window.engine = window.engine || {};

const UIEngine = window.engine;

export const systemCall = ( _type: string, _param1?: string, _param2?: string, _param3?: string, _param4?: string ) => {
    const params = [_param1, _param2, _param3, _param4].map( e => ( e === undefined || e === null ) ? "" : e );
    UIEngine.call( "CVRAppCallSystemCall", _type, ...params );
};

export const playSoundCore = function( sound ){
    systemCall( "PlayCoreUiSound", sound );
};

// export const switchCategorySelected = function( category ){
//     p( ".menu-category" ).hideExcept( category );
//     p( ".menu-category."+category ).show();
//     playSoundCore( "Click" );
// };

export const update1Sec = () =>{
    window.setTimeout( update1Sec, 1000 );
    UIEngine.trigger( "eventUpdate1sec" );
};

export const update10Sec = () => {
    window.setTimeout( update10Sec, 100 );
    UIEngine.trigger( "eventUpdate10sec" );
};

export const showMainMenuPage = ( category ) =>{
    systemCall( "ShowMainMenuPage", category );
    playSoundCore( "Click" );
};

export default UIEngine;