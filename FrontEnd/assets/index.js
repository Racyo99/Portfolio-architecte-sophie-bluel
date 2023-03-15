// Méthode Fetch pour récupérer les travaux (works)
var gallery = document.getElementsByClassName("gallery")[0];

// Requête pour récupérer les travaux à partir de l'API

fetch("http://localhost:5678/api/works")

.then(function(response) {
  if(response.ok) {
    return response.json();
  }
})

.then(function (value) {
  value.forEach((elm) => {
    // Création des éléments
    var figure = document.createElement("figure");
    var img = document.createElement("img");
    var figcaption = document.createElement("figcaption")

    // Attributs des images
    img.setAttribute("src", elm.imageUrl);
    img.setAttribute("alt", elm.title);
    img.setAttribute("crossorigin", "anonymous");

    // Attribut figcaption
    figcaption.innerText = elm.title;

    // utilisation de appendChild pour ajouter des enfants à la balise "figure"
    figure.appendChild(img);
    figure.appendChild(figcaption);

    // Ajoute les éléments dans le DOM
    gallery.appendChild(figure);
  });
 
})

.catch(function(err) {
  console.log(err);
});

