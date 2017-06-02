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
    
    const notification = (message, time, img) => {
        
        const imgSelect = img => {
            
            const baseUrl = '../img/';
            
            if(img === 'start'){
                return baseUrl + 'magic.png';
            }else if(img === 'number'){
                return baseUrl + 'charm4.png';
            }else if(img === 'star'){
                return baseUrl + 'charm1.png';
            }else {
                return 'charm2.png';
            }
        };
        
        
        if(!notificationRunning) {
            
            notificationRunning = true;
            $('#grid-box').append("<div class='notification-box'><img src='"+imgSelect(img)+"'></img><div class='notification-message'>"+message+"</div></div>");
            
            setTimeout(function(){
                $('.notification-box').fadeOut(300, function(){
                    $('.notification-box').remove();
                });
                notificationRunning = false;
            },time);    
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
                    $('#row'+i).append("<div class='cell number' id='number"+numbers+"' style='width:"+numberSize+"px;height:"+numberSize+"px'>"+numbers+"</div>");
                    numbers++;
                }
            }
            
            for(let i = 0; i < 3; i++){
                $('#stars').append('<div class="row" id="'+"starRow"+i+'"></div>');
                for(let j = 0; j < 4; j++){
                  $('#starRow'+i).append("<div class='cell star' id='star"+stars+"' style='width:"+starSize+"px;height:"+starSize+"px'>"+stars+"</div>");
                  stars++;
                }
            }
            
        },
        
        pick : (type,id) => {
            if(type === 'number'){
                $('#number'+id).append("<div class='check'></div>");
            } else if(type === 'star'){
                $('#star'+id).append("<div class='check'></div>");
            }
            
        }
        
    };
    
    
    // Charms animation - Fait apparaitre les portes-bonheur
    // -----------------------------------------------------
    
    class Charm {
        
        constructor(pos, nextPos, id){
            this.posX = pos.x;
            this.posY = pos.y;
            this.nextPosX = nextPos.x;
            this.nextPosY = nextPos.y;
            this.speed = nextPos.speed;
            this.id = id;
        }
        
    }
    
    Charm.prototype.build = function(){
        
        const charmRandom = _ => {
            const random = Math.floor(Math.random()*20)+1;
            if(random > 5 && random < 15){
                return 4;
            }else if(random >=15 && random <=20){
                return 5;
            } else {
                return random;
            }
        };
        
        _paint('<img src="../img/charm'+charmRandom()+'.png" class="charm" id="'+this.id+'"></img>');
        $('#'+this.id)
            .css({"left": this.posX+"px", "top": this.posY+"px"})
            .animate({left: this.nextPosX+"px", top: this.nextPosY+"px"}, this.speed, _ => {
                $('#'+this.id).animate({opacity:0}, 250, _ => {
                    $('#'+this.id).remove();
                });
            });
    };
    
    const addCharm = (pos, nextPos) => {
        let currentCharm = charms.length;
        charms.push(new Charm(pos, nextPos, charms.length+1));
        charms[currentCharm].build();
    };
    

    // Final - Panneau final
    // ---------------------
    
    
    // Error - Affiché si device non-compatible
    // ----------------------------------------
    
    
    return {
        grid : grid,
        changeView : changeView,
        notification : notification,
        addCharm : addCharm
    };
    
}()); // End module

export default views;