'use strict';

/* global d3 */

bottle.factory("corona", function (container) {

    var SimplePromise = container.SimplePromise;

    var SUFFIX = ".utf8";

    function removeSuffix(name) {
        return name.substr(0, name.length - SUFFIX.length);
    }

    function findNode(relPath, _nodes) {
        return _nodes.find(function (node) {
            return node.name == relPath;
        })
    }

    function findLink(fromRelPath, toRelPath, _links) {
        return _links.find(function (link) {
            return (link.source == fromRelPath && link.target == toRelPath) || (link.target == fromRelPath && link.source == toRelPath);
        });
    }

    function updateDepth(relPath, depth, _nodes) {
        var existingNode = findNode(relPath, _nodes);
        if(existingNode != null) {
            if(existingNode.depth > depth) {
                existingNode.depth = depth;
            }
        }
    }

    function addNode(relPath, depth, _nodes) {
        var existingNode = findNode(relPath, _nodes);
        if (existingNode == null) {
            var pathParts = relPath.split("/");
            var indexOfLastPart = pathParts.length - 1;
            var filename = pathParts[indexOfLastPart];
            var folder = pathParts.length > 1 ? pathParts[1] : pathParts[0];
            _nodes.push({
                shortname: filename,
                depth: depth,
                name: relPath,
                folder: (folder == filename ? "." : folder)
            })
        }
    }

    function addLink(fromRelPath, toRelPath, value, _links) {
        if (_.isEmpty(findLink(fromRelPath, toRelPath, _links))) {
            _links.push({
                source: fromRelPath,
                target: toRelPath,
                count: value * 100
            });
        }
    }

    function _getCoronaRecursive(index, fromRelPath, currentDepth, maxDepth, _nodes, _links, _processed) {
        _processed.push(fromRelPath);

        addNode(fromRelPath, currentDepth, _nodes);

        if (currentDepth < maxDepth) {
            var entry = index[fromRelPath];
            if (entry != null) {
                _.forOwn(entry, function (value, toRelPath) {
                    var toRelPathWithoutSuffix = removeSuffix(toRelPath);
                    addLink(fromRelPath, toRelPathWithoutSuffix, value, _links);
                    updateDepth(toRelPathWithoutSuffix, currentDepth+1, _nodes);
                    if (_processed.indexOf(toRelPathWithoutSuffix) < 0) {
                        _getCoronaRecursive(index, toRelPathWithoutSuffix, currentDepth + 1, maxDepth, _nodes, _links, _processed);
                    }
                });
            }
        }
    }

    function getCorona(index, relPath, maxDepth) {
        var _links = [];
        var _nodes = [];

        _getCoronaRecursive(index, relPath, 0, maxDepth, _nodes, _links, []);
        return {
            nodes: _nodes,
            links: _links
        }
    }

    function readCorona(path, depth) {
        var simplePromise = new SimplePromise();

        d3.json('data/index.json', function (error, data) {
            var corona = getCorona(data, path, depth);
            simplePromise.resolve(corona);
        });

        return simplePromise.promise;
    }

    return {
        readCorona: readCorona
    }
});