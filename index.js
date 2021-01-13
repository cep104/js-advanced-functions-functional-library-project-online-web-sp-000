const fi = (function () {
  return {
    libraryMethod: function () {
      return "Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0";
    },

    each: function (data, callback) {
      if (!Array.isArray(data)) {
        //google how to get values of object
        let values = Object.values(data);
        for (let j = 0; j < values.length; j++) {
          // console.log(values);
          callback(values[j]);
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          callback(data[i]);
        }
      }
      //returns original array
      return data;
    },

    map: function (data, callback) {
      let newData = [];
      if (!Array.isArray(data)) {
        let values = Object.values(data);
        for (let i = 0; i < values.length; i++) {
          newData.push(callback(values[i]));
        }
      } else {
        for (const item of data) {
          newData.push(callback(item));
        }
      }
      return newData;
    },

    reduce: function (collection, cb, acc) {
      let total = !!acc ? acc : collection[0];
      //total is starting point
      let i = !!acc ? 0 : 1;

      for (; i < collection.length; i++) {
        console.log(total);
        total = cb(total, collection[i], collection);
        //look at read me for how callback should be called
        //function(acc, val, collection) { return total + collection[i]; }
        //total = total + collection[i]
      }
      // debugger;
      return total;
    },

    find: function (collection, predicate) {
      let arrayCollection = Array.isArray(collection)
        ? collection
        : Object.values(collection);
      for (const element of arrayCollection) {
        if (predicate(element)) {
          //returns first element that passes predicate
          return element;
        }
      }
      return undefined;
      //returns undefined if doesn't pass test
    },
    //object?
    filter: function (collection, predicate) {
      let arrayCollection = Array.isArray(collection)
        ? collection
        : Object.values(collection);
      let filtedArray = [];
      for (const element of arrayCollection) {
        if (predicate(element)) {
          filtedArray.push(element);
          //if element passes push into new array
        }
      }
      return filtedArray;
    },

    size: function (collection) {
      let arrayCollection = Array.isArray(collection)
        ? collection
        : Object.values(collection);
      return arrayCollection.length;
    },

    first: function (array, n = 1) {
      if (n === 1) {
        return array[0];
        //if no number is entered return the first element only
      } else {
        return array.slice(0, n);
        //if there is a number return first number - that number
      }
    },
    //if doesnt give n, what is n's value
    //array[-1]?
    last: function (array, n = 1) {
      if (n === 1) {
        return array[array.length - 1];
      } else {
        //return the end of the array from n position
        return array.slice(-n);
      }
    },

    compact: function (array) {
      let truthyArray = [];
      array.forEach((e) => {
        if (Boolean(e)) {
          truthyArray.push(e);
        }
      });
      return truthyArray;
    },

    sortBy: function (array, callback) {
      // debugger;
      //array.slice() makes a copy of the array
      let sortedArray = array.slice().sort((a, b) => callback(a) - callback(b));
      //sort array by comparing callback(element)
      // console.log(array, sortedArray);
      return sortedArray;
    },

    //option argument
    flatten: function (array, shallow = false, flattenArray = []) {
      //baseCase
      if (!Array.isArray(array)) {
        //if not array return flattenArray
        return flattenArray.push(array);
      }
      //shallow flatten
      if (shallow === true) {
        //if shallow = true
        for (const value of array) {
          if (Array.isArray(value)) {
            //if value is an array
            for (let i = 0; i < value.length; i++) {
              //itterate through value and push each item in value array into flattenArray
              flattenArray.push(value[i]);
            }
          } else {
            //if not an array push the value into the flattenArray
            flattenArray.push(value);
          }
        }
        return flattenArray;
      }
      //deep flatten
      else {
        //each element in the array keep going through until it is just a value and hits the basecase
        for (const element of array) {
          this.flatten(element, false, flattenArray);
        }
        //return the flattenedArray
        return flattenArray;
      }
    },
    //have to make callback a function in the argument set up a default callback
    uniq: function (array, isSorted = false, callback = (x) => x) {
      let uniqArray = [];
      let callBackUniqArray = [];

      for (let i = 0; i < array.length; i++) {
        //goes through each item in array
        let element = callback(array[i]);
        //make variable that holds the callback(array[i]) results. if no callback is passed it will use default callback which just returns the original array. (x) => x
        if (!callBackUniqArray.includes(element)) {
          //if the callbackuniqarray doesnt include the element just created push that array in the uniq array
          uniqArray.push(array[i]);
          //also add it to the callbackuniqarray to make sure it is in there for the next itteration.
          callBackUniqArray.push(element);
        }
      }
      return uniqArray;
    },

    keys: function (object) {
      let keys = [];
      for (const property in object) {
        keys.push(property);
      }
      return keys;
    },

    values: function (object) {
      let values = [];
      for (const property in object) {
        values.push(object[property]);
      }
      return values;
    },

    functions: function (object) {
      let array = [];
      for (const property in object) {
        if (typeof object[property] == "function") {
          array.push(property);
        }
      }

      return array;
    },
  };
})();

// fi.libraryMethod()
// })();

// fi.libraryMethod();
//if you want to use debugger/console.log add index.js to html and run the function
// --------EACH-------------
// fi.each([1, 2, 3], alert);
// --------MAP-------------
// fi.map([1, 2, 3], alert);
// --------REDUCE-------------
// fi.reduce(
//   [1, 2, 3],
//   function (acc, val, collection) {
//     return acc + val;
//   },
//   5
// );
// --------SORTBY----------------
// fi.sortBy([1, 2, 3, 4, 5, 6], function (num) {
//   return Math.sin(num);
// });
