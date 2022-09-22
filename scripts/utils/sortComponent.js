function sortMedias(medias) {
  //sorting list elements
  const sortButton = document.getElementById('sort-media-btn');
  const sortList = document.getElementById('sort-list');
  const sortOption = document.querySelectorAll('li');
  //gallery element
  const mediaGallery = document.querySelector('.media-wrapper');

  //function pour afficher la liste d'options de tri
  function showSortList() {
      sortList.classList.toggle('hidden'); // enlève le display none
      sortButton.classList.toggle('clicked'); // change la direction de l'icône flèche
      if(sortList.classList.contains('hidden')){
        sortButton.setAttribute('aria-expanded', 'false');
      } else {
        sortButton.setAttribute('aria-expanded', 'true');
      }
  }

  //fonction pour fermer la liste de tri
  function closeSortList() {
    sortList.classList.add('hidden');
    sortButton.setAttribute('aria-expanded', 'false');
    sortButton.classList.remove('clicked');
  }

  //affiche la liste de tri au clic sur le bouton
  sortButton.addEventListener('click', () => {
    showSortList();
  })

  // tri des média au clic sur l'option
  sortOption.forEach(option => {
    option.addEventListener('click', (e) => {

      mediaGallery.innerHTML = ""; // vide le contenu de la galerie

      for (let option of sortOption) {
        option.classList.remove('focused');
        option.setAttribute("aria-selected", "false");
      }

      e.target.classList.add('focused'); //ajoute display none sur l'option séléctionnée pour la cacher de la liste d'options restantes
      e.target.setAttribute("aria-selected", "true");
      sortButton.innerText = e.target.innerText; //remplace le texte dans le bouton par le contenu texte de l'option séléctionnée
      sortList.setAttribute("aria-activedescendant", e.target.id); //remplace activedescendant de la liste par l'id de l'option séléctionnée

      let sortValue = e.target.innerText; // variable contenant le contenu texte de l'option cliquée
      switch (sortValue) { //défini le tri à appliquer selon le texte contenu
        case 'Titre' :
          sortByTitle();
          break;
        case 'Popularité' :
          sortByLikes();
          break;
        case 'Date' :
          sortByDate();
          break;
        }

      closeSortList(); // ferme la liste après un clic sur une option
      
      //affiche à nouveau la galerie avec le tri séléctionné appliqué
      medias.forEach((media) => {
        
        const galleryModel = mediaFactory(media);
        const mediaCardDOM = galleryModel.getMediaCardDOM();
        mediaGallery.appendChild(mediaCardDOM);
      }); 
    })
  })

  //tri des médias au clavier, en appuyant sur entrée sur une option
  sortOption.forEach(option => {
    option.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        mediaGallery.innerHTML = "";

        for (let option of sortOption) {
          option.classList.remove('focused');
          option.setAttribute("aria-selected", "false");
        }

        e.target.classList.add('focused');
        e.target.setAttribute("aria-selected", "true");
        sortButton.innerText = e.target.innerText;
        sortList.setAttribute("aria-activedescendant", e.target.id); 

        let sortValue = e.target.innerText;
        switch (sortValue) {
          case 'Titre' :
            sortByTitle();
            break;
          case 'Popularité' :
            sortByLikes();
            break;
          case 'Date' :
            sortByDate();
            break;
          }

        closeSortList();

        medias.forEach((media) => {
          
          const galleryModel = mediaFactory(media);
          const mediaCardDOM = galleryModel.getMediaCardDOM();
          mediaGallery.appendChild(mediaCardDOM);
        });
      }
    })
  })

  // fonction de tri par titre
  function sortByTitle() {
    medias.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    })
  }

  // fonction de tri par likes
  function sortByLikes() {
    medias.sort((a, b) => b.likes - a.likes);
  }

  // fonction de tri par date
  function sortByDate() {
    medias.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  }
}