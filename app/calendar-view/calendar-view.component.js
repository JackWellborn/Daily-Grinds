angular.
  module('calendarView').
  component('calendarView', {
    templateUrl: 'calendar-view/calendar-view.template.html',
    controller: ["$http", "$window",
	    	function CalendarViewController($http, $window) {
					function createCalendarObjectStartingFrom(startDate = new Date(2016,0,1), data){
						var calendar = {years:[]};
						var thisDate = new Date();
						var thisYear, thisMonth;
						while(thisDate.getDate() !== 1){
							thisDate.setDate(thisDate.getDate() + 1);
						}
						thisDate.setDate(thisDate.getDate() - 1);
						while(thisDate >= startDate){
							var yearObj, monthObj, dayObj;
							if(thisYear !== thisDate.getFullYear()){
								yearObj = getYearObj(thisDate);
								calendar.years.push(yearObj);
								thisYear = thisDate.getFullYear();
							}
							if(thisMonth !== thisDate.getMonth()){
								monthObj = getMonthObj(thisDate);
								yearObj.months.push(monthObj);
								thisMonth = thisDate.getMonth();
							}
							var dayObj;
							dayObj = getDayObj(thisDate);
							console.log(dayObj);
							if(typeof data[dayObj.localeDate] !== "undefined"){
								dayObj.coffees = data[dayObj.localeDate];
							}
							monthObj.days.push(dayObj);
							
							if(thisDate.getDate() === 1 && thisDate.getDay() !== 0){
								var weekDate = new Date(thisDate);
								weekDate.setDate(weekDate.getDate()-1);
								while(weekDate.getDay() !== 6){
									monthObj.days.push({iso:(weekDate.getDay()*-1)});
									weekDate.setDate(weekDate.getDate()-1);
								}
							}
							thisDate.setDate(thisDate.getDate() - 1);
						}	
						return calendar;
					}
					function getYearObj(date){
						return {iso:date.getFullYear().toString(), months:[]};
					}
					function getMonthObj(date){
						var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
						var monthName = monthNames[date.getMonth()];
						var isoMonth = isoDayOrMonth(date.getMonth() + 1);
						return {name:monthName, iso:isoMonth, days:[], extraDays:[]};
					}
					function getDayObj(date){
						var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
						var dayName = dayNames[date.getDay()];
						var isoDay = isoDayOrMonth(date.getDate().toString());
						return {name:dayName, iso:isoDay, coffees:[], localeDate:date.toLocaleDateString().replace(/\//g,"-")};
					}
					var self = this;
					$http.get('coffees.json').then(function(response) {
						self.coffees = response.data;
						self.calendar = createCalendarObjectStartingFrom(new Date(2016,0,1), response.data);
						
					});
					self.getDetails = function getDetails(localeDate) {
						$window.location.href='#!/details/' + localeDate;
					}
				}
			]
  });
