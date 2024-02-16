// Récupérer la liste des scores depuis le localStorage
const listeScore = JSON.parse(localStorage.getItem('listeScore')) || [];

// Trier les joueurs par score décroissant
listeScore.sort((a, b) => b.score - a.score);

// Créer des lignes dans le tableau <tr> avec l'ID "content"s
const content = document.getElementById('content');
listeScore.forEach((joueur) => {
    const ligne = document.createElement('tr');
    //créer la ligne avec la place qui est l'index du joueur dans le foreach, le nom et le score
    ligne.innerHTML = `<tr><td>${listeScore.indexOf(joueur) + 1}</td><td>${joueur.name}</td><td>${joueur.score}</td></tr>`;
    content.appendChild(ligne);
});
