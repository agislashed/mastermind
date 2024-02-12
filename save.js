let saveButton = document.getElementById('saveScore');
let returnMenuButton = document.getElementById('returnMenu');
let leaderbordButton = document.getElementById('goToLeaderboard');
//recupère la lenght de la liste de score
let nombreScore = localStorage.getItem('listeScore').length;

saveButton.addEventListener('click', function() {
  let currentScore = document.querySelector(".score-circle").innerHTML;
  console.log(currentScore); 
  let name = localStorage.getItem('currentPlayer');
  console.log(name);
  //transform the string into an object
  name = JSON.parse(name);
  name.score = currentScore;
  console.log(name);
  // si cela n'existe pas créer une liste de score et ajoute le name dedans
  let listeScore = (localStorage.getItem('listeScore')) ? JSON.parse(localStorage.getItem('listeScore')) : [];
  listeScore.push(name);
  // Save the new list of score
  localStorage.setItem('listeScore', JSON.stringify(listeScore));
  window.location.href = "leaderboard.html";
});

returnMenuButton.addEventListener('click', function() {
  //compare la lenght de la liste de score avec le nombre de score
  if(nombreScore === localStorage.getItem('listeScore').length){
    if (confirm("Voulez-vous vraiment quitter la partie sans sauvegarder ?")) {
      localStorage.removeItem('currentPlayer');
      window.location.href = "index.html";
    }
    else{
      return;
    }
  }

  window.location.href = "index.html";
});

leaderbordButton.addEventListener('click', function() {
  if(nombreScore === localStorage.getItem('listeScore').length){
    if (confirm("Voulez-vous vraiment quitter la partie sans sauvegarder ?")) {
      localStorage.removeItem('currentPlayer');
      window.location.href = "leaderboard.html";
    }
    else{
      return;
    }
  }
  window.location.href = "leaderboard.html";
});