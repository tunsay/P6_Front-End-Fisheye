/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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
        }
        if (medias[photoID].video) {
            lightboxVideo.setAttribute("alt", `${medias[photoID].title}, closeup view`);
            lightboxVideo.setAttribute("src", `../assets/medias/${medias[photoID].video}`);
            lightboxVideo.setAttribute("controls", true);
            mediaTitle.textContent = `${medias[photoID].title}`;

            lightboxFigure.append(lightboxVideo, mediaTitle);
        }

        //events au clic sur les flèches droites et gauche
        btnNext.addEventListener('click', () => {
            //si l'index est inférieur à la longueur totale du tableau -1, passe à l'index suivant
            lightboxFigure.innerHTML = "";
            if (photoID < medias.length - 1) {
                photoID++;
            //sinon retourne au début
            } else {
                photoID = 0;
            }
            lightboxNavigation();
        })

        btnPrev.addEventListener('click', () => {
            //si l'index est supérieur à 0, va à l'index précédent
            lightboxFigure.innerHTML = "";
            if (photoID > 0) {
                photoID--;
            //sinon va au dernier index
            } else {
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
                        closeLightbox(); //fonction définie dans photographer.js
                        break;
                }
                event.preventDefault();
            }
        });
        //gestion des médias selon leur type pendant la navigation dans la lightbox
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
                lightboxVideo.setAttribute("controls", true);
            }
        }
    }
    return { displayLightbox };
}