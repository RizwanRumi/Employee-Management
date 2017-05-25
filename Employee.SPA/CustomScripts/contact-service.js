angular.module('MyApp.contacts.service', [

])

// A RESTful factory for retrieving contacts from 'contacts.json'
.factory('Test', ['$http', function ($http) {
  var path = 'http://localhost:29265/employee/index';
  var listOfContect = $http.get(path).then(function (resp) {
    return resp.data;
  });

  var factory = {};
  factory.all = function () {
    return listOfContect;
  };
  
  return factory;
}]);
