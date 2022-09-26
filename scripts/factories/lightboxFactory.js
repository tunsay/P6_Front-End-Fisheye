function createLightbox(medias, id) {
    //récupère et store l'index de chaque media selon son id
    let photoID = medias.findIndex(media => media.id === id);

    function displayLightbox() {
        //lightbox structure elements
        const lightboxModal = document.getElementById('lightbox_modal');
        const lightboxFigure = document.querySelector('.lightbox-item');
        //lightbox structure elements to create
        const mediaTitle = document.createElement('div');
        const lightboxVideo = document.createElement("video");
        const lightboxImage = document.createElement('img');
        //Add classes
        mediaTitle.className = "lightbox-item-title";
        lightboxVideo.className = "lightbox-video";
        lightboxImage.className = "lightbox-img";
        //lightbox buttons
        const btnPrev = document.querySelector('.btn-prev');
        const btnNext = document.querySelector('.btn-next');
        //removes display none
        lightboxModal.classList.remove('hidden');
        //Disable the focusable of element
        contactButton.setAttribute("tabindex", "-1");
        logo.setAttribute("tabindex", "-1");

        let galleryLinks = document.querySelectorAll('.link-media');
        galleryLinks.forEach(element => {
            element.tabIndex = -1;
        })
        //prevent scrolling of the page
        document.body.style.overflow = "hidden";
        //management of the display of media according to their type
        if (medias[photoID].image) {
            lightboxImage.setAttribute("alt", `${medias[photoID].title}, closeup view`);
            lightboxImage.setAttribute("src", `../assets/medias/${medias[photoID].image}`);
            mediaTitle.textContent = `${medias[photoID].title}`;

            lightboxFigure.append(lightboxImage, mediaTitle);
        }
        if (medias[photoID].video) {
            lightboxVideo.setAttribute("alt", `${medias[photoID].title}, closeup view`);
            lightboxVideo.setAttribute("src", `../assets/medias/${medias[photoID].video}`);
            // lightboxVideo.setAttribute("controls", true);
            lightboxVideo.setAttribute("autoplay", "");
            mediaTitle.textContent = `${medias[photoID].title}`;

            lightboxFigure.append(lightboxVideo, mediaTitle);
        }

        //events clic arrow left and Right
        btnNext.addEventListener('click', () => {             
            lightboxFigure.innerHTML = ""; // erase the container of lightbox before
            //if the index is less than the total length of the array -1, go to the next index
            if (photoID < medias.length - 1) {
                photoID++;
            } else { //otherwise go the last index
                photoID = 0;
            }
            lightboxNavigation();
        })
        
        btnPrev.addEventListener('click', () => {
            lightboxFigure.innerHTML = ""; // erase the container of lightbox before
            //if index is greater than 0, go to previous index
            if (photoID > 0) {
                photoID--;
            } else { //otherwise go the last index
                photoID = medias.length - 1;
            }
            lightboxNavigation();
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
                        lightboxNavigation();
                        break;
                    case 'ArrowRight':
                        lightboxFigure.innerHTML = "";
                        if (photoID < medias.length - 1) {
                            photoID++;
                        } else {
                            photoID = 0;
                        }
                        lightboxNavigation();
                        break;
                    case 'Escape':
                        closeLightbox(); //function defined in photographer.js
                        break;
                }
                event.preventDefault();
            }
        });
        //management of media according to their type during navigation in the lightbox
        function lightboxNavigation() {
            mediaTitle.textContent = `${medias[photoID].title}`;
            if (medias[photoID].image) {
                lightboxFigure.append(lightboxImage, mediaTitle);
                lightboxImage.setAttribute("alt", `${medias[photoID].title} closeup view`);
                lightboxImage.src = `../assets/medias/${medias[photoID].image}`
                lightboxVideo.style.display = "none";
                lightboxImage.style.display = "block";
                lightboxVideo.src = "";
                lightboxVideo.removeAttribute("alt");
            } else if (medias[photoID].video) {
                lightboxFigure.append(lightboxVideo, mediaTitle);
                lightboxVideo.style.display = "block";
                lightboxImage.style.display = "none";
                lightboxImage.src = "";
                lightboxImage.removeAttribute("alt");
                lightboxVideo.setAttribute("alt", `${medias[photoID].title}`);
                lightboxVideo.src = `../assets/medias/${medias[photoID].video}`
                // lightboxVideo.setAttribute("controls", true);
                lightboxVideo.setAttribute("autoplay", "");
            }
        }
    }
    return { displayLightbox };
}