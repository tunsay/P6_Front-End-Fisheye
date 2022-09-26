async function getPhotographers() {

    //get the datas of the json
    const response = await fetch('../../data/photographers.json');
    if (response.status = 404) {
        const response = await fetch('P6_Front-End-Fisheye/./data/photographers.json');
    }
    
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
    console.log(photographers);
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer, 'index');
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // get datas of photographers
    const { photographers } = await getPhotographers();
    console.log(photographers);
    //display datas of photographers
    displayPhotographers(photographers);
};
//init ellen page
init();
