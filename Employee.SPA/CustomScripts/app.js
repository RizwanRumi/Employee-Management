(function(){
	'use strict';



angular.module('MyApp', ['ui.router', 'MyApp.contacts.service','ngAnimate'])
.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  ])
.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
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
		
			abstract: true,
						
            url: '',
            
			templateUrl: 'contacts.html',
			
			 // resolve: {
             // contactlists: ['ContactService',
               // function(GetList){
                 // return GetList.all();
               // }]
             // },
		    // controller: ['$scope', '$http', 'contactlists',  function($scope, $http, contactlists) {
			controller: ['$scope', '$http',  function($scope, $http) {
    
						$scope.Name = "Contact";
						$scope.ContactList = [];
						
						$scope.AlphabetList =[];
						
						for(var i=65; i<91; i++)
						{
							var alp = String.fromCharCode(i);
							$scope.AlphabetList.push(alp);	
						}
						
						
						// $scope.initialCourse = 0;

    
						// var count = -20;
						
						// var scontroller = new ScrollMagic.Controller();

						// var scene = new ScrollMagic.Scene({ triggerElement: ".dynamicContent #loader", triggerHook: "onEnter" })
						// .addTo(scontroller)
						// .on("enter", function () {
							// if (!$("#loader").hasClass("active")) {
								// $("#loader").addClass("active");
								// setTimeout(addContact, 1000, count+=20);
							// }
						// });

						// function addContact(amount) {
						   
							// $scope.response = null;

							// $http({ method: 'GET', url: "http://localhost:29265/employee/search?val="+amount})
								// .then(function(response) {
										
									// for (var i = 0; i < response.data.length; i++) {
										// $scope.ContactList.push(response.data[i]);
									// }
									// scene.update();
									// $("#loader").removeClass("active");
								// }, function(response) {
									// alert(response);
								// });                      
						// };


						
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
		
		.state('contacts.list', {

          // Using an empty url means that this child state will become active
          // when its parent's url is navigated to. Urls of child states are
          // automatically appended to the urls of their parent. So this state's
          // url is '/contacts' (because '/contacts' + '').
           url: '',

          // IMPORTANT: Now we have a state that is not a top level state. Its
          // template will be inserted into the ui-view within this state's
          // parent's template; so the ui-view within contacts.html. This is the
          // most important thing to remember about templates.
           templateUrl: 'contacts.list.html',
		   
		   resolve: {
             contactlists: ['ContactService',
               function(GetList){
                 return GetList.all();
               }]
            },
			
		   controller: ['$scope', '$http', 'contactlists', function($scope, $http, contactlists) {
    					
						$scope.ContactList = [];
						
						$scope.rows = contactlists.length;	
						
						var count = -20;
						
						var scontroller = new ScrollMagic.Controller();

						var scene = new ScrollMagic.Scene({ triggerElement: ".dynamicContent #loader", triggerHook: "onEnter" })
						.addTo(scontroller)
						.on("enter", function () {
							 if ($scope.ContactList.length < parseInt($scope.rows)) {
								if (!$("#loader").hasClass("active")) {
									$("#loader").addClass("active");
									setTimeout(addContact, 1000, count+=20);
								} 
							 }							
						});

						function addContact(amount) {
						   
							$scope.response = null;

							$http({ method: 'GET', url: "http://localhost:29265/employee/search?val="+amount})
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
		
		// .state('contacts.detail', {

          // Urls can have parameters. They can be specified like :param or {param}.
          // If {} is used, then you can also specify a regex pattern that the param
          // must match. The regex is written after a colon (:). Note: Don't use capture
          // groups in your regex patterns, because the whole regex is wrapped again
          // behind the scenes. Our pattern below will only match numbers with a length
          // between 1 and 4.

          // Since this state is also a child of 'contacts' its url is appended as well.
          // So its url will end up being '/contacts/{contactId:[0-9]{1,4}}'. When the
          // url becomes something like '/contacts/42' then this state becomes active
          // and the $stateParams object becomes { contactId: 42 }.
          // url: '/contact/:contactId',

          // If there is more than a single ui-view in the parent template, or you would
          // like to target a ui-view from even higher up the state tree, you can use the
          // views object to configure multiple views. Each view can get its own template,
          // controller, and resolve data.

          // View names can be relative or absolute. Relative view names do not use an '@'
          // symbol. They always refer to views within this state's parent template.
          // Absolute view names use a '@' symbol to distinguish the view and the state.
          // So 'foo@bar' means the ui-view named 'foo' within the 'bar' state's template.
          
              // templateUrl: 'contacts.detail.html',
              // controller: ['$scope','$http', '$stateParams',
                // function (  $scope, $http,  $stateParams) {
                 // $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
				 
				  // $http.get("http://localhost:29265/employee/details/"+$stateParams.contactId)
							// .success(function (data) {
								// $scope.Contact = data;
								
							// })
							// .error(function(data) {
								// alert("Server Error!");
							// }); 
                // }]
            
        // })
        
	   
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
							.then(function (response) {
								$scope.Contact = response.data;
								
							}); 
                 // $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
                }]
            //}
			
        })
		
		.state('contacts.sorted', {
			
			url: '/contacts/:charId',		
			
			templateUrl: 'contacts.sorted.html',		
			

			controller: ['$scope', '$http' , '$stateParams', 
                function (  $scope, $http, $stateParams) {							

				    $scope.ContactList = [];
					
					$scope.SortedName = $stateParams.charId;
					
					$scope.rows = 126	
       
	
						var count = -20;
						
						var scontroller = new ScrollMagic.Controller();

						var scene = new ScrollMagic.Scene({ triggerElement: ".dynamicContent #loader", triggerHook: "onEnter" })
						.addTo(scontroller)
						.on("enter", function () {
							//if ($scope.ContactList.length < parseInt($scope.rows)) {								
								if (!$("#loader").hasClass("active")) {
									$("#loader").addClass("active");
									setTimeout(addContact, 1000, count+=20);
								}
							//}
						});

						function addContact(amount) {
						   
							$scope.response = null;

							$http({ method: 'GET', url: "http://localhost:29265/employee/search?val="+amount+"&name="+$stateParams.charId})
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

						// $http.get("http://localhost:29265/employee/details/"+$stateParams.contactId)
							// .success(function (data) {
								// $scope.Contact = data;
								
							// })
							// .error(function(data) {
								// alert("Server Error!");
							// });   
                 // $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
                }]
            //}
		})

		.state('addcontact', {
			
		    url: '/create',
			
			templateUrl: 'createcontact.html',
			
			controller: ['$scope','$http','$state', function($scope,$http,$state) {
				$scope.new = {
					Contact: {}
				};
				
				$scope.CreateContact = function () {
					if($scope.new.Contact != null) {
						$http.post('http://localhost:29265/Employee/Create', $scope.new.Contact)
						.then(function (data) {
							$scope.new.Contact = {};							
							$state.go('contacts.list');
							
						});
					}
				};
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
							.then(function (response) {
								$scope.Contact = response.data;
								
							});   
                    
					$scope.UpdateContact = function(item)
					{						
						$http.post('http://localhost:29265/employee/edit', item)
							.then(function (data) {
							 
								$state.go('details', $stateParams); 
							 
							
								
							});   
					}
                }]
		})
		
       
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


})();