function mediaFactory(data) {
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
        const linkMedia = document.createElement('a');
        const mediaPicture = document.createElement('img');
        const mediaVideo = document.createElement('video');
        const source = document.createElement('source');
        const infoMedia = document.createElement('div');
        const titleMediaDOM = document.createElement('span');
        const likeMediaDOM = document.createElement('span');

        //add classes in the element selectionate
        infoMedia.classList.add('info-media');
        titleMediaDOM.classList.add('name-media');
        likeMediaDOM.classList.add('like-media');
        mediaVideo.classList.add('video-media');
        linkMedia.classList.add('link-media');

        //add attributes, class and container of each element
        mediaPicture.setAttribute("src", mediaUrl);
        mediaPicture.setAttribute("alt", title);
        mediaVideo.setAttribute("muted", "muted");
        mediaVideo.setAttribute("webkit-playsinline", "true");
        mediaVideo.setAttribute("playsinline", "true");
        mediaVideo.setAttribute("loop", "");
        source.setAttribute("src", mediaUrl);
        source.setAttribute("type", "video/mp4");

        //display information in Html
        titleMediaDOM.textContent = title;
        likeMediaDOM.textContent = likes + " ♥";


        if (data.image) {
            infoMedia.appendChild(titleMediaDOM);
            infoMedia.appendChild(likeMediaDOM);
            linkMedia.appendChild(mediaPicture);
            article.append(linkMedia, infoMedia);
            return (article);
        } else if (data.video) {
            infoMedia.appendChild(titleMediaDOM);
            infoMedia.appendChild(likeMediaDOM);
            mediaVideo.appendChild(source);
            linkMedia.appendChild(mediaVideo)
            article.append(linkMedia, infoMedia);
            return (article);
        }

    }
    return { id, photographerId, title, likes, getMediaCardDOM }
}