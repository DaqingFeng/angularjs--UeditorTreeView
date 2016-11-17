class RequireMentService {
    constructor($q, $http) {
        this.$q = $q;
        this.$http = $http;
    }

    SaveRequire(content) {
        const deferred = this.$q.defer();
        this.$http({
            method: 'GET',
            url: '/SaveRequire',
            params: content,
            dataType: 'json'
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
}

RequireMentService.$inject = ['$q', '$http'];
export { RequireMentService };