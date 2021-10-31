'use strict';


function uploadImg() {
    cleanLineRect();

    const imgDataUrl = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);

        showModal();

        document.querySelector('.facebook-box').innerHTML = `
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        <img class="social-logo" src="icons/facebook-logo.png">
        </a>`;

        document.querySelector('.whatsapp-box').innerHTML = `
        <a href="https://api.whatsapp.com/send?text=${encodedUploadedImgUrl}" title="Share on Whatsapp" target="_blank" onclick="window.open('https://api.whatsapp.com/send?text=${uploadedImgUrl}'); return false;">
        <img class="social-logo" src="icons/whatsapp-logo.png">
        </a>`;

        document.querySelector('.twitter-box').innerHTML = `
        <a href="https://twitter.com/intent/tweet?url=${encodedUploadedImgUrl}" title="Share on Twitter" target="_blank" onclick="window.open('https://twitter.com/intent/tweet?url=${uploadedImgUrl}'); return false;">
        <img class="social-logo" src="icons/twitter-logo.png">
        </a>`;
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

function initWebShareApi() {
    const elWebApiBtn = document.querySelector('.web-api-btn');
    const elOverlay = document.querySelector('.overlay');
    const title = window.document.title;
    var url = window.document.location.href;
    elWebApiBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: `${title}`,
                url: `${url}`
            })
        }
    })
    elOverlay.addEventListener('click', () => { closeModal() });
}

function showModal() {
    const elOverlay = document.querySelector('.overlay');
    const elShareModal = document.querySelector('.share-modal');
    elOverlay.style.visibility = 'visible';
    elShareModal.classList.add('show-share-modal');
}

function closeModal() {
    const elOverlay = document.querySelector('.overlay');
    const elShareModal = document.querySelector('.share-modal');
    elOverlay.style.visibility = 'hidden';
    elShareModal.classList.remove('show-share-modal');
}