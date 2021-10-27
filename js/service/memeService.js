'use strict';

var gMeme;

var gImgs = [];

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
            color: 'white'
        }]
    }
}

function setMemeImg(id) {
    gMeme.selectedImgId = id;
    drawMeme();
    showEditor();
}

function getImgUrl() {
    const img = gImgs.find(img => img.id === gMeme.selectedImgId);
    return img.url;
}

function setMemeLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    drawMeme();
}

function getMemeLineTxt() {
    const line = gMeme.lines[gMeme.selectedLineIdx];
    return line.txt;
}

function clearLineTxt() {
    gMeme.lines[gMeme.selectedLineIdx].txt = '';
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
