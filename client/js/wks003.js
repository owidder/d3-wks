'use strict';

/* global d3 */

bottle.factory("wks", function (container) {

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    function drawLinks(links) {
    }

    function drawTexts(nodes) {
    }

    function drawNodes(nodes) {
        var gNodes = d3.select("g.nodes");
        var selectionWithData = gNodes.selectAll("circle.node")
            .data(nodes, function (d) {
                return d.name;
            });

        selectionWithData.enter()
            .append("circle")
            .attr("class", function (d) {
                var classes = "node forlegend";
                if(d.depth == 0) {
                    return classes + " root";
                }
                return classes;
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return color(d.folder);
            })
            .attr("_legend", function (d) {
                return d.name + " (" + d.depth + ")";
            })
            .call(stuff.drag);

        selectionWithData.exit().remove();
    }

    function updateLinks() {
    }

    function updateNodes() {
        var gNodes = d3.select("g.nodes");
        gNodes.selectAll("circle.node")
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            });
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