//Get the photograph with id as parameters (which able to find the photograpeer thanks to the function find())
async function getPhotographer(id) {

    const fetchPromise = await fetch("../../data/photographers.json");
    const photographersJSON = await fetchPromise.json();
    const photographers = photographersJSON['photographers'];
    return photographers.find(photographer => photographer.id == id)
}

//Get all medias with id of the photographer as parameters
async function getMedia(idPhotographer) {
    // créé un array pour stocker les médias
    mediaFilter = [];
    const fetchPromise = await fetch("../../data/photographers.json");
    const mediasJSON = await fetchPromise.json();
    mediaFilter = mediasJSON.media.filter((e) => e.photographerId == idPhotographer);
    //filtre et store dans un array les média selon l'id du photographe    
    return mediasJSON.media.filter((e) => e.photographerId == idPhotographer);
}

//This function will display the photographer info in the header AND display the name in the contact modal
async function displayPhotographer(photographer) {
    try {
        const photographerHeader = document.querySelector(".photographer-header");
        const contactModal = document.querySelector(".photographerName");
        const photographerModelHeader = photographerFactory(photographer, 'header');
        const photographerModelModal = photographerFactory(photographer, 'modal');
        const userCardDOMHeader = photographerModelHeader.getUserCardDOM();
        photographerHeader.appendChild(userCardDOMHeader);
        const userCardDOMModal = photographerModelModal.getUserCardDOM();
        contactModal.appendChild(userCardDOMModal);
    } catch (error) {
        const contactButton = document.querySelector(".contact_button");
        const photographerHeader = document.querySelector(".photographer-header");
        contactButton.style.display = "none";
        photographerHeader.style.fontSize = "50px";
        photographerHeader.textContent = "Le contenu n'existe pas ou a été supprimé =(";
        document.title = "FishEye"
    }
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
    medias.map(media => {
        totalLikes += media.likes;
    });
    return totalLikes;
}

//Display Likes ans Price in the bar orange down and right (photographer: pick prices of the photographers, totalLike: additionate all likes of all medias)
async function displayPriceAndLikePhotographer(photographer, totalLike) {
    const infoBar = document.querySelector(".photographer-like-prices-bar");
    const infoLeft = document.querySelector(".infos-left");
    const photographerModel = photographerFactory(photographer, 'info-bar');
    const userCardDOM = photographerModel.getUserCardDOM();

    const span = document.createElement('span');
    const totalLikeSpan = document.createElement('span');
    const iconHeart = document.createElement('i');

    iconHeart.classList.add('fa-solid', 'fa-heart');
    totalLikeSpan.classList.add('total-likes');

    totalLikeSpan.textContent = totalLike + " ";

    span.appendChild(iconHeart);
    infoLeft.appendChild(totalLikeSpan);
    infoLeft.appendChild(span);
    infoBar.appendChild(userCardDOM);
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
    logo.tabIndex = 0;

    //make the page scrollable again
    document.body.style.overflow = "visible";

    let galleryLinks = document.querySelectorAll('.link-media');

    galleryLinks.forEach(element => {
        element.tabIndex = 0;
    })
}



async function init() {
    //get the search params from the url
    var searchParams = new URLSearchParams(window.location.search);
    var photographerId = searchParams.get("id");
    //Get the photographer by having previously passed the Id of the Url Parameters
    const photographer = await getPhotographer(photographerId);
    const media = await getMedia(photographerId);
    displayPhotographer(photographer);
    const totalLike = await displayTotalLikesByPhotographer(photographerId);
    displayPriceAndLikePhotographer(photographer, totalLike);
    displayMedia(media);
    document.title = photographer.name;
}

init()

