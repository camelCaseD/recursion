// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  // Initialize array of data that is going to be used
  var json = [];

  // undefined and functions aren't valid json values
  if (obj === undefined || typeof(obj) === 'function') {
    return;
  } else if (typeof(obj) === 'string') {
    // Strings need to be surrounded with double quotes to be valid JSON
    return '"' + obj + '"';
  } else if (obj === null || typeof(obj) !== 'object'){
    // Booleans and numbers can just be strings
    return String(obj);
  } else if (Array.isArray(obj)) {
    // Loop through each value of the array
    for (var i = 0;i < obj.length;i++) {
      // Push the stringified version of the value into the json array
      json.push(stringifyJSON(obj[i]));
    }

    // Convert json array to json string
    return '[' + json.join(',') + ']';
  } else {
    // keys var declared outside of loop for better memory usage
    var keys = Object.keys(obj);

    // Loop through obj
    for (var key in obj) {
      // Store stringified version of value for multiple usage
      var stringified = stringifyJSON(obj[key]);

      // If the stringified version of the object is undefined, we don't want it
      if (stringified !== undefined) {
        json.push('"' + key + '":');
        json.push(stringified);

        // Seperate with commas only if there is more than one and not the last
        if (keys.length > 1 && keys.indexOf(key) !== keys.length - 1) {
          json.push(',');
        }
      }
    }

    return '{' + json.join('') + '}';
  }
};
