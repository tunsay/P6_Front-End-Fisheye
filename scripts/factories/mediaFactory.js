function mediaFactory(data, type) {
    const { id, photographerId, title, likes } = data;

    // défini l'url à utiliser selon le type de média
    let urlMedia;
    if (data.video) {
        urlMedia = data.video;
    } else {
        urlMedia = data.image;
    }
    const mediaUrl = `/assets/medias/${urlMedia}`;

    function getMediaCardDOM() {

        //Create element
        const article = document.createElement('article');
        const span = document.createElement('span');
        const linkMedia = document.createElement('a');
        const mediaPicture = document.createElement('img');
        const mediaVideo = document.createElement('video');
        const iconHeart = document.createElement('i');
        const source = document.createElement('source');
        const infoMedia = document.createElement('div');
        const titleMediaDOM = document.createElement('span');
        const likeMediaDOM = document.createElement('span');
        //add classes in the element selectionate
        infoMedia.classList.add('info-media');
        titleMediaDOM.classList.add('name-media');
        likeMediaDOM.classList.add('like-media');
        iconHeart.classList.add('fa-solid', 'fa-heart'); //<i></i>
        mediaVideo.classList.add('video-media'); //<video></video>
        linkMedia.classList.add('link-media'); //<a></a>
        //add attributes, class and container of each element
        mediaPicture.setAttribute("src", mediaUrl);
        mediaPicture.setAttribute("alt", title);
        mediaVideo.setAttribute("muted", "muted");
        mediaVideo.setAttribute("webkit-playsinline", "true");
        mediaVideo.setAttribute("playsinline", "true");
        mediaVideo.setAttribute("loop", "");
        mediaVideo.setAttribute("tabindex", "-1");
        source.setAttribute("src", mediaUrl);
        source.setAttribute("type", "video/mp4");
        iconHeart.setAttribute("aria-label", "like")
        linkMedia.setAttribute("href", mediaUrl);
        linkMedia.setAttribute("aria-label", `open ${title} in a lightbox`);
        linkMedia.setAttribute("tabindex", "0");

        //open the lightbox while clicking the link media
        linkMedia.addEventListener('click', (event) => {
            event.preventDefault(); // prevent the link to open by default
            openLightbox(id); //(id of the photo) displays the image corresponding to the id in the lightbox
        })
        //open lightbox on keyboard with enter on image link
        linkMedia.addEventListener('keypress', (event) => {
            event.preventDefault();
            if (event.key === "Enter") {
                openLightbox(id);
            }
        })

        let likeCount = likes;
        let mediaIsLiked = false;

        //Click in the icon the like the media
        iconHeart.addEventListener('click', () => {
            if (mediaIsLiked == false) { //Check before all if the media is liked or not
                likeMediaDOM.textContent = likeCount + 1 + " "; //Increment the like counter
                iconHeart.classList.add('liked'); //Set the class "liked" when clicked
                let totalLikes = document.querySelector('.total-likes'); //Select the totalikes like in the corner right for increment him too
                totalLikes.textContent = parseInt(totalLikes.textContent) + 1 + " "; // increment the total likes
                likeMediaDOM.append(iconHeart); //Put the icon
            } else { //If the media is already liked, bifurque in else
                likeMediaDOM.textContent = likeCount + " ";
                iconHeart.classList.remove('liked');
                let totalLikes = document.querySelector('.total-likes');
                totalLikes.textContent = parseInt(totalLikes.textContent) - 1 + " ";
                likeMediaDOM.append(iconHeart);
            }
            mediaIsLiked = !mediaIsLiked; //switch to true
        });

        // Push the key "L" to like the media
        linkMedia.addEventListener('keydown', (event) => {
            if (event.key === "l") {
                if (mediaIsLiked == false) { 
                    likeMediaDOM.textContent = likeCount + 1 + " ";
                    iconHeart.classList.add('liked');
                    let totalLikes = document.querySelector('.total-likes');
                    totalLikes.textContent = parseInt(totalLikes.textContent) + 1 + " ";
                    likeMediaDOM.append(iconHeart);
                } else {
                    likeMediaDOM.textContent = likeCount + " ";
                    iconHeart.classList.remove('liked');
                    let totalLikes = document.querySelector('.total-likes');
                    totalLikes.textContent = parseInt(totalLikes.textContent) - 1 + " ";
                    likeMediaDOM.append(iconHeart);
                }
                mediaIsLiked = !mediaIsLiked; 
            }
        });

        //display information in Html
        titleMediaDOM.textContent = title;
        likeMediaDOM.textContent = likes + " ";

        if (type === "Miniature") {
            if (data.image) {
                span.appendChild(iconHeart);
                likeMediaDOM.appendChild(span);
                infoMedia.append(titleMediaDOM, likeMediaDOM);
                linkMedia.appendChild(mediaPicture);
                article.append(linkMedia, infoMedia);
                return (article);
            } else if (data.video) {
                span.appendChild(iconHeart);
                likeMediaDOM.appendChild(span);
                infoMedia.append(titleMediaDOM, likeMediaDOM);
                mediaVideo.appendChild(source);
                linkMedia.appendChild(mediaVideo)
                article.append(linkMedia, infoMedia);
                return (article);
            }
        }

        if (type === "Lightbox") {
            if (data.image) {
                mediaPicture.setAttribute("alt", `a close view of ${title}`);
                mediaPicture.setAttribute("tabindex", "0");
                article.append(mediaPicture, titleMediaDOM)
                return (article);
            } else if (data.video) {
                mediaVideo.setAttribute("autoplay", "");
                mediaVideo.appendChild(source);
                article.append(mediaVideo, titleMediaDOM)
                return (article);
            }
        }
    }
    return { id, photographerId, title, likes, getMediaCardDOM }
}