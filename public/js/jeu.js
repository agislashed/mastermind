  // Function to display the modal
  function openModal() {
    document.getElementById('myModal').style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

closeModal();
// Chargez le fichier JSON des questions
fetch('/json/cultureg.json')
  .then(response => response.json())
  .then(dataRecup => {
    let countdown = document.querySelector(".countdown").innerHTML;
    let avatar = document.querySelector("#avatar-choisi");
    let currentPlayer = localStorage.getItem("currentPlayer");
    // decode mon json
    let avatarChoisi = JSON.parse(currentPlayer).avatar;
    console.log(avatarChoisi);
    avatar.src = "../img/mmi_mastermind_"+avatarChoisi+".png";
    let timer = setInterval(function () {
      countdown--;
      document.querySelector(".countdown").innerHTML = countdown;
      if (countdown === 0) {
        clearInterval(timer);
        document.querySelector(".countdown").innerHTML = "C'est parti !";
        let go = setInterval(function () {
          clearInterval(go);
          startgame(dataRecup);
        }, 1000); 
      }
    }, 1000);
  });

  function startgame(data) {
    // tirage aleatoire de data.length nombres 
 
    let tirage = [];
    let i = 0;  
    while (i < data.length) {
      let random = Math.floor(Math.random() * data.length);
      if (tirage.indexOf(random) === -1) {
        tirage.push(random);
        i++;
      }
    }
    console.log(tirage);
    let countdown = document.querySelector(".countdown");
    countdown.style.display = "none";
    const questions = data;
    let currentQuestionIndex = -1; // Pour suivre la question actuelle
    let timer = document.querySelector(".timer").innerHTML;
    let score = 0;
    document.querySelector(".score-circle").innerHTML = score; 
    let input = document.querySelector(".answer-input");
    let validateText = document.querySelector(".validate-text");

    // Affiche la question actuelle
    function afficherQuestion() {
      // if (currentQuestionIndex === -1 || currentQuestionIndex >= questions.length) {
      //   // Si la partie commence ou que toutes les questions ont été posées, choisissez une nouvelle question au hasard
      //   currentQuestionIndex = Math.floor(Math.random() * questions.length);
      // }
      // const question = questions[currentQuestionIndex];
      // document.querySelector(".question").innerHTML = question.question;
      //affiche la premire question du tableau tirage
      if(currentQuestionIndex===-1) {
        currentQuestionIndex++;
        document.querySelector(".question").innerHTML = questions[tirage[currentQuestionIndex]].question;
      }
      else if(currentQuestionIndex >= tirage.length) {
        currentQuestionIndex = 0;
        document.querySelector(".question").innerHTML = "Partie terminée ! Votre score est de " + score + " points !";
        //desactive l'input de class answer-input
        input.disabled = true;
        openModal();
      }
      else {
        document.querySelector(".question").innerHTML = questions[tirage[currentQuestionIndex]].question;
      }
    }

    afficherQuestion();

    // Vérifie la réponse de l'utilisateur
    function checkAnswer() {

      const question = questions[tirage[currentQuestionIndex]];
      console.log(question);
      const userAnswer = input.value;
      //retire les accents de la réponse de l'utilisateur
      userAnswer.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      // cas ou question.réponse n'a qu'un seul mot
      // if (question.réponse.length === 1) {
      //   if (userAnswer.toLowerCase() === question.réponse.toLowerCase()) {
      //     console.log(question.bonus);
      //     // si la question contient un paramètre bonus alors on ajoute le bonus au score
      //     if (question.bonus) { 
      //       score += question.bonus;
      //       document.querySelector(".score-circle").innerHTML = score;
      //     }
      //     else {
      //       score++;
      //       document.querySelector(".score-circle").innerHTML = score;
      //     }
      //     document.querySelector(".score-circle").innerHTML = score;
      //     validateText.style.display = "block";
      //     validateText.innerHTML = "Bonne réponse ! Vous gagnez un point.";
      //     setTimeout(function () {
      //       validateText.style.display = "none";
      //     }, 1500);
          
      //     currentQuestionIndex++; // Passez à la prochaine question
      //     afficherQuestion(); // Choisissez la prochaine question
      //   } else {
      //     validateText.style.display = "block";
      //     validateText.innerHTML = "Mauvaise réponse ! C'était "+ question.réponse[0];
      //     setTimeout(function () {
      //       validateText.style.display = "none";
      //     }, 1500);
      //     currentQuestionIndex++; // Passez à la prochaine question
      //     afficherQuestion();
      //   }
      // }  
      // else{
        // cas ou question.réponse a plusieurs mots     
        let correctAnswer = 0;
        for (let i = 0; i < question.réponse.length; i++) {
          for (let j = 0; j < userAnswer.length; j++) {
            if (question.réponse[i].toLowerCase() === userAnswer.toLowerCase()) {
              correctAnswer++;
            }
          }
        }
        if (correctAnswer !== 0) {
          if (question.bonus) { 
            score = score +2;
            document.querySelector(".score-circle").innerHTML = score;
          }
          else {
            score++;
            document.querySelector(".score-circle").innerHTML = score;
          }
          // score++;
          // document.querySelector(".score-circle").innerHTML = score;
          validateText.style.display = "block";
          validateText.innerHTML = "Bonne réponse ! Vous gagnez un point.";
          setTimeout(function () {
            validateText.style.display = "none";
          }, 1500);
          
          currentQuestionIndex++; // Passez à la prochaine question
          afficherQuestion(); // Choisissez la prochaine question
        } else {
          validateText.style.display = "block";
          validateText.innerHTML = "Mauvaise réponse ! C'était "+ question.réponse[0];
          setTimeout(function () {
            validateText.style.display = "none";
          }, 5000);
          currentQuestionIndex++; // Passez à la prochaine question
          afficherQuestion();
        }
      // }
    }

    // Vérifie la réponse de l'utilisateur lorsqu'il appuie sur le bouton entree
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        checkAnswer();
        input.value = "";
      }
    });

    let interval= setInterval(function () {
      timer--;
      document.querySelector(".timer").innerHTML = timer;
      if (timer === 0) {
        clearInterval(interval);
        document.querySelector(".timer").innerHTML = "Temps écoulé !";
        let go = setInterval(function () {
          clearInterval(go);
          document.querySelector(".timer").innerHTML = "Votre score est de " + score + " points !";
          //desactive l'input de class answer-input
          input.disabled = true;
          openModal();
        }, 1000); 
      }
    }, 1000);


    // function saveScore()
    // {
      
    //  var stockage = localStorage;
    //   var a = [];
    //   // Parse the serialized data back into an aray of objects
    //   a = JSON.parse(stockage.getItem('score')) || [];
    //   // Push the new data (whether it be an object or anything else) onto the array
    //   a.push(score);
    //   // Alert the array value
    //   alert(a);  // Should be something like [Object array]
    //   // Re-serialize the array back into a string and store it in localStorage
    //   stockage.setItem('score', JSON.stringify(a));
    // }

    // function ecranFin()
    // {
    //   document.getElementById('ecran-fin').innerHTML
    // }




  //       // Function to display the modal
  //       function openModal() {
  //         document.getElementById('myModal').style.display = 'flex';
  //     }

  //     // Function to close the modal and redirect to another page
  //     function closeModalAndRedirect() {
  //     document.getElementById('myModal').style.display = 'none';
  //     // Redirigez l'utilisateur vers la page souhaitée, par exemple :
  //     window.location.href = 'index.html';
  // }


  //     // Function to close the modal and redirect to leaderboard
  //     function GoToLeaderboard() {
  //     document.getElementById('myModal').style.display = 'none';
  //     // Redirigez l'utilisateur vers la page souhaitée, par exemple :
  //     window.location.href = 'score.html';
  // }

  //     // Event listener for the button that triggers the modal
  //     document.getElementById('savePseudo').addEventListener('click', openModal);
          






  //   function choisirQuestion() {
  //     if (currentQuestionIndex === -1 || currentQuestionIndex >= questions.length) {
  //       // Si la partie commence ou que toutes les questions ont été posées, choisissez une nouvelle question au hasard
  //       currentQuestionIndex = Math.floor(Math.random() * questions.length);
  //     }

  //     const question = questions[currentQuestionIndex];
  //     const userAnswer = prompt(question.question);

  //     if (userAnswer !== null) { // Si l'utilisateur n'a pas annulé
  //       // Vérifiez si la réponse est correcte (en ignorant la casse)
  //       if (userAnswer.toLowerCase() === question.réponse.toLowerCase()) {
  //         alert('Bonne réponse ! Vous gagnez un point.');
  //         currentQuestionIndex++; // Passez à la prochaine question
  //         choisirQuestion(); // Choisissez la prochaine question
  //       } else {
  //         alert('Mauvaise réponse. Essayez encore.');
  //       }
  //     }
  //   }

  //   choisirQuestion(); // Commencez le jeu en choisissant la première question
  }
