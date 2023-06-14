// Executing JS code when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Gathering elements
  let modal = document.getElementById("modal");
  let modal_open = document.getElementById("modal-open");
  let modal_close = document.getElementById("modal-close");
  let modal_button_add_work = document.getElementById("modal-button-add-work");
  let modal_works_list = document.getElementById("modal-works-list");
  let modal_works_add = document.getElementById("modal-works-add");
  let modal_previous = document.getElementById("modal-previous");
  let modal_add_image = document.getElementById("modal-add-image");
  let modal_button_save_work = document.getElementById(
    "modal-button-save-work"
  );

  // Handling modal opening
  modal_open.addEventListener("click", function (event) {
    modal.style.display = "block";
    // Request works from API
    fetch("http://localhost:5678/api/works")
      .then(function (result) {
        return result.json();
      })
      .then(function (value) {
        document.getElementById("modal-gallery-works").textContent = "";
        value.forEach((work) => {
          // Creating <div>
          let div = document.createElement("div");
          div.setAttribute("id", `gallery-works-item-${work.id}`);
          div.setAttribute("work-id", work.id);
          div.classList.add("gallery-works-item");

          // Creating <img>
          let img = document.createElement("img");
          img.setAttribute("src", work.imageUrl);
          img.setAttribute("alt", work.title);
          img.setAttribute("crossorigin", "anonymous");
          div.appendChild(img);

          // Creating <span>
          let span = document.createElement("span");
          span.textContent = "éditer";
          div.appendChild(span);

          // Creating CTA <i> move
          let iconMove = document.createElement("i");
          iconMove.setAttribute(
            "class",
            "gallery-works-item-icon fa-solid fa-up-down-left-right"
          );
          div.appendChild(iconMove);

          // Creating CTA <i> delete
          let iconTrash = document.createElement("i");
          iconTrash.setAttribute(
            "class",
            "gallery-works-item-delete gallery-works-item-icon fa-regular fa-trash-can trash-over"
          );
          iconTrash.addEventListener("click", function (event) {
            event.preventDefault();
            let click_id = event.target.parentNode.getAttribute("work-id"); // ID de l'image
            console.log("Supprime l'id : " + click_id);
            // @toDelete! Faire un fetch en copiant collant un autre déjà fait et l'adapter

            fetch("http://localhost:5678/api/works/" + click_id, {
              method: "DELETE",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
              .then(function (result) {
                return result.json();
              })

              .then(function (response) {
                switch (response.status) {
                  case 500:
                  case 503:
                    console.error("Erreur inattendue!");
                    break;
                  case 400:
                  case 404:
                    console.error("Impossible de supprimer le nouveau projet!");
                    break;
                  case 200:
                  case 201:
                    console.log("Projet supprimé avec succés!");
                    return response.json();
                    break;
                  default:
                    console.error("Erreur inconnue!");
                    break;
                }
              })
             
            // Récupérer l'ID 		=>		OK
            // Parcour le tableau récupéré (value).
            // Si "element_parcouru" est égal à "click_id"
            // Supprime la ligne (tout l'objet JSOn qui correspond à l'ID).

            // console.log(value);
          });

          div.appendChild(iconTrash);

          // Add elements to the DOM
          document.getElementById("modal-gallery-works").appendChild(div);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  // Handling modal closing
  modal_close.addEventListener("click", function (event) {
    modal.style.display = "none";
    modal_previous.click();
  });

  // Handling modal closing by overlay
  modal.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
      modal_close.click();
    }
  });

  // Handling modal content switch
  modal_button_add_work.addEventListener("click", function (event) {
    event.preventDefault();
    modal_works_list.style.display = "none";
    modal_works_add.style.display = "block";
  });

  // Handling modal content switch
  modal_previous.addEventListener("click", function (event) {
    event.preventDefault();
    modal_works_list.style.display = "block";
    modal_works_add.style.display = "none";
  });

  // Uploading file
  modal_add_image.addEventListener("click", function (event) {
    document.getElementById("modal-form-image").click();
  });

  // Sending new work to API backend
  modal_button_save_work.addEventListener("click", function (event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("title", document.getElementById("modal-form-title").value);
    formData.append(
      "category",
      document.getElementById("modal-form-category").value
    );
    formData.append(
      "image",
      document.getElementById("modal-form-image").files[0]
    );
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    })
      .then(function (response) {
        switch (response.status) {
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
      .then(function (json) {
        console.log(json);
        // @toImprove! Implémenter le HTML (en js) qui permet d'afficher le work dans la popup et dans le corps de la page à partir de ce que contient la variable json
        // @toImprove! Implémenter le HTML (en js) qui permet d'afficher le work dans la popup et dans le corps de la page à partir de ce que contient la variable json
        // @toImprove! Implémenter le HTML (en js) qui permet d'afficher le work dans la popup et dans le corps de la page à partir de ce que contient la variable json
        // @toImprove! Implémenter le HTML (en js) qui permet d'afficher le work dans la popup et dans le corps de la page à partir de ce que contient la variable json
        // createElement + setAttribute + appendChild

        // Creating <div>
        let div = document.createElement("div");
        div.setAttribute("id", `gallery-works-item-${work.id}`);
        div.setAttribute("work-id", work.id);
        div.classList.add("gallery-works-item");

        // Creating <img>
        let img = document.createElement("img");
        img.setAttribute("src", work.imageUrl);
        img.setAttribute("alt", work.title);
        img.setAttribute("crossorigin", "anonymous");
        div.appendChild(img);

        // Creating <span>
        let span = document.createElement("span");
        span.textContent = "éditer";
        div.appendChild(span);

        // Creating CTA <i> move
        let iconMove = document.createElement("i");
        iconMove.setAttribute(
          "class",
          "gallery-works-item-icon fa-solid fa-up-down-left-right"
        );
        div.appendChild(iconMove);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
});
