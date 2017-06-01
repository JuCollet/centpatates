import '../styles/styles.less';
import view from './views';

let charms = [];

view.changeView(view.grid.build);
setTimeout(function(){
    view.addCharm({x:600,y:75},{x:-50,y:84,speed:1000});
    view.addCharm({x:450,y:185},{x:-90,y:-120,speed:2540});
    view.addCharm({x:500,y:200},{x:10,y:36,speed:785});
    view.addCharm({x:650,y:350},{x:80,y:-84,speed:1984});
    view.notification('Secouez votre téléphone !');
}, 500)
