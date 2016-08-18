angular.
  module('calendarView').
  component('calendarView', {
    templateUrl: 'calendar-view/calendar-view.template.html',
    controller: ["$http", "$window",
	    	function CalendarViewController($http, $window) {
					//Create a calendar JSON Object from a specific start date. Ideally, the start date would reflect the data.
					function createCalendarObjectStartingFrom(startDate, data){
						var calendar = {years:[]};
						var thisDate = new Date();
						var thisYear, thisMonth;
						//Loop through days to complete the month.
						var currentMonth = thisDate.getMonth();
						while(thisDate.getMonth() === currentMonth){
							thisDate.setDate(thisDate.getDate() + 1);
						}
						//Once the next month is detected, the month is complete and we need to a walk back a day.
						thisDate.setDate(thisDate.getDate() - 1);
						//Loop backwards until we reach the the start date.
						while(thisDate >= startDate){
							var yearObj, monthObj, dayObj;
							//If the stored year does not match up with the dates year, create new year object, push that year object to the calendar, and update the stored year.
							if(thisYear !== thisDate.getFullYear()){
								yearObj = getYearObj(thisDate);
								calendar.years.push(yearObj);
								thisYear = thisDate.getFullYear();
							}
						  //If the stored month does not match up with the dates month, create new month object, push that month object to the year object, and update the stored month.
							if(thisMonth !== thisDate.getMonth()){
								monthObj = getMonthObj(thisDate);
								yearObj.months.push(monthObj);
								thisMonth = thisDate.getMonth();
							}
							//Create new day object.
							var dayObj = getDayObj(thisDate);
							
							//Check coffee data to see if an entry exists for this date. If so, add coffees to the day object.
							if(typeof data[dayObj.localeDate] !== "undefined"){
								dayObj.coffees = data[dayObj.localeDate];
							}
							//Push the day object to the month object
							monthObj.days.push(dayObj);
							
							//Because calendars align columns to days of the week (e.g. Sunday, Monday, etc...) and also because months start on different days of the week, days need to be added to pad out the month/
							//If this is the first day of the month and this isn't Sunday, loop backward adding zero/negative days to this month until Sunday is reached.
							if(thisDate.getDate() === 1 && thisDate.getDay() !== 0){
								var weekDate = new Date(thisDate);
								weekDate.setDate(weekDate.getDate()-1);
								while(weekDate.getDay() !== 6){
									monthObj.days.push({iso:(weekDate.getDay()*-1),name:''}); // Add negative date for extraneous days. Extraneous days also don't have names.
									weekDate.setDate(weekDate.getDate()-1);
								}
							}
							
							//Continue calendar loop.
							thisDate.setDate(thisDate.getDate() - 1);
						}	
						return calendar;
					}
					
					//Creates our Year Object
					function getYearObj(date){
						return {iso:date.getFullYear().toString(), months:[]};
					}
					
					//Creates our Month Object
					function getMonthObj(date){
						var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
						var monthName = monthNames[date.getMonth()];
						var isoMonth = isoDayOrMonth(date.getMonth() + 1);
						return {name:monthName, iso:isoMonth, days:[], extraDays:[]};
					}
					
					//Creates our Day Object
					function getDayObj(date){
						var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
						var dayName = dayNames[date.getDay()];
						var isoDay = isoDayOrMonth(date.getDate().toString());
						return {name:dayName, iso:isoDay, coffees:[], localeDate:date.toISOString().split("T")[0]};
					}
					
					//Add zeros to single digit days or months to make them pretty. May be extrannous at this point.
					function isoDayOrMonth(num){
						dayOrMonth = num.toString();
						if(dayOrMonth.length === 1){ dayOrMonth = 0 + dayOrMonth;}
						return dayOrMonth;
					}
					var self = this; //Hooray for JavaScript scoping when handling events!
					
					//Load our coffee data, then create our calendary object to compare it too.
					$http.get('coffees.json').then(function(response) {
						self.coffees = response.data;
						self.calendar = createCalendarObjectStartingFrom(new Date(2016,0,1), response.data);
						
					});
					
					//Method for navigating to detail pages.
					self.getDetails = function getDetails(localeDate) {
						$window.location.href='#!/details/' + localeDate;
					}
				}
			]
  });
