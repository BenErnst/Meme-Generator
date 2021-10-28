'use strict';

var gMeme;
var gImgs = [];
var gDistanceFromBottom = 430;
var gSavedTxt0 = '';
var gSavedTxt1 = '';
var gIsResizingOn = false;

function createImgs() {
    var imgNum = 0;
    while (imgNum < 18) {
        imgNum++;
        var img = {
            id: imgNum,
            url: `square-imgs/${imgNum}.jpg`,
            keywords: keywordsMap[imgNum]
        }
        gImgs.push(img);
    }
}

function createMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [{
            txt: '',
            size: 50,
            align: 'center',
            color: 'white',
            coords: {
                x: 250,
                y: 70
            }
        },
        {
            txt: '',
            size: 50,
            align: 'center',
            color: 'white',
            coords: {
                x: 250,
                y: 450
            }
        }]
    }
}

// Updating gMeme Properties functions:

function setMemeImg(id) {
    gMeme.selectedImgId = id;
    drawMeme();
    showEditor();
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    if (gMeme.selectedLineIdx === 0) gSavedTxt0 = txt;
    else gSavedTxt1 = txt;
    drawMeme();
}

function resizeFont(action) {
    if (action === 'increase') gMeme.lines[gMeme.selectedLineIdx].size += 3;
    if (action === 'decrease') gMeme.lines[gMeme.selectedLineIdx].size -= 3;
    gIsResizingOn = true;
    drawMeme();
}

function moveTxtLine(action) {
    if (action === 'up') gMeme.lines[gMeme.selectedLineIdx].coords.y -= 3;
    if (action === 'down') gMeme.lines[gMeme.selectedLineIdx].coords.y += 3;
    drawMeme();
}

function addTxtLine() {
    gMeme.lines.push(gMeme.lines[0]);
    switchLine();
}

function deleteTxtLine() {
    gMeme.lines.pop();
}

function switchLine() {
    if (gMeme.selectedLineIdx === 0) gMeme.selectedLineIdx++;
    else gMeme.selectedLineIdx--;
    updatePlaceHolder(gMeme.selectedLineIdx);
    clearInputVal();
    const x = gMeme.lines[gMeme.selectedLineIdx].coords.x;
    const y = gMeme.lines[gMeme.selectedLineIdx].coords.y;
    drawLineRect(x, y);
}

function fillTxtColor(color) {
    console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx);
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function clearTxtLine() {
    gMeme.lines[gMeme.selectedLineIdx].txt = '';
}

// Getting gMeme Properties functions:

function getImgUrl() {
    const img = gImgs.find(img => img.id === gMeme.selectedImgId);
    return img.url;
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

function strokeTxtColor(color) {
    gCtx.strokeStyle = color;
}

function getFontProps() {
    if (gMeme.selectedLineIdx === 0) return `${gMeme.lines[0].size}px Impact`;
    if (gMeme.selectedLineIdx === 1) return `${gMeme.lines[1].size}px Impact`;
}

// 

const keywordsMap = {
    1: ['politics, celebrities'],
    2: ['animals'],
    3: ['animals, kids'],
    4: ['animals'],
    5: ['kids'],
    6: ['cinema, celebrities'],
    7: ['kids'],
    8: ['cinema'],
    9: ['kids'],
    10: ['politics, celebrities'],
    11: ['sports'],
    12: ['celebrities'],
    13: ['cinema, celebrities'],
    14: ['cinema'],
    15: ['cinema'],
    16: ['cinema'],
    17: ['politics, celebrities'],
    18: ['cinema']
};
