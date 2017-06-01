/*global $*/

'use strict';

const views = (function(){

    const height = $(document).height();
    const $root = $('#root');
    let notificationRunning = false;
    let charms = [];
    

    // View Add - Ajoute l'élément à la vue
    // ------------------------------------
    
    const _paint = element => {
        $root.append(element);
    };


    // View change - Bascule d'une vue à l'autre
    // -----------------------------------------
    
    const changeView = nextViewBuilder => {
        $root.empty();
        nextViewBuilder();
    };


    // Notifications - Popup de notification
    //--------------------------------------
    
    const notification = (message, image) => {
        if(!notificationRunning) {
            
            notificationRunning = true;
            _paint("<div class='notification-box'><div class='notification-img'></div><div class='notification-message'>"+message+"</div></div>");
            
            setTimeout(function(){
                $('.notification-box').remove();
                notificationRunning = false;
            },3000);    
        }
    };
    
    
    // Welcome - Page d'accueil de l'app
    // ---------------------------------
    
    const welcome = {
        
        build : _ => {
            _paint("<h1>Hello!</h1>");
        }
        
    };

    
    // Grid - Grille de jeu
    // --------------------

    const grid = {
        
        build : _ => {
            
            const numberSize = Math.round(height/30);
            const starSize = Math.round(height/25);
            let numbers = 1, stars = 1;
            
            _paint('<div id="grid-box"><div id="numbers"></div><div id="stars"></div></div>');
            
            for(let i = 0; i < 10; i++){
                $('#numbers').append('<div class="row" id="'+"row"+i+'"></div>');
                for(let j = 0; j < 5; j++){
                    $('#row'+i).append("<div class='cell number' style='width:"+numberSize+"px;height:"+numberSize+"px'>"+numbers+"</div>");
                    numbers++;
                }
            }
            
            for(let i = 0; i < 3; i++){
                $('#stars').append('<div class="row" id="'+"star"+i+'"></div>');
                for(let j = 0; j < 4; j++){
                  $('#star'+i).append("<div class='cell star' style='width:"+starSize+"px;height:"+starSize+"px'>"+stars+"</div>");
                  stars++;
                }
            }
            
        }
        
    };
    
    
    // Charms animation - Fait apparaitre les portes-bonheur
    // -----------------------------------------------------
    
    class Charm {
        
        constructor(pos, speed, id){
            this.posX = pos.x;
            this.posY = pos.y;
            this.nextPosX = pos.x + speed.x;
            this.nextPosY = pos.y + speed.y;
            this.speed = speed.speed;
            this.id = id;
        }
        
    }
    
    Charm.prototype.build = function(){
        const imgPath = "https://upload.wikimedia.org/wikipedia/commons/8/8d/Clover_symbol.svg";
        _paint('<img src="'+imgPath+'" class="charm" id="'+this.id+'"></img>');
        $('#'+this.id)
            .css({"left": this.posX+"px", "top": this.posY+"px"})
            .animate({left: this.nextPosX+"px", top: this.nextPosY+"px", opacity:"0"}, this.speed, _ => {
                $('#'+this.id).remove();
            });
    };
    
    const addCharm = (pos, speed) => {
        let currentCharm = charms.length;
        charms.push(new Charm(pos, speed, charms.length+1));
        charms[currentCharm].build();
    };
    

    // Final - Panneau final
    // ---------------------
    
    
    // Error - Affiché si device non-compatible
    // ----------------------------------------
    
    
    return {
        grid : grid,
        welcome : welcome,
        changeView : changeView,
        notification : notification,
        addCharm : addCharm
    };
    
}()); // End module

export default views;