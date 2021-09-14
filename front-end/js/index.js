
const URLAPI = "http://localhost:3000/api/teddies";

apiHome();
apiProducts();
apiListCoul();
afficheProducts();
afficheForm();
ajoutArticle();


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
            `<input type="number" id="qte-`+i+`" name="qte-" min="1" max="99" value="1">`+
            `<select class="form-select list-coul" id="list-coul-`+i+`" aria-label="Default select example">`+               
            `</select>`+
            `<div class="box-btn-prix">`+
            `<a href="#" class="btn btn-dark" id="btn-ajout-`+i+`">Ajouter au panier</a>`+
            `<p>`+data[i].price/100+` €</p>`+
            `</div>`+
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
                `<option value="`+x+`">`+data[i].colors[x]+`</option>`
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
            const BTNDECOUVRIR = new Array(); 
            BTNDECOUVRIR[i] = document.querySelector("#btn-decouvrir-"+i);
            const PRODUCT = new Array();
            PRODUCT[i] = document.querySelector("#product-"+i)
    
            BTNDECOUVRIR[i].addEventListener("click", ()=>{
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

//// Ajoute les articles dans le local storage
function ajoutArticle(){
    fetch(URLAPI)
    .then(response => test = response.json())
    .then(data =>{
    
        const BTNAJOUT = new Array();
        const QTE = new Array();
        const COUL = new Array();
        const COMPTEUR = document.querySelector(".compteur");
    
        for(let i = 0; i < data.length; i++){
            BTNAJOUT[i] = document.querySelector("#btn-ajout-"+i);
            QTE[i] = document.querySelector("#qte-"+i);
            COUL[i] = document.querySelector("#list-coul-"+i);
        };
    
        let produits = JSON.parse(localStorage.getItem("produits"));
    
        for(let i = 0; i < data.length; i++){
            BTNAJOUT[i].addEventListener("click", ()=>{
                const QTENUMBER = Number(QTE[i].value);
                
                let articles = {
                    id: data[i]._id,
                    name: data[i].name,
                    price: data[i].price,
                    totalPrice: data[i].price*QTE[i].value,
                    qte: QTENUMBER,
                    imageUrl: data[i].imageUrl,
                    coul: COUL[i].value
                };
                    
                if(produits){
                    produits.push(articles);
                    localStorage.setItem("produits", JSON.stringify(produits));
                }else{
                    produits = [];
                    produits.push(articles);
                    localStorage.setItem("produits", JSON.stringify(produits));
                };

                //Compteur Panier

                let qteTable = [];

                for(let i = 0; i < produits.length; i++){

                    let qtePanier = produits[i].qte;               
                    qteTable.push(qtePanier);
                };        
                
                const reducer = (acc, curr) => acc + curr;
                const totalQte = qteTable.reduce(reducer);
                COMPTEUR.innerHTML = totalQte;
            });
        };
    });
};

