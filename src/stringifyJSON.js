// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  var json = [];
  if (obj === undefined || typeof(obj) === 'function') {
    return;
  } else if (typeof(obj) === 'string') {
    return '"' + obj + '"';
  } else if (obj === null || typeof(obj) !== 'object'){
    return String(obj);
  } else if (Array.isArray(obj)) {
    for (var i = 0;i < obj.length;i++) {
      json.push(stringifyJSON(obj[i]));
    }

    return '[' + json.join(',') + ']';
  } else {
    var keys = Object.keys(obj);
    for (var key in obj) {
      var stringified = stringifyJSON(obj[key]);

      if (stringified !== undefined) {
        json.push('"' + key + '":');
        json.push(stringified);

        if (keys.length > 1 && keys.indexOf(key) !== keys.length - 1) {
          json.push(',');
        }
      }
    }

    return '{' + json.join('') + '}';
  }
};
