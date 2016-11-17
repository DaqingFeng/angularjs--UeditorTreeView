import { module } from "angular";
import uiRouter from 'angular-ui-router';
import ngueditor from 'ng.ueditor';
import nganimate from 'angular.animate';
import ngtreeview from 'ng.treeView';
import ReqCtrl from '../controller/RequireMentCtr';
import cmService from '../services/CommonService';
import reqService from '../services/CommonService';

// Create the module where our functionality can attach to
let AppModule = angular.module('AppModule', ["ng.ueditor","ngAnimate","angularBootstrapNavTree"])
    .controller('RequireMentCtr', ReqCtrl)
    .service('CommonService', cmService)
    .service('RequireMentService', reqService)

export default AppModule;