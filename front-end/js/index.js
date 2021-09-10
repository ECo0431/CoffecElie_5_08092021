
const URLAPI = "http://localhost:3000/api/teddies";


apiHome();
apiProducts();
apiListCoul();
afficheProducts();
afficheForm();
compteurPanier();


//// Récup datas API plus ajouts des datas sur page d'accueil
function apiHome(){
    fetch(URLAPI)
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
    fetch(URLAPI)
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
                `<option value="1"">1</option>`+
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
    fetch(URLAPI)
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
    fetch(URLAPI)
    .then(response => test = response.json())
    .then(data =>{
    
        let click = 0;
    
        for(let i = 0; i < data.length; i++){
            const BTNDECOUVIRI = new Array(); 
            BTNDECOUVIRI[i] = document.querySelector("#btn-decouvrir-"+i);
            const PRODUCT = new Array();
            PRODUCT[i] = document.querySelector("#product-"+i)
            
    
            BTNDECOUVIRI[i].addEventListener("click", ()=>{
                PRODUCT[i].classList.remove("none")
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
    const FORM = document.querySelector("form");
    const ICONEPANIER = document.querySelector(".icone-panier");
    
    fetch(URLAPI)
    .then(response => test = response.json())
    .then(data =>{
    let click = 0;
    
        ICONEPANIER.addEventListener("click", ()=>{
            FORM.classList.remove("none");
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

//// Icremente le compteur du panier après un clique sur le bouton ajouter au panier
function compteurPanier(){
    fetch(URLAPI)
    .then(response => test = response.json())
    .then(data =>{
        let compteur = document.querySelector(".compteur");
        const BTNAJOUT = new Array();
        let total = 0;
      
        for(let i = 0; i < data.length; i++){
            BTNAJOUT[i] = document.querySelector("#btn-ajout-"+i);  
        };

        BTNAJOUT[0].addEventListener("click", () =>{
            let iPanier = 0;
            iPanier++;
            total = total + iPanier;
            localStorage.setItem("compteurLocal-0", total);                    
            compteur.innerHTML = localStorage.getItem("compteurLocal-0");             
        });   

        BTNAJOUT[1].addEventListener("click", () =>{
            let iPanier = 0;
            iPanier++;
            total = total + iPanier;
            localStorage.setItem("compteurLocal-1", total);                
            compteur.innerHTML = localStorage.getItem("compteurLocal-1");  
        });

        BTNAJOUT[2].addEventListener("click", () =>{
            let iPanier = 0;
            iPanier++;
            total = total + iPanier;
            localStorage.setItem("compteurLocal-2", total);                
            compteur.innerHTML = localStorage.getItem("compteurLocal-2");    
        });   

        BTNAJOUT[3].addEventListener("click", () =>{
            let iPanier = 0;
            iPanier++;
            total = total + iPanier;
            localStorage.setItem("compteurLocal-3", total);                
            compteur.innerHTML = localStorage.getItem("compteurLocal-3");    
        });   

        BTNAJOUT[4].addEventListener("click", () =>{
            let iPanier = 0;
            iPanier++;
            total = total + iPanier;
            localStorage.setItem("compteurLocal-4", total);                
            compteur.innerHTML = localStorage.getItem("compteurLocal-4");  
        });   

        let compteurLocalS = new Array();
        let compteurLocalN = new Array();
        let compteurLocalTotal = 0;

        for(let i = 0; i < data.length; i++){
            compteurLocalS[i] = localStorage.getItem("compteurLocal-"+i);
            compteurLocalN[i] = Number(compteurLocalS[i]);
            compteurLocalTotal += compteurLocalN[i];
        }
              
        compteur.innerHTML = compteurLocalTotal;

        console.log(compteurLocalTotal);

    });
};

//// 
