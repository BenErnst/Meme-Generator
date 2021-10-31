'use strict';


// 
function uploadImg() {
    cleanLineRect();

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
//

const elShareBtn = document.querySelector('.share-btn');
const elOverlay = document.querySelector('.overlay');
const elShareModal = document.querySelector('.share-modal');

const title = window.document.title;
const url = window.document.location.href;
const data = gCanvas.toDataURL();
url = data;
elShareBtn.addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: `${title}`,
            url: `${url}`
        })
    } else {
        elOverlay.classList.add('show-share-modal');
        elShareModal.classList.add('show-share-modal');
    }
})

elOverlay.addEventListener('click', () => {
    elOverlay.classList.remove('show-share-modal');
    elShareModal.classList.remove('show-share-modal');
})

