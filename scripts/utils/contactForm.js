// form element
const body = document.querySelector('body');
const header = document.querySelector('header');
const modal = document.getElementById("contact_modal");
const sort = document.getElementById("sort-media-btn");
const form = document.querySelector('form');
// background elements
const contactButton = document.querySelector('.contact_button');
const logo = document.querySelector('.a-logo');

//this function display the modal
function displayModal() {
    modal.classList.add('modal-open'); // rend la modale visible
    modal.setAttribute("aria-hidden", "false");
    main.classList.add('fade-out'); // réduit l'opacité du main dans le background
    header.classList.add('fade-out'); // réduit l'opacité du header dans le background
    //prevent focus on backgroud elements on tab press
    contactButton.setAttribute("tabindex", "-1");
    logo.setAttribute("tabindex", "-1");
    sort.setAttribute("tabindex", "-1");
    //Prevent scrolling
    document.body.style.overflow = "hidden";
    
    let galleryLinks = document.querySelectorAll('.link-media');
    
    galleryLinks.forEach(element => {
        element.tabIndex = -1;
    })
}

//This function close the modal
function closeModal() {
    modal.classList.remove('modal-open');
    modal.setAttribute("aria-hidden", "true");
    main.classList.remove('fade-out');
    header.classList.remove('fade-out');
    //makes elements focusable again
    contactButton.tabIndex = 0;
    logo.tabIndex = 0;
    sort.tabIndex = 0;
    //Make element scrollable again
    document.body.style.overflow = "visible";
    
    let galleryLinks = document.querySelectorAll('.link-media');
    
    galleryLinks.forEach(element => {
        element.tabIndex = 0;
    })
}

// close the window with echap
document.addEventListener('keyup', (event) => {
    //check if the modal is open
    if (modal.classList.contains('modal-open')) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }    
});

//listener at the send of the form
form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent the send

    //récupère le contenu des inputs
    let firstName = document.getElementById('name').value;
    let lastName = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    //log the containers in the console
    console.log("Prénom: " + firstName);
    console.log("Nom: " + lastName);
    console.log("Email: " + email);
    console.log("Message: " + message);
})
