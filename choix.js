  // Sélection avatar 

  document.addEventListener("DOMContentLoaded", function() {
    const avatars = document.querySelectorAll('.avatar');
  
    avatars.forEach(avatar => {
        avatar.addEventListener('click', () => {
            avatars.forEach(a => a.classList.remove('selected'));
            avatar.classList.add('selected');
        });
    });
  });
  