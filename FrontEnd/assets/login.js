fetch("http://localhost:5678/api/users/login")
.then(function(result) {
	return result.json();
 })

 // On récupère les élements du formulaire
const form = document.querySelector('myForm');
const email = document.querySelector('mail');
const password = document.querySelector('password');

// On génère des événements et on empêche le compotement par défault
form.addEventListener('submit', event =>{
    
    if(email.value.trim()= ""){
        let myError = document.getElementById('error-mail');
        myError.innerText = "Le champs email est requis";
        myError.style.color="red";
        event.preventDefault();
    } 

})
   
// // Fonctions
// function form_contain(){
//     // Obtenir toutes les valeurs des inputs
//     const emailValue = email.value.trim();
//     const passwordValue = password.value.trim();

//     // On vérifie le champ de l'email
//     if(emailValue === ""){
//         let message = "Le champ email est vide";
//         setError(email, message);
//     } 

// }

// function setError(elements, message){
//     const formContain = elements.parentElement;
//     const errorMail = formContain.querySelector('error_pwd');

//     // Ajout du message d'erreur
//     error_pwd.innerText = message;
//     error_pwd.style.color= 'red';
// }


