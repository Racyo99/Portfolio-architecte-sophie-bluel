// On récupère nos éléments
var modal_open = document.getElementById("modal-open");
var modal_close = document.getElementById("modal-close");
var modal_button_add_work = document.getElementById("modal-button-add-work");
var modal_works_list = document.getElementById("modal-works-list");
var modal_works_add = document.getElementById("modal-works-add");
var modal_previous = document.getElementById("modal-previous");
var modal_add_image = document.getElementById("modal-add-image");
var modal_button_save_work = document.getElementById("modal-button-save-work");

// Executing JS code when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Handling modal opening
  document
    .getElementById("modal-open")
    .addEventListener("click", function (event) {
      event.preventDefault();
      // @todo : passer le .modal en display block (il doit être en display none de base en CSS)
      modal_open.style.display = "none";
      if (getComputedStyle("modal-open").display != "block") {
        modal_open.style.display = "block";
      } else {
        modal_open.style.display = "none";
      }
    });

  // Handling modal closing
  document
    .getElementById("modal-close")
    .addEventListener("click", function (event) {
      event.preventDefault();
      // @todo : passer le .modal en display none
      modal_close.style.display = "none";
      if (getComputedStyle("modal-close").display != "block") {
        modal_close.style.display = "none";
      } else {
        modal_close.style.display = "none";
      }
    });

  // Handling modal content switch
  document
    .getElementById("modal-button-add-work")
    .addEventListener("click", function (event) {
      event.preventDefault();
      // @todo : passer le .modal-works-add en display block et le modal-works-list en display none
      if ((modal_works_add.style.display = "block")) {
        modal_works_list.style.display = "none";
      } else modal_works_add.style.display = "none";
    });

  // Handling modal content switch
  document
    .getElementById("modal-previous")
    .addEventListener("click", function (event) {
      event.preventDefault();
      // @todo : passer le .modal-works-list en display block et le modal-works-add en display none
      if ((modal_works_list.style.display = "block")) {
        modal_works_add.style.display = "none";
      } else modal_works_list.style.display = "none";
    });

  // Uploading file
  document
    .getElementById("modal-add-image")
    .addEventListener("click", function (event) {
      //event.preventDefault();
      // @todo
    });

  // Sending new work to API backend
  document
    .getElementById("modal-form-new-work")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const token = localStorage.getItem('token');
      console.log(token);
      // @todo
      const formData = new FormData(event.target);
      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {Authorization: `Bearer ${token}`},
        body: formData,
      })
        
    });

  //--------------

fetch("http://localhost:5678/api/works")
.then(function(result) {
	return result.json();
})
.then(function(value) {
	value.forEach((work) => {

		// Create elements
		var div = document.createElement('div');
		var img = document.createElement('img');
		var figcaption = document.createElement('figcaption');

	
		// Set attributes for image
		img.setAttribute('src', work.imageUrl);
		img.setAttribute('alt', work.title);
		img.setAttribute('crossorigin', "anonymous");

		// Set attribute for figcaption
		figcaption.innerText = work.title

		div.appendChild(img);
		div.appendChild(figcaption);

		// Add the projects in the DOM
		document.querySelector('#modal-gallery-works').appendChild(div);
	})
})
.catch(function(err) {
	console.log(err);
});


});