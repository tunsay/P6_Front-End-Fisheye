// créé un array pour stocker les médias
let mediaFilter = [];
//Get the photograph with id as parameters (which able to find the photograpeer thanks to the function find())
async function getPhotographer(id) {

    const fetchPromise = await fetch("../../data/photographers.json");
    const photographersJSON = await fetchPromise.json();
    const photographers = photographersJSON['photographers'];
    return photographers.find(photographer => photographer.id == id)
}

//Get all medias with id of the photographer as parameters
async function getMedia(idPhotographer) {
    const fetchPromise = await fetch("../../data/photographers.json");
    const mediasJSON = await fetchPromise.json();
    mediaFilter = mediasJSON.media.filter((e) => e.photographerId == idPhotographer);
    //filtre et store dans un array les média selon l'id du photographe    
    return mediasJSON.media.filter((e) => e.photographerId == idPhotographer);
}

//This function will display the photographer info in the header AND display the name in the contact modal
async function displayPhotographer(photographer) {
    const photographerHeader = document.querySelector(".photographer-header");
    const contactModal = document.querySelector(".photographerName");
    const photographerModelHeader = photographerFactory(photographer, 'header');
    const photographerModelModal = photographerFactory(photographer, 'modal');
    const userCardDOMHeader = photographerModelHeader.getUserCardDOM();
    photographerHeader.appendChild(userCardDOMHeader);
    const userCardDOMModal = photographerModelModal.getUserCardDOM();
    contactModal.appendChild(userCardDOMModal);
}

//Display Likes ans Price in the bar orange down and right (photographer: pick prices of the photographers, totalLike: additionate all likes of all medias)
async function displayPriceAndLikePhotographer(photographer, totalLike) {
    const infoBar = document.querySelector(".photographer-like-prices-bar");
    const infoLeft = document.querySelector(".infos-left");
    const photographerModel = photographerFactory(photographer, 'info-bar');
    const userCardDOM = photographerModel.getUserCardDOM();
    infoLeft.append(totalLike + " ♥");
    infoBar.appendChild(userCardDOM);
}

//display Media on the page of the photographer selectionate at previously
async function displayMedia(medias) {
    const mediaGallery = document.querySelector(".media-gallery");
    medias.forEach(media => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaGallery.appendChild(mediaCardDOM);
    });

    playVideoHover();

}

//Play video when the mouse hover the media
function playVideoHover() {
    const videos = document.querySelectorAll('.video-media');

    videos.forEach(video => {
        video.addEventListener('mouseover', () => {
            video.play();
        });

        video.addEventListener('mouseout', () => {
            video.pause();
        });

    });
}

async function displayTotalLikesByPhotographer(id) {
    const fetchPromise = await fetch("../../data/photographers.json");
    const mediasJSON = await fetchPromise.json();
    const medias = mediasJSON.media.filter((e) => e.photographerId == id);
    let totalLikes = 0;
    console.log(medias[0].likes);
    console.log(medias.length);
    for (let i = 0; i < medias.length; i++) {
        const media = medias[i];
        totalLikes = totalLikes + media.likes
    }
    console.log("like définitive : " + totalLikes)
    return totalLikes;
}












function createLightbox(medias, id) {
    //récupère et store l'index de chaque media selon son id
    let photoID = medias.findIndex(media => media.id === id);

    function displayLightbox() {
        //lightbox structure elements
        const lightboxModal = document.getElementById('lightbox_modal');
        const lightboxFigure = document.querySelector('.lightbox-item');
        const btnPrev = document.querySelector('.btn-prev');
        const btnNext = document.querySelector('.btn-next');
        //lightbox structure elements to create
        const mediaTitle = document.createElement('div');
        const lightboxVideo = document.createElement("video");
        const lightboxImage = document.createElement('img');
        //Add class
        mediaTitle.className = "lightbox-media-title";
        lightboxVideo.className = "lightbox-video";
        lightboxImage.className = "lightbox-img";
        //lightbox buttons
        //removes display none
        lightboxModal.classList.remove('hidden');

        contactButton.setAttribute("tabindex", "-1");
        logo.setAttribute("tabindex", "-1");

        let galleryLinks = document.querySelectorAll('.link-media');

        galleryLinks.forEach(element => {
            element.tabIndex = -1;
        })

        //gestion de l'affichage des médias selon leur type
        if (medias[photoID].image) {
            lightboxImage.setAttribute("alt", `${medias[photoID].title}, closeup view`);
            lightboxImage.setAttribute("src", `../assets/medias/${medias[photoID].image}`);
            mediaTitle.textContent = `${medias[photoID].title}`;

            lightboxFigure.append(lightboxImage, mediaTitle);
        } else if (medias[photoID].video) {
            lightboxVideo.setAttribute("alt", `${medias[photoID].title}, closeup view`);
            lightboxVideo.setAttribute("src", `../assets/medias/${medias[photoID].video}`);
            lightboxVideo.setAttribute("controls", true);
            mediaTitle.textContent = `${medias[photoID].title}`;

            lightboxFigure.append(lightboxVideo, mediaTitle);
        }
    }
    return { displayLightbox };
}


//LIGHTBOX OPEN & CLOSE FUNCTIONS
function openLightbox(id) { //appelée dans mediaFactory.js
    const lightboxModal = document.getElementById('lightbox_modal');
    lightboxModal.setAttribute("aria-hidden", 'false');
    const lightbox = createLightbox(mediaFilter, id);
    lightbox.displayLightbox();
}
function closeLightbox() { //appelée dans le html onclick & dans lightboxFactory.js
    const lightboxModal = document.getElementById('lightbox_modal');
    lightboxModal.classList.add('hidden');
    lightboxModal.setAttribute("aria-hidden", 'true');
    const lightbox = document.querySelector('.lightbox-item');
    lightbox.innerHTML = "";

    contactButton.tabIndex = 0;
    logo.tabIndex = 0

    let galleryLinks = document.querySelectorAll('.link-media');

    galleryLinks.forEach(element => {
        element.tabIndex = 0;
    })

    //events pour la navigation au clavier dans la lightbox
    document.addEventListener('keyup', (event) => {
        //vérifie que la lightbox est ouverte
        if (lightboxModal.ariaHidden === "false") {
            switch (event.key) {
                case 'Escape':
                    closeLightbox(); //fonction définie dans photographer.js
                    break;
            }
            event.preventDefault();
        }
    });
}
















async function init() {
    //get the search params from the url
    var searchParams = new URLSearchParams(window.location.search);
    var photographerId = searchParams.get("id");
    //Get the photographer by having previously passed the Id of the Url Parameters
    const photographer = await getPhotographer(photographerId);
    const media = await getMedia(photographerId);
    console.log(media);
    displayPhotographer(photographer);
    const totalLike = await displayTotalLikesByPhotographer(photographerId);
    displayPriceAndLikePhotographer(photographer, totalLike);
    displayMedia(media);
}

init()

