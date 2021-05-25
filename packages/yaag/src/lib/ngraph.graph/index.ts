import {eventify} from '../ngraph.events/index';

import type { EventedType } from '../ngraph.events/index';

export type NodeId = string | number
export type LinkId = string

export interface Link<Data = any> {
    id: LinkId,
    fromId: NodeId,
    toId: NodeId,
    data: Data
}

export interface Node<Data = any> {
    id: NodeId,
    links: Link[],
    data: Data
}

export interface Graph<NodeData = any, LinkData = any> {
    addNode: (node: NodeId, data?: NodeData) => Node<NodeData>
    addLink: (from: NodeId, to: NodeId, data?: LinkData) => Link<LinkData>
    removeLink: (link: Link<LinkData>, otherId?:NodeId) => boolean
    removeNode: (nodeId: NodeId) => boolean
    getNode: (nodeId: NodeId) => Node<NodeData> | undefined
    hasNode: (nodeId: NodeId) => Node<NodeData> | undefined
    getLink: (fromNodeId: NodeId, toNodeId: NodeId) => Link<LinkData> | null
    hasLink: (fromNodeId: NodeId, toNodeId: NodeId) => Link<LinkData> | null
    getNodesCount: () => number
    getLinksCount: () => number
    getNodeCount: () => number
    getLinkCount: () => number
    getLinks: (nodeId: NodeId) => Link<LinkData>[] | null
    forEachNode: (callbackPerNode: (node: Node<NodeData>) => void | undefined | null | boolean) => void
    forEachLinkedNode: (nodeId: NodeId, callbackPerNode: (node: Node<NodeData>, link: Link<LinkData>) => void, oriented: boolean) => void
    forEachLink: (callbackPerLink: (link: Link<LinkData>) => void) => void
    beginUpdate: () => void
    endUpdate: () => void
    clear: () => void

}



/**
 * @fileOverview Contains definition of the core graph object.
 */

// TODO: need to change storage layer:
// 1. Be able to get all nodes O(1)
// 2. Be able to get number of links O(1)

/**
 * @example
 *  var graph = require('ngraph.graph')();
 *  graph.addNode(1);     // graph has one node.
 *  graph.addLink(2, 3);  // now graph contains three nodes and one link.
 *
 */
//export default createGraph;



/**
 * Creates a new graph
 */
// export function createGraph<NodeData = any, LinkData = any>(options?: { multigraph: boolean }): Graph<NodeData, LinkData> & EventedType

export  function createGraph() //<NodeData = any, LinkData = any>()//: Graph<NodeData, LinkData> 

