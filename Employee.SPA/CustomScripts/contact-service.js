angular.module('MyApp.contacts.service', [

])


// .factory('ContactService', ['$http', function ($http) {
  // return {
    //Util for finding an object by its 'id' property among an array
    // all: function all() {
     // var listOfContect = $http.get('http://localhost:29265/employee/index').then(function (data) {
		 // return data.data;
		
	  // });
	  // return listOfContect;
    // }

   
  // };
// }]);


// A RESTful factory for retrieving contacts from 'contacts.json'
.factory('ContactService', ['$http', function ($http) {
	
  var path = 'http://localhost:29265/employee/index';
  var listOfContect = $http.get(path).then(function (resp) {
    return resp.data;
  });

  var factory = {};
  factory.all = function () {
    return listOfContect;
  };
  
  factory.getSorted = function(val)
  {
	  $http.get('http://localhost:29265/employee/GetSelectedTotalRows?fName='+val).then(function (resp) {
		return resp.data;
	  });
  }  
  return factory;
}]);
