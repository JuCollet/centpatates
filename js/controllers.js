'use strict';

const controllers = (function(){
    
    
    // Game - Mécanisme de jeu
    // -----------------------
    
    
    window.addEventListener('devicemotion', function(event) {
        Math.round(event.accelerationIncludingGravity.x);
        Math.round(event.accelerationIncludingGravity.y);
        Math.round(event.accelerationIncludingGravity.z);
    });
    
    // Combination generator - Génère la combinaison
    // ---------------------------------------------
    
    
}());

export default controllers;