'use strict';

/* global d3 */

bottle.factory("wks", function (container) {

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    function drawLinks(links) {
    }

    function drawTexts(nodes) {
    }

    function drawNodes(nodes) {
    }

    function updateLinks() {
    }

    function updateNodes() {
    }

    function updateTexts() {
    }

    function ticked(data) {
        updateNodes();
        updateTexts();
        updateLinks();
    }

    return {
        drawNodes: drawNodes,
        drawLinks: drawLinks,
        drawTexts: drawTexts,
        ticked: ticked
    }
});