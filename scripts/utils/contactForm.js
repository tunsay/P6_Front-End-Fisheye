const modal = document.getElementById("contact_modal");
const form = document.querySelector('form');

function displayModal() {
    modal.classList.add('modal-open');
    modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
    modal.classList.remove('modal-open');
    modal.setAttribute("aria-hidden", "true");
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
