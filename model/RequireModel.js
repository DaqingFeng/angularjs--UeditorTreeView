import GenGid from '../unit/GenerateGuid';
class RequireModel {
    constructor() {

        //功能需求列表
        this.Funcs = [];

        //需求详情
        this.RequireMentDetail = {
            RequireMentDetailID: '',
            IsDisabled: false,
            RequireMentID: '',
            Content: '',
        }

        //需求
        this.RequireMent = {
            label: '需求项',
            RequireMentID: '',
            IsDisabled: false,
            RequireName: '',
            BookMarkID: '',//书签备注
            RequireComment: '', //需求
            ChildFuncID: '',
            RequireMentDetail: {},
            level: 3,
        }

        //子功能
        this.ChindFunc = {
            label: '子功能项',
            ChildFuncID: '',
            IsDisabled: false,
            FuncName: '',
            ParentFuncID: '',
            children: [],
            level: 2,
        }

        //功能
        this.Func = {
            label: '功能项',
            Index: 0,
            IsDisabled: false,
            FuncName: '',
            FuncID: '',
            children: [],//子功能
            level: 1,
        }
    }

    //新增---功能
    NewFunc() {
        let func = JSON.parse(JSON.stringify(this.Func));
        func.FuncID = (new GenGid()).NewGuid16();

        let chldfunc = JSON.parse(JSON.stringify(this.ChindFunc));
        chldfunc.ChildFuncID = (new GenGid()).NewGuid16();
        chldfunc.ParentFuncID = func.FuncID;

        let req = JSON.parse(JSON.stringify(this.RequireMent));
        req.RequireMentID = (new GenGid()).NewGuid16();
        req.ChildFuncID = chldfunc.ChildFuncID;


        let reqdetail = JSON.parse(JSON.stringify(this.RequireMentDetail));
        reqdetail.RequireMentDetailID = (new GenGid()).NewGuid16();
        reqdetail.RequireMentID = req.RequireMentID;

        req.RequireMentDetail = reqdetail;
        chldfunc.children.push(req);
        func.children.push(chldfunc);

        this.Funcs.push(func);
        return func;
    }

    //启用func
    ChangeFuncState(funcid, isstate) {
        this.Funcs.forEach(function (value, index) {
            if (value.FuncID == funcid) {
                value.IsDisabled = isstate;
            }
        });
    }

    DeleteFunc(funcid) {
        let self = this;
        this.Funcs.forEach(function (value, index) {
            if (funcid == value.FuncID) {
                self.Funcs.splice(index, 1);
            }
        });
    }

    DeleteChildfunc(funcid, ChildFuncID) {
        let self = this;
        this.Funcs.forEach(function (value, index) {
            if (funcid == value.FuncID) {
                value.children.forEach(function (chvalue, chindex) {
                    if (chvalue.ChildFuncID == ChildFuncID) {
                        value.children.splice(chindex, 1);
                    }
                });
            }
        });
    }


    DeleteRequirement(funcid, ChildFuncID, requirementid) {
        let self = this;
        this.Funcs.forEach(function (value, index) {
            if (funcid == value.FuncID) {
                value.children.forEach(function (chvalue, index) {
                    if (chvalue.ChildFuncID == ChildFuncID) {
                        chvalue.children.forEach(function (reqvalue, reqindex) {
                            if (reqvalue.RequireMentID == requirementid) {
                                chvalue.children.splice(reqindex, 1);
                            }
                        });
                    }
                });
            }
        });
    }


    //新增---子功能 
    AddChildFunc(funcid) {
        let self = this;
        self.Funcs.forEach(function (value, index) {
            //查询到Func
            if (funcid == self.Funcs[index].FuncID) {
                let findedfunc = value;

                let chldfunc = JSON.parse(JSON.stringify(self.ChindFunc));
                chldfunc.ChildFuncID = (new GenGid()).NewGuid16();
                chldfunc.ParentFuncID = findedfunc.FuncID;

                let req = JSON.parse(JSON.stringify(self.RequireMent));
                req.RequireMentID = (new GenGid()).NewGuid16();
                req.ChildFuncID = chldfunc.ChildFuncID;


                let reqdetail = JSON.parse(JSON.stringify(self.RequireMentDetail));
                reqdetail.RequireMentDetailID = (new GenGid()).NewGuid16();
                reqdetail.RequireMentID = req.RequireMentID;


                req.RequireMentDetail = reqdetail;
                chldfunc.children.push(req);
                findedfunc.children.push(chldfunc);
            }
        });
    }


    //新增子需求
    AddRequireMent(funcid, ChildFuncID) {
        let self = this;
        self.Funcs.forEach(function (value, index) {
            //查询到Func
            if (funcid == self.Funcs[index].FuncID) {
                let findedfunc = value;
                findedfunc.children.forEach(function (chvalue, index) {
                    if (chvalue.ChildFuncID == ChildFuncID) {
                        let findedChildfunc = chvalue;

                        let req = JSON.parse(JSON.stringify(self.RequireMent));
                        req.RequireMentID = (new GenGid()).NewGuid16();
                        req.ChildFuncID = findedChildfunc.ChildFuncID;

                        let reqdetail = JSON.parse(JSON.stringify(self.RequireMentDetail));
                        reqdetail.RequireMentDetailID = (new GenGid()).NewGuid16();
                        reqdetail.RequireMentID = req.RequireMentID;

                        req.RequireMentDetail = reqdetail;
                        findedChildfunc.children.push(req);
                    }
                })
            }
        })
    }


    AddRequireMentDetail(funcid, ChildFuncID, requirementid) {
        let self = this;
        let requirementdetail = null;
        self.Funcs.forEach(function (value, index) {
            //查询到Func
            if (funcid == self.Funcs[index].FuncID) {
                let findedfunc = value;
                findedfunc.children.forEach(function (chvalue, index) {
                    if (chvalue.ChildFuncID == ChildFuncID) {
                        let findedChildfunc = chvalue;
                        findedChildfunc.children.forEach(function (reqvalue, index) {
                            if (reqvalue.RequireMentID == requirementid) {
                                let requirement = reqvalue;

                                let reqdetail = JSON.parse(JSON.stringify(self.RequireMentDetail));
                                reqdetail.RequireMentDetailID = (new GenGid()).NewGuid16();
                                reqdetail.RequireMentID = requirement.RequireMentID;

                                requirement.RequireMentDetail = reqdetail;
                                findedChildfunc.children.push(req);
                                findedfunc.children.push(findedChildfunc);

                                requirementdetail = reqdetail;

                            }
                        })
                    }
                })
            }
        })
        return requirementdetail;
    }
}
export default RequireModel;