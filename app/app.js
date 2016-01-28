var statisticsApp = angular.module("statisticsApp", ['statisticsApp', 'angularUtils.directives.dirPagination']);

statisticsApp.config(function(paginationTemplateProvider) {
   paginationTemplateProvider.setPath('directive/pagination.tpl.html');
});

statisticsApp.directive("detail", function() {
    return {
        templateUrl: 'directive/detail.html'
    };
});