async function getPhotographers() {


    const urlFetch = fetch("../../data/photographers.json")
        .then(response => {
            if (response.ok) {
                let json = response.json();
                return json;
            } else if (response.status === 404) {
                return Promise.reject('error 404')
            } else {
                return Promise.reject('some other error: ' + response.status)
            }
        })
        .then(photographers => { return photographers })
        .catch(error => console.log('error is', error));


    // function load(url) {
    //     return new Promise(async function (resolve, reject) {
    //         // do async thing
    //         const res = await fetch(url)

    //         // your custom code
    //         console.log('Yay! Loaded:', url)

    //         // resolve
    //         resolve(res.json()) // see note below!
    //     })
    // }

    // const promise = load('../../data/photographers.json')

    // console.log(await promise);

    const photographersGet = await urlFetch;
    // const photographersGet = await fetchPromise.json();
    const photographers = photographersGet['photographers'];


    return ({
        photographers: [...photographers]
    })
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
