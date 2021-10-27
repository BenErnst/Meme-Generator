'use strict';

var gCanvas;
var gCtx;

function onInit() {
    createImgs();
    renderGallery();
    createMeme();
    renderCanvas();
    gCanvas = document.querySelector('.editor-canvas');
    gCtx = gCanvas.getContext('2d');
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery');
    const strHTML = gImgs.map(img => {
        return `<div class="img" onclick="setMemeImg(${img.id})" style="background: url(${img.url}); background-position: center center; background-size: cover;"></div>`;
    })
    elGallery.innerHTML = strHTML.join('');
}

function renderCanvas() {
    const elCanvasBox = document.querySelector('.canvas-box');
    elCanvasBox.innerHTML = '<canvas class="editor-canvas" height="500" width="500"></canvas>';
    drawMeme();
}

function drawMeme() {
    document.querySelector('.gallery').hidden = true;
    var img = new Image();
    img.src = getImgUrl();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText(getMemeLineTxt(), gCanvas.width / 2, gCanvas.height - gDistanceFromBottom);
        // drawText(getMemeLineTxt(), gCanvas.width / 2, getDistanceFromBottom());
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

function showEditor() {
    document.querySelector('.home-btn').hidden = false;
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.editor').hidden = false;
}

function showGallery() {
    document.querySelector('.home-btn').hidden = true;
    document.querySelector('.editor').hidden = true;
    document.querySelector('.gallery').style.display = 'grid';
    clearLineTxt();
    document.querySelector('#text-line').value = '';
    console.clear();
}

function onIncreaseFontSize() {
    resizeFont('increase');
}

function onDecreaseFontSize() {
    resizeFont('decrease');
}

function onMoveTxtLineUp() {
    moveTxtLine('up');
}

function onMoveTxtLineDown() {
    moveTxtLine('down');
}
