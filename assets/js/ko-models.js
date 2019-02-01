$(document).ready(function() {
    var urlPromos = "https://desafio-oi.herokuapp.com/";
    var cidades = ["rj", "sp"];

    window.addEventListener('load', function(){
        document.querySelector('.glider').Glider({
          slidesToShow: 4,
          slidesToScroll: auto
        });
    });

    fetch(urlPromos).then(function(next) {
        next.json().then(function(res) {
            res.forEach(el => {
                el.dependentePreco = el["dependente-preco"];

                el.precoReal = el["preco"].split(",")[0];
                el.precoCentavo = el["preco"].split(",")[1];
                
            });
            ko.applyBindings({planos: res});
        });
    });
});