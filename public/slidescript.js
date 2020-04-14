

  var kitties = document.querySelectorAll('#kitties img');
  var animationID;

  function moveKitties(nextIndex) {

     
      var oldKitty = document.querySelector('.onscreen');
      oldKitty.classList.remove('onscreen');
      oldKitty.classList.add('offscreen-left');
  
     
      kitties[nextIndex].classList.add('onscreen');    
      var oldDot = document.querySelector('#dots .dot.full');
      oldDot.classList.remove('full');

     
      var dots = document.querySelectorAll('#dots .dot');
      dots[nextIndex].classList.add('full');


      
      nextIndex++;
      if(nextIndex >= kitties.length) {
          nextIndex = 0;
      }

      animationID = setTimeout(function() {
          moveKitties(nextIndex);
      }, 3000);
  }


  setTimeout(function() {
      moveKitties(1);
  }, 3000);


  document.addEventListener('transitionend', function(e) {
      e.target.classList.remove('offscreen-left');
  });


  var dots = document.querySelectorAll('#dots .dot');
  dots.forEach(function(dot, dotIndex) {

      dot.addEventListener('click', function() {
          clearTimeout(animationID);
          moveKitties(dotIndex);
      });

  });



