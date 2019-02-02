$(document).ready(function() {
    var urlPromos = "https://desafio-oi.herokuapp.com/";
    var cidades = ["rj", "sp"];

    // window.addEventListener('load', function(){
    //     document.querySelector('.glider').Glider({
    //       slidesToShow: 4,
    //       slidesToScroll: auto
    //     });
    // });

    ko.bindingHandlers.gliderCarousel = {
        init: function() {
            new Glider(document.querySelector(".glider"), {
                slidesToShow: 4,
                slidesToScroll: 3,
                draggable: true,
                dots: "#dots",
                arrows: {
                prev: ".glider-prev",
                next: ".glider-next"
                }
            })
        }
    }

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