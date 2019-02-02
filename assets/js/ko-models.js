$(document).ready(function() {
    apiUrl = "https://desafio-oi.herokuapp.com/";
    localizacoes = {
        planosPorLocalizacao: ["Todos", "Rio de Janeiro, RJ", "São Paulo, SP"],
        planosSelecionados: ["Todos"]
    };
    planos = [];
    var vm = null;
    

    var select = document.getElementById("selected-option");
    select.addEventListener("change", function() {
        if (select.value == "Rio de Janeiro, RJ") {
            apiUrl = "https://desafio-oi.herokuapp.com/rj";
        } else if (select.value == "São Paulo, SP") {
            apiUrl = "https://desafio-oi.herokuapp.com/sp";
        } else if (select.value == "Todos") {
            apiUrl = "https://desafio-oi.herokuapp.com/";
        }
        console.log(select.value);
        MostraPlanos();
    });

    function MostraPlanos() {
        fetch(apiUrl).then(function(next) {
            next.json().then(function(res) {
                // ko.cleanNode({planos: res});
                res.forEach(el => {
                    el.dependentePreco = el["dependente-preco"];
                    el.precoReal = el["preco"].split(",")[0];
                    el.precoCentavo = el["preco"].split(",")[1];
                });         
                planos = res;
                if(vm == null) {
                    vm = {
                        planos: ko.observable(planos),
                        localizacoes
                    };
                    ko.applyBindings(vm);
                }
                else{
                    vm.planos(planos);
                    vm.gliderCarousel();
                }

                console.log("atualizado");
            });
        });
    }
    MostraPlanos();


    

    // function MostraPlanos() {
    //     var todos = [];
    //     var rj = [];
    //     var sp = [];

    //     fetch("https://desafio-oi.herokuapp.com/rj").then(function(next) {
    //         next.json().then(function(res) {
    //             res.forEach(el => {
    //                 el.dependentePreco = el["dependente-preco"];
    //                 el.precoReal = el["preco"].split(",")[0];
    //                 el.precoCentavo = el["preco"].split(",")[1];
    //             });
    //             rj = res;
    //         })
    //     })

    //     fetch("https://desafio-oi.herokuapp.com/sp").then(function(next) {
    //         next.json().then(function(res) {
    //             res.forEach(el => {
    //                 el.dependentePreco = el["dependente-preco"];
    //                 el.precoReal = el["preco"].split(",")[0];
    //                 el.precoCentavo = el["preco"].split(",")[1];
    //             });
    //             sp = res;
    //         })
    //     })

    //     fetch("https://desafio-oi.herokuapp.com/").then(function(next) {
    //         next.json().then(function(res) {
    //             res.forEach(el => {
    //                 el.dependentePreco = el["dependente-preco"];
    //                 el.precoReal = el["preco"].split(",")[0];
    //                 el.precoCentavo = el["preco"].split(",")[1];
    //             });
    //             todos = res;
    //         })
    //     })
        
    //     ko.applyBindings(rj, sp, todos, localizacoes);
    // }
    // MostraPlanos();



    ko.bindingHandlers.gliderCarousel = {
        init: function() {
            new Glider(document.querySelector(".glider"), {
                slidesToShow: 'auto',
                slidesToScroll: 'auto',
                itemWidth: 270,
                draggable: true,
                dots: ".dots",
                arrows: {
                prev: ".glider-prev",
                next: ".glider-next"
                },
                duration: 1,
                responsive: [
                  {
                    breakpoint: 775,
                    settings: {
                    slidesToShow: 'auto',
                    slidesToScroll: 'auto',
                    itemWidth: 270,
                    duration: 1
                    }
                  },{
                    breakpoint: 1024,
                    settings: {
                    slidesToShow: 'auto',
                    slidesToScroll: 3,
                    itemWidth: 270,
                    duration: 1
                    },
                  }
                ]
            })
        }
    }

    document.addEventListener('glider-loaded', hideFFScrollBars); /* Esconde a barra de rolagem  */
    document.addEventListener('glider-refresh', hideFFScrollBars);/* no Firefox, scrollbarHeight */
    function hideFFScrollBars(e){                                 /* pode mudar no futuro.       */
    var scrollbarHeight = 17;
        if(/firefox/i.test(navigator.userAgent)){
            if (window.innerWidth > 575){
            e.target.parentNode.style.height = (e.target.offsetHeight - scrollbarHeight) + 'px'
            }
        }
    }
});