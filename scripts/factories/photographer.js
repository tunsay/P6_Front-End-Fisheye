function photographerFactory(data, type) {
    const { name, id, portrait, city, country, tagline, price } = data;

    //Get the profil picture
    const picture = `assets/photographers/${portrait}`;
    //Get link of the photographer select
    const link = `photographer.html?id=${id}`;

    function getUserCardDOM() {

        //Create element
        const article = document.createElement('article'); // create <article></article>
        const a = document.createElement('a'); //create <a></a>
        const h2 = document.createElement('h2');
        const img = document.createElement('img');
        const namesDOM = document.createElement('h2');
        const cityCountryDOM = document.createElement('div');
        const taglineDOM = document.createElement('div');
        const priceDOM = document.createElement('div');
        const photographerInfo = document.createElement('div');
        

        //Add Classes in the element selectionate
        cityCountryDOM.classList.add('city-and-country');
        taglineDOM.classList.add('tagline');
        priceDOM.classList.add('price');
        img.classList.add('photographer-picture');
        photographerInfo.classList.add('photographer-info');

        // Add attributs, class and container of each element
        img.setAttribute("src", picture);
        img.setAttribute("alt", `portrait de ${name}`)
        a.setAttribute("href", link);

        //display information in HTML
        namesDOM.textContent = name;
        cityCountryDOM.textContent = city + ", " + country;
        taglineDOM.textContent = tagline;
        priceDOM.textContent = price + "€/jour";


        if (type === 'index') { // utilisé pour la page d'index
            article.append(a, namesDOM, cityCountryDOM, taglineDOM, priceDOM);
            a.appendChild(img);
            return (article)
        } else if (type === 'header') {
            article.append(photographerInfo, img)
            photographerInfo.append(namesDOM, cityCountryDOM, taglineDOM);
            return (article)
        } else if (type === 'modal') {
            // h2.append(namesDOM);
            return (namesDOM);
        }
    }
    return { name, portrait, city, country, tagline, price, id, getUserCardDOM }
}