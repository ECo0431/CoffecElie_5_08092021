
const urlApi = "http://localhost:3000/api/teddies";

apiHome();
apiProducts();
apiListCoul();
afficheProducts();
afficheForm();
compteurPanier();

//// Récup datas API plus ajouts des datas sur page d'accueil
function apiHome(){
    fetch(urlApi)
    .then(response => test = response.json())
    .then(data =>{
    for(let i = 0; i < data.length; i++){
    document.querySelector(".sections").innerHTML += 
    `<section class="card card-articles" id="articles-`+i+`" style="width: 18rem;">`+
        `<img class="card-img-top" src="`+data[i].imageUrl+`" alt="Card image cap">`+
        `<div class="card-body">`+
            `<h2 class="card-title">`+data[i].name+`</h2>`+
            `<p class="card-text">`+data[i].description+`</p>`+
            `<a class="btn btn-dark" id="btn-decouvrir-`+i+`">Découvrir</a>`+
        `</div>`+
    `</section>`  
    };
  });
};
//// Récup datas API plus ajouts des datas sur page produits
function apiProducts(){
    fetch(urlApi)
    .then(response => test = response.json())
    .then(data =>{
    for(let i = 0; i < data.length; i++){
    document.querySelector(".sections-products").innerHTML += 
    `<section class="card card-product none" id="product-`+i+`">`+
        `<img class="card-img-top imgs-products" src="`+data[i].imageUrl+`" alt="Card image cap">`+
        `<div class="card-body">`+
            `<h2 class="card-title">`+data[i].name+`</h2>`+
            `<p class="card-text">`+data[i].description+`</p>`+
            `<select class="form-select list-qte" aria-label="Default select example">`+
                `<option selected>Quantité</option>`+
                `<option value="1">1</option>`+
                `<option value="2">2</option>`+
                `<option value="3">3</option>`+
            `</select>`+
            `<select class="form-select list-coul" id="list-coul-`+i+`" aria-label="Default select example">`+  
            `<option selected>Couleurs</option>`+                
            `</select>`+
            `<a href="#" class="btn btn-dark" id="btn-ajout-`+i+`">Ajouter au panier</a>`+
        `</div>`+
    `</section>`
    };
  });
};
//// Récup datas API pour la liste des couleurs des produits
function apiListCoul(){
    fetch(urlApi)
    .then(response => test = response.json())
    .then(data =>{
        for(let i = 0; i < data.length; i++){
            let x = 0;
            while(x < data[i].colors.length){
                document.querySelector("#list-coul-"+i).innerHTML +=                      
                `<option value="1">`+data[i].colors[x]+`</option>`
                x++
            };   
        };
    });
};
//// Affiche le produits après un clique sur le bouton décourvir et masque tous les éléments card-articles
function afficheProducts(){
    fetch(urlApi)
    .then(response => test = response.json())
    .then(data =>{
    
        let click = 0;
    
        for(let i = 0; i < data.length; i++){
            const btnDecouvrir = new Array(); 
            btnDecouvrir[i] = document.querySelector("#btn-decouvrir-"+i);
            const product = new Array();
            product[i] = document.querySelector("#product-"+i)
            
    
            btnDecouvrir[i].addEventListener("click", ()=>{
                product[i].classList.remove("none")
                click++
    
                if(click > 0){
                    for(let i = 0; i < data.length; i++){
                        const cardArticle = new Array();
                        cardArticle[i] = document.querySelector("#articles-"+i);
                        cardArticle[i].classList.add("none");
                    };
                };
            });
        };
    });
};
//// Affiche le formulaire lors du clique sur l'icone panier et masque tous les éléments card-articles
function afficheForm(){
    const form = document.querySelector("form");
    const iconePanier = document.querySelector(".icone-panier");
    
    fetch(urlApi)
    .then(response => test = response.json())
    .then(data =>{
    let click = 0;
    
        iconePanier.addEventListener("click", ()=>{
            form.classList.remove("none");
            click++
            
            if(click > 0){
                for(let i = 0; i < data.length; i++){
                    const cardArticle = new Array();
                    const product = new Array();
                    cardArticle[i] = document.querySelector("#articles-"+i);
                    cardArticle[i].classList.add("none");
                    product[i] = document.querySelector("#product-"+i);
                    product[i].classList.add("none")
                };
            };
        });
    });
};


function compteurPanier(){
    fetch(urlApi)
    .then(response => test = response.json())
    .then(data =>{
        const compteur = document.querySelector(".compteur");
        const btnAjout = new Array();
        let total = 0;
    
        for(let i = 0; i < data.length; i++){
            btnAjout[i] = document.querySelector("#btn-ajout-"+i);  
            
            btnAjout[i].addEventListener("click", () =>{
                let i = 0;

                i++;
                total = total + i;

                localStorage.setItem("compteur", total);
                let test = localStorage.getItem("compteur");

                console.log(test);

                compteur.innerHTML = test;            
            });
        };
    });
};




