// éléments du formulaire
const main = document.querySelector('main');
const header = document.querySelector('header');
const modal = document.getElementById("contact_modal");
const form = document.querySelector('form');
// background elements
const contactButton = document.querySelector('.contact_button');

function displayModal() {
    modal.classList.add('modal-open'); // rend la modale visible
    modal.setAttribute("aria-hidden", "false");
    main.classList.add('fade-out'); // réduit l'opacité du main dans le background
    header.classList.add('fade-out'); // réduit l'opacité du header dans le background
    //prevent focus on backgroud elements on tab press
    contactButton.setAttribute("tabindex", "-1");
}

function closeModal() {
    modal.classList.remove('modal-open');
    modal.setAttribute("aria-hidden", "true");
    main.classList.remove('fade-out');
    header.classList.remove('fade-out');
    //makes elements focusable again
    contactButton.tabIndex = 0;
}

// fermeture de la modale au clavier avec échap
document.addEventListener('keyup', (event) => {
    //vérifie que la modale est ouverte
    if (modal.classList.contains('modal-open')) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }    
});

//listener à l'envoi du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault(); // prévient l'envoi

    //récupère le contenu des inputs
    let firstName = document.getElementById('name').value;
    let lastName = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    //log les contenus dans la console
    console.log("Prénom: " + firstName);
    console.log("Nom: " + lastName);
    console.log("Email: " + email);
    console.log("Message: " + message);
})
