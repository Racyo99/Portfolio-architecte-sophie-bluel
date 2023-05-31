// On récupère les élements du formulaire
const form = document.querySelector('#login-form');
const email = document.querySelector('#login-form-email');
const password = document.querySelector('#login-form-password');

// On génère des événements et on empêche le compotement par défault
form.addEventListener('submit', function(event) {
	event.preventDefault();

	// On envoie au backend la requête POST avec les champs email / password
	fetch("http://localhost:5678/api/users/login", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"email": email.value.trim(),
			"password": password.value.trim()
		}),
	})
	.then(function(response) {
		switch(response.status) {
			case 500:
			case 503:
				alert("Erreur serveur");
			break;
			case 401:
			case 404:
				alert("Email ou password incorrect");
			break;
			case 200:
				console.log("Authentification OK");
				return response.json();
			break;
			default:
				alert("Erreur inconnue");
			break;
		}
	})
	.then(function(response) {
		localStorage.setItem('userId', response.userId);
		localStorage.setItem('token', response.token);
		location.href = "index.html";
	})
	.catch(function(err) {
		console.log(err);
	});
});