{

  const nodes = new Map();
  const links = new Map();
  const multiEdges = {};
  let suspendEvents = 0;

  //const createLink = options.multigraph ? createUniqueLink : createSingleLink;
  const createLink = createSingleLink;
  const changes = [];

  let recordLinkChange = noop;
  let recordNodeChange = noop;
  let enterModification = noop;
  let exitModification = noop;

  // this is our public API:
  const graphPart = {
    addNode,
    addLink,
    removeLink,
    removeNode,
    getNode,
    getNodeCount,
    getLinkCount,
    getEdgeCount: getLinkCount,
    getLinksCount: getLinkCount,
    getNodesCount: getNodeCount,
    getLinks,
    forEachNode,
    forEachLinkedNode,
    forEachLink,
    beginUpdate: enterModification,
    endUpdate: exitModification,
    clear,
    hasLink: getLink,
    hasNode: getNode,
    getLink
  };

  // this will add `on()` and `fire()` methods.
  eventify(graphPart);
  monitorSubscribers();
  return graphPart;

  function monitorSubscribers() {
    const realOn = graphPart.on;

    // replace real `on` with our temporary on, which will trigger change
    // modification monitoring:
    graphPart.on = on;

    function on(...args) {
      // now it's time to start tracking stuff:
      graphPart.beginUpdate = enterModification = enterModificationReal;
      graphPart.endUpdate = exitModification = exitModificationReal;
      recordLinkChange = recordLinkChangeReal;
      recordNodeChange = recordNodeChangeReal;

      // this will replace current `on` method with real pub/sub from `eventify`.
      graphPart.on = realOn;
      // delegate to real `on` handler:
      return realOn.apply(graphPart, args);
    }
  }

  function recordLinkChangeReal(link, changeType) {
    changes.push({
      link,
      changeType
    });
  }

  function recordNodeChangeReal(node, changeType) {
    changes.push({
      node,
      changeType
    });
  }

  function addNode(nodeId: NodeId, data?: any): Node {
    if (nodeId === undefined) {
      throw new Error('Invalid node identifier');
    }

    enterModification();

    let node = getNode(nodeId);
    if (!node) {
      node = new Node(nodeId, data);
      recordNodeChange(node, 'add');
    } else {
      node.data = data;
      recordNodeChange(node, 'update');
    }

    nodes.set(nodeId, node);

    exitModification();
    return node;
  }

  function getNode(nodeId) {
    return nodes.get(nodeId);
  }

  function removeNode(nodeId) {
    const node = getNode(nodeId);
    if (!node) {
      return false;
    }

    enterModification();

    const prevLinks = node.links;
    if (prevLinks) {
      prevLinks.forEach(removeLinkInstance);
      node.links = null;
    }

    nodes.delete(nodeId);

    recordNodeChange(node, 'remove');

    exitModification();

    return true;
  }


  function addLink(fromId, toId, data) {
    enterModification();

    const fromNode = getNode(fromId) || addNode(fromId);
    const toNode = getNode(toId) || addNode(toId);

    const link = createLink(fromId, toId, data);
    const isUpdate = links.has(link.id);

    links.set(link.id, link);

    // TODO: this is not cool. On large graphs potentially would consume more memory.
    addLinkToNode(fromNode, link);
    if (fromId !== toId) {
      // make sure we are not duplicating links for self-loops
      addLinkToNode(toNode, link);
    }

    recordLinkChange(link, isUpdate ? 'update' : 'add');

    exitModification();

    return link;
  }

  function createSingleLink(fromId, toId, data) {
    const linkId = makeLinkId(fromId, toId);
    const prevLink = links.get(linkId);
    if (prevLink) {
      prevLink.data = data;
      return prevLink;
    }

    return new Link(fromId, toId, data, linkId);
  }

  function createUniqueLink(fromId, toId, data) {
    // TODO: Find a better/faster way to store multigraphs
    let linkId = makeLinkId(fromId, toId);
    const isMultiEdge = multiEdges.hasOwnProperty(linkId);
    if (isMultiEdge || getLink(fromId, toId)) {
      if (!isMultiEdge) {
        multiEdges[linkId] = 0;
      }
      const suffix = `@${++multiEdges[linkId]}`;
      linkId = makeLinkId(fromId + suffix, toId + suffix);
    }

    return new Link(fromId, toId, data, linkId);
  }

  function getNodeCount() {
    return nodes.size;
  }

  function getLinkCount() {
    return links.size;
  }

  function getLinks(nodeId) {
    const node = getNode(nodeId);
    return node ? node.links : null;
  }

  function removeLink(link, otherId) {
    if (otherId !== undefined) {
      link = getLink(link, otherId);
    }
    return removeLinkInstance(link);
  }

  function removeLinkInstance(link) {
    if (!link) {
      return false;
    }
    if (!links.get(link.id)) return false;

    enterModification();

    links.delete(link.id);

    const fromNode = getNode(link.fromId);
    const toNode = getNode(link.toId);

    if (fromNode) {
      fromNode.links.delete(link);
    }

    if (toNode) {
      toNode.links.delete(link);
    }

    recordLinkChange(link, 'remove');

    exitModification();

    return true;
  }

  function getLink(fromNodeId, toNodeId) {
    if (fromNodeId === undefined || toNodeId === undefined) return undefined;
    return links.get(makeLinkId(fromNodeId, toNodeId));
  }

  function clear() {
    enterModification();
    forEachNode(({id}) => {
      removeNode(id);
    });
    exitModification();
  }

  function forEachLink(callback) {
    if (typeof callback === 'function') {
      const valuesIterator = links.values();
      let nextValue = valuesIterator.next();
      while (!nextValue.done) {
        if (callback(nextValue.value)) {
          return true; // client doesn't want to proceed. Return.
        }
        nextValue = valuesIterator.next();
      }
    }
  }

  function forEachLinkedNode(nodeId, callback, oriented) {
    const node = getNode(nodeId);

    if (node && node.links && typeof callback === 'function') {
      if (oriented) {
        return forEachOrientedLink(node.links, nodeId, callback);
      } else {
        return forEachNonOrientedLink(node.links, nodeId, callback);
      }
    }
  }

  // eslint-disable-next-line no-shadow
  function forEachNonOrientedLink(links, nodeId, callback) {
    let quitFast;

    const valuesIterator = links.values();
    let nextValue = valuesIterator.next();
    while (!nextValue.done) {
      const link = nextValue.value;
      const linkedNodeId = link.fromId === nodeId ? link.toId : link.fromId;
      quitFast = callback(nodes.get(linkedNodeId), link);
      if (quitFast) {
        return true; // Client does not need more iterations. Break now.
      }
      nextValue = valuesIterator.next();
    }
  }

  // eslint-disable-next-line no-shadow
  function forEachOrientedLink(links, nodeId, callback) {
    let quitFast;
    const valuesIterator = links.values();
    let nextValue = valuesIterator.next();
    while (!nextValue.done) {
      const link = nextValue.value;
      if (link.fromId === nodeId) {
        quitFast = callback(nodes.get(link.toId), link);
        if (quitFast) {
          return true; // Client does not need more iterations. Break now.
        }
      }
      nextValue = valuesIterator.next();
    }
  }

  // we will not fire anything until users of this library explicitly call `on()`
  // method.
  function noop(o?: Node|Link, s?:string) {}

  // Enter, Exit modification allows bulk graph updates without firing events.
  function enterModificationReal() {
    suspendEvents += 1;
  }

  function exitModificationReal() {
    suspendEvents -= 1;
    if (suspendEvents === 0 && changes.length > 0) {
      graphPart.fire('changed', changes);
      changes.length = 0;
    }
  }

  function forEachNode(callback) {
    if (typeof callback !== 'function') {
      throw new Error(`Function is expected to iterate over graph nodes. You passed ${callback}`);
    }

    const valuesIterator = nodes.values();
    let nextValue = valuesIterator.next();
    while (!nextValue.done) {
      if (callback(nextValue.value)) {
        return true; // client doesn't want to proceed. Return.
      }
      nextValue = valuesIterator.next();
    }
  }
}

/**
 * Internal structure to represent node;
 */
function Node(id, data) {
  this.id = id;
  this.links = null;
  this.data = data;
}

function addLinkToNode(node, link) {
  if (node.links) {
    node.links.add(link);
  } else {
    node.links = new Set([link]);
  }
}

/**
 * Internal structure to represent links;
 */
function Link(fromId, toId, data, id) {
  this.fromId = fromId;
  this.toId = toId;
  this.data = data;
  this.id = id;
}

function makeLinkId(fromId, toId) {
  return `${fromId.toString()}👉 ${toId.toString()}`;
}
