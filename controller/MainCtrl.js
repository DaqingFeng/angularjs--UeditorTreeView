
class MainCtrl {
    constructor($scope, CommonService) {
        this.$scope = $scope;
        this.$scope.url = 'https://github.com/DaqingFeng';
        this.$scope.UerInfo = { UserName: '' };
        this.$scope.GetUserInfo = (x) => this.GetUserInfo(x);
        this.Service = CommonService;
    }

    GetUserInfo(x) {
        console.log(x);
        this.Service.queryUserInfo('/', x).then(function (rst) {
            console.log(rst);
        });
    }
}
export default MainCtrl;