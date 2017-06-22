'use strict';

/* global d3 */

bottle.factory("wks", function (container) {

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    function drawLinks(links) {
        var gLinks = d3.select("g.links");
        var selectionWithData = gLinks.selectAll("line.link")
            .data(links, function (d) {
                return d.source + "#" + d.target;
            });

        selectionWithData.enter()
            .append("line")
            .attr("class", "link")
            .style("stroke-width", function (d) {
                return Math.sqrt(d.count / 50)
            });

        selectionWithData.exit().remove();
    }

    function drawTexts(nodes) {
        var gTexts = d3.select("g.texts");
        var selectionWithData = gTexts.selectAll("text.node")
            .data(nodes, function (d) {
                return d.name;
            });

        selectionWithData.enter()
            .append("text")
            .attr("class", "node")
            .text(function (d) {
                return d.shortname;
            });

        selectionWithData.exit().remove();
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
        var gLinks = d3.select("g.links");
        gLinks.selectAll("line.link")
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });
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
        var gTexts = d3.select("g.texts");
        gTexts.selectAll("text.node")
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", function (d) {
                return d.y;
            });
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