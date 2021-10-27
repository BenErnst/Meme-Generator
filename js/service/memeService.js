'use strict';

var gMeme;

var gImgs = [{ id: 1, url: 'square-imgs/8.jpg', keywords: ['happy'] }];

gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I am Happy',
        size: 50,
        align: 'center',
        color: 'white'
    }]
}

function getImgUrl() {
    const chosenImg = gImgs.find(img => img.id === gMeme.selectedImgId);
    return chosenImg.url;
}

function getMemeLineTxt() {
    const line = gMeme.lines[gMeme.selectedLineIdx];
    return line.txt;
}

function getTxtAlign() {
    return gMeme.lines[gMeme.selectedLineIdx].align;
}

function getfillColor() {
    return gMeme.lines[gMeme.selectedLineIdx].color;
}

function getFontProps() {
    return `${gMeme.lines[gMeme.selectedLineIdx].size}px Impact`;
}