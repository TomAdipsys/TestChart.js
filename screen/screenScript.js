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

$("#essaie").click(function() {
    if ($('#seconde').is(':visible')) {
        $('#seconde').animate({ 
            width: "100px", // Taille réduite avant de disparaître
            height: "auto" 
        }, {
            duration: 2000,
            complete: function() {
                $(this).fadeOut(2050);
            }
        });
    } else {
        $('#seconde').fadeIn(2000, function() {
            $(this).animate({ 
                width: "300px", // Nouvelle taille lors de l'affichage
                height: "auto" 
            }, 2050);
        });
    }
    
    $("#first").toggle();
});








  