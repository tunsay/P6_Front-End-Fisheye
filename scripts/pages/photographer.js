//Get the photograph with id as parameters (which able to find the photograpeer thanks to the function find())
async function getPhotographer(id) {

    const fetchPromise = await fetch("./data/photographers.json");
    const photographersJSON = await fetchPromise.json();
    const photographers = photographersJSON['photographers'];
    return photographers.find(photographer => photographer.id == id)
}

//Get all medias with id of the photographer as parameters
async function getMedia(idPhotographer) {
    // créé un array pour stocker les médias
    mediaFilter = [];
    const fetchPromise = await fetch("./data/photographers.json");
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
        const mediaModel = mediaFactory(media, "Miniature");
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

// Adds up all the likes accumulated by the media. Passing the photographer's id as a parameter will filter all media based on the photographer
async function displayTotalLikesByPhotographer(id) {
    const fetchPromise = await fetch("./data/photographers.json");
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
    iconHeart.setAttribute("aria-label", "likes")
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

    sort.tabIndex = 0;
    contactButton.tabIndex = 0;
    logo.tabIndex = 0;

    //make the page scrollable again
    document.body.style.overflow = "visible";

    let galleryLinks = document.querySelectorAll('.link-media');

    galleryLinks.forEach(element => {
        element.tabIndex = 0;
    })
}

function createLightbox(medias, id) {
    //récupère et store l'index de chaque media selon son id
    let photoID = medias.findIndex(media => media.id === id);

    function displayLightbox() {
        //lightbox structure elements
        const lightboxModal = document.getElementById('lightbox_modal');
        const lightboxFigure = document.querySelector('.lightbox-item');
        //lightbox structure elements to create
        const mediaTitle = document.createElement('span');
        const lightboxVideo = document.createElement("video");
        //Add classes
        mediaTitle.className = "name-media";
        lightboxVideo.className = "video-media";
        //lightbox buttons
        const btnPrev = document.querySelector('.btn-prev');
        const btnNext = document.querySelector('.btn-next');
        //removes display none
        lightboxModal.classList.remove('hidden');
        //Disable the focusable of element
        contactButton.setAttribute("tabindex", "-1");
        logo.setAttribute("tabindex", "-1");
        sort.setAttribute("tabindex", "-1");

        let galleryLinks = document.querySelectorAll('.link-media');
        galleryLinks.forEach(element => {
            element.tabIndex = -1;
        })
        //prevent scrolling of the page
        document.body.style.overflow = "hidden";

        //HERE DISPLAY PHOTO OR VIDEO WITCH HID TITLE
        displayLightboxContainer();

        //events clic arrow left and Right
        btnNext.addEventListener('click', () => {
            lightboxFigure.innerHTML = ""; // erase the container of lightbox before
            //if the index is less than the total length of the array -1, go to the next index
            if (photoID < medias.length - 1) {
                photoID++;
            } else { //otherwise go the last index
                photoID = 0;
            }
            displayLightboxContainer()
        })

        btnPrev.addEventListener('click', () => {
            lightboxFigure.innerHTML = ""; // erase the container of lightbox before
            //if index is greater than 0, go to previous index
            if (photoID > 0) {
                photoID--;
            } else { //otherwise go the last index
                photoID = medias.length - 1;
            }
            displayLightboxContainer()
        })

        //events pour la navigation au clavier dans la lightbox
        document.addEventListener('keyup', (event) => {
            //vérifie que la lightbox est ouverte
            if (lightboxModal.ariaHidden === "false") {
                switch (event.key) {
                    case 'ArrowLeft':
                        lightboxFigure.innerHTML = "";
                        if (photoID > 0) {
                            photoID--;
                        } else {
                            photoID = medias.length - 1;
                        }
                        displayLightboxContainer()
                        break;
                    case 'ArrowRight':
                        lightboxFigure.innerHTML = "";
                        if (photoID < medias.length - 1) {
                            photoID++;
                        } else {
                            photoID = 0;
                        }
                        displayLightboxContainer()
                        break;
                    case 'Escape':
                        closeLightbox(); //function defined in photographer.js
                        break;
                }
                event.preventDefault();
            }
        });
        function displayLightboxContainer() {
            //Here put the photo or video with his title
            const mediaModelLightbox = mediaFactory(medias[photoID], "Lightbox");
            const mediaCardLightboxDOM = mediaModelLightbox.getMediaCardDOM();
            lightboxFigure.appendChild(mediaCardLightboxDOM);
        }
    }
    return { displayLightbox };
}

async function init() {
    //get the search params from the url
    var searchParams = new URLSearchParams(window.location.search);
    var photographerId = searchParams.get("id");
    //Get the photographer by having previously passed the Id of the Url Parameters
    const photographer = await getPhotographer(photographerId);
    const media = await getMedia(photographerId);
    displayPhotographer(photographer);
    // Get the total likes by this function
    const totalLike = await displayTotalLikesByPhotographer(photographerId);
    // It will display the price of the photographer and total likes alculte by the function displayTotalLikesByphotographer()
    displayPriceAndLikePhotographer(photographer, totalLike);
    sortMedias(media);
    displayMedia(media);
    document.title = photographer.name;
}

init()

