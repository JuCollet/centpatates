/*global $*/
'use strict';

import '../styles/styles.less';
import view from './views';
import controller from './controllers';

const height = $(document).height();
const width = $(document).width();

view.grid.build();

if(window.DeviceMotionEvent){
    view.notification('Secoue ton téléphone !', 3000, 'start');
    controller.motionDetect(width, height);
} else {
    view.notification("Ton téléphone n'est pas compatible :( !", 20000);
}