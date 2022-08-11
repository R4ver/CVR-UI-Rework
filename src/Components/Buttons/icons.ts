const scale = 3;
const tileSize = 240;
const backgroundSize = `${( 1680 + 5 ) / scale}px ${( 720 + 5 ) / scale}px`;
const iconDimension = `${tileSize / scale}px`;

export const Icons = {
    jacket: `${-tileSize * 0 / scale}px ${-tileSize * 0 / scale}px`,
    camera: `${-tileSize * 1 / scale}px ${-tileSize * 0 / scale}px`,
    fly: `${-tileSize * 2 / scale}px ${-tileSize * 0 / scale}px`,
    friends: `${-tileSize * 3 / scale}px ${-tileSize * 0 / scale}px`,
    play: `${-tileSize * 4 / scale}px ${-tileSize * 0 / scale}px`,
    next: `${-tileSize * 5 / scale}px ${-tileSize * 0 / scale}px`,
    prev: `${-tileSize * 6 / scale}px ${-tileSize * 0 / scale}px`,
    dance: `${-tileSize * 0 / scale}px ${-tileSize * 1 / scale}px`,
    calender: `${-tileSize * 1 / scale}px ${-tileSize * 1 / scale}px`,
    tpose: `${-tileSize * 2 / scale}px ${-tileSize * 1 / scale}px`,
    pin: `${-tileSize * 3 / scale}px ${-tileSize * 1 / scale}px`,
    cube: `${-tileSize * 4 / scale}px ${-tileSize * 1 / scale}px`,
    house: `${-tileSize * 5 / scale}px ${-tileSize * 1 / scale}px`,
    bottle: `${-tileSize * 6 / scale}px ${-tileSize * 1 / scale}px`,
    group: `${-tileSize * 0 / scale}px ${-tileSize * 2 / scale}px`,
    mic: `${-tileSize * 1 / scale}px ${-tileSize * 2 / scale}px`,
    map: `${-tileSize * 2 / scale}px ${-tileSize * 2 / scale}px`,
    world: `${-tileSize * 3 / scale}px ${-tileSize * 2 / scale}px`,
} as const;

export type TIcons = keyof typeof Icons;

export const iconStyle = ( icon: string ) => ( { 
    "background": `url("./ui_icon_set.png") ${Icons[icon]} / ${backgroundSize}`, 
    width: iconDimension,
    height: iconDimension
} );

// eslint-disable-next-line no-unused-vars
export const printStyle = () => {
    var style = ``;


    Object.keys( Icons ).forEach( e => {
        style += `
.icon-${e} {
    background: url("../ui_icon_set.png");
    background-position: ${Icons[e]};
    background-size: ${backgroundSize};
    width: ${iconDimension};
    height: ${iconDimension};
}
    `;
    } );

    console.log( style );
};