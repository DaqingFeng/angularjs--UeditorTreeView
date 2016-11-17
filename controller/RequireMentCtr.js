import RequireModel from '../model/RequireModel';
class RequireMentCtr {
    constructor($scope, CommonService, RequireMentService) {
        this.$scope = $scope;

        this.Service = CommonService;
        this.ReqService = RequireMentService;

        this.ReqModel = new RequireModel();
        this.$scope.MyFuncs = this.ReqModel.Funcs;
        this.$scope.currentFunc = this.ReqModel.Func;

        //显示控制
        this.$scope.ShowControl = { ShowLevel: 1, FuncID: '', ChildFuncID: '', RequireMentID: '' };

        this.$scope.tree_handler = (brach) => this.TreeHandler(brach);

        this.$scope.NewFunc = () => this.NewFunc();
        this.$scope.Init = (x) => this.Init(x);
        this.$scope.AddChildFunc = (funcid) => this.AddChildFunc(funcid);
        this.$scope.AddRequireMent = (funcid, childfuncid) => this.AddRequireMent(funcid, childfuncid);
        this.$scope.AddRequireMentDetail = (funcid, childfuncid, requirementid) => this.AddRequireMentDetail(funcid, childfuncid, requirementid);
        this.$scope.ChangeFuncState = (funcid, isstate) => this.ChangeFuncState(funcid, isstate);
        this.$scope.DeleteFunc = (funcid) => this.DeleteFunc(funcid);
        this.$scope.DeleteChildfunc = (funcid, childid) => this.DeleteChildfunc(funcid, childid);
        this.$scope.DeleteRequireMent = (funcid,childid,reqid) => this.DeleteRequireMent(funcid,childid,reqid);
        //Config Ueditor
        this.ConfigUeditor();
    }

    Init(isnew) {
        if (isnew) {
            this.$scope.currentFunc = this.ReqModel.NewFunc();
            this.$scope.ShowControl = { ShowLevel: 1, FuncID: this.$scope.currentFunc.FuncID };
        }
    }

    NewFunc() {
        this.ReqModel.NewFunc();
    }

    DeleteFunc(funcid) {
        this.ReqModel.DeleteFunc(funcid);
        this.$scope.currentFunc = null;
    }

    DeleteChildfunc(funcid, childid) {
        this.ReqModel.DeleteChildfunc(funcid, childid);
    }

    DeleteRequireMent(funcid,childid,reqid) {
        console.log(funcid);
       
        this.ReqModel.DeleteRequirement(funcid, childid, reqid);
    }


    AddChildFunc(funcid) {
        this.ReqModel.AddChildFunc(funcid);
    }

    AddRequireMent(funcid, childfuncid) {
        this.ReqModel.AddRequireMent(funcid, childfuncid);
    }

    AddRequireMentDetail(funcid, childfuncid, requirementid) {
        this.ReqModel.AddRequireMentDetail(funcid, childfuncid, requirementid);
    }

    ChangeFuncState(funcid, isstate) {
        this.ReqModel.ChangeFuncState(funcid, isstate);
    }

    TreeHandler(item) {
        if (item.level == 1) {
            this.findfunc(item.FuncID);
        }
        if (item.level == 2) {
            this.findChildfunc(item.ChildFuncID);
        }
        else {
            this.findRequirement(item.RequireMentID);
        }
    }

    findfunc(funcid) {
        let self = this, func;
        this.ReqModel.Funcs.forEach((value, index) => {
            if (value.FuncID == funcid) {
                self.$scope.currentFunc = func = value;
            }
        });
        this.$scope.ShowControl = {
            ShowLevel: 1,
            FuncID: func.FuncID
        };
    }

    findChildfunc(childid) {
        let self = this, func, childfunc;
        this.ReqModel.Funcs.forEach((value, index) => {
            value.children.forEach((chvalue, chindex) => {
                if (chvalue.ChildFuncID == childid) {
                    func = value;
                    childfunc = chvalue;
                    self.$scope.currentFunc = func = value;
                }
            });
        });
        this.$scope.ShowControl = {
            ShowLevel: 2,
            FuncID: func.FuncID,
            ChildFuncID: childfunc.ChildFuncID
        };
    }


    findRequirement(reqid) {
        let self = this, func, childfunc, requirement;
        this.ReqModel.Funcs.forEach((value, index) => {
            value.children.forEach((chvalue, chindex) => {
                chvalue.children.forEach((reqvalue, reqindex) => {
                    if (reqvalue.RequireMentID == reqid) {
                        func = value;
                        self.$scope.currentFunc = func;
                        requirement = reqvalue;
                        childfunc = chvalue;
                    }
                });
            });
        });


        this.$scope.ShowControl = {
            ShowLevel: 3,
            FuncID: func.FuncID,
            ChildFuncID: childfunc.ChildFuncID,
            RequireMentID: requirement.RequireMentID
        };
    }

    ConfigUeditor() {
        this.$scope._UeditorConfig = {
            toolbars: [
                ['fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                    'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                    'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
                    'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
                    'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                    'print', 'preview', 'searchreplace', 'help', 'drafts']
            ],
            //focus时自动清空初始化时的内容
            autoClearinitialContent: true,
            //关闭字数统计
            wordCount: false,
            //文本框FrameHeight
            initialFrameHeight: 200,
            //关闭elementPath
            elementPathEnabled: false
        };
    }

}

export default RequireMentCtr;