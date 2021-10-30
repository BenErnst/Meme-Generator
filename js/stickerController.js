'use strict';

var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gImg;

function onAddSticker(img) {
    const xMiddle = (gCanvas.width / 2) - 50;
    const yMiddle = (gCanvas.height / 2) - 50;
    const imgSize = 100;
    gCtx.drawImage(img, xMiddle, yMiddle, imgSize, imgSize);
    initStickers(img);
}

function initStickers(img) {
    gImg = img;
    const center = { x: gCanvas.width / 2, y: gCanvas.height / 2 };
    createSticker(center);
    addListeners();
}

function renderSticker() {
    gCtx.save();
    drawMeme();
    const { pos, img, size } = gSticker;
    drawSticker(pos.x, pos.y, img, size);
    gCtx.restore();
}

function addListeners() {
    addMouseListeners();
    addTouchListeners();
    window.addEventListener('resize', () => {
        renderSticker();
    })
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove);
    gCanvas.addEventListener('mousedown', onDown);
    gCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove);
    gCanvas.addEventListener('touchstart', onDown);
    gCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
    const pos = getEvPos(ev);
    if (!isStickerClicked(pos)) return;
    setStickerDrag(true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
    if (gSticker.isDrag) {
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;
        gStartPos = pos;
        moveSticker(dx, dy);
        renderSticker();
    }
}

function onUp() {
    setStickerDrag(false);
    document.body.style.cursor = 'grab';
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault();
        ev = ev.changedTouches[0];
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos;
}

function drawSticker(x, y, img, imgSize) {
    gCtx.drawImage(img, x - 50, y - 50, imgSize, imgSize);
}

