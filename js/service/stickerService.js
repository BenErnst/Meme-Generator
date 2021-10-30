'use strict';

var gSticker;

function createSticker(pos) {
    gSticker = {
        pos,
        size: 100,
        img: gImg,
        isDrag: false
    }
}

function isStickerClicked(clickedPos) {
    const { pos } = gSticker;
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gSticker.size
}

function setStickerDrag(isDrag) {
    gSticker.isDrag = isDrag;
}
function moveSticker(dx, dy) {
    gSticker.pos.x += dx
    gSticker.pos.y += dy
}

