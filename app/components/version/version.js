'use strict';

angular.module('dailyGrinds.version', [
  'dailyGrinds.version.interpolate-filter',
  'dailyGrinds.version.version-directive'
])

.value('version', '0.1');
