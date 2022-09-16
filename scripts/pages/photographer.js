//Get the photograph with id as parameters (which able to find the photograpeer thanks to the function find())
async function getPhotographer(id) {

    const fetchPromise = await fetch("../../data/photographers.json");
    const photographersJSON = await fetchPromise.json();
    const photographers = photographersJSON['photographers'];
    return photographers.find(photographer => photographer.id == id)
}

//This function will display the photographer info in the header AND display the name in the contact modal
async function displayPhotographer(photographer) {
    const photographerHeader = document.querySelector(".photographer-header");
    const contactModal = document.querySelector(".photographerName");
    const photographerModelHeader = photographerFactory(photographer, 'header');
    const photographerModelModal = photographerFactory(photographer, 'modal');
    const userCardDOM = photographerModelHeader.getUserCardDOM();
    photographerHeader.appendChild(userCardDOM);
    const userCardDOM2 = photographerModelModal.getUserCardDOM();
    contactModal.appendChild(userCardDOM2);
}

// async function displayNamePhotographerInContactModal(photographer){
//     const contactModal = document.querySelector(".photographerName");
//     const photographerModel = photographerFactory(photographer, 'modal');
//     const userCardDOM = photographerModel.getUserCardDOM();
//     contactModal.appendChild(userCardDOM);
// }

async function displayPricePhotographer(photographer){
    const infoBar = document.querySelector (".photographer-like-prices-bar");
    const photographerModel = photographerFactory(photographer, 'info-bar');
    const userCardDOM = photographerModel.getUserCardDOM();
    infoBar.appendChild(userCardDOM);
}

async function init() {
    //get the search params from the url
    var searchParams = new URLSearchParams(window.location.search);
    //Get the photographer by having previously passed the Id of the Url Parameters
    const photographer = await getPhotographer(searchParams.get("id"));
    displayPhotographer(photographer);
    displayPricePhotographer(photographer);
    // displayNamePhotographerInContactModal(photographer);
}

init()

