function changeVisualH1() {
    $("header").hover(
        function() {
            $(this).css("background-color", "white");
        },
        function() {
            $(this).css("background-color", "");
        }
    );
}

$(document).ready(function() {
    changeVisualH1()
});

$(document).ready(function() {
    // Récupérer l'état de visibilité depuis localStorage
    var isSecondeVisible = localStorage.getItem('secondeVisible') === 'true';

    // Appliquer l'état de visibilité lors du chargement
    if (isSecondeVisible) {
        $('#seconde').show().animate({ 
            width: "300px", // Taille actuelle lors de l'affichage
            height: "auto" 
        }, 2050);
    } else {
        $('#seconde').hide();
    }

    // Lors du clic sur #essaie
    $("#essaie").click(function() {
        if ($('#seconde').is(':visible')) {
            $('#seconde').animate({ 
                width: "100px", // Taille réduite avant de disparaître
                height: "auto" 
            }, {
                duration: 2000,
                complete: function() {
                    $(this).fadeOut(2050);
                    localStorage.setItem('secondeVisible', 'false'); // Enregistrer l'état dans localStorage
                }
            });
        } else {
            $('#seconde').fadeIn(2000, function() {
                $(this).animate({ 
                    width: "300px", // Nouvelle taille lors de l'affichage
                    height: "auto" 
                }, 2050);
                localStorage.setItem('secondeVisible', 'true'); // Enregistrer l'état dans localStorage
            });
        }

        $("#first").toggle();
    });
});






  