'use strict';

import view from './views';

const controllers = (function(){
    
    let combination = [];
    
    // Detection validation - Verifie les coordonnées
    // ----------------------------------------------
    
    const _validateDetection = function(x, y, width, height){

        const posX = Math.floor(Math.random()*width);
        const posY = Math.floor(Math.random()*height);
        
        return {
            posX : posX,
            posY : posY,
            nextX : posX + (10*x),
            nextY : posY + (10*y)
        };

    };
    
    // Game - Mécanisme de jeu
    // -----------------------
    
    const motionDetect = function(width, height){
     
        let moveX, moveY, moveZ, forceCounter = 0, numbersRevealed = 0;
        
        window.addEventListener('devicemotion', function(event) {
            moveX = Math.round(event.accelerationIncludingGravity.x);
            moveY = Math.round(event.accelerationIncludingGravity.y);
            moveZ = Math.round(event.accelerationIncludingGravity.z);
        });
        
        const game = setInterval(function(){
            let nextMove = _validateDetection(moveX, moveY, width, height);
            let force = Math.abs(moveX)+Math.abs(moveY)+Math.abs(moveZ);
            
            const nextStep = _ => {
                numbersRevealed++;
                _combinationGenerator(numbersRevealed);
                if("vibrate" in window.navigator) {
                    window.navigator.vibrate(200);
                }
            };
            
            if(force > 20){
                forceCounter += force;
                view.addCharm({x:nextMove.posX,y:nextMove.posY},{x:nextMove.nextX,y:nextMove.nextY,speed:force*50});
                
                if(forceCounter >= 1000 && numbersRevealed < 1){nextStep();} 
                else if(forceCounter >= 2000 && numbersRevealed < 2){nextStep();}
                else if(forceCounter >= 3000 && numbersRevealed < 3){nextStep();}
                else if(forceCounter >= 4000 && numbersRevealed < 4){nextStep();}
                else if(forceCounter >= 5000 && numbersRevealed < 5){nextStep();}
                else if(forceCounter >= 6000 && numbersRevealed < 6){nextStep();}
                else if(forceCounter >= 7000 && numbersRevealed < 7){nextStep();}

                if(numbersRevealed === 7){
                    clearInterval(game);
                }
                
            }
        },50);
    
    };
    
    
    // Combination generator - Génère la combinaison
    // ---------------------------------------------
    
    
    const _combinationGenerator = function(revealed){
        
        if(revealed < 6){
            let newNumber = Math.floor(Math.random()*50)+1;
            if(combination.indexOf(newNumber) !== -1){
                _combinationGenerator(revealed);
            } else {
                combination.push(newNumber);
                view.grid.pick('number', newNumber);
                const notificationMessage = 'Numéro ' + newNumber;
                view.notification(notificationMessage, 2000, 'number');
            }
        } else {
            let newStar = Math.floor(Math.random()*12)+1;
                if(combination.indexOf(newStar) !== -1){
                _combinationGenerator(revealed);
            } else {
                combination.push(newStar);
                view.grid.pick('star', newStar);
                const notificationMessage = 'Etoile ' + newStar;
                view.notification(notificationMessage, 2000, 'star');
            }
        }
        
    };
    
    return {
        motionDetect : motionDetect
    };
    
}());

export default controllers;