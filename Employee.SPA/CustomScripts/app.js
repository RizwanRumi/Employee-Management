


angular.module('MyApp', ['ui.router'])



.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

   
      $urlRouterProvider

        // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
        // Here we are just setting up some convenience urls.
        .when('/c?id', '/contacts/:id')
        .when('/user/:id', '/contacts/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/');


      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        // HOME STATES AND NESTED VIEWS ========================================
        .state('contacts', {	
						
            url: '',
            
			templateUrl: 'contacts.html',
			
			 // resolve: {
             // contactlists: ['Test',
               // function(GetList){
                 // return GetList.all();
               // }]
             // },
		    // controller: ['$scope', '$http', 'contactlists',  function($scope, $http, contactlists) {
			controller: ['$scope', '$http',  function($scope, $http) {
    
						$scope.Name = "Contact";
						$scope.ContactList = [];
						
						
						$scope.Alphabetlist = [];

						for (var i = 1; i <= 26; i++) {
							var res = String.fromCharCode(64 + parseInt(i));
							$scope.Alphabetlist.push(res);
					    }

    
						var count = -10;
						var name = "";
						
						var scontroller = new ScrollMagic.Controller();

						var scene = new ScrollMagic.Scene({ triggerElement: ".dynamicContent #loader", triggerHook: "onEnter" })
						.addTo(scontroller)
						.on("enter", function () {
							if (!$("#loader").hasClass("active")) {
								$("#loader").addClass("active");
								setTimeout(addContact, 1000, count+=10,name);
							}
						});

						function addContact(amount,name) {
						   
							$scope.response = null;

							$http({ method: 'GET', url: "http://localhost:29265/employee/search?val="+amount+"&name="+name})
								.then(function(response) {
									
										for (var i = 0; i < response.data.length; i++) {
											$scope.ContactList.push(response.data[i]);
										}
										scene.update();
										$("#loader").removeClass("active");										

								}, function(response) {
									alert(response);
								});                      
						};


						$scope.test = function(item)
						{
							name = item;
							$scope.ContactList = [];
						
							addContact(0,name);
						}
						//$scope.ContactList = contactlists;
							
							
						//var uri = "http://localhost:29265/employee/index";


						//$http.get(uri)
						//	.success(function (data) {
						//		$scope.ContactList = data;
								
						//	})
						//	.error(function(data) {
						//		alert("Server Error!");
						//	});   
							
			}]

        })
        
	
        // You can have unlimited children within a state. Here is a second child
        // state within the 'contacts' parent state.
        .state('details', {
         
            url: '/contact/:contactId',
       
            templateUrl: 'detailscontact.html',

			controller: ['$scope', '$http' , '$stateParams', 
                function (  $scope, $http,  $stateParams) {
					//$scope.id = $stateParams.contactId;
					//alert($stateParams.contactId);				


						$http.get("http://localhost:29265/employee/details/"+$stateParams.contactId)
							.success(function (data) {
								$scope.Contact = data;
								
							})
							.error(function(data) {
								alert("Server Error!");
							});   
                 // $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
                }]
            //}
			
        })

		.state('contact', {
		    url: '/create',
			templateUrl: 'CreateContact.html',
			controller: ['$scope', '$http' ,'$state', '$stateParams', 
                function (  $scope, $http, $state, $stateParams) { 

                	 $scope.new = {
							        Contact: {}
							    };


				    $scope.addContact = function()
				    {
				    	if($scope.new.Contact.FirstName != null && $scope.new.Contact.LastName != null && $scope.new.Contact.Phone != null && 
				    	   $scope.new.Contact.Email != null && $scope.new.Contact.Organization != null && $scope.new.Contact.Title != null && 
				    	   $scope.new.Contact.Address != null)
				    	{
				    		$http.post("http://localhost:29265/employee/Create",$scope.new.Contact);
				    		$state.go('contacts');

				    	}
				    }			    

                }]
		})
		
		.state('editcontact', {
			url: '/edit/:contactId',
			templateUrl: 'editcontact.html',
			controller: ['$scope', '$http' ,'$state', '$stateParams', 
                function (  $scope, $http, $state, $stateParams) {
					//$scope.id = $stateParams.contactId;
					//alert($stateParams.contactId);				


						$http.get("http://localhost:29265/employee/details/"+$stateParams.contactId)
							.success(function (data) {
								$scope.Contact = data;
								
							})
							.error(function(data) {
								alert("Server Error!");
							});   
                    
					$scope.UpdateContact = function(item)
					{						
						$http.post('http://localhost:29265/employee/edit', item)
							.success(function (data) {
							 
								$state.go('details', $stateParams); 
							 
							
								
							})
							.error(function(data) {
								alert("Server Error!");
							});   
					}
                }]
		});

			
       
    }
  ]);

  /*.state('editcontact', {
			url: '/contact/:contactId'
			templateUrl: 'editcontact.html',
			controller: ['$scope', '$http' , '$stateParams', 
                function (  $scope, $http,  $stateParams) {
					//$scope.id = $stateParams.contactId;
					//alert($stateParams.contactId);				


						$http.get("http://localhost:29265/employee/details/"+$stateParams.contactId)
							.success(function (data) {
								$scope.Contact = data;
								
							})
							.error(function(data) {
								alert("Server Error!");
							});   
                 // $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
                }]
		})*/