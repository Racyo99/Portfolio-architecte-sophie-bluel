// Executing JS code when the page is loaded
document.addEventListener("DOMContentLoaded", function() {

	// Gathering elements
	let modal = document.getElementById("modal");
	let modal_open = document.getElementById("modal-open");
	let modal_close = document.getElementById ("modal-close");
	let modal_button_add_work = document.getElementById("modal-button-add-work");
	let modal_works_list = document.getElementById("modal-works-list");
	let modal_works_add = document.getElementById("modal-works-add");
	let modal_previous = document.getElementById("modal-previous");
	let modal_add_image = document.getElementById("modal-add-image");
	let modal_button_save_work = document.getElementById("modal-button-save-work");

	// Handling modal opening
	modal_open.addEventListener('click', function(event) {
		modal.style.display = "block";
		// Request works from API
		fetch("http://localhost:5678/api/works")
		.then(function(result) {
			return result.json();
		})
		.then(function(value) {
			document.getElementById('modal-gallery-works').textContent = '';
			value.forEach((work) => {

				// Creating <div>
				let div = document.createElement('div');
				div.setAttribute('id', `gallery-works-item-${work.id}`);
				div.classList.add('gallery-works-item');

				// Creating <img>
				let img = document.createElement('img');
				let iconTrash = document.createElement('i');
				img.setAttribute('src', work.imageUrl);
				img.setAttribute('alt', work.title);
				img.setAttribute('crossorigin', "anonymous");

				iconTrash.className='fa-solid fa-trash-can trash-over';


				// Creating <span>
				let span = document.createElement('span');
				span.textContent = "éditer";

				// Creating CTA <i> move
				// @todo

				// Creating CTA <i> delete
				// @todo

				// Add elements to the DOM
				div.appendChild(img);
				div.appendChild(span);
				document.getElementById('modal-gallery-works').appendChild(div);
			})
		})
		.catch(function(err) {
			console.log(err);
		});
	});

	// Handling modal closing
	modal_close.addEventListener('click', function(event) {
		modal.style.display = "none";
		modal_previous.click();
	});

	// Handling modal closing by overlay
	modal.addEventListener('click', function(event) {
		if(event.target.classList.contains('modal')) {
			modal_close.click();
		}
	});

	// Handling modal content switch
	modal_button_add_work.addEventListener('click', function(event) {
		event.preventDefault();
		modal_works_list.style.display = "none";
		modal_works_add.style.display = "block";
	});

	// Handling modal content switch
	modal_previous.addEventListener('click', function(event) {
		event.preventDefault();
		modal_works_list.style.display = "block";
		modal_works_add.style.display = "none";
	});

	// Uploading file
	modal_add_image.addEventListener('click', function(event) {
		document.getElementById("modal-form-image").click();
	});

	// Sending new work to API backend
	modal_button_save_work.addEventListener('click', function(event) {
		event.preventDefault();
		let formData = new FormData();
		formData.append('title', document.getElementById('modal-form-title').value);
		formData.append('category', document.getElementById('modal-form-category').value);
		formData.append('image', document.getElementById('modal-form-image').files[0]);
		fetch('http://localhost:5678/api/works', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('token'),
			},
			body: formData
		})
		.then(function(response) {
			switch(response.status) {
				case 500:
				case 503:
					alert("Erreur inattendue!");
					break;
				case 400:
				case 404:
					alert("Impossible d'ajouter le nouveau projet!");
					break;
				case 200:
				case 201:
					console.log("Projet ajouté avec succés!");
					return response.json();
					break;
				default:
					alert("Erreur inconnue!");
					break;
			}
		})
		.then(function(json) {
			console.log(json);
			// @todo
		})
		.catch(function(err) {
			console.log(err);
		});
	});
});
