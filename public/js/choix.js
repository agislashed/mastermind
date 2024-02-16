  // Sélection photo avatar 
 let photoAvatar;
  document.addEventListener("DOMContentLoaded", function() {
    const avatars = document.querySelectorAll('.avatar');
  
    avatars.forEach(avatar => {
        avatar.addEventListener('click', () => {
            avatars.forEach(a => a.classList.remove('selected'));
            avatar.classList.add('selected');
            photoAvatar = avatar.getAttribute('data-avatar');
        });
    });
  });
  
var stockage = localStorage;

var profil = {"name":"", "avatar":"", "score":"" };
let savePseudo = document.getElementById("savePseudo");

savePseudo.addEventListener("click", function(){
    let pseudo = document.getElementById("pseudoInput").value;
    profil.name = pseudo;
    profil.avatar = photoAvatar;
    localStorage.setItem("currentPlayer", JSON.stringify(profil));
    window.location.href = "/html/choix-theme.html";
});





// // Ajoutez cette fonction à votre fichier choix.js
// document.addEventListener('DOMContentLoaded', () => {
//   const avatarBoxes = document.querySelectorAll('.avatar');

//   avatarBoxes.forEach(avatarBox => {
//       avatarBox.addEventListener('click', () => {
//           const pseudo = document.getElementById('pseudoInput').value;
//           const avatarId = avatarBox.getAttribute('data-avatar');
//           const score = Math.floor(Math.random() * 1000); // Score aléatoire (simulez le score réel de votre jeu)

//           // Enregistrez le score généré à la fin du jeu
//           enregistrerScore(pseudo, avatarId, score);
//       });
//   });
// });

// // Modifiez cette fonction pour récupérer le pseudo du formulaire
// function enregistrerScore() {
//   const pseudo = document.getElementById('pseudoInput').value;
//   const avatarId = document.querySelector('.avatar.selected').getAttribute('data-avatar');
//   const score = Math.floor(Math.random() * 1000); // Score aléatoire (simulez le score réel de votre jeu)

//   // Enregistrez le score généré à la fin du jeu
//   enregistrerScore(pseudo, avatarId, score);
//   console.log(enregistrerScore(pseudo, avatarId, score));

 
// }
