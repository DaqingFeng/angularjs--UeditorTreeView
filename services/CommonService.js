
class CommonService {
    constructor($q, $http) {
        this.$q = $q;
        this.$http = $http;
    }

    queryUserInfo(url, username, requestData = {}) {
        const deferred = this.$q.defer();
        this.$http({
            method: 'GET',
            url: url + '?UserName=' + username,
            params: requestData,
            dataType: 'json'
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    UpdateUserInfo(url, requestData = {}, id) {
        const deferred = this.$q.defer();
        let method = 'POST';

        if (typeof id !== 'undefined') {
            url += '/' + id;
            method = 'PUT'
        }
        this.$http({
            method: method,
            url: url,
            data: requestData
        }).success(function (data) {
            deferred.resolve(data);

        }).error(function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
}

CommonService.$inject = ['$q', '$http'];
export default CommonService;