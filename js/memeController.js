'use strict';

var gCanvas;
var gCtx;
var gIsDeleteKeyDown = false;

function onInit() {
    createImgs();
    renderGallery();
    createMeme();
    renderCanvas();
    gCanvas = document.querySelector('canvas');
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
    elCanvasBox.innerHTML = '<canvas height="400" width="400"></canvas>';
}

function drawMeme() {
    var img = new Image();
    img.src = getImgUrl();

    // Drawing Image:
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);

    // Drawing Texts:
    const topLine = gMeme.lines[0];
    const bottomLine = gMeme.lines[1];
    drawText(topLine.txt, topLine.coords.x, topLine.coords.y, 0);
    drawText(bottomLine.txt, bottomLine.coords.x, bottomLine.coords.y, 1);
}

function drawText(text, x, y, idx) {
    gCtx.textAlign = getTxtAlign(idx);
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = getStrokeColor(idx);
    gCtx.fillStyle = getfillColor(idx);
    gCtx.font = getFontProps(idx);
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function onSetLineTxt(txtInput) {
    var txt = '';
    if (gIsDeleteKeyDown) {
        txt = txtInput;
        deleteLineTxt(txt);
    } else {
        txt = (txtInput.length === 1) ? txtInput : txtInput.slice(-1);
        setLineTxt(txt);
    }
}

function getEventKey(event) {
    gIsDeleteKeyDown = (event.key === 'Backspace') ? true : false;
}

function showEditor() {
    document.querySelector('.gallery').style.display = 'none';
    setTimeout(() => {
        document.querySelector('.home-btn').style.display = 'block';
        document.querySelector('.editor').style.display = 'grid';
        document.querySelector('.navbar h1').innerText = 'EDITOR';
    }, 300);
}

function backHome() {
    document.querySelector('.home-btn').style.display = 'none';
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.gallery').style.display = 'grid';
    document.querySelector('.navbar h1').innerText = 'GALLERY';
    clearInputVal();
    resetColorInputs();
    clearCanvas();
    resetMeme();
    updatePlaceHolder(gMeme.selectedLineIdx);
    document.querySelector('.facebook-box').innerHTML = '';
    console.clear();
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function onSwitchLine() {
    switchLine();
}

function onIncreaseFontSize() {
    resizeFont('increase');
}

function onDecreaseFontSize() {
    resizeFont('decrease');
}

function onSetFontType(fontType) {
    setFontType(fontType);
    drawMeme();
}

function onAlign(side) {
    align(side);
    drawMeme();
}

function onMoveTxtLineUp() {
    moveTxtLine('up');
}

function onMoveTxtLineDown() {
    moveTxtLine('down');
}

function clearInputVal() {
    document.querySelector('#text-line').value = '';
}

function updatePlaceHolder(lineIdx) {
    document.querySelector('#text-line').placeholder = (lineIdx === 0) ? 'Text 1' : 'Text 2';
}

function drawLineRect(x, y, idx) {
    const txtWidth = gCtx.measureText(gMeme.lines[idx].txt).width;
    const fontSize = gMeme.lines[idx].size;
    gCtx.beginPath();
    gCtx.rect(x - (txtWidth / 2), y - fontSize + (fontSize / 10), txtWidth, fontSize);
    gCtx.fillStyle = 'rgba(255, 0, 0, 0)';
    gCtx.fillRect(x - (txtWidth / 2), y - fontSize + (fontSize / 10), txtWidth, fontSize);
    gCtx.lineWidth = 5;
    gCtx.strokeStyle = 'black';
    gCtx.stroke();

    setTimeout(() => { drawMeme(); }, 5000);
}

function onFillTxtColor(color) {
    fillTxtColor(color);
    drawMeme();
}

function onStrokeTxtColor(color) {
    strokeTxtColor(color);
    drawMeme();
}

function resetColorInputs() {
    const black = '#000';
    document.querySelector('#txt-color').value = black;
    document.querySelector('#stroke-color').value = black;
}


// SHARING METHOD:

function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);

        document.querySelector('.facebook-box').innerHTML = `
        <a class="btn share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        <img class="facebook-logo" src="icons/facebook-logo.png">
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}
