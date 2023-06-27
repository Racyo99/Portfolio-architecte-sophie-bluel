// Request works from API
fetch("http://localhost:5678/api/works")
.then(function(result) {
	return result.json();
})
.then(function(value) {
	value.forEach((work) => {

		//console.log(work);

		// Create elements
		let figure = document.createElement('figure');
		let imgFigure = document.createElement('img');
		let figcaption = document.createElement('figcaption');

		// Ajout des classes pour figure
		figure.classList.add('work-item', `category-id-0`);
		figure.classList.add('work-item', `category-id-${work.categoryId}`);
		figure.setAttribute('id', `work-item-${work.id}`);

		// Set attributes for image
		imgFigure.setAttribute('src', work.imageUrl);
		imgFigure.setAttribute('alt', work.title);
		imgFigure.setAttribute('crossorigin', "anonymous");

		// Set attribute for figcaption
		figcaption.innerText = work.title

		figure.appendChild(imgFigure);
		figure.appendChild(figcaption);

		// Add the projects in the DOM
		document.querySelector('.gallery').appendChild(figure);
	})
})
.catch(function(err) {
	console.log(err);
});


// Requête vers l'API suivante :
fetch("http://localhost:5678/api/categories")
.then(function(result) {
	return result.json();
})
.then(function(categories) {

	//console.log(categories);

	// Adding category "Tous"
	categories.unshift({
		"id": 0,
		"name": "Tous"
	});

	// Creating categories
	categories.forEach(category => {
		let button = document.createElement('button');

		// Adding buttons filters
		button.innerText = category.name;
		if(category.id === 0) {
			button.setAttribute('class', 'work-filter work-filter-active');
		}
		else {
			button.setAttribute('class', 'work-filter');
		}
		button.setAttribute('data-filter', `category-id-${category.id}`);
		document.getElementById('filters').appendChild(button);

		// Adding popup select options
		if(category.id !== 0) {
			let option = document.createElement("option");
			option.setAttribute('value', category.id);
			option.textContent = category.name;
			document.querySelector('#modal-form-category').appendChild(option);
		}

		// Listening click events on filters
		button.addEventListener('click', function(event) {
			// Handling button state
			document.querySelectorAll('.work-filter').forEach(btn => {
				btn.classList.remove('work-filter-active');
			});
			button.classList.add('work-filter-active');
			// Handling works filtering
			let filteredCategoryId = button.getAttribute('data-filter');
			document.querySelectorAll('.work-item').forEach(workItem => {
				workItem.style.display = 'none';
			});
			document.querySelectorAll(`.work-item.${filteredCategoryId}`).forEach(workItem => {
				workItem.style.display = 'block';
			});
		});
	});
})
.catch(function(err) {
	console.log(err);
});

// Executing JS code when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
	// Handling admin / guest display
	if(localStorage.getItem('token') != null) {
		document.querySelector('body').classList.add('connected');
	}
	// Handling disconnection
	document.getElementById('nav-logout').addEventListener('click', function(event) {
		event.preventDefault();
		localStorage.removeItem('userId');
		localStorage.removeItem('token');
		location.href = "index.html";
	});
});
