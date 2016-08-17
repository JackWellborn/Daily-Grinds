angular.
  module('detailView').
  component('detailView', {
    templateUrl: 'detail-view/detail-view.template.html',
    controller: ["$http", "$routeParams",
	    	function DetailViewController($http, $routeParams) {
					this.localeDate = new Date($routeParams.localeDate.replace(/-/g,"/")).toDateString();
					var self = this;
					$http.get($routeParams.localeDate + ".json").then(function(response) {
						self.coffees = response.data.coffees;
						console.log(self.coffees.length);
					});
				}
			]
  });
