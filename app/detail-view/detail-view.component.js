angular.
  module('detailView').
  component('detailView', {
    templateUrl: 'detail-view/detail-view.template.html',
    controller: ["$http", "$routeParams",
	    	function DetailViewController($http, $routeParams) {
					//Pull in string date from route params.
					this.localeDate = $routeParams.localeDate;
					var self = this; //Hooray for JavaScript scoping when handling events!
					//Load JSON associated with that string date and get coffee data.
					$http.get($routeParams.localeDate + ".json").then(function(response) {
						self.coffees = response.data.coffees;
						console.log(self.coffees.length);
					});
				}
			]
  });
