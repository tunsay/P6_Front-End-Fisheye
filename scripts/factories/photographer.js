function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    const link = `photographer.html?id=${id}`;

    function getUserCardDOM() {
        // create <article></article>
        const article = document.createElement( 'article' );
        
        //create <a></a>
        const a = document.createElement('a');
        a.setAttribute("href", link);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const namesGet = document.createElement( 'h2' );

        const cityCountryGet = document.createElement('div');
        cityCountryGet.classList.add('city-and-country');

        const taglineDOM = document.createElement('div');
        taglineDOM.classList.add('tagline');
        
        const priceGet = document.createElement('div');
        priceGet.classList.add('price');

        //display information in HTML
        namesGet.textContent = name;
        cityCountryGet.textContent = city + ", " + country;
        taglineDOM.textContent = tagline;
        priceGet.textContent = price + "€/jour";

        //set Element with appendChild
        article.appendChild(a);
        a.appendChild(img);
        article.appendChild(namesGet);
        article.appendChild(cityCountryGet);
        article.appendChild(taglineDOM);
        article.appendChild(priceGet);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}