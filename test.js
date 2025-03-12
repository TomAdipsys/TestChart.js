//  JQuery
 
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
    $("#first").toggle();
    $('#seconde').fadeToggle(4050)
})






  