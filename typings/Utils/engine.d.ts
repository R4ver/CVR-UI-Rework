declare global {
  interface Window {
    engine: {
        SendMessage: ( name: string, id: string ) => void,
        call: () => void,
    } | any;
    IS_DEV_BUILD: boolean;
  }
}

type TCore = {
    version: string,
    fps: number,
    ping: number,
    api: string,
    gsi: string,
    username: string,
    user_image: string,
    muted: boolean,
    inVr: boolean,
    fullBodyActive: boolean
}

type TAvatar = {
    current_avatar_id: string,
    current_avatar_name: string,
    current_avatar_image: string,
    current_avatar_settings: ( string | number | object | Array<string> )[],
    current_avatar_profiles: string[],
    current_avatar_default_profile: string,
    current_avatar_emote_names: string[],
    current_avatar_state_names: string[]
}

type TInstance = {
    current_instance_id: string,
    current_instance_name: string,
    current_world_id: string,
    current_world_name: string,
    current_world_image: string,
    current_world_triggers: [],
    current_game_rule_no_flight: boolean,
    current_game_rule_no_props: boolean,
    current_game_rule_no_portals: boolean,
    current_game_rule_no_zoom: boolean,
    current_game_rule_no_nameplates: boolean,
    current_game_rule_no_builder: boolean,
    current_game_rule_mod_physics: boolean,
    current_game_rule_no_avatar: boolean,
    current_game_rule_mod_settings: boolean,
    current_game_rule_mod_event: boolean,
    current_game_rule_sys_restart: boolean
}

type TInput = {
    movementVector: { x: number, y: number, z: number },
    lookVector: { x: number, y: number },
    jump: boolean,
    sprint: boolean,
    crouchToggle: boolean,
    proneToggle: boolean,
    sectionTurn: number,
    floatDirection: number,
    independentHeadTurn: boolean,
    independentHeadToggle: boolean,
    objectPushPull: number,
    toggleState: number,
    mainMenuButton: boolean,
    mainMenuButtonHold: boolean,
    quickMenuButton: boolean,
    interactLeftDown: boolean,
    interactLeftUp: boolean,
    interactLeftDouble: boolean,
    gripLeftUp: boolean,
    gripLeftDown: boolean,
    interactRightDown: boolean,
    interactRightUp: boolean,
    gripRightUp: boolean,
    gripRightDown: boolean,
    interactLeftValue: number,
    gripLeftValue: number,
    interactRightValue: number,
    gripRightValue: number,
    scrollValue: number,
    emote: number,
    gestureLeft: number,
    gestureRight: number,
    mute: boolean,
    muteDown: boolean,
    blockPhysics: boolean,
    individualFingerTracking: boolean,
    fingerCurlLeftThumb: number,
    fingerCurlLeftIndex: number,
    fingerCurlLeftMiddle: number,
    fingerCurlLeftRing: number,
    fingerCurlLeftPinky: number,
    fingerCurlRightThumb: number,
    fingerCurlRightIndex: number,
    fingerCurlRightMiddle: number,
    fingerCurlRightRing: number,
    fingerCurlRightPinky: number
}

type TTargetLeft = {
    type: string,
    id: string,
    instance: string,
    position: { x: number, y: number, z: number },
    name: string
}

type TTargetRight = {
    type: string,
    id: string,
    instance: string,
    position: { x: number, y: number, z: number },
    name: string
}

type TTargetView = {
    type: string,
    id: string,
    instance: string,
    position: { x: number, y: number, z: number },
    name: string
}

type TPlayerData = {
    position: { x: number, y: number, z: number },
    rotation: { x: number, y: number, z: number },
    hmdPosition: { x: number, y: number, z: number },
    hmdRotation: { x: number, y: number, z: number },
    leftControllerPosition: { x: number, y: number, z: number },
    leftControllerRotation: { x: number, y: number, z: number },
    rightControllerPosition: { x: number, y: number, z: number },
    rightControllerRotation: { x: number, y: number, z: number }
}

type TMenuParameters = {
    mainPositionOffset: { x: number, y: number, z: number },
    mainRotationOffset: { x: number, y: number, z: number },
    mainMenuScale: number,
    quickPositionOffset: {x: number, y: number, z: number},
    quickRotationOffset: {x: number, y: number, z: number},
    quickMenuInGrabMode: boolean,
    quickMenuScale: number
}

type TGameSettings = {
    generalClockFormat: string
}

export type TCoreUpdate = {
  core: TCore,
  avatar: TAvatar,
  instance: TInstance,
  input: TInput,
  targetLeft: TTargetLeft,
  targetRight: TTargetRight,
  targetView: TTargetView,
  playerData: TPlayerData,
  menuParameters: TMenuParameters,
  gameSettings: TGameSettings
}

export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;