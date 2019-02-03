$(document).ready(function() {
    apiUrl = "https://desafio-oi.herokuapp.com/";
    localizacoes = {
        planosPorLocalizacao: ["Todos", "Rio de Janeiro, RJ", "São Paulo, SP"],
        planosSelecionados: ["Todos"]
    };
    planos = [];
    vm = null;
    glider = null;

    function MostraPlanos() {
        fetch(apiUrl).then(function(next) {
            next.json().then(function(res) {
                // ko.cleanNode({planos: res});
                res.forEach(el => {
                    el.dependentePreco = el["dependente-preco"];
                    el.precoReal = el["preco"].split(",")[0];
                    el.precoCentavo = el["preco"].split(",")[1];
                });         
                planos = res.slice(0,8);
                if (vm == null) {
                    vm = { planos: ko.observable(planos), localizacoes };
                    ko.applyBindings(vm);
                }
                else {
                    vm.planos(planos);
                }
                glider.scrollTo(0);
            });
        });
    }
    MostraPlanos();

    // #region evento de mudança do select
    var select = document.getElementById("selected-option");
    select.addEventListener("change", function() {
        if (select.value == "Rio de Janeiro, RJ") {
            apiUrl = "https://desafio-oi.herokuapp.com/rj";
        } else if (select.value == "São Paulo, SP") {
            apiUrl = "https://desafio-oi.herokuapp.com/sp";
        } else if (select.value == "Todos") {
            apiUrl = "https://desafio-oi.herokuapp.com/";
        }
        MostraPlanos();
    });
    // #endregion

    // #region configuração do glider
    ko.bindingHandlers.gliderCarousel = {
        init: function() {
            glider = new Glider(document.querySelector(".glider"), {
                addTrack: false,
                slidesToShow: 'auto',
                slidesToScroll: 'auto',
                itemWidth: 257,
                scrollLock: true,
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
            });
        }
    }
    // #endregion

    // #region esconde barra de rolagem no firefox
    document.addEventListener('glider-loaded', hideFFScrollBars);
    document.addEventListener('glider-refresh', hideFFScrollBars);
    function hideFFScrollBars(e){                                 
    var scrollbarHeight = 17;
        if(/firefox/i.test(navigator.userAgent)){
            if (window.innerWidth > 575){
            e.target.parentNode.style.height = (e.target.offsetHeight - scrollbarHeight) + 'px'
            }
        }
    }
    // #endregion
});