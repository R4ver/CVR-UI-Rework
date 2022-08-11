import { systemCall, showMainMenuPage, playSoundCore } from "./engine";

const UIActions = {
    respawn: function() {
        systemCall( "AppRespawn" );
        playSoundCore( "Click" );
    },
    toggleMute: function() {
        systemCall( "AppToggleMute" );
        playSoundCore( "Click" );
    },
    toggleFlyightMode: function () {
        systemCall( "AppToggleFLightMode" );
        playSoundCore( "Click" );
    },
    quitApplication: function() {
        systemCall( "AppQuitApplication" );
    },
    switchSeatedPlay: function() {
        systemCall( "AppToggleSeatedPlay" );
        playSoundCore( "Click" );
    },
    recalibrateAvatar: function() {
        systemCall( "AppRecalibrate" );
        playSoundCore( "Click" );
    },
    seatedPlayOrRecalibrate: function() {
        systemCall( "AppSeatedPlayOrRecalibrate" );
        playSoundCore( "Click" );
    },
    sendMediaKey: function( e ) {
        systemCall( "AppMediaControl", e.currentTarget.getAttribute( "data-key" ) );
        playSoundCore( "Click" );
    },
    toggleCamera: function() {
        systemCall( "AppToggleCamera" );
        playSoundCore( "Click" );
    },
    playEmote: function( e ) {
        systemCall( "AppPlayEmote", e.currentTarget.getAttribute( "data-index" ) );
        playSoundCore( "Click" );
    },
    switchToggle: function( e ) {
        systemCall( "AppSwitchToggle", e.currentTarget.getAttribute( "data-index" ) );
        playSoundCore( "Click" );
    },
    // ChangeAnimatorParam: function( e ){
    //     systemCall( "AppChangeAnimatorParam", e.currentTarget.getAttribute( "data-name" ), e.target.getAttribute( "data-value" ) );
    //     p( ".advanced-avatar .profile.selected" ).filterAttr( "data-id", menu.current_adv_avtr_profile ).find( ".change" ).removeClass( "hidden" );
    // },
    // ChangeAvatarProfile: function( e ){
    //     menu.current_adv_avtr_profile = e.currentTarget.getAttribute( "data-id" );
    //     p( ".advanced-avatar .profile" ).removeClass( "selected" ).filterAttr( "data-id", e.currentTarget.getAttribute( "data-id" ) ).addClass( "selected" );
    //     p( ".advanced-avatar .profile .change" ).addClass( "hidden" );
    //     systemCall( "AppChangeAvatarProfile", e.currentTarget.getAttribute( "data-id" ) );
    //     playSoundCore( "Click" );
    // },
    // saveCurrentAvatarProfile: function(){
    //     p( ".advanced-avatar .profile .change" ).addClass( "hidden" );
    //     systemCall( "AppSaveCurrentAvatarProfile", menu.current_adv_avtr_profile );
    //     playSoundCore( "Click" );
    // },
    // reloadCurrentAvatarProfile: function(){
    //     p( ".advanced-avatar .profile .change" ).addClass( "hidden" );
    //     systemCall( "AppReloadCurrentAvatarProfile", menu.current_adv_avtr_profile );
    //     playSoundCore( "Click" );
    // },
    // switchCategory: function( e ){
    //     switchCategorySelected( e.currentTarget.getAttribute( "data-category" ) );
    // },
    showMainMenuPage: function( category ) {
        showMainMenuPage( category );
    },
    notImplementedPage: function() {
        playSoundCore( "Warning" );
    },
};
export default UIActions;