'use strict';

var gMeme;
var gImgs = [];
var gDistanceFromBottom = 430;
// var gIsTxtOnly = false;
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

    drawMeme();
    if (gMeme.selectedLineIdx === 0) gSavedTxt0 = txt;
    else gSavedTxt1 = txt;

}

function resizeFont(action) {
    if (action === 'increase') gMeme.lines[gMeme.selectedLineIdx].size += 3;
    if (action === 'decrease') gMeme.lines[gMeme.selectedLineIdx].size -= 3;

    console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx);
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
    // console.log('gMeme.lines.length', gMeme.lines.length);
    switchLine();
}

function deleteTxtLine() {
    gMeme.lines.pop();
    // console.log('gMeme.lines.length', gMeme.lines.length);
}

function switchLine() {
    if (gMeme.selectedLineIdx === 0) gMeme.selectedLineIdx++;
    else gMeme.selectedLineIdx--;
    updatePlaceHolder(gMeme.selectedLineIdx);
    clearInputVal();
    const x = gMeme.lines[gMeme.selectedLineIdx].coords.x;
    const y = gMeme.lines[gMeme.selectedLineIdx].coords.y;

    drawLineRect(x, y);

    // console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx);
}

// 

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

function getFontProps() {
    // console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx);
    // console.log('gMeme.lines[gMeme.selectedLineIdx].size', gMeme.lines[gMeme.selectedLineIdx].size);
    // console.log('gMeme', gMeme);
    if (gMeme.selectedLineIdx === 0) return `${gMeme.lines[0].size}px Impact`;
    if (gMeme.selectedLineIdx === 1) return `${gMeme.lines[1].size}px Impact`;

    // return `${gMeme.lines[gMeme.selectedLineIdx].size}px Impact`;
}

// 

function clearTxtLine() {
    gMeme.lines[gMeme.selectedLineIdx].txt = '';
}

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
