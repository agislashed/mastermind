// code pour le mouvement 360° du logo

document.addEventListener("DOMContentLoaded", function() {
    const logo = document.querySelector(".logo");
    logo.addEventListener("click", function() {
        logo.classList.add("clicked");

        // Réinitialisez la classe "clicked" après l'animation (en utilisant un délai)
        setTimeout(function() {
            logo.classList.remove("clicked");
        }, 300); // 300ms (0.3s) correspond à la durée de l'animation dans les styles CSS
    });
});