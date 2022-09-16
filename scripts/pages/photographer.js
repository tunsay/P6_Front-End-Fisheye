async function getPhotographer(id) {

    const fetchPromise = await fetch("../../data/photographers.json");
    const photographersJSON = await fetchPromise.json();
    const photographers = photographersJSON['photographers'];
    // console.log(photographers.find(photographer => photographer.id == id))
    return photographers.find(photographer => photographer.id == id)

}

async function displayPhotographer(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");
    // const photographerModal = document.querySelector(".modal");
    const photographerModel = photographerFactory(photographer, 'header');
    console.log(photographerModel);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographerHeader.appendChild(userCardDOM);
}

async function displayNamePhotographerInModal(photographer){
    const contactModal = document.querySelector(".photographerName");
    const photographerModel = photographerFactory(photographer, 'modal');
    const userCardDOM = photographerModel.getUserCardDOM();
    contactModal.appendChild(userCardDOM);
}

async function init() {
    //Display params in the Url
    var searchParams = new URLSearchParams(window.location.search);
    //Get the Params ("id")
    const photographer = await getPhotographer(searchParams.get("id"));
    console.log(photographer);
    displayPhotographer(photographer);
    displayNamePhotographerInModal(photographer);
}

init()

