import {module} from "angular";
import uiRouter from 'angular-ui-router';
import MainCtrl from '../controller/MainCtrl';
import cmService from '../services/CommonService';


// Create the module where our functionality can attach to
let AppModule = angular.module('AppModule', [])
    .controller('MainCtrl', MainCtrl)
    .service('CommonService', cmService)

export default AppModule;