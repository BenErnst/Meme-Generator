'use strict';

var gCanvas;
var gCtx;

function onInit() {
    gCanvas = document.querySelector('.editor-canvas');
    gCtx = gCanvas.getContext('2d');

    drawImgAndTxt();
}

function drawImgAndTxt() {
    var img = new Image();
    img.src = getImgUrl();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText(getMemeLineTxt(), gCanvas.width / 2, gCanvas.height - 430);
    }
}

function drawText(text, x, y) {
    gCtx.textAlign = getTxtAlign();
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = getfillColor();
    gCtx.font = getFontProps();
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}