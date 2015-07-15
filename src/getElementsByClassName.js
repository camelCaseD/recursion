// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, node) {
  // Assumes document.body when no node is given
  node = node ? node : document.body;

  var matches  = [];

  // Dead end
  if (node.childNodes.length === 0 && !node.classList.contains(className)) {
    return matches;
  } else {
    // Is this node the body tag and have the className
    if (node.classList.contains(className) && node.tagName === "BODY") {
      matches.push(node);
    }

    // Get all the child nodes of the current node
    var children = node.childNodes;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];

      // Is the node a DOM element
      if (child.nodeType === Node.ELEMENT_NODE) {
        // Does the node have className
        if (child.classList.contains(className)) {
          matches.push(child);
        }

        // Get the child elements of the child node that have the className
        matches = matches.concat(getElementsByClassName(className, child));
      }
    }
    
    return matches;
  }
};
