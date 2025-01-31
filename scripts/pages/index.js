async function getPhotographers() {
    //get the datas of the json
    const response = await fetch('./data/photographers.json');

    const data = await response.json();
    // return datas photopgraphers
    return ({
        photographers: data.photographers
    })
}

//display datas of photographers
async function displayPhotographers(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    //create and display each article since factory
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer, 'index');
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // get datas of photographers
    const { photographers } = await getPhotographers();
    //display datas of photographers
    displayPhotographers(photographers);
};
//init ellen page
init();
