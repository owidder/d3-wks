var stuff = new function() {

    this.drag = function(selection) {
        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        selection.call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    };

    this.filterNodesFromLinks = function(links, nodes) {
        var filteredNodes = [];
        links.forEach(function (link) {
            var source = nodes.find(function (d) {
                if(typeof (link.source) == 'string') {
                    return d.name == link.source;
                }
                else {
                    return d.name == link.source.name;
                }
            });
            var target = nodes.find(function (d) {
                if(typeof (link.target) == 'string') {
                    return d.name == link.target;
                }
                else {
                    return d.name == link.target.name;
                }
            });
            if (filteredNodes.indexOf(source) < 0) {
                filteredNodes.push(source);
            }
            if (filteredNodes.indexOf(target) < 0) {
                filteredNodes.push(target);
            }
        });

        return filteredNodes;
    };

    this.sortedArrayOfValues = function(arr, attr) {
        var values = [];
        arr.forEach(function(obj) {
            values.push(obj[attr]);
        });

        return values.sort(function(a, b) {
            return a - b;
        });
    };

    this.valueQuantile = function(obj, q, attr) {
        var sortedArrayOfValues = this.sortedArrayOfValues(obj, attr);
        return d3.quantile(sortedArrayOfValues, q);
    };
};


