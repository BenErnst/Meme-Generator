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

        if (gIsResizingOn) {
            if (gMeme.selectedLineIdx === 0) {
                drawText(gSavedTxt0, gMeme.lines[0].coords.x, gMeme.lines[0].coords.y);
                drawText(gSavedTxt1, gMeme.lines[1].coords.x, gMeme.lines[1].coords.y, `${gMeme.lines[1].size}px Impact`);
            } else {
                drawText(gSavedTxt1, gMeme.lines[1].coords.x, gMeme.lines[1].coords.y);
                drawText(gSavedTxt0, gMeme.lines[0].coords.x, gMeme.lines[0].coords.y, `${gMeme.lines[0].size}px Impact`);
            }
        } else {
            if (gMeme.selectedLineIdx === 0) {
                drawText(gSavedTxt1, gMeme.lines[1].coords.x, gMeme.lines[1].coords.y);
                drawText(getMemeLineTxt(), gMeme.lines[0].coords.x, gMeme.lines[0].coords.y);
            } else {
                drawText(gSavedTxt0, gMeme.lines[0].coords.x, gMeme.lines[0].coords.y);
                drawText(getMemeLineTxt(), gMeme.lines[1].coords.x, gMeme.lines[1].coords.y);
            }
        }
    }
}

function drawText(text, x, y, fontSize = getFontProps()) {
    gCtx.textAlign = getTxtAlign();
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = getfillColor();
    // gCtx.font = getFontProps();
    gCtx.font = fontSize;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function showEditor() {
    document.querySelector('.gallery').style.display = 'none';
    setTimeout(() => {
        document.querySelector('.home-btn').hidden = false;
        document.querySelector('.editor').hidden = false;
    }, 300);
}

function showGallery() {
    document.querySelector('.home-btn').hidden = true;
    document.querySelector('.editor').hidden = true;
    document.querySelector('.gallery').style.display = 'grid';
    clearTxtLine();
    clearInputVal();
    gSavedTxt0 = '';
    gSavedTxt1 = '';
    updatePlaceHolder(0);
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

function onAddTxtLine() {
    addTxtLine();
}

function onDeleteTxtLine() {
    deleteTxtLine();
}

function onSwitchLine() {
    switchLine();
}

function clearInputVal() {
    document.querySelector('#text-line').value = '';
}

function updatePlaceHolder(lineIdx) {
    // console.log('lineIdx', lineIdx);

    if (lineIdx === 0) document.querySelector('#text-line').placeholder = 'Text 1';
    else document.querySelector('#text-line').placeholder = 'Text 2';
}

function drawLineRect(x, y) {
    if (gMeme.selectedLineIdx === 0) var txtWidth = gCtx.measureText(gSavedTxt0).width;
    if (gMeme.selectedLineIdx === 1) var txtWidth = gCtx.measureText(gSavedTxt1).width;

    const fontSize = gMeme.lines[gMeme.selectedLineIdx].size;

    gCtx.beginPath();
    gCtx.rect(x - (txtWidth / 2), y - fontSize + (fontSize / 10), txtWidth, fontSize);
    gCtx.fillStyle = 'rgba(255, 0, 0, 0)';
    gCtx.fillRect(x - (txtWidth / 2), y - fontSize + (fontSize / 10), txtWidth, fontSize);
    gCtx.strokeStyle = 'dimgray';
    gCtx.stroke();
}