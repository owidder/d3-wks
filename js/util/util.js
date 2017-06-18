'use strict';

/* global bottle */
/* global _ */
/* global bottle */

bottle.factory("util", function (container) {
    var util = {};

    /**
     * from: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
     */
    util.param = function (name, defaultVal) {
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return defaultVal;
        if (!results[2]) return defaultVal;
        return _.isEmpty(results[2]) ? defaultVal : decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    util.getLongestString = function (arrayOfStrings) {
        var max = 0;
        arrayOfStrings.forEach(function (string) {
            if (!_.isEmpty(string) && string.length > max) {
                max = string.length;
            }
        });

        return max;
    };

    util.copyAttributes = function (attributes, src, dest) {
        attributes.forEach(function (name) {
            dest[name] = src[name];
        });
    };

    util.uid = function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4();
    };

    return util;
});
