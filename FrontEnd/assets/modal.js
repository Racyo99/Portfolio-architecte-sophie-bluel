// On récupère nos éléments
var modal = document.getElementById('modal-works');
var modal_add = document.getElementById('modal-add')
var bouton_add_img = document.getElementById('button-add-img');
var bouton_valide = document.getElementById ('button-modal-add');

// attribution de la valeur "block"

modal.style.display = 'block'; 

// attribution de la valeur "none"

modal_add.style.display = 'none';


// Ajout de l'événement de clic sur le bouton ajout des images de la modale 
bouton_add_img.onclick = function(event){

    if( modal_add.style.display = 'none'){
        modal_add.style.display = 'block';
    }
    else modal.style.display = 'none';
    }

  

bouton_valide.onclick = function(event){
    if( modal.style.display = 'block'){
        modal.style.display = 'none';
    }
    else modal.style.display = 'block';
    }

