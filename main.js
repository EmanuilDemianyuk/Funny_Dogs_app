import { RenderComponents } from "./Classes/RenderComponents.js";
import { RequestManager } from "./Classes/RequestManager.js";
import { LocalStorageExplorer } from "./Classes/LocalStorageExplorer.js";
import { Remover } from "./Classes/Remover.js";
import { photoURL } from "./URL/constURL.js";
import { LIKED_PHOTOS_KEY,
         DISLIKE_PHOTOS_KEY,
         COMMENT_PHOTOS_KEY,
         DOWNLOAD_PHOTOS_KEY } from "./Keys/constKeysToLocalStorage.js";    

// Client Code

document.addEventListener('DOMContentLoaded', async () => {
    let countLoadedPhoto = 13;
    let addressImg = "";
    const likeCounter = document.querySelector("span.counterLikes");
    const dislikeCounter = document.querySelector("span.counterDislikes");
    const mainContainer = document.querySelector('div.mainContainer');
    const main = document.querySelector('div.main');
    try{
        const renderComponents = new RenderComponents(
            mainContainer, 
            document.querySelector('div.btnNav'));
        
        renderComponents.renderInf(
            LocalStorageExplorer.setJsonData(
                DOWNLOAD_PHOTOS_KEY,
                RequestManager.requestOperation(photoURL, countLoadedPhoto)))

        main.addEventListener('click', e => {
            countLoadedPhoto = +document.getElementById("amountDownloadPhotos").value || 13;

            if(e.target.classList.value === 'btnNext') {
                Remover.removeAllHTMLElement(mainContainer)
                LocalStorageExplorer.removeKey(DOWNLOAD_PHOTOS_KEY);
                renderComponents.renderInf(
                    LocalStorageExplorer.setJsonData(
                        DOWNLOAD_PHOTOS_KEY,
                        RequestManager.requestOperation(photoURL, countLoadedPhoto)))

                Remover.removeHTMLElement(document.querySelector('button.btnNext'))
            }
            
            if(e.target.classList.value === 'likesNav like') {
                LocalStorageExplorer.setArrayResponseData(
                    LIKED_PHOTOS_KEY,
                    "like",
                    e.target.parentElement.parentElement.children[0].dataset.address,
                    LocalStorageExplorer.getKey(LIKED_PHOTOS_KEY)
                )
                likeCounter.textContent = JSON.parse(LocalStorageExplorer.getKey(LIKED_PHOTOS_KEY)).length;
            }
            if(e.target.classList.value === 'likesNav disLike') {
                LocalStorageExplorer.setArrayResponseData(
                    DISLIKE_PHOTOS_KEY, 
                    "disLike",
                    e.target.parentElement.parentElement.children[0].dataset.address,
                    LocalStorageExplorer.getKey(DISLIKE_PHOTOS_KEY)
                )
                dislikeCounter.textContent = JSON.parse(LocalStorageExplorer.getKey(DISLIKE_PHOTOS_KEY)).length
            }
            if(e.target.classList.value === 'comment') {
                mainContainer.classList.toggle("blurEl");
                renderComponents.renderModalWindow(main)
                addressImg = e.target.parentElement.parentElement.children[0].dataset.address;
                mainContainer.style.pointerEvents = 'none';
            }

            if(e.target.classList.value === "sendBtn") {
                LocalStorageExplorer.setArrayResponseData(
                    COMMENT_PHOTOS_KEY,
                    document.getElementById('textAreaModalWindows').value.trim() || 'undefined',
                    addressImg,
                    LocalStorageExplorer.getKey(COMMENT_PHOTOS_KEY)
                )
                Remover.removeHTMLElement(e.target.parentElement.parentElement.parentElement);
                mainContainer.classList.toggle("blurEl");
                mainContainer.style.pointerEvents = 'inherit';
            }
            if(e.target.classList.value === "closeModal") {
                Remover.removeHTMLElement(e.target.parentElement.parentElement.parentElement);
                mainContainer.classList.toggle("blurEl");
                mainContainer.style.pointerEvents = 'inherit';
            }
        })
    }
    catch(e){
        console.log(e)
    }
})