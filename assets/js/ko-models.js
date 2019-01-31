$(document).ready(function() {
    var urlPromos = "https://desafio-oi.herokuapp.com/";
    var cidades = ["rj", "sp"];
    

    fetch(urlPromos).then(function(next) {
        next.json().then(function(res) {
            console.log(res);
                res.forEach(el => {
                    el.dependentePreco = el["dependente-preco"];
                });
            ko.applyBindings({planos: res});
        })
    });
});