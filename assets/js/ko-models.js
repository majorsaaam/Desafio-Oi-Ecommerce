$(document).ready(function() {
    var urlPromos = "https://desafio-oi.herokuapp.com/";
    var cidades = ["rj", "sp"];
    $("#carousel").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        dots: true,
        draggable: true,
        variableWidth: true
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