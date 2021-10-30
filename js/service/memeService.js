'use strict';

var gMeme;
var gImgs = [];
var gDistanceFromBottom = 430;
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
            font: 'Impact',
            align: 'center',
            fillColor: 'white',
            strokeColor: 'black',
            coords: {
                x: 200,
                y: 70
            }
        },
        {
            txt: '',
            size: 50,
            font: 'Impact',
            align: 'center',
            fillColor: 'white',
            strokeColor: 'black',
            coords: {
                x: 200,
                y: 350
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
    const idx = gMeme.selectedLineIdx;
    gMeme.lines[idx].txt += txt;
    drawMeme();
}

function deleteLineTxt(txt) {
    const idx = gMeme.selectedLineIdx;
    gMeme.lines[idx].txt = txt;
    drawMeme();
}

function resizeFont(action) {
    const idx = gMeme.selectedLineIdx;
    if (action === 'increase') gMeme.lines[idx].size += 3;
    if (action === 'decrease') gMeme.lines[idx].size -= 3;
    gIsResizingOn = true;
    drawMeme();
}

function setFontType(fontType) {
    const idx = gMeme.selectedLineIdx;
    gMeme.lines[idx].font = fontType;
}

function align(side) {
    const idx = gMeme.selectedLineIdx;
    gMeme.lines[idx].align = side;
}

function moveTxtLine(action) {
    const idx = gMeme.selectedLineIdx;
    if (action === 'up') gMeme.lines[idx].coords.y -= 3;
    if (action === 'down') gMeme.lines[idx].coords.y += 3;
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
    const idx = gMeme.selectedLineIdx;
    drawLineRect(x, y, idx);
}

function fillTxtColor(color) {
    const idx = gMeme.selectedLineIdx;
    gMeme.lines[idx].fillColor = color;
}

function strokeTxtColor(color) {
    const idx = gMeme.selectedLineIdx;
    gMeme.lines[idx].strokeColor = color;
}

function resetMeme() {
    createMeme();
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

function getTxtAlign(idx) {
    // const idx = gMeme.selectedLineIdx;
    return gMeme.lines[idx].align;
}

function getfillColor(idx) {
    // const idx = gMeme.selectedLineIdx;
    return gMeme.lines[idx].fillColor;

}

function getStrokeColor(idx) {
    // const idx = gMeme.selectedLineIdx;
    return gMeme.lines[idx].strokeColor;
}

function getFontProps(idx) {
    return `${gMeme.lines[idx].size}px ${gMeme.lines[idx].font}`;
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
