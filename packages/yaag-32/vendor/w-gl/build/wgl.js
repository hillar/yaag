/*!
 * wgl v0.18.0
 * (c) 2017-2021 Andrei Kashcha.
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.wgl = {}));
}(this, (function (exports) { 'use strict';

  var ngraph_events = function eventify(subject) {
    validateSubject(subject);

    var eventsStorage = createEventsStorage(subject);
    subject.on = eventsStorage.on;
    subject.off = eventsStorage.off;
    subject.fire = eventsStorage.fire;
    return subject;
  };

  function createEventsStorage(subject) {
    // Store all event listeners to this hash. Key is event name, value is array
    // of callback records.
    //
    // A callback record consists of callback function and its optional context:
    // { 'eventName' => [{callback: function, ctx: object}] }
    var registeredEvents = Object.create(null);

    return {
      on: function (eventName, callback, ctx) {
        if (typeof callback !== 'function') {
          throw new Error('callback is expected to be a function');
        }
        var handlers = registeredEvents[eventName];
        if (!handlers) {
          handlers = registeredEvents[eventName] = [];
        }
        handlers.push({callback: callback, ctx: ctx});

        return subject;
      },

      off: function (eventName, callback) {
        var wantToRemoveAll = (typeof eventName === 'undefined');
        if (wantToRemoveAll) {
          // Killing old events storage should be enough in this case:
          registeredEvents = Object.create(null);
          return subject;
        }

        if (registeredEvents[eventName]) {
          var deleteAllCallbacksForEvent = (typeof callback !== 'function');
          if (deleteAllCallbacksForEvent) {
            delete registeredEvents[eventName];
          } else {
            var callbacks = registeredEvents[eventName];
            for (var i = 0; i < callbacks.length; ++i) {
              if (callbacks[i].callback === callback) {
                callbacks.splice(i, 1);
              }
            }
          }
        }

        return subject;
      },

      fire: function (eventName) {
        var callbacks = registeredEvents[eventName];
        if (!callbacks) {
          return subject;
        }

        var fireArguments;
        if (arguments.length > 1) {
          fireArguments = Array.prototype.splice.call(arguments, 1);
        }
        for(var i = 0; i < callbacks.length; ++i) {
          var callbackInfo = callbacks[i];
          callbackInfo.callback.apply(callbackInfo.ctx, fireArguments);
        }

        return subject;
      }
    };
  }

  function validateSubject(subject) {
    if (!subject) {
      throw new Error('Eventify cannot use falsy object as events subject');
    }
    var reservedWords = ['on', 'fire', 'off'];
    for (var i = 0; i < reservedWords.length; ++i) {
      if (subject.hasOwnProperty(reservedWords[i])) {
        throw new Error("Subject cannot be eventified, since it already has property '" + reservedWords[i] + "'");
      }
    }
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var common = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setMatrixArrayType = setMatrixArrayType;
  exports.toRadian = toRadian;
  exports.equals = equals;
  exports.RANDOM = exports.ARRAY_TYPE = exports.EPSILON = void 0;

  /**
   * Common utilities
   * @module glMatrix
   */
  // Configuration Constants
  var EPSILON = 0.000001;
  exports.EPSILON = EPSILON;
  var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
  exports.ARRAY_TYPE = ARRAY_TYPE;
  var RANDOM = Math.random;
  /**
   * Sets the type of array used when creating new vectors and matrices
   *
   * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
   */

  exports.RANDOM = RANDOM;

  function setMatrixArrayType(type) {
    exports.ARRAY_TYPE = ARRAY_TYPE = type;
  }

  var degree = Math.PI / 180;
  /**
   * Convert Degree To Radian
   *
   * @param {Number} a Angle in Degrees
   */

  function toRadian(a) {
    return a * degree;
  }
  /**
   * Tests whether or not the arguments have approximately the same value, within an absolute
   * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
   * than or equal to 1.0, and a relative tolerance is used for larger values)
   *
   * @param {Number} a The first number to test.
   * @param {Number} b The second number to test.
   * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
   */


  function equals(a, b) {
    return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
  }

  if (!Math.hypot) { Math.hypot = function () {
    var arguments$1 = arguments;

    var y = 0,
        i = arguments.length;

    while (i--) {
      y += arguments$1[i] * arguments$1[i];
    }

    return Math.sqrt(y);
  }; }
  });

  unwrapExports(common);
  var common_1 = common.setMatrixArrayType;
  var common_2 = common.toRadian;
  var common_3 = common.equals;
  var common_4 = common.RANDOM;
  var common_5 = common.ARRAY_TYPE;
  var common_6 = common.EPSILON;

  var mat2 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.create = create;
  exports.clone = clone;
  exports.copy = copy;
  exports.identity = identity;
  exports.fromValues = fromValues;
  exports.set = set;
  exports.transpose = transpose;
  exports.invert = invert;
  exports.adjoint = adjoint;
  exports.determinant = determinant;
  exports.multiply = multiply;
  exports.rotate = rotate;
  exports.scale = scale;
  exports.fromRotation = fromRotation;
  exports.fromScaling = fromScaling;
  exports.str = str;
  exports.frob = frob;
  exports.LDU = LDU;
  exports.add = add;
  exports.subtract = subtract;
  exports.exactEquals = exactEquals;
  exports.equals = equals;
  exports.multiplyScalar = multiplyScalar;
  exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
  exports.sub = exports.mul = void 0;

  var glMatrix = _interopRequireWildcard(common);

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") { return null; } var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  /**
   * 2x2 Matrix
   * @module mat2
   */

  /**
   * Creates a new identity mat2
   *
   * @returns {mat2} a new 2x2 matrix
   */
  function create() {
    var out = new glMatrix.ARRAY_TYPE(4);

    if (glMatrix.ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
    }

    out[0] = 1;
    out[3] = 1;
    return out;
  }
  /**
   * Creates a new mat2 initialized with values from an existing matrix
   *
   * @param {ReadonlyMat2} a matrix to clone
   * @returns {mat2} a new 2x2 matrix
   */


  function clone(a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Copy the values from one mat2 to another
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the source matrix
   * @returns {mat2} out
   */


  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Set a mat2 to the identity matrix
   *
   * @param {mat2} out the receiving matrix
   * @returns {mat2} out
   */


  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  }
  /**
   * Create a new mat2 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m10 Component in column 1, row 0 position (index 2)
   * @param {Number} m11 Component in column 1, row 1 position (index 3)
   * @returns {mat2} out A new 2x2 matrix
   */


  function fromValues(m00, m01, m10, m11) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
  }
  /**
   * Set the components of a mat2 to the given values
   *
   * @param {mat2} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m10 Component in column 1, row 0 position (index 2)
   * @param {Number} m11 Component in column 1, row 1 position (index 3)
   * @returns {mat2} out
   */


  function set(out, m00, m01, m10, m11) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
  }
  /**
   * Transpose the values of a mat2
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the source matrix
   * @returns {mat2} out
   */


  function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache
    // some values
    if (out === a) {
      var a1 = a[1];
      out[1] = a[2];
      out[2] = a1;
    } else {
      out[0] = a[0];
      out[1] = a[2];
      out[2] = a[1];
      out[3] = a[3];
    }

    return out;
  }
  /**
   * Inverts a mat2
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the source matrix
   * @returns {mat2} out
   */


  function invert(out, a) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3]; // Calculate the determinant

    var det = a0 * a3 - a2 * a1;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] = a0 * det;
    return out;
  }
  /**
   * Calculates the adjugate of a mat2
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the source matrix
   * @returns {mat2} out
   */


  function adjoint(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] = a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a0;
    return out;
  }
  /**
   * Calculates the determinant of a mat2
   *
   * @param {ReadonlyMat2} a the source matrix
   * @returns {Number} determinant of a
   */


  function determinant(a) {
    return a[0] * a[3] - a[2] * a[1];
  }
  /**
   * Multiplies two mat2's
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the first operand
   * @param {ReadonlyMat2} b the second operand
   * @returns {mat2} out
   */


  function multiply(out, a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
  }
  /**
   * Rotates a mat2 by the given angle
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2} out
   */


  function rotate(out, a, rad) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = a0 * c + a2 * s;
    out[1] = a1 * c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
  }
  /**
   * Scales the mat2 by the dimensions in the given vec2
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the matrix to rotate
   * @param {ReadonlyVec2} v the vec2 to scale the matrix by
   * @returns {mat2} out
   **/


  function scale(out, a, v) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var v0 = v[0],
        v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
  }
  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat2.identity(dest);
   *     mat2.rotate(dest, dest, rad);
   *
   * @param {mat2} out mat2 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2} out
   */


  function fromRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    return out;
  }
  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat2.identity(dest);
   *     mat2.scale(dest, dest, vec);
   *
   * @param {mat2} out mat2 receiving operation result
   * @param {ReadonlyVec2} v Scaling vector
   * @returns {mat2} out
   */


  function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    return out;
  }
  /**
   * Returns a string representation of a mat2
   *
   * @param {ReadonlyMat2} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */


  function str(a) {
    return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
  }
  /**
   * Returns Frobenius norm of a mat2
   *
   * @param {ReadonlyMat2} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */


  function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3]);
  }
  /**
   * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
   * @param {ReadonlyMat2} L the lower triangular matrix
   * @param {ReadonlyMat2} D the diagonal matrix
   * @param {ReadonlyMat2} U the upper triangular matrix
   * @param {ReadonlyMat2} a the input matrix to factorize
   */


  function LDU(L, D, U, a) {
    L[2] = a[2] / a[0];
    U[0] = a[0];
    U[1] = a[1];
    U[3] = a[3] - L[2] * U[1];
    return [L, D, U];
  }
  /**
   * Adds two mat2's
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the first operand
   * @param {ReadonlyMat2} b the second operand
   * @returns {mat2} out
   */


  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the first operand
   * @param {ReadonlyMat2} b the second operand
   * @returns {mat2} out
   */


  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
  }
  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyMat2} a The first matrix.
   * @param {ReadonlyMat2} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }
  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {ReadonlyMat2} a The first matrix.
   * @param {ReadonlyMat2} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function equals(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
  }
  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat2} out
   */


  function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
  }
  /**
   * Adds two mat2's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat2} out the receiving vector
   * @param {ReadonlyMat2} a the first operand
   * @param {ReadonlyMat2} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat2} out
   */


  function multiplyScalarAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    return out;
  }
  /**
   * Alias for {@link mat2.multiply}
   * @function
   */


  var mul = multiply;
  /**
   * Alias for {@link mat2.subtract}
   * @function
   */

  exports.mul = mul;
  var sub = subtract;
  exports.sub = sub;
  });

  unwrapExports(mat2);
  var mat2_1 = mat2.create;
  var mat2_2 = mat2.clone;
  var mat2_3 = mat2.copy;
  var mat2_4 = mat2.identity;
  var mat2_5 = mat2.fromValues;
  var mat2_6 = mat2.set;
  var mat2_7 = mat2.transpose;
  var mat2_8 = mat2.invert;
  var mat2_9 = mat2.adjoint;
  var mat2_10 = mat2.determinant;
  var mat2_11 = mat2.multiply;
  var mat2_12 = mat2.rotate;
  var mat2_13 = mat2.scale;
  var mat2_14 = mat2.fromRotation;
  var mat2_15 = mat2.fromScaling;
  var mat2_16 = mat2.str;
  var mat2_17 = mat2.frob;
  var mat2_18 = mat2.LDU;
  var mat2_19 = mat2.add;
  var mat2_20 = mat2.subtract;
  var mat2_21 = mat2.exactEquals;
  var mat2_22 = mat2.equals;
  var mat2_23 = mat2.multiplyScalar;
  var mat2_24 = mat2.multiplyScalarAndAdd;
  var mat2_25 = mat2.sub;
  var mat2_26 = mat2.mul;

  var mat2d = createCommonjsModule(function (module, exports) {

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.create = create;
  exports.clone = clone;
  exports.copy = copy;
  exports.identity = identity;
  exports.fromValues = fromValues;
  exports.set = set;
  exports.invert = invert;
  exports.determinant = determinant;
  exports.multiply = multiply;
  exports.rotate = rotate;
  exports.scale = scale;
  exports.translate = translate;
  exports.fromRotation = fromRotation;
  exports.fromScaling = fromScaling;
  exports.fromTranslation = fromTranslation;
  exports.str = str;
  exports.frob = frob;
  exports.add = add;
  exports.subtract = subtract;
  exports.multiplyScalar = multiplyScalar;
  exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
  exports.exactEquals = exactEquals;
  exports.equals = equals;
  exports.sub = exports.mul = void 0;

  var glMatrix = _interopRequireWildcard(common);

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") { return null; } var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  /**
   * 2x3 Matrix
   * @module mat2d
   * @description
   * A mat2d contains six elements defined as:
   * <pre>
   * [a, b,
   *  c, d,
   *  tx, ty]
   * </pre>
   * This is a short form for the 3x3 matrix:
   * <pre>
   * [a, b, 0,
   *  c, d, 0,
   *  tx, ty, 1]
   * </pre>
   * The last column is ignored so the array is shorter and operations are faster.
   */

  /**
   * Creates a new identity mat2d
   *
   * @returns {mat2d} a new 2x3 matrix
   */
  function create() {
    var out = new glMatrix.ARRAY_TYPE(6);

    if (glMatrix.ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[4] = 0;
      out[5] = 0;
    }

    out[0] = 1;
    out[3] = 1;
    return out;
  }
  /**
   * Creates a new mat2d initialized with values from an existing matrix
   *
   * @param {ReadonlyMat2d} a matrix to clone
   * @returns {mat2d} a new 2x3 matrix
   */


  function clone(a) {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
  }
  /**
   * Copy the values from one mat2d to another
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the source matrix
   * @returns {mat2d} out
   */


  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
  }
  /**
   * Set a mat2d to the identity matrix
   *
   * @param {mat2d} out the receiving matrix
   * @returns {mat2d} out
   */


  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
  }
  /**
   * Create a new mat2d with the given values
   *
   * @param {Number} a Component A (index 0)
   * @param {Number} b Component B (index 1)
   * @param {Number} c Component C (index 2)
   * @param {Number} d Component D (index 3)
   * @param {Number} tx Component TX (index 4)
   * @param {Number} ty Component TY (index 5)
   * @returns {mat2d} A new mat2d
   */


  function fromValues(a, b, c, d, tx, ty) {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
  }
  /**
   * Set the components of a mat2d to the given values
   *
   * @param {mat2d} out the receiving matrix
   * @param {Number} a Component A (index 0)
   * @param {Number} b Component B (index 1)
   * @param {Number} c Component C (index 2)
   * @param {Number} d Component D (index 3)
   * @param {Number} tx Component TX (index 4)
   * @param {Number} ty Component TY (index 5)
   * @returns {mat2d} out
   */


  function set(out, a, b, c, d, tx, ty) {
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
  }
  /**
   * Inverts a mat2d
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the source matrix
   * @returns {mat2d} out
   */


  function invert(out, a) {
    var aa = a[0],
        ab = a[1],
        ac = a[2],
        ad = a[3];
    var atx = a[4],
        aty = a[5];
    var det = aa * ad - ab * ac;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
  }
  /**
   * Calculates the determinant of a mat2d
   *
   * @param {ReadonlyMat2d} a the source matrix
   * @returns {Number} determinant of a
   */


  function determinant(a) {
    return a[0] * a[3] - a[1] * a[2];
  }
  /**
   * Multiplies two mat2d's
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the first operand
   * @param {ReadonlyMat2d} b the second operand
   * @returns {mat2d} out
   */


  function multiply(out, a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
  }
  /**
   * Rotates a mat2d by the given angle
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2d} out
   */


  function rotate(out, a, rad) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5];
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = a0 * c + a2 * s;
    out[1] = a1 * c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
  }
  /**
   * Scales the mat2d by the dimensions in the given vec2
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the matrix to translate
   * @param {ReadonlyVec2} v the vec2 to scale the matrix by
   * @returns {mat2d} out
   **/


  function scale(out, a, v) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5];
    var v0 = v[0],
        v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
  }
  /**
   * Translates the mat2d by the dimensions in the given vec2
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the matrix to translate
   * @param {ReadonlyVec2} v the vec2 to translate the matrix by
   * @returns {mat2d} out
   **/


  function translate(out, a, v) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5];
    var v0 = v[0],
        v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
  }
  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat2d.identity(dest);
   *     mat2d.rotate(dest, dest, rad);
   *
   * @param {mat2d} out mat2d receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2d} out
   */


  function fromRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    out[4] = 0;
    out[5] = 0;
    return out;
  }
  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat2d.identity(dest);
   *     mat2d.scale(dest, dest, vec);
   *
   * @param {mat2d} out mat2d receiving operation result
   * @param {ReadonlyVec2} v Scaling vector
   * @returns {mat2d} out
   */


  function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    out[4] = 0;
    out[5] = 0;
    return out;
  }
  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat2d.identity(dest);
   *     mat2d.translate(dest, dest, vec);
   *
   * @param {mat2d} out mat2d receiving operation result
   * @param {ReadonlyVec2} v Translation vector
   * @returns {mat2d} out
   */


  function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = v[0];
    out[5] = v[1];
    return out;
  }
  /**
   * Returns a string representation of a mat2d
   *
   * @param {ReadonlyMat2d} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */


  function str(a) {
    return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")";
  }
  /**
   * Returns Frobenius norm of a mat2d
   *
   * @param {ReadonlyMat2d} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */


  function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], 1);
  }
  /**
   * Adds two mat2d's
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the first operand
   * @param {ReadonlyMat2d} b the second operand
   * @returns {mat2d} out
   */


  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the first operand
   * @param {ReadonlyMat2d} b the second operand
   * @returns {mat2d} out
   */


  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    return out;
  }
  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat2d} out
   */


  function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    return out;
  }
  /**
   * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat2d} out the receiving vector
   * @param {ReadonlyMat2d} a the first operand
   * @param {ReadonlyMat2d} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat2d} out
   */


  function multiplyScalarAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    return out;
  }
  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyMat2d} a The first matrix.
   * @param {ReadonlyMat2d} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
  }
  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {ReadonlyMat2d} a The first matrix.
   * @param {ReadonlyMat2d} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function equals(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5];
    return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5));
  }
  /**
   * Alias for {@link mat2d.multiply}
   * @function
   */


  var mul = multiply;
  /**
   * Alias for {@link mat2d.subtract}
   * @function
   */

  exports.mul = mul;
  var sub = subtract;
  exports.sub = sub;
  });

  unwrapExports(mat2d);
  var mat2d_1 = mat2d.create;
  var mat2d_2 = mat2d.clone;
  var mat2d_3 = mat2d.copy;
  var mat2d_4 = mat2d.identity;
  var mat2d_5 = mat2d.fromValues;
  var mat2d_6 = mat2d.set;
  var mat2d_7 = mat2d.invert;
  var mat2d_8 = mat2d.determinant;
  var mat2d_9 = mat2d.multiply;
  var mat2d_10 = mat2d.rotate;
  var mat2d_11 = mat2d.scale;
  var mat2d_12 = mat2d.translate;
  var mat2d_13 = mat2d.fromRotation;
  var mat2d_14 = mat2d.fromScaling;
  var mat2d_15 = mat2d.fromTranslation;
  var mat2d_16 = mat2d.str;
  var mat2d_17 = mat2d.frob;
  var mat2d_18 = mat2d.add;
  var mat2d_19 = mat2d.subtract;
  var mat2d_20 = mat2d.multiplyScalar;
  var mat2d_21 = mat2d.multiplyScalarAndAdd;
  var mat2d_22 = mat2d.exactEquals;
  var mat2d_23 = mat2d.equals;
  var mat2d_24 = mat2d.sub;
  var mat2d_25 = mat2d.mul;

  var mat3 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.create = create;
  exports.fromMat4 = fromMat4;
  exports.clone = clone;
  exports.copy = copy;
  exports.fromValues = fromValues;
  exports.set = set;
  exports.identity = identity;
  exports.transpose = transpose;
  exports.invert = invert;
  exports.adjoint = adjoint;
  exports.determinant = determinant;
  exports.multiply = multiply;
  exports.translate = translate;
  exports.rotate = rotate;
  exports.scale = scale;
  exports.fromTranslation = fromTranslation;
  exports.fromRotation = fromRotation;
  exports.fromScaling = fromScaling;
  exports.fromMat2d = fromMat2d;
  exports.fromQuat = fromQuat;
  exports.normalFromMat4 = normalFromMat4;
  exports.projection = projection;
  exports.str = str;
  exports.frob = frob;
  exports.add = add;
  exports.subtract = subtract;
  exports.multiplyScalar = multiplyScalar;
  exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
  exports.exactEquals = exactEquals;
  exports.equals = equals;
  exports.sub = exports.mul = void 0;

  var glMatrix = _interopRequireWildcard(common);

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") { return null; } var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  /**
   * 3x3 Matrix
   * @module mat3
   */

  /**
   * Creates a new identity mat3
   *
   * @returns {mat3} a new 3x3 matrix
   */
  function create() {
    var out = new glMatrix.ARRAY_TYPE(9);

    if (glMatrix.ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
    }

    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
  }
  /**
   * Copies the upper-left 3x3 values into the given mat3.
   *
   * @param {mat3} out the receiving 3x3 matrix
   * @param {ReadonlyMat4} a   the source 4x4 matrix
   * @returns {mat3} out
   */


  function fromMat4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
  }
  /**
   * Creates a new mat3 initialized with values from an existing matrix
   *
   * @param {ReadonlyMat3} a matrix to clone
   * @returns {mat3} a new 3x3 matrix
   */


  function clone(a) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  /**
   * Copy the values from one mat3 to another
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the source matrix
   * @returns {mat3} out
   */


  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  /**
   * Create a new mat3 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m10 Component in column 1, row 0 position (index 3)
   * @param {Number} m11 Component in column 1, row 1 position (index 4)
   * @param {Number} m12 Component in column 1, row 2 position (index 5)
   * @param {Number} m20 Component in column 2, row 0 position (index 6)
   * @param {Number} m21 Component in column 2, row 1 position (index 7)
   * @param {Number} m22 Component in column 2, row 2 position (index 8)
   * @returns {mat3} A new mat3
   */


  function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }
  /**
   * Set the components of a mat3 to the given values
   *
   * @param {mat3} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m10 Component in column 1, row 0 position (index 3)
   * @param {Number} m11 Component in column 1, row 1 position (index 4)
   * @param {Number} m12 Component in column 1, row 2 position (index 5)
   * @param {Number} m20 Component in column 2, row 0 position (index 6)
   * @param {Number} m21 Component in column 2, row 1 position (index 7)
   * @param {Number} m22 Component in column 2, row 2 position (index 8)
   * @returns {mat3} out
   */


  function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }
  /**
   * Set a mat3 to the identity matrix
   *
   * @param {mat3} out the receiving matrix
   * @returns {mat3} out
   */


  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  /**
   * Transpose the values of a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the source matrix
   * @returns {mat3} out
   */


  function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
      var a01 = a[1],
          a02 = a[2],
          a12 = a[5];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a01;
      out[5] = a[7];
      out[6] = a02;
      out[7] = a12;
    } else {
      out[0] = a[0];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a[1];
      out[4] = a[4];
      out[5] = a[7];
      out[6] = a[2];
      out[7] = a[5];
      out[8] = a[8];
    }

    return out;
  }
  /**
   * Inverts a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the source matrix
   * @returns {mat3} out
   */


  function invert(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    var a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    var a20 = a[6],
        a21 = a[7],
        a22 = a[8];
    var b01 = a22 * a11 - a12 * a21;
    var b11 = -a22 * a10 + a12 * a20;
    var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

    var det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
  }
  /**
   * Calculates the adjugate of a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the source matrix
   * @returns {mat3} out
   */


  function adjoint(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    var a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    var a20 = a[6],
        a21 = a[7],
        a22 = a[8];
    out[0] = a11 * a22 - a12 * a21;
    out[1] = a02 * a21 - a01 * a22;
    out[2] = a01 * a12 - a02 * a11;
    out[3] = a12 * a20 - a10 * a22;
    out[4] = a00 * a22 - a02 * a20;
    out[5] = a02 * a10 - a00 * a12;
    out[6] = a10 * a21 - a11 * a20;
    out[7] = a01 * a20 - a00 * a21;
    out[8] = a00 * a11 - a01 * a10;
    return out;
  }
  /**
   * Calculates the determinant of a mat3
   *
   * @param {ReadonlyMat3} a the source matrix
   * @returns {Number} determinant of a
   */


  function determinant(a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    var a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    var a20 = a[6],
        a21 = a[7],
        a22 = a[8];
    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
  }
  /**
   * Multiplies two mat3's
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the first operand
   * @param {ReadonlyMat3} b the second operand
   * @returns {mat3} out
   */


  function multiply(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    var a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    var a20 = a[6],
        a21 = a[7],
        a22 = a[8];
    var b00 = b[0],
        b01 = b[1],
        b02 = b[2];
    var b10 = b[3],
        b11 = b[4],
        b12 = b[5];
    var b20 = b[6],
        b21 = b[7],
        b22 = b[8];
    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;
    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;
    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }
  /**
   * Translate a mat3 by the given vector
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the matrix to translate
   * @param {ReadonlyVec2} v vector to translate by
   * @returns {mat3} out
   */


  function translate(out, a, v) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        x = v[0],
        y = v[1];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a10;
    out[4] = a11;
    out[5] = a12;
    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
  }
  /**
   * Rotates a mat3 by the given angle
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat3} out
   */


  function rotate(out, a, rad) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;
    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;
    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
  }
  /**
   * Scales the mat3 by the dimensions in the given vec2
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the matrix to rotate
   * @param {ReadonlyVec2} v the vec2 to scale the matrix by
   * @returns {mat3} out
   **/


  function scale(out, a, v) {
    var x = v[0],
        y = v[1];
    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];
    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.translate(dest, dest, vec);
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {ReadonlyVec2} v Translation vector
   * @returns {mat3} out
   */


  function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
  }
  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.rotate(dest, dest, rad);
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat3} out
   */


  function fromRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = -s;
    out[4] = c;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.scale(dest, dest, vec);
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {ReadonlyVec2} v Scaling vector
   * @returns {mat3} out
   */


  function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  /**
   * Copies the values from a mat2d into a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat2d} a the matrix to copy
   * @returns {mat3} out
   **/


  function fromMat2d(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;
    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;
    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
  }
  /**
   * Calculates a 3x3 matrix from the given quaternion
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {ReadonlyQuat} q Quaternion to create matrix from
   *
   * @returns {mat3} out
   */


  function fromQuat(out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;
    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;
    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;
    return out;
  }
  /**
   * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {ReadonlyMat4} a Mat4 to derive the normal matrix from
   *
   * @returns {mat3} out
   */


  function normalFromMat4(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    return out;
  }
  /**
   * Generates a 2D projection matrix with the given bounds
   *
   * @param {mat3} out mat3 frustum matrix will be written into
   * @param {number} width Width of your gl context
   * @param {number} height Height of gl context
   * @returns {mat3} out
   */


  function projection(out, width, height) {
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = -2 / height;
    out[5] = 0;
    out[6] = -1;
    out[7] = 1;
    out[8] = 1;
    return out;
  }
  /**
   * Returns a string representation of a mat3
   *
   * @param {ReadonlyMat3} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */


  function str(a) {
    return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
  }
  /**
   * Returns Frobenius norm of a mat3
   *
   * @param {ReadonlyMat3} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */


  function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
  }
  /**
   * Adds two mat3's
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the first operand
   * @param {ReadonlyMat3} b the second operand
   * @returns {mat3} out
   */


  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the first operand
   * @param {ReadonlyMat3} b the second operand
   * @returns {mat3} out
   */


  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
  }
  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat3} out
   */


  function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
  }
  /**
   * Adds two mat3's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat3} out the receiving vector
   * @param {ReadonlyMat3} a the first operand
   * @param {ReadonlyMat3} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat3} out
   */


  function multiplyScalarAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    out[6] = a[6] + b[6] * scale;
    out[7] = a[7] + b[7] * scale;
    out[8] = a[8] + b[8] * scale;
    return out;
  }
  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyMat3} a The first matrix.
   * @param {ReadonlyMat3} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
  }
  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {ReadonlyMat3} a The first matrix.
   * @param {ReadonlyMat3} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function equals(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7],
        a8 = a[8];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7],
        b8 = b[8];
    return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8));
  }
  /**
   * Alias for {@link mat3.multiply}
   * @function
   */


  var mul = multiply;
  /**
   * Alias for {@link mat3.subtract}
   * @function
   */

  exports.mul = mul;
  var sub = subtract;
  exports.sub = sub;
  });

  unwrapExports(mat3);
  var mat3_1 = mat3.create;
  var mat3_2 = mat3.fromMat4;
  var mat3_3 = mat3.clone;
  var mat3_4 = mat3.copy;
  var mat3_5 = mat3.fromValues;
  var mat3_6 = mat3.set;
  var mat3_7 = mat3.identity;
  var mat3_8 = mat3.transpose;
  var mat3_9 = mat3.invert;
  var mat3_10 = mat3.adjoint;
  var mat3_11 = mat3.determinant;
  var mat3_12 = mat3.multiply;
  var mat3_13 = mat3.translate;
  var mat3_14 = mat3.rotate;
  var mat3_15 = mat3.scale;
  var mat3_16 = mat3.fromTranslation;
  var mat3_17 = mat3.fromRotation;
  var mat3_18 = mat3.fromScaling;
  var mat3_19 = mat3.fromMat2d;
  var mat3_20 = mat3.fromQuat;
  var mat3_21 = mat3.normalFromMat4;
  var mat3_22 = mat3.projection;
  var mat3_23 = mat3.str;
  var mat3_24 = mat3.frob;
  var mat3_25 = mat3.add;
  var mat3_26 = mat3.subtract;
  var mat3_27 = mat3.multiplyScalar;
  var mat3_28 = mat3.multiplyScalarAndAdd;
  var mat3_29 = mat3.exactEquals;
  var mat3_30 = mat3.equals;
  var mat3_31 = mat3.sub;
  var mat3_32 = mat3.mul;

  var mat4 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.create = create;
  exports.clone = clone;
  exports.copy = copy;
  exports.fromValues = fromValues;
  exports.set = set;
  exports.identity = identity;
  exports.transpose = transpose;
  exports.invert = invert;
  exports.adjoint = adjoint;
  exports.determinant = determinant;
  exports.multiply = multiply;
  exports.translate = translate;
  exports.scale = scale;
  exports.rotate = rotate;
  exports.rotateX = rotateX;
  exports.rotateY = rotateY;
  exports.rotateZ = rotateZ;
  exports.fromTranslation = fromTranslation;
  exports.fromScaling = fromScaling;
  exports.fromRotation = fromRotation;
  exports.fromXRotation = fromXRotation;
  exports.fromYRotation = fromYRotation;
  exports.fromZRotation = fromZRotation;
  exports.fromRotationTranslation = fromRotationTranslation;
  exports.fromQuat2 = fromQuat2;
  exports.getTranslation = getTranslation;
  exports.getScaling = getScaling;
  exports.getRotation = getRotation;
  exports.fromRotationTranslationScale = fromRotationTranslationScale;
  exports.fromRotationTranslationScaleOrigin = fromRotationTranslationScaleOrigin;
  exports.fromQuat = fromQuat;
  exports.frustum = frustum;
  exports.perspective = perspective;
  exports.perspectiveFromFieldOfView = perspectiveFromFieldOfView;
  exports.ortho = ortho;
  exports.lookAt = lookAt;
  exports.targetTo = targetTo;
  exports.str = str;
  exports.frob = frob;
  exports.add = add;
  exports.subtract = subtract;
  exports.multiplyScalar = multiplyScalar;
  exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
  exports.exactEquals = exactEquals;
  exports.equals = equals;
  exports.sub = exports.mul = void 0;

  var glMatrix = _interopRequireWildcard(common);

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") { return null; } var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  /**
   * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
   * @module mat4
   */

  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */
  function create() {
    var out = new glMatrix.ARRAY_TYPE(16);

    if (glMatrix.ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }

    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a new mat4 initialized with values from an existing matrix
   *
   * @param {ReadonlyMat4} a matrix to clone
   * @returns {mat4} a new 4x4 matrix
   */


  function clone(a) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Copy the values from one mat4 to another
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the source matrix
   * @returns {mat4} out
   */


  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Create a new mat4 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m03 Component in column 0, row 3 position (index 3)
   * @param {Number} m10 Component in column 1, row 0 position (index 4)
   * @param {Number} m11 Component in column 1, row 1 position (index 5)
   * @param {Number} m12 Component in column 1, row 2 position (index 6)
   * @param {Number} m13 Component in column 1, row 3 position (index 7)
   * @param {Number} m20 Component in column 2, row 0 position (index 8)
   * @param {Number} m21 Component in column 2, row 1 position (index 9)
   * @param {Number} m22 Component in column 2, row 2 position (index 10)
   * @param {Number} m23 Component in column 2, row 3 position (index 11)
   * @param {Number} m30 Component in column 3, row 0 position (index 12)
   * @param {Number} m31 Component in column 3, row 1 position (index 13)
   * @param {Number} m32 Component in column 3, row 2 position (index 14)
   * @param {Number} m33 Component in column 3, row 3 position (index 15)
   * @returns {mat4} A new mat4
   */


  function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  /**
   * Set the components of a mat4 to the given values
   *
   * @param {mat4} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m03 Component in column 0, row 3 position (index 3)
   * @param {Number} m10 Component in column 1, row 0 position (index 4)
   * @param {Number} m11 Component in column 1, row 1 position (index 5)
   * @param {Number} m12 Component in column 1, row 2 position (index 6)
   * @param {Number} m13 Component in column 1, row 3 position (index 7)
   * @param {Number} m20 Component in column 2, row 0 position (index 8)
   * @param {Number} m21 Component in column 2, row 1 position (index 9)
   * @param {Number} m22 Component in column 2, row 2 position (index 10)
   * @param {Number} m23 Component in column 2, row 3 position (index 11)
   * @param {Number} m30 Component in column 3, row 0 position (index 12)
   * @param {Number} m31 Component in column 3, row 1 position (index 13)
   * @param {Number} m32 Component in column 3, row 2 position (index 14)
   * @param {Number} m33 Component in column 3, row 3 position (index 15)
   * @returns {mat4} out
   */


  function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  /**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */


  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Transpose the values of a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the source matrix
   * @returns {mat4} out
   */


  function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
      var a01 = a[1],
          a02 = a[2],
          a03 = a[3];
      var a12 = a[6],
          a13 = a[7];
      var a23 = a[11];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a01;
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a02;
      out[9] = a12;
      out[11] = a[14];
      out[12] = a03;
      out[13] = a13;
      out[14] = a23;
    } else {
      out[0] = a[0];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a[1];
      out[5] = a[5];
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a[2];
      out[9] = a[6];
      out[10] = a[10];
      out[11] = a[14];
      out[12] = a[3];
      out[13] = a[7];
      out[14] = a[11];
      out[15] = a[15];
    }

    return out;
  }
  /**
   * Inverts a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the source matrix
   * @returns {mat4} out
   */


  function invert(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  /**
   * Calculates the adjugate of a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the source matrix
   * @returns {mat4} out
   */


  function adjoint(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    out[0] = a11 * b11 - a12 * b10 + a13 * b09;
    out[1] = a02 * b10 - a01 * b11 - a03 * b09;
    out[2] = a31 * b05 - a32 * b04 + a33 * b03;
    out[3] = a22 * b04 - a21 * b05 - a23 * b03;
    out[4] = a12 * b08 - a10 * b11 - a13 * b07;
    out[5] = a00 * b11 - a02 * b08 + a03 * b07;
    out[6] = a32 * b02 - a30 * b05 - a33 * b01;
    out[7] = a20 * b05 - a22 * b02 + a23 * b01;
    out[8] = a10 * b10 - a11 * b08 + a13 * b06;
    out[9] = a01 * b08 - a00 * b10 - a03 * b06;
    out[10] = a30 * b04 - a31 * b02 + a33 * b00;
    out[11] = a21 * b02 - a20 * b04 - a23 * b00;
    out[12] = a11 * b07 - a10 * b09 - a12 * b06;
    out[13] = a00 * b09 - a01 * b07 + a02 * b06;
    out[14] = a31 * b01 - a30 * b03 - a32 * b00;
    out[15] = a20 * b03 - a21 * b01 + a22 * b00;
    return out;
  }
  /**
   * Calculates the determinant of a mat4
   *
   * @param {ReadonlyMat4} a the source matrix
   * @returns {Number} determinant of a
   */


  function determinant(a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b0 = a00 * a11 - a01 * a10;
    var b1 = a00 * a12 - a02 * a10;
    var b2 = a01 * a12 - a02 * a11;
    var b3 = a20 * a31 - a21 * a30;
    var b4 = a20 * a32 - a22 * a30;
    var b5 = a21 * a32 - a22 * a31;
    var b6 = a00 * b5 - a01 * b4 + a02 * b3;
    var b7 = a10 * b5 - a11 * b4 + a12 * b3;
    var b8 = a20 * b2 - a21 * b1 + a22 * b0;
    var b9 = a30 * b2 - a31 * b1 + a32 * b0; // Calculate the determinant

    return a13 * b6 - a03 * b7 + a33 * b8 - a23 * b9;
  }
  /**
   * Multiplies two mat4s
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @returns {mat4} out
   */


  function multiply(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15]; // Cache only the current line of the second matrix

    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  /**
   * Translate a mat4 by the given vector
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to translate
   * @param {ReadonlyVec3} v vector to translate by
   * @returns {mat4} out
   */


  function translate(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;

    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
  }
  /**
   * Scales the mat4 by the dimensions in the given vec3 not using vectorization
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to scale
   * @param {ReadonlyVec3} v the vec3 to scale the matrix by
   * @returns {mat4} out
   **/


  function scale(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Rotates a mat4 by the given angle around the given axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @param {ReadonlyVec3} axis the axis to rotate around
   * @returns {mat4} out
   */


  function rotate(out, a, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2];
    var len = Math.hypot(x, y, z);
    var s, c, t;
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    var b00, b01, b02;
    var b10, b11, b12;
    var b20, b21, b22;

    if (len < glMatrix.EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11]; // Construct the elements of the rotation matrix

    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }

    return out;
  }
  /**
   * Rotates a matrix by the given angle around the X axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */


  function rotateX(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Y axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */


  function rotateY(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Z axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */


  function rotateZ(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  }
  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, dest, vec);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {ReadonlyVec3} v Translation vector
   * @returns {mat4} out
   */


  function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.scale(dest, dest, vec);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {ReadonlyVec3} v Scaling vector
   * @returns {mat4} out
   */


  function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a given angle around a given axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotate(dest, dest, rad, axis);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @param {ReadonlyVec3} axis the axis to rotate around
   * @returns {mat4} out
   */


  function fromRotation(out, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2];
    var len = Math.hypot(x, y, z);
    var s, c, t;

    if (len < glMatrix.EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c; // Perform rotation-specific matrix multiplication

    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from the given angle around the X axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateX(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */


  function fromXRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad); // Perform axis-specific matrix multiplication

    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from the given angle around the Y axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateY(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */


  function fromYRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad); // Perform axis-specific matrix multiplication

    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from the given angle around the Z axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateZ(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */


  function fromZRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad); // Perform axis-specific matrix multiplication

    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a quaternion rotation and vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {ReadonlyVec3} v Translation vector
   * @returns {mat4} out
   */


  function fromRotationTranslation(out, q, v) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Creates a new mat4 from a dual quat.
   *
   * @param {mat4} out Matrix
   * @param {ReadonlyQuat2} a Dual Quaternion
   * @returns {mat4} mat4 receiving operation result
   */


  function fromQuat2(out, a) {
    var translation = new glMatrix.ARRAY_TYPE(3);
    var bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3],
        ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7];
    var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

    if (magnitude > 0) {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
    } else {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    }

    fromRotationTranslation(out, a, translation);
    return out;
  }
  /**
   * Returns the translation vector component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslation,
   *  the returned vector will be the same as the translation vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive translation component
   * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */


  function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }
  /**
   * Returns the scaling factor component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslationScale
   *  with a normalized Quaternion paramter, the returned vector will be
   *  the same as the scaling vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive scaling factor component
   * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */


  function getScaling(out, mat) {
    var m11 = mat[0];
    var m12 = mat[1];
    var m13 = mat[2];
    var m21 = mat[4];
    var m22 = mat[5];
    var m23 = mat[6];
    var m31 = mat[8];
    var m32 = mat[9];
    var m33 = mat[10];
    out[0] = Math.hypot(m11, m12, m13);
    out[1] = Math.hypot(m21, m22, m23);
    out[2] = Math.hypot(m31, m32, m33);
    return out;
  }
  /**
   * Returns a quaternion representing the rotational component
   *  of a transformation matrix. If a matrix is built with
   *  fromRotationTranslation, the returned quaternion will be the
   *  same as the quaternion originally supplied.
   * @param {quat} out Quaternion to receive the rotation component
   * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {quat} out
   */


  function getRotation(out, mat) {
    var scaling = new glMatrix.ARRAY_TYPE(3);
    getScaling(scaling, mat);
    var is1 = 1 / scaling[0];
    var is2 = 1 / scaling[1];
    var is3 = 1 / scaling[2];
    var sm11 = mat[0] * is1;
    var sm12 = mat[1] * is2;
    var sm13 = mat[2] * is3;
    var sm21 = mat[4] * is1;
    var sm22 = mat[5] * is2;
    var sm23 = mat[6] * is3;
    var sm31 = mat[8] * is1;
    var sm32 = mat[9] * is2;
    var sm33 = mat[10] * is3;
    var trace = sm11 + sm22 + sm33;
    var S = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      out[3] = 0.25 * S;
      out[0] = (sm23 - sm32) / S;
      out[1] = (sm31 - sm13) / S;
      out[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
      out[3] = (sm23 - sm32) / S;
      out[0] = 0.25 * S;
      out[1] = (sm12 + sm21) / S;
      out[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
      out[3] = (sm31 - sm13) / S;
      out[0] = (sm12 + sm21) / S;
      out[1] = 0.25 * S;
      out[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
      out[3] = (sm12 - sm21) / S;
      out[0] = (sm31 + sm13) / S;
      out[1] = (sm23 + sm32) / S;
      out[2] = 0.25 * S;
    }

    return out;
  }
  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {ReadonlyVec3} v Translation vector
   * @param {ReadonlyVec3} s Scaling vector
   * @returns {mat4} out
   */


  function fromRotationTranslationScale(out, q, v, s) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     mat4.translate(dest, origin);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *     mat4.translate(dest, negativeOrigin);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {ReadonlyVec3} v Translation vector
   * @param {ReadonlyVec3} s Scaling vector
   * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
   * @returns {mat4} out
   */


  function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    var ox = o[0];
    var oy = o[1];
    var oz = o[2];
    var out0 = (1 - (yy + zz)) * sx;
    var out1 = (xy + wz) * sx;
    var out2 = (xz - wy) * sx;
    var out4 = (xy - wz) * sy;
    var out5 = (1 - (xx + zz)) * sy;
    var out6 = (yz + wx) * sy;
    var out8 = (xz + wy) * sz;
    var out9 = (yz - wx) * sz;
    var out10 = (1 - (xx + yy)) * sz;
    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = 0;
    out[4] = out4;
    out[5] = out5;
    out[6] = out6;
    out[7] = 0;
    out[8] = out8;
    out[9] = out9;
    out[10] = out10;
    out[11] = 0;
    out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
    out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
    out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
    out[15] = 1;
    return out;
  }
  /**
   * Calculates a 4x4 matrix from the given quaternion
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {ReadonlyQuat} q Quaternion to create matrix from
   *
   * @returns {mat4} out
   */


  function fromQuat(out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Generates a frustum matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {Number} left Left bound of the frustum
   * @param {Number} right Right bound of the frustum
   * @param {Number} bottom Bottom bound of the frustum
   * @param {Number} top Top bound of the frustum
   * @param {Number} near Near bound of the frustum
   * @param {Number} far Far bound of the frustum
   * @returns {mat4} out
   */


  function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left);
    var tb = 1 / (top - bottom);
    var nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
  }
  /**
   * Generates a perspective projection matrix with the given bounds.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum, can be null or Infinity
   * @returns {mat4} out
   */


  function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;

    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }

    return out;
  }
  /**
   * Generates a perspective projection matrix with the given field of view.
   * This is primarily useful for generating projection matrices to be used
   * with the still experiemental WebVR API.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */


  function perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
    var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
    var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
    var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
    var xScale = 2.0 / (leftTan + rightTan);
    var yScale = 2.0 / (upTan + downTan);
    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = far * near / (near - far);
    out[15] = 0.0;
    return out;
  }
  /**
   * Generates a orthogonal projection matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */


  function ortho(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }
  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis.
   * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {ReadonlyVec3} eye Position of the viewer
   * @param {ReadonlyVec3} center Point the viewer is looking at
   * @param {ReadonlyVec3} up vec3 pointing up
   * @returns {mat4} out
   */


  function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    var eyex = eye[0];
    var eyey = eye[1];
    var eyez = eye[2];
    var upx = up[0];
    var upy = up[1];
    var upz = up[2];
    var centerx = center[0];
    var centery = center[1];
    var centerz = center[2];

    if (Math.abs(eyex - centerx) < glMatrix.EPSILON && Math.abs(eyey - centery) < glMatrix.EPSILON && Math.abs(eyez - centerz) < glMatrix.EPSILON) {
      return identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.hypot(x0, x1, x2);

    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.hypot(y0, y1, y2);

    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  }
  /**
   * Generates a matrix that makes something look at something else.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {ReadonlyVec3} eye Position of the viewer
   * @param {ReadonlyVec3} center Point the viewer is looking at
   * @param {ReadonlyVec3} up vec3 pointing up
   * @returns {mat4} out
   */


  function targetTo(out, eye, target, up) {
    var eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2];
    var z0 = eyex - target[0],
        z1 = eyey - target[1],
        z2 = eyez - target[2];
    var len = z0 * z0 + z1 * z1 + z2 * z2;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      z0 *= len;
      z1 *= len;
      z2 *= len;
    }

    var x0 = upy * z2 - upz * z1,
        x1 = upz * z0 - upx * z2,
        x2 = upx * z1 - upy * z0;
    len = x0 * x0 + x1 * x1 + x2 * x2;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1;
    return out;
  }
  /**
   * Returns a string representation of a mat4
   *
   * @param {ReadonlyMat4} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */


  function str(a) {
    return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
  }
  /**
   * Returns Frobenius norm of a mat4
   *
   * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */


  function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
  }
  /**
   * Adds two mat4's
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @returns {mat4} out
   */


  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @returns {mat4} out
   */


  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
  }
  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat4} out
   */


  function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
  }
  /**
   * Adds two mat4's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat4} out the receiving vector
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat4} out
   */


  function multiplyScalarAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    out[6] = a[6] + b[6] * scale;
    out[7] = a[7] + b[7] * scale;
    out[8] = a[8] + b[8] * scale;
    out[9] = a[9] + b[9] * scale;
    out[10] = a[10] + b[10] * scale;
    out[11] = a[11] + b[11] * scale;
    out[12] = a[12] + b[12] * scale;
    out[13] = a[13] + b[13] * scale;
    out[14] = a[14] + b[14] * scale;
    out[15] = a[15] + b[15] * scale;
    return out;
  }
  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyMat4} a The first matrix.
   * @param {ReadonlyMat4} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
  }
  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {ReadonlyMat4} a The first matrix.
   * @param {ReadonlyMat4} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function equals(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7];
    var a8 = a[8],
        a9 = a[9],
        a10 = a[10],
        a11 = a[11];
    var a12 = a[12],
        a13 = a[13],
        a14 = a[14],
        a15 = a[15];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    var b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7];
    var b8 = b[8],
        b9 = b[9],
        b10 = b[10],
        b11 = b[11];
    var b12 = b[12],
        b13 = b[13],
        b14 = b[14],
        b15 = b[15];
    return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
  }
  /**
   * Alias for {@link mat4.multiply}
   * @function
   */


  var mul = multiply;
  /**
   * Alias for {@link mat4.subtract}
   * @function
   */

  exports.mul = mul;
  var sub = subtract;
  exports.sub = sub;
  });

  unwrapExports(mat4);
  var mat4_1 = mat4.create;
  var mat4_2 = mat4.clone;
  var mat4_3 = mat4.copy;
  var mat4_4 = mat4.fromValues;
  var mat4_5 = mat4.set;
  var mat4_6 = mat4.identity;
  var mat4_7 = mat4.transpose;
  var mat4_8 = mat4.invert;
  var mat4_9 = mat4.adjoint;
  var mat4_10 = mat4.determinant;
  var mat4_11 = mat4.multiply;
  var mat4_12 = mat4.translate;
  var mat4_13 = mat4.scale;
  var mat4_14 = mat4.rotate;
  var mat4_15 = mat4.rotateX;
  var mat4_16 = mat4.rotateY;
  var mat4_17 = mat4.rotateZ;
  var mat4_18 = mat4.fromTranslation;
  var mat4_19 = mat4.fromScaling;
  var mat4_20 = mat4.fromRotation;
  var mat4_21 = mat4.fromXRotation;
  var mat4_22 = mat4.fromYRotation;
  var mat4_23 = mat4.fromZRotation;
  var mat4_24 = mat4.fromRotationTranslation;
  var mat4_25 = mat4.fromQuat2;
  var mat4_26 = mat4.getTranslation;
  var mat4_27 = mat4.getScaling;
  var mat4_28 = mat4.getRotation;
  var mat4_29 = mat4.fromRotationTranslationScale;
  var mat4_30 = mat4.fromRotationTranslationScaleOrigin;
  var mat4_31 = mat4.fromQuat;
  var mat4_32 = mat4.frustum;
  var mat4_33 = mat4.perspective;
  var mat4_34 = mat4.perspectiveFromFieldOfView;
  var mat4_35 = mat4.ortho;
  var mat4_36 = mat4.lookAt;
  var mat4_37 = mat4.targetTo;
  var mat4_38 = mat4.str;
  var mat4_39 = mat4.frob;
  var mat4_40 = mat4.add;
  var mat4_41 = mat4.subtract;
  var mat4_42 = mat4.multiplyScalar;
  var mat4_43 = mat4.multiplyScalarAndAdd;
  var mat4_44 = mat4.exactEquals;
  var mat4_45 = mat4.equals;
  var mat4_46 = mat4.sub;
  var mat4_47 = mat4.mul;

  var vec3 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.create = create;
  exports.clone = clone;
  exports.length = length;
  exports.fromValues = fromValues;
  exports.copy = copy;
  exports.set = set;
  exports.add = add;
  exports.subtract = subtract;
  exports.multiply = multiply;
  exports.divide = divide;
  exports.ceil = ceil;
  exports.floor = floor;
  exports.min = min;
  exports.max = max;
  exports.round = round;
  exports.scale = scale;
  exports.scaleAndAdd = scaleAndAdd;
  exports.distance = distance;
  exports.squaredDistance = squaredDistance;
  exports.squaredLength = squaredLength;
  exports.negate = negate;
  exports.inverse = inverse;
  exports.normalize = normalize;
  exports.dot = dot;
  exports.cross = cross;
  exports.lerp = lerp;
  exports.hermite = hermite;
  exports.bezier = bezier;
  exports.random = random;
  exports.transformMat4 = transformMat4;
  exports.transformMat3 = transformMat3;
  exports.transformQuat = transformQuat;
  exports.rotateX = rotateX;
  exports.rotateY = rotateY;
  exports.rotateZ = rotateZ;
  exports.angle = angle;
  exports.zero = zero;
  exports.str = str;
  exports.exactEquals = exactEquals;
  exports.equals = equals;
  exports.forEach = exports.sqrLen = exports.len = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = void 0;

  var glMatrix = _interopRequireWildcard(common);

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") { return null; } var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  /**
   * 3 Dimensional Vector
   * @module vec3
   */

  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */
  function create() {
    var out = new glMatrix.ARRAY_TYPE(3);

    if (glMatrix.ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec3 initialized with values from an existing vector
   *
   * @param {ReadonlyVec3} a vector to clone
   * @returns {vec3} a new 3D vector
   */


  function clone(a) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  /**
   * Calculates the length of a vec3
   *
   * @param {ReadonlyVec3} a vector to calculate length of
   * @returns {Number} length of a
   */


  function length(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return Math.hypot(x, y, z);
  }
  /**
   * Creates a new vec3 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} a new 3D vector
   */


  function fromValues(x, y, z) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Copy the values from one vec3 to another
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the source vector
   * @returns {vec3} out
   */


  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  /**
   * Set the components of a vec3 to the given values
   *
   * @param {vec3} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} out
   */


  function set(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Adds two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */


  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  /**
   * Subtracts vector b from vector a
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */


  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }
  /**
   * Multiplies two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */


  function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
  }
  /**
   * Divides two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */


  function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
  }
  /**
   * Math.ceil the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a vector to ceil
   * @returns {vec3} out
   */


  function ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
  }
  /**
   * Math.floor the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a vector to floor
   * @returns {vec3} out
   */


  function floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
  }
  /**
   * Returns the minimum of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */


  function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
  }
  /**
   * Returns the maximum of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */


  function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
  }
  /**
   * Math.round the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a vector to round
   * @returns {vec3} out
   */


  function round(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
  }
  /**
   * Scales a vec3 by a scalar number
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec3} out
   */


  function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }
  /**
   * Adds two vec3's after scaling the second operand by a scalar value
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec3} out
   */


  function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    return out;
  }
  /**
   * Calculates the euclidian distance between two vec3's
   *
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {Number} distance between a and b
   */


  function distance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return Math.hypot(x, y, z);
  }
  /**
   * Calculates the squared euclidian distance between two vec3's
   *
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {Number} squared distance between a and b
   */


  function squaredDistance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return x * x + y * y + z * z;
  }
  /**
   * Calculates the squared length of a vec3
   *
   * @param {ReadonlyVec3} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */


  function squaredLength(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return x * x + y * y + z * z;
  }
  /**
   * Negates the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a vector to negate
   * @returns {vec3} out
   */


  function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  }
  /**
   * Returns the inverse of the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a vector to invert
   * @returns {vec3} out
   */


  function inverse(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    return out;
  }
  /**
   * Normalize a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a vector to normalize
   * @returns {vec3} out
   */


  function normalize(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var len = x * x + y * y + z * z;

    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
    }

    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
    return out;
  }
  /**
   * Calculates the dot product of two vec3's
   *
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {Number} dot product of a and b
   */


  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  /**
   * Computes the cross product of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */


  function cross(out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    var bx = b[0],
        by = b[1],
        bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  /**
   * Performs a linear interpolation between two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */


  function lerp(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
  }
  /**
   * Performs a hermite interpolation with two control points
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @param {ReadonlyVec3} c the third operand
   * @param {ReadonlyVec3} d the fourth operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */


  function hermite(out, a, b, c, d, t) {
    var factorTimes2 = t * t;
    var factor1 = factorTimes2 * (2 * t - 3) + 1;
    var factor2 = factorTimes2 * (t - 2) + t;
    var factor3 = factorTimes2 * (t - 1);
    var factor4 = factorTimes2 * (3 - 2 * t);
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  /**
   * Performs a bezier interpolation with two control points
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @param {ReadonlyVec3} c the third operand
   * @param {ReadonlyVec3} d the fourth operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */


  function bezier(out, a, b, c, d, t) {
    var inverseFactor = 1 - t;
    var inverseFactorTimesTwo = inverseFactor * inverseFactor;
    var factorTimes2 = t * t;
    var factor1 = inverseFactorTimesTwo * inverseFactor;
    var factor2 = 3 * t * inverseFactorTimesTwo;
    var factor3 = 3 * factorTimes2 * inverseFactor;
    var factor4 = factorTimes2 * t;
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  /**
   * Generates a random vector with the given scale
   *
   * @param {vec3} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
   * @returns {vec3} out
   */


  function random(out, scale) {
    scale = scale || 1.0;
    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    var z = glMatrix.RANDOM() * 2.0 - 1.0;
    var zScale = Math.sqrt(1.0 - z * z) * scale;
    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
  }
  /**
   * Transforms the vec3 with a mat4.
   * 4th vector component is implicitly '1'
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the vector to transform
   * @param {ReadonlyMat4} m matrix to transform with
   * @returns {vec3} out
   */


  function transformMat4(out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }
  /**
   * Transforms the vec3 with a mat3.
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the vector to transform
   * @param {ReadonlyMat3} m the 3x3 matrix to transform with
   * @returns {vec3} out
   */


  function transformMat3(out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
  }
  /**
   * Transforms the vec3 with a quat
   * Can also be used for dual quaternions. (Multiply it with the real part)
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the vector to transform
   * @param {ReadonlyQuat} q quaternion to transform with
   * @returns {vec3} out
   */


  function transformQuat(out, a, q) {
    // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
    var qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3];
    var x = a[0],
        y = a[1],
        z = a[2]; // var qvec = [qx, qy, qz];
    // var uv = vec3.cross([], qvec, a);

    var uvx = qy * z - qz * y,
        uvy = qz * x - qx * z,
        uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

    var uuvx = qy * uvz - qz * uvy,
        uuvy = qz * uvx - qx * uvz,
        uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

    var w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2; // vec3.scale(uuv, uuv, 2);

    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
  }
  /**
   * Rotate a 3D vector around the x-axis
   * @param {vec3} out The receiving vec3
   * @param {ReadonlyVec3} a The vec3 point to rotate
   * @param {ReadonlyVec3} b The origin of the rotation
   * @param {Number} rad The angle of rotation in radians
   * @returns {vec3} out
   */


  function rotateX(out, a, b, rad) {
    var p = [],
        r = []; //Translate point to the origin

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation

    r[0] = p[0];
    r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
    r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  /**
   * Rotate a 3D vector around the y-axis
   * @param {vec3} out The receiving vec3
   * @param {ReadonlyVec3} a The vec3 point to rotate
   * @param {ReadonlyVec3} b The origin of the rotation
   * @param {Number} rad The angle of rotation in radians
   * @returns {vec3} out
   */


  function rotateY(out, a, b, rad) {
    var p = [],
        r = []; //Translate point to the origin

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation

    r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  /**
   * Rotate a 3D vector around the z-axis
   * @param {vec3} out The receiving vec3
   * @param {ReadonlyVec3} a The vec3 point to rotate
   * @param {ReadonlyVec3} b The origin of the rotation
   * @param {Number} rad The angle of rotation in radians
   * @returns {vec3} out
   */


  function rotateZ(out, a, b, rad) {
    var p = [],
        r = []; //Translate point to the origin

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation

    r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
    r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
    r[2] = p[2]; //translate to correct position

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  /**
   * Get the angle between two 3D vectors
   * @param {ReadonlyVec3} a The first operand
   * @param {ReadonlyVec3} b The second operand
   * @returns {Number} The angle in radians
   */


  function angle(a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        bx = b[0],
        by = b[1],
        bz = b[2],
        mag1 = Math.sqrt(ax * ax + ay * ay + az * az),
        mag2 = Math.sqrt(bx * bx + by * by + bz * bz),
        mag = mag1 * mag2,
        cosine = mag && dot(a, b) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }
  /**
   * Set the components of a vec3 to zero
   *
   * @param {vec3} out the receiving vector
   * @returns {vec3} out
   */


  function zero(out) {
    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    return out;
  }
  /**
   * Returns a string representation of a vector
   *
   * @param {ReadonlyVec3} a vector to represent as a string
   * @returns {String} string representation of the vector
   */


  function str(a) {
    return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
  }
  /**
   * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyVec3} a The first vector.
   * @param {ReadonlyVec3} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */


  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }
  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   *
   * @param {ReadonlyVec3} a The first vector.
   * @param {ReadonlyVec3} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */


  function equals(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2];
    return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
  }
  /**
   * Alias for {@link vec3.subtract}
   * @function
   */


  var sub = subtract;
  /**
   * Alias for {@link vec3.multiply}
   * @function
   */

  exports.sub = sub;
  var mul = multiply;
  /**
   * Alias for {@link vec3.divide}
   * @function
   */

  exports.mul = mul;
  var div = divide;
  /**
   * Alias for {@link vec3.distance}
   * @function
   */

  exports.div = div;
  var dist = distance;
  /**
   * Alias for {@link vec3.squaredDistance}
   * @function
   */

  exports.dist = dist;
  var sqrDist = squaredDistance;
  /**
   * Alias for {@link vec3.length}
   * @function
   */

  exports.sqrDist = sqrDist;
  var len = length;
  /**
   * Alias for {@link vec3.squaredLength}
   * @function
   */

  exports.len = len;
  var sqrLen = squaredLength;
  /**
   * Perform some operation over an array of vec3s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  exports.sqrLen = sqrLen;

  var forEach = function () {
    var vec = create();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 3;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }

      return a;
    };
  }();

  exports.forEach = forEach;
  });

  unwrapExports(vec3);
  var vec3_1 = vec3.create;
  var vec3_2 = vec3.clone;
  var vec3_3 = vec3.length;
  var vec3_4 = vec3.fromValues;
  var vec3_5 = vec3.copy;
  var vec3_6 = vec3.set;
  var vec3_7 = vec3.add;
  var vec3_8 = vec3.subtract;
  var vec3_9 = vec3.multiply;
  var vec3_10 = vec3.divide;
  var vec3_11 = vec3.ceil;
  var vec3_12 = vec3.floor;
  var vec3_13 = vec3.min;
  var vec3_14 = vec3.max;
  var vec3_15 = vec3.round;
  var vec3_16 = vec3.scale;
  var vec3_17 = vec3.scaleAndAdd;
  var vec3_18 = vec3.distance;
  var vec3_19 = vec3.squaredDistance;
  var vec3_20 = vec3.squaredLength;
  var vec3_21 = vec3.negate;
  var vec3_22 = vec3.inverse;
  var vec3_23 = vec3.normalize;
  var vec3_24 = vec3.dot;
  var vec3_25 = vec3.cross;
  var vec3_26 = vec3.lerp;
  var vec3_27 = vec3.hermite;
  var vec3_28 = vec3.bezier;
  var vec3_29 = vec3.random;
  var vec3_30 = vec3.transformMat4;
  var vec3_31 = vec3.transformMat3;
  var vec3_32 = vec3.transformQuat;
  var vec3_33 = vec3.rotateX;
  var vec3_34 = vec3.rotateY;
  var vec3_35 = vec3.rotateZ;
  var vec3_36 = vec3.angle;
  var vec3_37 = vec3.zero;
  var vec3_38 = vec3.str;
  var vec3_39 = vec3.exactEquals;
  var vec3_40 = vec3.equals;
  var vec3_41 = vec3.forEach;
  var vec3_42 = vec3.sqrLen;
  var vec3_43 = vec3.len;
  var vec3_44 = vec3.sqrDist;
  var vec3_45 = vec3.dist;
  var vec3_46 = vec3.div;
  var vec3_47 = vec3.mul;
  var vec3_48 = vec3.sub;

  var vec4 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.create = create;
  exports.clone = clone;
  exports.fromValues = fromValues;
  exports.copy = copy;
  exports.set = set;
  exports.add = add;
  exports.subtract = subtract;
  exports.multiply = multiply;
  exports.divide = divide;
  exports.ceil = ceil;
  exports.floor = floor;
  exports.min = min;
  exports.max = max;
  exports.round = round;
  exports.scale = scale;
  exports.scaleAndAdd = scaleAndAdd;
  exports.distance = distance;
  exports.squaredDistance = squaredDistance;
  exports.length = length;
  exports.squaredLength = squaredLength;
  exports.negate = negate;
  exports.inverse = inverse;
  exports.normalize = normalize;
  exports.dot = dot;
  exports.cross = cross;
  exports.lerp = lerp;
  exports.random = random;
  exports.transformMat4 = transformMat4;
  exports.transformQuat = transformQuat;
  exports.zero = zero;
  exports.str = str;
  exports.exactEquals = exactEquals;
  exports.equals = equals;
  exports.forEach = exports.sqrLen = exports.len = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = void 0;

  var glMatrix = _interopRequireWildcard(common);

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") { return null; } var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  /**
   * 4 Dimensional Vector
   * @module vec4
   */

  /**
   * Creates a new, empty vec4
   *
   * @returns {vec4} a new 4D vector
   */
  function create() {
    var out = new glMatrix.ARRAY_TYPE(4);

    if (glMatrix.ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec4 initialized with values from an existing vector
   *
   * @param {ReadonlyVec4} a vector to clone
   * @returns {vec4} a new 4D vector
   */


  function clone(a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Creates a new vec4 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} a new 4D vector
   */


  function fromValues(x, y, z, w) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  /**
   * Copy the values from one vec4 to another
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the source vector
   * @returns {vec4} out
   */


  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Set the components of a vec4 to the given values
   *
   * @param {vec4} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} out
   */


  function set(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  /**
   * Adds two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {vec4} out
   */


  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
  }
  /**
   * Subtracts vector b from vector a
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {vec4} out
   */


  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
  }
  /**
   * Multiplies two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {vec4} out
   */


  function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
  }
  /**
   * Divides two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {vec4} out
   */


  function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
  }
  /**
   * Math.ceil the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a vector to ceil
   * @returns {vec4} out
   */


  function ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    out[3] = Math.ceil(a[3]);
    return out;
  }
  /**
   * Math.floor the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a vector to floor
   * @returns {vec4} out
   */


  function floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    out[3] = Math.floor(a[3]);
    return out;
  }
  /**
   * Returns the minimum of two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {vec4} out
   */


  function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
  }
  /**
   * Returns the maximum of two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {vec4} out
   */


  function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
  }
  /**
   * Math.round the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a vector to round
   * @returns {vec4} out
   */


  function round(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    out[3] = Math.round(a[3]);
    return out;
  }
  /**
   * Scales a vec4 by a scalar number
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec4} out
   */


  function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
  }
  /**
   * Adds two vec4's after scaling the second operand by a scalar value
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec4} out
   */


  function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    return out;
  }
  /**
   * Calculates the euclidian distance between two vec4's
   *
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {Number} distance between a and b
   */


  function distance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    var w = b[3] - a[3];
    return Math.hypot(x, y, z, w);
  }
  /**
   * Calculates the squared euclidian distance between two vec4's
   *
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {Number} squared distance between a and b
   */


  function squaredDistance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    var w = b[3] - a[3];
    return x * x + y * y + z * z + w * w;
  }
  /**
   * Calculates the length of a vec4
   *
   * @param {ReadonlyVec4} a vector to calculate length of
   * @returns {Number} length of a
   */


  function length(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    return Math.hypot(x, y, z, w);
  }
  /**
   * Calculates the squared length of a vec4
   *
   * @param {ReadonlyVec4} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */


  function squaredLength(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    return x * x + y * y + z * z + w * w;
  }
  /**
   * Negates the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a vector to negate
   * @returns {vec4} out
   */


  function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
  }
  /**
   * Returns the inverse of the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a vector to invert
   * @returns {vec4} out
   */


  function inverse(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    out[3] = 1.0 / a[3];
    return out;
  }
  /**
   * Normalize a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a vector to normalize
   * @returns {vec4} out
   */


  function normalize(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    var len = x * x + y * y + z * z + w * w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }

    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
    return out;
  }
  /**
   * Calculates the dot product of two vec4's
   *
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {Number} dot product of a and b
   */


  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }
  /**
   * Returns the cross-product of three vectors in a 4-dimensional space
   *
   * @param {ReadonlyVec4} result the receiving vector
   * @param {ReadonlyVec4} U the first vector
   * @param {ReadonlyVec4} V the second vector
   * @param {ReadonlyVec4} W the third vector
   * @returns {vec4} result
   */


  function cross(out, u, v, w) {
    var A = v[0] * w[1] - v[1] * w[0],
        B = v[0] * w[2] - v[2] * w[0],
        C = v[0] * w[3] - v[3] * w[0],
        D = v[1] * w[2] - v[2] * w[1],
        E = v[1] * w[3] - v[3] * w[1],
        F = v[2] * w[3] - v[3] * w[2];
    var G = u[0];
    var H = u[1];
    var I = u[2];
    var J = u[3];
    out[0] = H * F - I * E + J * D;
    out[1] = -(G * F) + I * C - J * B;
    out[2] = G * E - H * C + J * A;
    out[3] = -(G * D) + H * B - I * A;
    return out;
  }
  /**
   * Performs a linear interpolation between two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec4} out
   */


  function lerp(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    var aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
  }
  /**
   * Generates a random vector with the given scale
   *
   * @param {vec4} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
   * @returns {vec4} out
   */


  function random(out, scale) {
    scale = scale || 1.0; // Marsaglia, George. Choosing a Point from the Surface of a
    // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
    // http://projecteuclid.org/euclid.aoms/1177692644;

    var v1, v2, v3, v4;
    var s1, s2;

    do {
      v1 = glMatrix.RANDOM() * 2 - 1;
      v2 = glMatrix.RANDOM() * 2 - 1;
      s1 = v1 * v1 + v2 * v2;
    } while (s1 >= 1);

    do {
      v3 = glMatrix.RANDOM() * 2 - 1;
      v4 = glMatrix.RANDOM() * 2 - 1;
      s2 = v3 * v3 + v4 * v4;
    } while (s2 >= 1);

    var d = Math.sqrt((1 - s1) / s2);
    out[0] = scale * v1;
    out[1] = scale * v2;
    out[2] = scale * v3 * d;
    out[3] = scale * v4 * d;
    return out;
  }
  /**
   * Transforms the vec4 with a mat4.
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the vector to transform
   * @param {ReadonlyMat4} m matrix to transform with
   * @returns {vec4} out
   */


  function transformMat4(out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
  }
  /**
   * Transforms the vec4 with a quat
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the vector to transform
   * @param {ReadonlyQuat} q quaternion to transform with
   * @returns {vec4} out
   */


  function transformQuat(out, a, q) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3]; // calculate quat * vec

    var ix = qw * x + qy * z - qz * y;
    var iy = qw * y + qz * x - qx * z;
    var iz = qw * z + qx * y - qy * x;
    var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
  }
  /**
   * Set the components of a vec4 to zero
   *
   * @param {vec4} out the receiving vector
   * @returns {vec4} out
   */


  function zero(out) {
    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    return out;
  }
  /**
   * Returns a string representation of a vector
   *
   * @param {ReadonlyVec4} a vector to represent as a string
   * @returns {String} string representation of the vector
   */


  function str(a) {
    return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
  }
  /**
   * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyVec4} a The first vector.
   * @param {ReadonlyVec4} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */


  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }
  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   *
   * @param {ReadonlyVec4} a The first vector.
   * @param {ReadonlyVec4} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */


  function equals(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
  }
  /**
   * Alias for {@link vec4.subtract}
   * @function
   */


  var sub = subtract;
  /**
   * Alias for {@link vec4.multiply}
   * @function
   */

  exports.sub = sub;
  var mul = multiply;
  /**
   * Alias for {@link vec4.divide}
   * @function
   */

  exports.mul = mul;
  var div = divide;
  /**
   * Alias for {@link vec4.distance}
   * @function
   */

  exports.div = div;
  var dist = distance;
  /**
   * Alias for {@link vec4.squaredDistance}
   * @function
   */

  exports.dist = dist;
  var sqrDist = squaredDistance;
  /**
   * Alias for {@link vec4.length}
   * @function
   */

  exports.sqrDist = sqrDist;
  var len = length;
  /**
   * Alias for {@link vec4.squaredLength}
   * @function
   */

  exports.len = len;
  var sqrLen = squaredLength;
  /**
   * Perform some operation over an array of vec4s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  exports.sqrLen = sqrLen;

  var forEach = function () {
    var vec = create();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 4;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
        a[i + 3] = vec[3];
      }

      return a;
    };
  }();

  exports.forEach = forEach;
  });

  unwrapExports(vec4);
  var vec4_1 = vec4.create;
  var vec4_2 = vec4.clone;
  var vec4_3 = vec4.fromValues;
  var vec4_4 = vec4.copy;
  var vec4_5 = vec4.set;
  var vec4_6 = vec4.add;
  var vec4_7 = vec4.subtract;
  var vec4_8 = vec4.multiply;
  var vec4_9 = vec4.divide;
  var vec4_10 = vec4.ceil;
  var vec4_11 = vec4.floor;
  var vec4_12 = vec4.min;
  var vec4_13 = vec4.max;
  var vec4_14 = vec4.round;
  var vec4_15 = vec4.scale;
  var vec4_16 = vec4.scaleAndAdd;
  var vec4_17 = vec4.distance;
  var vec4_18 = vec4.squaredDistance;
  var vec4_19 = vec4.length;
  var vec4_20 = vec4.squaredLength;
  var vec4_21 = vec4.negate;
  var vec4_22 = vec4.inverse;
  var vec4_23 = vec4.normalize;
  var vec4_24 = vec4.dot;
  var vec4_25 = vec4.cross;
  var vec4_26 = vec4.lerp;
  var vec4_27 = vec4.random;
  var vec4_28 = vec4.transformMat4;
  var vec4_29 = vec4.transformQuat;
  var vec4_30 = vec4.zero;
  var vec4_31 = vec4.str;
  var vec4_32 = vec4.exactEquals;
  var vec4_33 = vec4.equals;
  var vec4_34 = vec4.forEach;
  var vec4_35 = vec4.sqrLen;
  var vec4_36 = vec4.len;
  var vec4_37 = vec4.sqrDist;
  var vec4_38 = vec4.dist;
  var vec4_39 = vec4.div;
  var vec4_40 = vec4.mul;
  var vec4_41 = vec4.sub;

  var quat = createCommonjsModule(function (module, exports) {

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.create = create;
  exports.identity = identity;
  exports.setAxisAngle = setAxisAngle;
  exports.getAxisAngle = getAxisAngle;
  exports.getAngle = getAngle;
  exports.multiply = multiply;
  exports.rotateX = rotateX;
  exports.rotateY = rotateY;
  exports.rotateZ = rotateZ;
  exports.calculateW = calculateW;
  exports.exp = exp;
  exports.ln = ln;
  exports.pow = pow;
  exports.slerp = slerp;
  exports.random = random;
  exports.invert = invert;
  exports.conjugate = conjugate;
  exports.fromMat3 = fromMat3;
  exports.fromEuler = fromEuler;
  exports.str = str;
  exports.setAxes = exports.sqlerp = exports.rotationTo = exports.equals = exports.exactEquals = exports.normalize = exports.sqrLen = exports.squaredLength = exports.len = exports.length = exports.lerp = exports.dot = exports.scale = exports.mul = exports.add = exports.set = exports.copy = exports.fromValues = exports.clone = void 0;

  var glMatrix = _interopRequireWildcard(common);

  var mat3$1 = _interopRequireWildcard(mat3);

  var vec3$1 = _interopRequireWildcard(vec3);

  var vec4$1 = _interopRequireWildcard(vec4);

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") { return null; } var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  /**
   * Quaternion
   * @module quat
   */

  /**
   * Creates a new identity quat
   *
   * @returns {quat} a new quaternion
   */
  function create() {
    var out = new glMatrix.ARRAY_TYPE(4);

    if (glMatrix.ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    out[3] = 1;
    return out;
  }
  /**
   * Set a quat to the identity quaternion
   *
   * @param {quat} out the receiving quaternion
   * @returns {quat} out
   */


  function identity(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  }
  /**
   * Sets a quat from the given angle and rotation axis,
   * then returns it.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyVec3} axis the axis around which to rotate
   * @param {Number} rad the angle in radians
   * @returns {quat} out
   **/


  function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }
  /**
   * Gets the rotation axis and angle for a given
   *  quaternion. If a quaternion is created with
   *  setAxisAngle, this method will return the same
   *  values as providied in the original parameter list
   *  OR functionally equivalent values.
   * Example: The quaternion formed by axis [0, 0, 1] and
   *  angle -90 is the same as the quaternion formed by
   *  [0, 0, 1] and 270. This method favors the latter.
   * @param  {vec3} out_axis  Vector receiving the axis of rotation
   * @param  {ReadonlyQuat} q     Quaternion to be decomposed
   * @return {Number}     Angle, in radians, of the rotation
   */


  function getAxisAngle(out_axis, q) {
    var rad = Math.acos(q[3]) * 2.0;
    var s = Math.sin(rad / 2.0);

    if (s > glMatrix.EPSILON) {
      out_axis[0] = q[0] / s;
      out_axis[1] = q[1] / s;
      out_axis[2] = q[2] / s;
    } else {
      // If s is zero, return any axis (no rotation - axis does not matter)
      out_axis[0] = 1;
      out_axis[1] = 0;
      out_axis[2] = 0;
    }

    return rad;
  }
  /**
   * Gets the angular distance between two unit quaternions
   *
   * @param  {ReadonlyQuat} a     Origin unit quaternion
   * @param  {ReadonlyQuat} b     Destination unit quaternion
   * @return {Number}     Angle, in radians, between the two quaternions
   */


  function getAngle(a, b) {
    var dotproduct = dot(a, b);
    return Math.acos(2 * dotproduct * dotproduct - 1);
  }
  /**
   * Multiplies two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a the first operand
   * @param {ReadonlyQuat} b the second operand
   * @returns {quat} out
   */


  function multiply(out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }
  /**
   * Rotates a quaternion by the given angle about the X axis
   *
   * @param {quat} out quat receiving operation result
   * @param {ReadonlyQuat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */


  function rotateX(out, a, rad) {
    rad *= 0.5;
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bx = Math.sin(rad),
        bw = Math.cos(rad);
    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
  }
  /**
   * Rotates a quaternion by the given angle about the Y axis
   *
   * @param {quat} out quat receiving operation result
   * @param {ReadonlyQuat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */


  function rotateY(out, a, rad) {
    rad *= 0.5;
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var by = Math.sin(rad),
        bw = Math.cos(rad);
    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
  }
  /**
   * Rotates a quaternion by the given angle about the Z axis
   *
   * @param {quat} out quat receiving operation result
   * @param {ReadonlyQuat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */


  function rotateZ(out, a, rad) {
    rad *= 0.5;
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bz = Math.sin(rad),
        bw = Math.cos(rad);
    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
  }
  /**
   * Calculates the W component of a quat from the X, Y, and Z components.
   * Assumes that quaternion is 1 unit in length.
   * Any existing W component will be ignored.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a quat to calculate W component of
   * @returns {quat} out
   */


  function calculateW(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
  }
  /**
   * Calculate the exponential of a unit quaternion.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a quat to calculate the exponential of
   * @returns {quat} out
   */


  function exp(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var r = Math.sqrt(x * x + y * y + z * z);
    var et = Math.exp(w);
    var s = r > 0 ? et * Math.sin(r) / r : 0;
    out[0] = x * s;
    out[1] = y * s;
    out[2] = z * s;
    out[3] = et * Math.cos(r);
    return out;
  }
  /**
   * Calculate the natural logarithm of a unit quaternion.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a quat to calculate the exponential of
   * @returns {quat} out
   */


  function ln(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var r = Math.sqrt(x * x + y * y + z * z);
    var t = r > 0 ? Math.atan2(r, w) / r : 0;
    out[0] = x * t;
    out[1] = y * t;
    out[2] = z * t;
    out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
    return out;
  }
  /**
   * Calculate the scalar power of a unit quaternion.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a quat to calculate the exponential of
   * @param {Number} b amount to scale the quaternion by
   * @returns {quat} out
   */


  function pow(out, a, b) {
    ln(out, a);
    scale(out, out, b);
    exp(out, out);
    return out;
  }
  /**
   * Performs a spherical linear interpolation between two quat
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a the first operand
   * @param {ReadonlyQuat} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   */


  function slerp(out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];
    var omega, cosom, sinom, scale0, scale1; // calc cosine

    cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    } // calculate coefficients


    if (1.0 - cosom > glMatrix.EPSILON) {
      // standard case (slerp)
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    } // calculate final values


    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }
  /**
   * Generates a random unit quaternion
   *
   * @param {quat} out the receiving quaternion
   * @returns {quat} out
   */


  function random(out) {
    // Implementation of http://planning.cs.uiuc.edu/node198.html
    // TODO: Calling random 3 times is probably not the fastest solution
    var u1 = glMatrix.RANDOM();
    var u2 = glMatrix.RANDOM();
    var u3 = glMatrix.RANDOM();
    var sqrt1MinusU1 = Math.sqrt(1 - u1);
    var sqrtU1 = Math.sqrt(u1);
    out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
    out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
    out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
    out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
    return out;
  }
  /**
   * Calculates the inverse of a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a quat to calculate inverse of
   * @returns {quat} out
   */


  function invert(out, a) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    var invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
  }
  /**
   * Calculates the conjugate of a quat
   * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a quat to calculate conjugate of
   * @returns {quat} out
   */


  function conjugate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Creates a quaternion from the given 3x3 rotation matrix.
   *
   * NOTE: The resultant quaternion is not normalized, so you should be sure
   * to renormalize the quaternion yourself where necessary.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyMat3} m rotation matrix
   * @returns {quat} out
   * @function
   */


  function fromMat3(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if (fTrace > 0.0) {
      // |w| > 1/2, may as well choose w > 1/2
      fRoot = Math.sqrt(fTrace + 1.0); // 2w

      out[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot; // 1/(4w)

      out[0] = (m[5] - m[7]) * fRoot;
      out[1] = (m[6] - m[2]) * fRoot;
      out[2] = (m[1] - m[3]) * fRoot;
    } else {
      // |w| <= 1/2
      var i = 0;
      if (m[4] > m[0]) { i = 1; }
      if (m[8] > m[i * 3 + i]) { i = 2; }
      var j = (i + 1) % 3;
      var k = (i + 2) % 3;
      fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
      out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }

    return out;
  }
  /**
   * Creates a quaternion from the given euler angle x, y, z.
   *
   * @param {quat} out the receiving quaternion
   * @param {x} Angle to rotate around X axis in degrees.
   * @param {y} Angle to rotate around Y axis in degrees.
   * @param {z} Angle to rotate around Z axis in degrees.
   * @returns {quat} out
   * @function
   */


  function fromEuler(out, x, y, z) {
    var halfToRad = 0.5 * Math.PI / 180.0;
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;
    var sx = Math.sin(x);
    var cx = Math.cos(x);
    var sy = Math.sin(y);
    var cy = Math.cos(y);
    var sz = Math.sin(z);
    var cz = Math.cos(z);
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
    return out;
  }
  /**
   * Returns a string representation of a quatenion
   *
   * @param {ReadonlyQuat} a vector to represent as a string
   * @returns {String} string representation of the vector
   */


  function str(a) {
    return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
  }
  /**
   * Creates a new quat initialized with values from an existing quaternion
   *
   * @param {ReadonlyQuat} a quaternion to clone
   * @returns {quat} a new quaternion
   * @function
   */


  var clone = vec4$1.clone;
  /**
   * Creates a new quat initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {quat} a new quaternion
   * @function
   */

  exports.clone = clone;
  var fromValues = vec4$1.fromValues;
  /**
   * Copy the values from one quat to another
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a the source quaternion
   * @returns {quat} out
   * @function
   */

  exports.fromValues = fromValues;
  var copy = vec4$1.copy;
  /**
   * Set the components of a quat to the given values
   *
   * @param {quat} out the receiving quaternion
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {quat} out
   * @function
   */

  exports.copy = copy;
  var set = vec4$1.set;
  /**
   * Adds two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a the first operand
   * @param {ReadonlyQuat} b the second operand
   * @returns {quat} out
   * @function
   */

  exports.set = set;
  var add = vec4$1.add;
  /**
   * Alias for {@link quat.multiply}
   * @function
   */

  exports.add = add;
  var mul = multiply;
  /**
   * Scales a quat by a scalar number
   *
   * @param {quat} out the receiving vector
   * @param {ReadonlyQuat} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {quat} out
   * @function
   */

  exports.mul = mul;
  var scale = vec4$1.scale;
  /**
   * Calculates the dot product of two quat's
   *
   * @param {ReadonlyQuat} a the first operand
   * @param {ReadonlyQuat} b the second operand
   * @returns {Number} dot product of a and b
   * @function
   */

  exports.scale = scale;
  var dot = vec4$1.dot;
  /**
   * Performs a linear interpolation between two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a the first operand
   * @param {ReadonlyQuat} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   * @function
   */

  exports.dot = dot;
  var lerp = vec4$1.lerp;
  /**
   * Calculates the length of a quat
   *
   * @param {ReadonlyQuat} a vector to calculate length of
   * @returns {Number} length of a
   */

  exports.lerp = lerp;
  var length = vec4$1.length;
  /**
   * Alias for {@link quat.length}
   * @function
   */

  exports.length = length;
  var len = length;
  /**
   * Calculates the squared length of a quat
   *
   * @param {ReadonlyQuat} a vector to calculate squared length of
   * @returns {Number} squared length of a
   * @function
   */

  exports.len = len;
  var squaredLength = vec4$1.squaredLength;
  /**
   * Alias for {@link quat.squaredLength}
   * @function
   */

  exports.squaredLength = squaredLength;
  var sqrLen = squaredLength;
  /**
   * Normalize a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a quaternion to normalize
   * @returns {quat} out
   * @function
   */

  exports.sqrLen = sqrLen;
  var normalize = vec4$1.normalize;
  /**
   * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyQuat} a The first quaternion.
   * @param {ReadonlyQuat} b The second quaternion.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */

  exports.normalize = normalize;
  var exactEquals = vec4$1.exactEquals;
  /**
   * Returns whether or not the quaternions have approximately the same elements in the same position.
   *
   * @param {ReadonlyQuat} a The first vector.
   * @param {ReadonlyQuat} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */

  exports.exactEquals = exactEquals;
  var equals = vec4$1.equals;
  /**
   * Sets a quaternion to represent the shortest rotation from one
   * vector to another.
   *
   * Both vectors are assumed to be unit length.
   *
   * @param {quat} out the receiving quaternion.
   * @param {ReadonlyVec3} a the initial vector
   * @param {ReadonlyVec3} b the destination vector
   * @returns {quat} out
   */

  exports.equals = equals;

  var rotationTo = function () {
    var tmpvec3 = vec3$1.create();
    var xUnitVec3 = vec3$1.fromValues(1, 0, 0);
    var yUnitVec3 = vec3$1.fromValues(0, 1, 0);
    return function (out, a, b) {
      var dot = vec3$1.dot(a, b);

      if (dot < -0.999999) {
        vec3$1.cross(tmpvec3, xUnitVec3, a);
        if (vec3$1.len(tmpvec3) < 0.000001) { vec3$1.cross(tmpvec3, yUnitVec3, a); }
        vec3$1.normalize(tmpvec3, tmpvec3);
        setAxisAngle(out, tmpvec3, Math.PI);
        return out;
      } else if (dot > 0.999999) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      } else {
        vec3$1.cross(tmpvec3, a, b);
        out[0] = tmpvec3[0];
        out[1] = tmpvec3[1];
        out[2] = tmpvec3[2];
        out[3] = 1 + dot;
        return normalize(out, out);
      }
    };
  }();
  /**
   * Performs a spherical linear interpolation with two control points
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a the first operand
   * @param {ReadonlyQuat} b the second operand
   * @param {ReadonlyQuat} c the third operand
   * @param {ReadonlyQuat} d the fourth operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   */


  exports.rotationTo = rotationTo;

  var sqlerp = function () {
    var temp1 = create();
    var temp2 = create();
    return function (out, a, b, c, d, t) {
      slerp(temp1, a, d, t);
      slerp(temp2, b, c, t);
      slerp(out, temp1, temp2, 2 * t * (1 - t));
      return out;
    };
  }();
  /**
   * Sets the specified quaternion with values corresponding to the given
   * axes. Each axis is a vec3 and is expected to be unit length and
   * perpendicular to all other specified axes.
   *
   * @param {ReadonlyVec3} view  the vector representing the viewing direction
   * @param {ReadonlyVec3} right the vector representing the local "right" direction
   * @param {ReadonlyVec3} up    the vector representing the local "up" direction
   * @returns {quat} out
   */


  exports.sqlerp = sqlerp;

  var setAxes = function () {
    var matr = mat3$1.create();
    return function (out, view, right, up) {
      matr[0] = right[0];
      matr[3] = right[1];
      matr[6] = right[2];
      matr[1] = up[0];
      matr[4] = up[1];
      matr[7] = up[2];
      matr[2] = -view[0];
      matr[5] = -view[1];
      matr[8] = -view[2];
      return normalize(out, fromMat3(out, matr));
    };
  }();

  exports.setAxes = setAxes;
  });

  unwrapExports(quat);
  var quat_1 = quat.create;
  var quat_2 = quat.identity;
  var quat_3 = quat.setAxisAngle;
  var quat_4 = quat.getAxisAngle;
  var quat_5 = quat.getAngle;
  var quat_6 = quat.multiply;
  var quat_7 = quat.rotateX;
  var quat_8 = quat.rotateY;
  var quat_9 = quat.rotateZ;
  var quat_10 = quat.calculateW;
  var quat_11 = quat.exp;
  var quat_12 = quat.ln;
  var quat_13 = quat.pow;
  var quat_14 = quat.slerp;
  var quat_15 = quat.random;
  var quat_16 = quat.invert;
  var quat_17 = quat.conjugate;
  var quat_18 = quat.fromMat3;
  var quat_19 = quat.fromEuler;
  var quat_20 = quat.str;
  var quat_21 = quat.setAxes;
  var quat_22 = quat.sqlerp;
  var quat_23 = quat.rotationTo;
  var quat_24 = quat.equals;
  var quat_25 = quat.exactEquals;
  var quat_26 = quat.normalize;
  var quat_27 = quat.sqrLen;
  var quat_28 = quat.squaredLength;
  var quat_29 = quat.len;
  var quat_30 = quat.length;
  var quat_31 = quat.lerp;
  var quat_32 = quat.dot;
  var quat_33 = quat.scale;
  var quat_34 = quat.mul;
  var quat_35 = quat.add;
  var quat_36 = quat.set;
  var quat_37 = quat.copy;
  var quat_38 = quat.fromValues;
  var quat_39 = quat.clone;

  var quat2 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.create = create;
  exports.clone = clone;
  exports.fromValues = fromValues;
  exports.fromRotationTranslationValues = fromRotationTranslationValues;
  exports.fromRotationTranslation = fromRotationTranslation;
  exports.fromTranslation = fromTranslation;
  exports.fromRotation = fromRotation;
  exports.fromMat4 = fromMat4;
  exports.copy = copy;
  exports.identity = identity;
  exports.set = set;
  exports.getDual = getDual;
  exports.setDual = setDual;
  exports.getTranslation = getTranslation;
  exports.translate = translate;
  exports.rotateX = rotateX;
  exports.rotateY = rotateY;
  exports.rotateZ = rotateZ;
  exports.rotateByQuatAppend = rotateByQuatAppend;
  exports.rotateByQuatPrepend = rotateByQuatPrepend;
  exports.rotateAroundAxis = rotateAroundAxis;
  exports.add = add;
  exports.multiply = multiply;
  exports.scale = scale;
  exports.lerp = lerp;
  exports.invert = invert;
  exports.conjugate = conjugate;
  exports.normalize = normalize;
  exports.str = str;
  exports.exactEquals = exactEquals;
  exports.equals = equals;
  exports.sqrLen = exports.squaredLength = exports.len = exports.length = exports.dot = exports.mul = exports.setReal = exports.getReal = void 0;

  var glMatrix = _interopRequireWildcard(common);

  var quat$1 = _interopRequireWildcard(quat);

  var mat4$1 = _interopRequireWildcard(mat4);

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") { return null; } var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  /**
   * Dual Quaternion<br>
   * Format: [real, dual]<br>
   * Quaternion format: XYZW<br>
   * Make sure to have normalized dual quaternions, otherwise the functions may not work as intended.<br>
   * @module quat2
   */

  /**
   * Creates a new identity dual quat
   *
   * @returns {quat2} a new dual quaternion [real -> rotation, dual -> translation]
   */
  function create() {
    var dq = new glMatrix.ARRAY_TYPE(8);

    if (glMatrix.ARRAY_TYPE != Float32Array) {
      dq[0] = 0;
      dq[1] = 0;
      dq[2] = 0;
      dq[4] = 0;
      dq[5] = 0;
      dq[6] = 0;
      dq[7] = 0;
    }

    dq[3] = 1;
    return dq;
  }
  /**
   * Creates a new quat initialized with values from an existing quaternion
   *
   * @param {ReadonlyQuat2} a dual quaternion to clone
   * @returns {quat2} new dual quaternion
   * @function
   */


  function clone(a) {
    var dq = new glMatrix.ARRAY_TYPE(8);
    dq[0] = a[0];
    dq[1] = a[1];
    dq[2] = a[2];
    dq[3] = a[3];
    dq[4] = a[4];
    dq[5] = a[5];
    dq[6] = a[6];
    dq[7] = a[7];
    return dq;
  }
  /**
   * Creates a new dual quat initialized with the given values
   *
   * @param {Number} x1 X component
   * @param {Number} y1 Y component
   * @param {Number} z1 Z component
   * @param {Number} w1 W component
   * @param {Number} x2 X component
   * @param {Number} y2 Y component
   * @param {Number} z2 Z component
   * @param {Number} w2 W component
   * @returns {quat2} new dual quaternion
   * @function
   */


  function fromValues(x1, y1, z1, w1, x2, y2, z2, w2) {
    var dq = new glMatrix.ARRAY_TYPE(8);
    dq[0] = x1;
    dq[1] = y1;
    dq[2] = z1;
    dq[3] = w1;
    dq[4] = x2;
    dq[5] = y2;
    dq[6] = z2;
    dq[7] = w2;
    return dq;
  }
  /**
   * Creates a new dual quat from the given values (quat and translation)
   *
   * @param {Number} x1 X component
   * @param {Number} y1 Y component
   * @param {Number} z1 Z component
   * @param {Number} w1 W component
   * @param {Number} x2 X component (translation)
   * @param {Number} y2 Y component (translation)
   * @param {Number} z2 Z component (translation)
   * @returns {quat2} new dual quaternion
   * @function
   */


  function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
    var dq = new glMatrix.ARRAY_TYPE(8);
    dq[0] = x1;
    dq[1] = y1;
    dq[2] = z1;
    dq[3] = w1;
    var ax = x2 * 0.5,
        ay = y2 * 0.5,
        az = z2 * 0.5;
    dq[4] = ax * w1 + ay * z1 - az * y1;
    dq[5] = ay * w1 + az * x1 - ax * z1;
    dq[6] = az * w1 + ax * y1 - ay * x1;
    dq[7] = -ax * x1 - ay * y1 - az * z1;
    return dq;
  }
  /**
   * Creates a dual quat from a quaternion and a translation
   *
   * @param {ReadonlyQuat2} dual quaternion receiving operation result
   * @param {ReadonlyQuat} q a normalized quaternion
   * @param {ReadonlyVec3} t tranlation vector
   * @returns {quat2} dual quaternion receiving operation result
   * @function
   */


  function fromRotationTranslation(out, q, t) {
    var ax = t[0] * 0.5,
        ay = t[1] * 0.5,
        az = t[2] * 0.5,
        bx = q[0],
        by = q[1],
        bz = q[2],
        bw = q[3];
    out[0] = bx;
    out[1] = by;
    out[2] = bz;
    out[3] = bw;
    out[4] = ax * bw + ay * bz - az * by;
    out[5] = ay * bw + az * bx - ax * bz;
    out[6] = az * bw + ax * by - ay * bx;
    out[7] = -ax * bx - ay * by - az * bz;
    return out;
  }
  /**
   * Creates a dual quat from a translation
   *
   * @param {ReadonlyQuat2} dual quaternion receiving operation result
   * @param {ReadonlyVec3} t translation vector
   * @returns {quat2} dual quaternion receiving operation result
   * @function
   */


  function fromTranslation(out, t) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = t[0] * 0.5;
    out[5] = t[1] * 0.5;
    out[6] = t[2] * 0.5;
    out[7] = 0;
    return out;
  }
  /**
   * Creates a dual quat from a quaternion
   *
   * @param {ReadonlyQuat2} dual quaternion receiving operation result
   * @param {ReadonlyQuat} q the quaternion
   * @returns {quat2} dual quaternion receiving operation result
   * @function
   */


  function fromRotation(out, q) {
    out[0] = q[0];
    out[1] = q[1];
    out[2] = q[2];
    out[3] = q[3];
    out[4] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    return out;
  }
  /**
   * Creates a new dual quat from a matrix (4x4)
   *
   * @param {quat2} out the dual quaternion
   * @param {ReadonlyMat4} a the matrix
   * @returns {quat2} dual quat receiving operation result
   * @function
   */


  function fromMat4(out, a) {
    //TODO Optimize this
    var outer = quat$1.create();
    mat4$1.getRotation(outer, a);
    var t = new glMatrix.ARRAY_TYPE(3);
    mat4$1.getTranslation(t, a);
    fromRotationTranslation(out, outer, t);
    return out;
  }
  /**
   * Copy the values from one dual quat to another
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the source dual quaternion
   * @returns {quat2} out
   * @function
   */


  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    return out;
  }
  /**
   * Set a dual quat to the identity dual quaternion
   *
   * @param {quat2} out the receiving quaternion
   * @returns {quat2} out
   */


  function identity(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    return out;
  }
  /**
   * Set the components of a dual quat to the given values
   *
   * @param {quat2} out the receiving quaternion
   * @param {Number} x1 X component
   * @param {Number} y1 Y component
   * @param {Number} z1 Z component
   * @param {Number} w1 W component
   * @param {Number} x2 X component
   * @param {Number} y2 Y component
   * @param {Number} z2 Z component
   * @param {Number} w2 W component
   * @returns {quat2} out
   * @function
   */


  function set(out, x1, y1, z1, w1, x2, y2, z2, w2) {
    out[0] = x1;
    out[1] = y1;
    out[2] = z1;
    out[3] = w1;
    out[4] = x2;
    out[5] = y2;
    out[6] = z2;
    out[7] = w2;
    return out;
  }
  /**
   * Gets the real part of a dual quat
   * @param  {quat} out real part
   * @param  {ReadonlyQuat2} a Dual Quaternion
   * @return {quat} real part
   */


  var getReal = quat$1.copy;
  /**
   * Gets the dual part of a dual quat
   * @param  {quat} out dual part
   * @param  {ReadonlyQuat2} a Dual Quaternion
   * @return {quat} dual part
   */

  exports.getReal = getReal;

  function getDual(out, a) {
    out[0] = a[4];
    out[1] = a[5];
    out[2] = a[6];
    out[3] = a[7];
    return out;
  }
  /**
   * Set the real component of a dual quat to the given quaternion
   *
   * @param {quat2} out the receiving quaternion
   * @param {ReadonlyQuat} q a quaternion representing the real part
   * @returns {quat2} out
   * @function
   */


  var setReal = quat$1.copy;
  /**
   * Set the dual component of a dual quat to the given quaternion
   *
   * @param {quat2} out the receiving quaternion
   * @param {ReadonlyQuat} q a quaternion representing the dual part
   * @returns {quat2} out
   * @function
   */

  exports.setReal = setReal;

  function setDual(out, q) {
    out[4] = q[0];
    out[5] = q[1];
    out[6] = q[2];
    out[7] = q[3];
    return out;
  }
  /**
   * Gets the translation of a normalized dual quat
   * @param  {vec3} out translation
   * @param  {ReadonlyQuat2} a Dual Quaternion to be decomposed
   * @return {vec3} translation
   */


  function getTranslation(out, a) {
    var ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7],
        bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3];
    out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    return out;
  }
  /**
   * Translates a dual quat by the given vector
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the dual quaternion to translate
   * @param {ReadonlyVec3} v vector to translate by
   * @returns {quat2} out
   */


  function translate(out, a, v) {
    var ax1 = a[0],
        ay1 = a[1],
        az1 = a[2],
        aw1 = a[3],
        bx1 = v[0] * 0.5,
        by1 = v[1] * 0.5,
        bz1 = v[2] * 0.5,
        ax2 = a[4],
        ay2 = a[5],
        az2 = a[6],
        aw2 = a[7];
    out[0] = ax1;
    out[1] = ay1;
    out[2] = az1;
    out[3] = aw1;
    out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
    out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
    out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
    out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
    return out;
  }
  /**
   * Rotates a dual quat around the X axis
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the dual quaternion to rotate
   * @param {number} rad how far should the rotation be
   * @returns {quat2} out
   */


  function rotateX(out, a, rad) {
    var bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3],
        ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7],
        ax1 = ax * bw + aw * bx + ay * bz - az * by,
        ay1 = ay * bw + aw * by + az * bx - ax * bz,
        az1 = az * bw + aw * bz + ax * by - ay * bx,
        aw1 = aw * bw - ax * bx - ay * by - az * bz;
    quat$1.rotateX(out, a, rad);
    bx = out[0];
    by = out[1];
    bz = out[2];
    bw = out[3];
    out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    return out;
  }
  /**
   * Rotates a dual quat around the Y axis
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the dual quaternion to rotate
   * @param {number} rad how far should the rotation be
   * @returns {quat2} out
   */


  function rotateY(out, a, rad) {
    var bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3],
        ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7],
        ax1 = ax * bw + aw * bx + ay * bz - az * by,
        ay1 = ay * bw + aw * by + az * bx - ax * bz,
        az1 = az * bw + aw * bz + ax * by - ay * bx,
        aw1 = aw * bw - ax * bx - ay * by - az * bz;
    quat$1.rotateY(out, a, rad);
    bx = out[0];
    by = out[1];
    bz = out[2];
    bw = out[3];
    out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    return out;
  }
  /**
   * Rotates a dual quat around the Z axis
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the dual quaternion to rotate
   * @param {number} rad how far should the rotation be
   * @returns {quat2} out
   */


  function rotateZ(out, a, rad) {
    var bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3],
        ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7],
        ax1 = ax * bw + aw * bx + ay * bz - az * by,
        ay1 = ay * bw + aw * by + az * bx - ax * bz,
        az1 = az * bw + aw * bz + ax * by - ay * bx,
        aw1 = aw * bw - ax * bx - ay * by - az * bz;
    quat$1.rotateZ(out, a, rad);
    bx = out[0];
    by = out[1];
    bz = out[2];
    bw = out[3];
    out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    return out;
  }
  /**
   * Rotates a dual quat by a given quaternion (a * q)
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the dual quaternion to rotate
   * @param {ReadonlyQuat} q quaternion to rotate by
   * @returns {quat2} out
   */


  function rotateByQuatAppend(out, a, q) {
    var qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],
        ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax * qw + aw * qx + ay * qz - az * qy;
    out[1] = ay * qw + aw * qy + az * qx - ax * qz;
    out[2] = az * qw + aw * qz + ax * qy - ay * qx;
    out[3] = aw * qw - ax * qx - ay * qy - az * qz;
    ax = a[4];
    ay = a[5];
    az = a[6];
    aw = a[7];
    out[4] = ax * qw + aw * qx + ay * qz - az * qy;
    out[5] = ay * qw + aw * qy + az * qx - ax * qz;
    out[6] = az * qw + aw * qz + ax * qy - ay * qx;
    out[7] = aw * qw - ax * qx - ay * qy - az * qz;
    return out;
  }
  /**
   * Rotates a dual quat by a given quaternion (q * a)
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat} q quaternion to rotate by
   * @param {ReadonlyQuat2} a the dual quaternion to rotate
   * @returns {quat2} out
   */


  function rotateByQuatPrepend(out, q, a) {
    var qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],
        bx = a[0],
        by = a[1],
        bz = a[2],
        bw = a[3];
    out[0] = qx * bw + qw * bx + qy * bz - qz * by;
    out[1] = qy * bw + qw * by + qz * bx - qx * bz;
    out[2] = qz * bw + qw * bz + qx * by - qy * bx;
    out[3] = qw * bw - qx * bx - qy * by - qz * bz;
    bx = a[4];
    by = a[5];
    bz = a[6];
    bw = a[7];
    out[4] = qx * bw + qw * bx + qy * bz - qz * by;
    out[5] = qy * bw + qw * by + qz * bx - qx * bz;
    out[6] = qz * bw + qw * bz + qx * by - qy * bx;
    out[7] = qw * bw - qx * bx - qy * by - qz * bz;
    return out;
  }
  /**
   * Rotates a dual quat around a given axis. Does the normalisation automatically
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the dual quaternion to rotate
   * @param {ReadonlyVec3} axis the axis to rotate around
   * @param {Number} rad how far the rotation should be
   * @returns {quat2} out
   */


  function rotateAroundAxis(out, a, axis, rad) {
    //Special case for rad = 0
    if (Math.abs(rad) < glMatrix.EPSILON) {
      return copy(out, a);
    }

    var axisLength = Math.hypot(axis[0], axis[1], axis[2]);
    rad = rad * 0.5;
    var s = Math.sin(rad);
    var bx = s * axis[0] / axisLength;
    var by = s * axis[1] / axisLength;
    var bz = s * axis[2] / axisLength;
    var bw = Math.cos(rad);
    var ax1 = a[0],
        ay1 = a[1],
        az1 = a[2],
        aw1 = a[3];
    out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    var ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7];
    out[4] = ax * bw + aw * bx + ay * bz - az * by;
    out[5] = ay * bw + aw * by + az * bx - ax * bz;
    out[6] = az * bw + aw * bz + ax * by - ay * bx;
    out[7] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }
  /**
   * Adds two dual quat's
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the first operand
   * @param {ReadonlyQuat2} b the second operand
   * @returns {quat2} out
   * @function
   */


  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    return out;
  }
  /**
   * Multiplies two dual quat's
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the first operand
   * @param {ReadonlyQuat2} b the second operand
   * @returns {quat2} out
   */


  function multiply(out, a, b) {
    var ax0 = a[0],
        ay0 = a[1],
        az0 = a[2],
        aw0 = a[3],
        bx1 = b[4],
        by1 = b[5],
        bz1 = b[6],
        bw1 = b[7],
        ax1 = a[4],
        ay1 = a[5],
        az1 = a[6],
        aw1 = a[7],
        bx0 = b[0],
        by0 = b[1],
        bz0 = b[2],
        bw0 = b[3];
    out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
    out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
    out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
    out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
    out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
    out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
    out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
    out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
    return out;
  }
  /**
   * Alias for {@link quat2.multiply}
   * @function
   */


  var mul = multiply;
  /**
   * Scales a dual quat by a scalar number
   *
   * @param {quat2} out the receiving dual quat
   * @param {ReadonlyQuat2} a the dual quat to scale
   * @param {Number} b amount to scale the dual quat by
   * @returns {quat2} out
   * @function
   */

  exports.mul = mul;

  function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    return out;
  }
  /**
   * Calculates the dot product of two dual quat's (The dot product of the real parts)
   *
   * @param {ReadonlyQuat2} a the first operand
   * @param {ReadonlyQuat2} b the second operand
   * @returns {Number} dot product of a and b
   * @function
   */


  var dot = quat$1.dot;
  /**
   * Performs a linear interpolation between two dual quats's
   * NOTE: The resulting dual quaternions won't always be normalized (The error is most noticeable when t = 0.5)
   *
   * @param {quat2} out the receiving dual quat
   * @param {ReadonlyQuat2} a the first operand
   * @param {ReadonlyQuat2} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat2} out
   */

  exports.dot = dot;

  function lerp(out, a, b, t) {
    var mt = 1 - t;
    if (dot(a, b) < 0) { t = -t; }
    out[0] = a[0] * mt + b[0] * t;
    out[1] = a[1] * mt + b[1] * t;
    out[2] = a[2] * mt + b[2] * t;
    out[3] = a[3] * mt + b[3] * t;
    out[4] = a[4] * mt + b[4] * t;
    out[5] = a[5] * mt + b[5] * t;
    out[6] = a[6] * mt + b[6] * t;
    out[7] = a[7] * mt + b[7] * t;
    return out;
  }
  /**
   * Calculates the inverse of a dual quat. If they are normalized, conjugate is cheaper
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a dual quat to calculate inverse of
   * @returns {quat2} out
   */


  function invert(out, a) {
    var sqlen = squaredLength(a);
    out[0] = -a[0] / sqlen;
    out[1] = -a[1] / sqlen;
    out[2] = -a[2] / sqlen;
    out[3] = a[3] / sqlen;
    out[4] = -a[4] / sqlen;
    out[5] = -a[5] / sqlen;
    out[6] = -a[6] / sqlen;
    out[7] = a[7] / sqlen;
    return out;
  }
  /**
   * Calculates the conjugate of a dual quat
   * If the dual quaternion is normalized, this function is faster than quat2.inverse and produces the same result.
   *
   * @param {quat2} out the receiving quaternion
   * @param {ReadonlyQuat2} a quat to calculate conjugate of
   * @returns {quat2} out
   */


  function conjugate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    out[4] = -a[4];
    out[5] = -a[5];
    out[6] = -a[6];
    out[7] = a[7];
    return out;
  }
  /**
   * Calculates the length of a dual quat
   *
   * @param {ReadonlyQuat2} a dual quat to calculate length of
   * @returns {Number} length of a
   * @function
   */


  var length = quat$1.length;
  /**
   * Alias for {@link quat2.length}
   * @function
   */

  exports.length = length;
  var len = length;
  /**
   * Calculates the squared length of a dual quat
   *
   * @param {ReadonlyQuat2} a dual quat to calculate squared length of
   * @returns {Number} squared length of a
   * @function
   */

  exports.len = len;
  var squaredLength = quat$1.squaredLength;
  /**
   * Alias for {@link quat2.squaredLength}
   * @function
   */

  exports.squaredLength = squaredLength;
  var sqrLen = squaredLength;
  /**
   * Normalize a dual quat
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a dual quaternion to normalize
   * @returns {quat2} out
   * @function
   */

  exports.sqrLen = sqrLen;

  function normalize(out, a) {
    var magnitude = squaredLength(a);

    if (magnitude > 0) {
      magnitude = Math.sqrt(magnitude);
      var a0 = a[0] / magnitude;
      var a1 = a[1] / magnitude;
      var a2 = a[2] / magnitude;
      var a3 = a[3] / magnitude;
      var b0 = a[4];
      var b1 = a[5];
      var b2 = a[6];
      var b3 = a[7];
      var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;
      out[0] = a0;
      out[1] = a1;
      out[2] = a2;
      out[3] = a3;
      out[4] = (b0 - a0 * a_dot_b) / magnitude;
      out[5] = (b1 - a1 * a_dot_b) / magnitude;
      out[6] = (b2 - a2 * a_dot_b) / magnitude;
      out[7] = (b3 - a3 * a_dot_b) / magnitude;
    }

    return out;
  }
  /**
   * Returns a string representation of a dual quatenion
   *
   * @param {ReadonlyQuat2} a dual quaternion to represent as a string
   * @returns {String} string representation of the dual quat
   */


  function str(a) {
    return "quat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ")";
  }
  /**
   * Returns whether or not the dual quaternions have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyQuat2} a the first dual quaternion.
   * @param {ReadonlyQuat2} b the second dual quaternion.
   * @returns {Boolean} true if the dual quaternions are equal, false otherwise.
   */


  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
  }
  /**
   * Returns whether or not the dual quaternions have approximately the same elements in the same position.
   *
   * @param {ReadonlyQuat2} a the first dual quat.
   * @param {ReadonlyQuat2} b the second dual quat.
   * @returns {Boolean} true if the dual quats are equal, false otherwise.
   */


  function equals(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7];
    return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7));
  }
  });

  unwrapExports(quat2);
  var quat2_1 = quat2.create;
  var quat2_2 = quat2.clone;
  var quat2_3 = quat2.fromValues;
  var quat2_4 = quat2.fromRotationTranslationValues;
  var quat2_5 = quat2.fromRotationTranslation;
  var quat2_6 = quat2.fromTranslation;
  var quat2_7 = quat2.fromRotation;
  var quat2_8 = quat2.fromMat4;
  var quat2_9 = quat2.copy;
  var quat2_10 = quat2.identity;
  var quat2_11 = quat2.set;
  var quat2_12 = quat2.getDual;
  var quat2_13 = quat2.setDual;
  var quat2_14 = quat2.getTranslation;
  var quat2_15 = quat2.translate;
  var quat2_16 = quat2.rotateX;
  var quat2_17 = quat2.rotateY;
  var quat2_18 = quat2.rotateZ;
  var quat2_19 = quat2.rotateByQuatAppend;
  var quat2_20 = quat2.rotateByQuatPrepend;
  var quat2_21 = quat2.rotateAroundAxis;
  var quat2_22 = quat2.add;
  var quat2_23 = quat2.multiply;
  var quat2_24 = quat2.scale;
  var quat2_25 = quat2.lerp;
  var quat2_26 = quat2.invert;
  var quat2_27 = quat2.conjugate;
  var quat2_28 = quat2.normalize;
  var quat2_29 = quat2.str;
  var quat2_30 = quat2.exactEquals;
  var quat2_31 = quat2.equals;
  var quat2_32 = quat2.sqrLen;
  var quat2_33 = quat2.squaredLength;
  var quat2_34 = quat2.len;
  var quat2_35 = quat2.length;
  var quat2_36 = quat2.dot;
  var quat2_37 = quat2.mul;
  var quat2_38 = quat2.setReal;
  var quat2_39 = quat2.getReal;

  var vec2 = createCommonjsModule(function (module, exports) {

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.create = create;
  exports.clone = clone;
  exports.fromValues = fromValues;
  exports.copy = copy;
  exports.set = set;
  exports.add = add;
  exports.subtract = subtract;
  exports.multiply = multiply;
  exports.divide = divide;
  exports.ceil = ceil;
  exports.floor = floor;
  exports.min = min;
  exports.max = max;
  exports.round = round;
  exports.scale = scale;
  exports.scaleAndAdd = scaleAndAdd;
  exports.distance = distance;
  exports.squaredDistance = squaredDistance;
  exports.length = length;
  exports.squaredLength = squaredLength;
  exports.negate = negate;
  exports.inverse = inverse;
  exports.normalize = normalize;
  exports.dot = dot;
  exports.cross = cross;
  exports.lerp = lerp;
  exports.random = random;
  exports.transformMat2 = transformMat2;
  exports.transformMat2d = transformMat2d;
  exports.transformMat3 = transformMat3;
  exports.transformMat4 = transformMat4;
  exports.rotate = rotate;
  exports.angle = angle;
  exports.zero = zero;
  exports.str = str;
  exports.exactEquals = exactEquals;
  exports.equals = equals;
  exports.forEach = exports.sqrLen = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = exports.len = void 0;

  var glMatrix = _interopRequireWildcard(common);

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") { return null; } var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  /**
   * 2 Dimensional Vector
   * @module vec2
   */

  /**
   * Creates a new, empty vec2
   *
   * @returns {vec2} a new 2D vector
   */
  function create() {
    var out = new glMatrix.ARRAY_TYPE(2);

    if (glMatrix.ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec2 initialized with values from an existing vector
   *
   * @param {ReadonlyVec2} a vector to clone
   * @returns {vec2} a new 2D vector
   */


  function clone(a) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
  }
  /**
   * Creates a new vec2 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @returns {vec2} a new 2D vector
   */


  function fromValues(x, y) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
  }
  /**
   * Copy the values from one vec2 to another
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the source vector
   * @returns {vec2} out
   */


  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
  }
  /**
   * Set the components of a vec2 to the given values
   *
   * @param {vec2} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @returns {vec2} out
   */


  function set(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
  }
  /**
   * Adds two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {vec2} out
   */


  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
  }
  /**
   * Subtracts vector b from vector a
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {vec2} out
   */


  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
  }
  /**
   * Multiplies two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {vec2} out
   */


  function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
  }
  /**
   * Divides two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {vec2} out
   */


  function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
  }
  /**
   * Math.ceil the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a vector to ceil
   * @returns {vec2} out
   */


  function ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
  }
  /**
   * Math.floor the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a vector to floor
   * @returns {vec2} out
   */


  function floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
  }
  /**
   * Returns the minimum of two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {vec2} out
   */


  function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
  }
  /**
   * Returns the maximum of two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {vec2} out
   */


  function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
  }
  /**
   * Math.round the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a vector to round
   * @returns {vec2} out
   */


  function round(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
  }
  /**
   * Scales a vec2 by a scalar number
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec2} out
   */


  function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
  }
  /**
   * Adds two vec2's after scaling the second operand by a scalar value
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec2} out
   */


  function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    return out;
  }
  /**
   * Calculates the euclidian distance between two vec2's
   *
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {Number} distance between a and b
   */


  function distance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.hypot(x, y);
  }
  /**
   * Calculates the squared euclidian distance between two vec2's
   *
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {Number} squared distance between a and b
   */


  function squaredDistance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x * x + y * y;
  }
  /**
   * Calculates the length of a vec2
   *
   * @param {ReadonlyVec2} a vector to calculate length of
   * @returns {Number} length of a
   */


  function length(a) {
    var x = a[0],
        y = a[1];
    return Math.hypot(x, y);
  }
  /**
   * Calculates the squared length of a vec2
   *
   * @param {ReadonlyVec2} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */


  function squaredLength(a) {
    var x = a[0],
        y = a[1];
    return x * x + y * y;
  }
  /**
   * Negates the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a vector to negate
   * @returns {vec2} out
   */


  function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
  }
  /**
   * Returns the inverse of the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a vector to invert
   * @returns {vec2} out
   */


  function inverse(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    return out;
  }
  /**
   * Normalize a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a vector to normalize
   * @returns {vec2} out
   */


  function normalize(out, a) {
    var x = a[0],
        y = a[1];
    var len = x * x + y * y;

    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
    }

    out[0] = a[0] * len;
    out[1] = a[1] * len;
    return out;
  }
  /**
   * Calculates the dot product of two vec2's
   *
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {Number} dot product of a and b
   */


  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }
  /**
   * Computes the cross product of two vec2's
   * Note that the cross product must by definition produce a 3D vector
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {vec3} out
   */


  function cross(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
  }
  /**
   * Performs a linear interpolation between two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec2} out
   */


  function lerp(out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
  }
  /**
   * Generates a random vector with the given scale
   *
   * @param {vec2} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
   * @returns {vec2} out
   */


  function random(out, scale) {
    scale = scale || 1.0;
    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
  }
  /**
   * Transforms the vec2 with a mat2
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the vector to transform
   * @param {ReadonlyMat2} m matrix to transform with
   * @returns {vec2} out
   */


  function transformMat2(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
  }
  /**
   * Transforms the vec2 with a mat2d
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the vector to transform
   * @param {ReadonlyMat2d} m matrix to transform with
   * @returns {vec2} out
   */


  function transformMat2d(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
  }
  /**
   * Transforms the vec2 with a mat3
   * 3rd vector component is implicitly '1'
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the vector to transform
   * @param {ReadonlyMat3} m matrix to transform with
   * @returns {vec2} out
   */


  function transformMat3(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
  }
  /**
   * Transforms the vec2 with a mat4
   * 3rd vector component is implicitly '0'
   * 4th vector component is implicitly '1'
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the vector to transform
   * @param {ReadonlyMat4} m matrix to transform with
   * @returns {vec2} out
   */


  function transformMat4(out, a, m) {
    var x = a[0];
    var y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
  }
  /**
   * Rotate a 2D vector
   * @param {vec2} out The receiving vec2
   * @param {ReadonlyVec2} a The vec2 point to rotate
   * @param {ReadonlyVec2} b The origin of the rotation
   * @param {Number} rad The angle of rotation in radians
   * @returns {vec2} out
   */


  function rotate(out, a, b, rad) {
    //Translate point to the origin
    var p0 = a[0] - b[0],
        p1 = a[1] - b[1],
        sinC = Math.sin(rad),
        cosC = Math.cos(rad); //perform rotation and translate to correct position

    out[0] = p0 * cosC - p1 * sinC + b[0];
    out[1] = p0 * sinC + p1 * cosC + b[1];
    return out;
  }
  /**
   * Get the angle between two 2D vectors
   * @param {ReadonlyVec2} a The first operand
   * @param {ReadonlyVec2} b The second operand
   * @returns {Number} The angle in radians
   */


  function angle(a, b) {
    var x1 = a[0],
        y1 = a[1],
        x2 = b[0],
        y2 = b[1],
        // mag is the product of the magnitudes of a and b
    mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2),
        // mag &&.. short circuits if mag == 0
    cosine = mag && (x1 * x2 + y1 * y2) / mag; // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1

    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }
  /**
   * Set the components of a vec2 to zero
   *
   * @param {vec2} out the receiving vector
   * @returns {vec2} out
   */


  function zero(out) {
    out[0] = 0.0;
    out[1] = 0.0;
    return out;
  }
  /**
   * Returns a string representation of a vector
   *
   * @param {ReadonlyVec2} a vector to represent as a string
   * @returns {String} string representation of the vector
   */


  function str(a) {
    return "vec2(" + a[0] + ", " + a[1] + ")";
  }
  /**
   * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyVec2} a The first vector.
   * @param {ReadonlyVec2} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */


  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1];
  }
  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   *
   * @param {ReadonlyVec2} a The first vector.
   * @param {ReadonlyVec2} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */


  function equals(a, b) {
    var a0 = a[0],
        a1 = a[1];
    var b0 = b[0],
        b1 = b[1];
    return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
  }
  /**
   * Alias for {@link vec2.length}
   * @function
   */


  var len = length;
  /**
   * Alias for {@link vec2.subtract}
   * @function
   */

  exports.len = len;
  var sub = subtract;
  /**
   * Alias for {@link vec2.multiply}
   * @function
   */

  exports.sub = sub;
  var mul = multiply;
  /**
   * Alias for {@link vec2.divide}
   * @function
   */

  exports.mul = mul;
  var div = divide;
  /**
   * Alias for {@link vec2.distance}
   * @function
   */

  exports.div = div;
  var dist = distance;
  /**
   * Alias for {@link vec2.squaredDistance}
   * @function
   */

  exports.dist = dist;
  var sqrDist = squaredDistance;
  /**
   * Alias for {@link vec2.squaredLength}
   * @function
   */

  exports.sqrDist = sqrDist;
  var sqrLen = squaredLength;
  /**
   * Perform some operation over an array of vec2s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  exports.sqrLen = sqrLen;

  var forEach = function () {
    var vec = create();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 2;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
      }

      return a;
    };
  }();

  exports.forEach = forEach;
  });

  unwrapExports(vec2);
  var vec2_1 = vec2.create;
  var vec2_2 = vec2.clone;
  var vec2_3 = vec2.fromValues;
  var vec2_4 = vec2.copy;
  var vec2_5 = vec2.set;
  var vec2_6 = vec2.add;
  var vec2_7 = vec2.subtract;
  var vec2_8 = vec2.multiply;
  var vec2_9 = vec2.divide;
  var vec2_10 = vec2.ceil;
  var vec2_11 = vec2.floor;
  var vec2_12 = vec2.min;
  var vec2_13 = vec2.max;
  var vec2_14 = vec2.round;
  var vec2_15 = vec2.scale;
  var vec2_16 = vec2.scaleAndAdd;
  var vec2_17 = vec2.distance;
  var vec2_18 = vec2.squaredDistance;
  var vec2_19 = vec2.length;
  var vec2_20 = vec2.squaredLength;
  var vec2_21 = vec2.negate;
  var vec2_22 = vec2.inverse;
  var vec2_23 = vec2.normalize;
  var vec2_24 = vec2.dot;
  var vec2_25 = vec2.cross;
  var vec2_26 = vec2.lerp;
  var vec2_27 = vec2.random;
  var vec2_28 = vec2.transformMat2;
  var vec2_29 = vec2.transformMat2d;
  var vec2_30 = vec2.transformMat3;
  var vec2_31 = vec2.transformMat4;
  var vec2_32 = vec2.rotate;
  var vec2_33 = vec2.angle;
  var vec2_34 = vec2.zero;
  var vec2_35 = vec2.str;
  var vec2_36 = vec2.exactEquals;
  var vec2_37 = vec2.equals;
  var vec2_38 = vec2.forEach;
  var vec2_39 = vec2.sqrLen;
  var vec2_40 = vec2.sqrDist;
  var vec2_41 = vec2.dist;
  var vec2_42 = vec2.div;
  var vec2_43 = vec2.mul;
  var vec2_44 = vec2.sub;
  var vec2_45 = vec2.len;

  var cjs = createCommonjsModule(function (module, exports) {

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.vec4 = exports.vec3 = exports.vec2 = exports.quat2 = exports.quat = exports.mat4 = exports.mat3 = exports.mat2d = exports.mat2 = exports.glMatrix = void 0;

  var glMatrix = _interopRequireWildcard(common);

  exports.glMatrix = glMatrix;

  var mat2$1 = _interopRequireWildcard(mat2);

  exports.mat2 = mat2$1;

  var mat2d$1 = _interopRequireWildcard(mat2d);

  exports.mat2d = mat2d$1;

  var mat3$1 = _interopRequireWildcard(mat3);

  exports.mat3 = mat3$1;

  var mat4$1 = _interopRequireWildcard(mat4);

  exports.mat4 = mat4$1;

  var quat$1 = _interopRequireWildcard(quat);

  exports.quat = quat$1;

  var quat2$1 = _interopRequireWildcard(quat2);

  exports.quat2 = quat2$1;

  var vec2$1 = _interopRequireWildcard(vec2);

  exports.vec2 = vec2$1;

  var vec3$1 = _interopRequireWildcard(vec3);

  exports.vec3 = vec3$1;

  var vec4$1 = _interopRequireWildcard(vec4);

  exports.vec4 = vec4$1;

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") { return null; } var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
  });

  unwrapExports(cjs);
  var cjs_1 = cjs.vec4;
  var cjs_2 = cjs.vec3;
  var cjs_3 = cjs.vec2;
  var cjs_4 = cjs.quat2;
  var cjs_5 = cjs.quat;
  var cjs_6 = cjs.mat4;
  var cjs_7 = cjs.mat3;
  var cjs_8 = cjs.mat2d;
  var cjs_9 = cjs.mat2;
  var cjs_10 = cjs.glMatrix;

  /**
   * Represents a single element in the scene tree
   */
  var Element = function Element() {
      this.children = [];
      this.model = cjs_6.create();
      this.worldModel = cjs_6.create();
      this.modelViewProjection = cjs_6.create();
      this.worldTransformNeedsUpdate = true;
      this.modelViewProjectionNeedsUpdate = true;
      this.type = 'Element';
      this.scene = null;
      this.parent = null;
  };
  Element.prototype.appendChild = function appendChild (child, sendToBack) {
          if ( sendToBack === void 0 ) sendToBack = false;

      child.parent = this;
      if (sendToBack) {
          // back of z-index
          this.children.unshift(child);
      }
      else {
          this.children.push(child);
      }
      if (child.bindScene) {
          child.bindScene(this.scene);
      }
      if (this.scene)
          { this.scene.renderFrame(); }
  };
  Element.prototype.insertChildAfter = function insertChildAfter (child, after) {
      child.parent = this;
      var afterIndex = this.children.indexOf(after);
      if (afterIndex < 0)
          { throw new Error('Could not find element to insert after'); }
      this.children.splice(afterIndex + 1, 0, child);
      if (child.bindScene) {
          child.bindScene(this.scene);
      }
      if (this.scene)
          { this.scene.renderFrame(); }
  };
  Element.prototype.bindScene = function bindScene (scene) {
      this.scene = scene;
      this.worldTransformNeedsUpdate = true;
      this.modelViewProjectionNeedsUpdate = true;
  };
  Element.prototype.traverse = function traverse (enterCallback, exitCallback) {
      enterCallback(this);
      for (var i = 0; i < this.children.length; ++i) {
          var child = this.children[i];
          child.traverse(enterCallback, exitCallback);
      }
      if (exitCallback)
          { exitCallback(this); }
  };
  /**
   * Rotates this element `rad` radians around `axis`.
   */
  Element.prototype.rotate = function rotate (rad, axis) {
      cjs_6.rotate(this.model, this.model, rad, axis);
      this.worldTransformNeedsUpdate = true;
      if (this.scene)
          { this.scene.renderFrame(); }
      return this;
  };
  /**
   * Rotate `rad` radians around X axis
   */
  Element.prototype.rotateX = function rotateX (rad) {
      cjs_6.rotateX(this.model, this.model, rad);
      this.worldTransformNeedsUpdate = true;
      if (this.scene)
          { this.scene.renderFrame(); }
      return this;
  };
  /**
   * Rotate `rad` radians around Y axis
   */
  Element.prototype.rotateY = function rotateY (rad) {
      cjs_6.rotateY(this.model, this.model, rad);
      this.worldTransformNeedsUpdate = true;
      if (this.scene)
          { this.scene.renderFrame(); }
      return this;
  };
  /**
   * Rotate `rad` radians around Z axis
   */
  Element.prototype.rotateZ = function rotateZ (rad) {
      cjs_6.rotateZ(this.model, this.model, rad);
      this.worldTransformNeedsUpdate = true;
      if (this.scene)
          { this.scene.renderFrame(); }
      return this;
  };
  /**
   * Scales this element by vector `v`
   */
  Element.prototype.scale = function scale (v) {
      cjs_6.scale(this.model, this.model, v);
      this.worldTransformNeedsUpdate = true;
      if (this.scene)
          { this.scene.renderFrame(); }
      return this;
  };
  /**
   * Translate this element by vector `v`
   */
  Element.prototype.translate = function translate (v) {
      cjs_6.translate(this.model, this.model, v);
      this.worldTransformNeedsUpdate = true;
      if (this.scene)
          { this.scene.renderFrame(); }
      return this;
  };
  /**
   * Removes the child from the collection of children. Takes `O(n)` time where `n` is number
   * of children.
   */
  Element.prototype.removeChild = function removeChild (child) {
      // TODO: should this be faster?
      var childIdx = this.children.indexOf(child);
      if (childIdx > -1) {
          this.children.splice(childIdx, 1);
          child.bindScene(null);
      }
      if (this.scene)
          { this.scene.renderFrame(); }
  };
  Element.prototype.updateWorldTransform = function updateWorldTransform (force) {
          if ( force === void 0 ) force = false;

      if (this.worldTransformNeedsUpdate || force) {
          if (this.parent) {
              cjs_6.multiply(this.worldModel, this.parent.worldModel, this.model);
          }
          else {
              cjs_6.copy(this.worldModel, this.model);
          }
          this.modelViewProjectionNeedsUpdate = true;
          this.worldTransformNeedsUpdate = false;
          force = true; // We have to update children now.
      }
      var wasDirty = force;
      var children = this.children;
      for (var i = 0; i < children.length; i++) {
          wasDirty = children[i].updateWorldTransform(force) || wasDirty;
      }
      return wasDirty;
  };
  Element.prototype.scheduleMVPUpdate = function scheduleMVPUpdate () {
      this.modelViewProjectionNeedsUpdate = true;
      var children = this.children;
      for (var i = 0; i < children.length; i++) {
          children[i].scheduleMVPUpdate();
      }
  };
  Element.prototype.updateModelViewProjection = function updateModelViewProjection (projection, view) {
      if (!this.modelViewProjectionNeedsUpdate)
          { return; }
      cjs_6.multiply(this.modelViewProjection, projection, view);
      cjs_6.multiply(this.modelViewProjection, this.modelViewProjection, this.worldModel);
      this.modelViewProjectionNeedsUpdate = false;
  };
  /**
   * Requests the element to draw itself (and its children)
   */
  Element.prototype.draw = function draw (gl, drawContext) {
      for (var i = 0; i < this.children.length; ++i) {
          var child = this.children[i];
          child.updateModelViewProjection(drawContext.projection, drawContext.view.matrix);
          child.draw(gl, drawContext);
      }
  };
  Element.prototype.dispose = function dispose () {
      for (var i = 0; i < this.children.length; ++i) {
          var child = this.children[i];
          child.dispose();
      }
  };

  var config = {
      maxSingleTouchTime: 300,
      singleTapDistanceSquared: 25 // within 5px we consider it as a single tap
  };
  function onClap(element, callback, ctx) {
      var touchStartTime = Date.now();
      var startPos;
      // @ts-ignore
      element.addEventListener('click', invokeHandler, { passive: false });
      // @ts-ignore
      element.addEventListener('touchend', handleTouchEnd, { passive: false });
      // @ts-ignore
      element.addEventListener('touchstart', handleTouchStart, { passive: false });
      return disposePrevHandler;
      function handleTouchStart(e) {
          var touches = e.touches;
          if (touches.length === 1) {
              touchStartTime = Date.now();
              startPos = {
                  x: e.touches[0].pageX,
                  y: e.touches[0].pageY
              };
          }
      }
      function handleTouchEnd(e) {
          // multitouch - ignore
          if (e.touches.length > 1)
              { return; }
          // single touch - use time difference to determine if it was a touch or
          // a swipe
          var dt = Date.now() - touchStartTime;
          // To long - ignore
          if (dt > config.maxSingleTouchTime)
              { return; }
          var touch = e.changedTouches[0];
          var dx = touch.pageX - startPos.x;
          var dy = touch.pageY - startPos.y;
          if (dx * dx + dy * dy < config.singleTapDistanceSquared) {
              invokeHandler(touch);
          }
      }
      function disposePrevHandler() {
          // @ts-ignore
          element.removeEventListener('click', invokeHandler);
          // @ts-ignore
          element.removeEventListener('touchend', handleTouchEnd);
          // @ts-ignore
          element.removeEventListener('touchstart', handleTouchStart);
      }
      function invokeHandler(e) {
          // @ts-ignore
          callback.call(ctx, e);
      }
  }

  var spareVec3 = [0, 0, 0];
  var xAxis = [1, 0, 0];
  var yAxis = [0, 1, 0];
  var zAxis = [0, 0, 1];
  /**
   * View matrix allows you to place camera anywhere in the world
   */
  var ViewMatrix = function ViewMatrix(viewMatrix) {
      this.matrix = viewMatrix || cjs_6.create();
      // True position of the camera in the world:
      this.cameraWorld = cjs_6.invert(cjs_6.create(), this.matrix);
      this.position = [0, 0, 0];
      this.orientation = [0, 0, 0, 1];
      this.center = [0, 0, 0];
      this.deconstructPositionRotation();
  };
  /**
   * Makes the view look at a given point
   */
  ViewMatrix.prototype.lookAt = function lookAt (eye, center, up) {
      cjs_6.targetTo(this.cameraWorld, eye, center, up);
      cjs_6.invert(this.matrix, this.cameraWorld);
      this.deconstructPositionRotation();
      return this;
  };
  /**
   * Updates view matrix from the current orientation and position
   */
  ViewMatrix.prototype.update = function update () {
      cjs_6.fromRotationTranslation(this.cameraWorld, this.orientation, this.position);
      cjs_6.invert(this.matrix, this.cameraWorld);
      return this;
  };
  /**
   * Extracts current position and orientation from the `cameraWorld` matrix
   */
  ViewMatrix.prototype.deconstructPositionRotation = function deconstructPositionRotation () {
      cjs_6.getTranslation(this.position, this.cameraWorld);
      cjs_6.getRotation(this.orientation, this.cameraWorld);
  };
  ViewMatrix.prototype.translateOnAxis = function translateOnAxis (axis, distance) {
      var translation = cjs_2.transformQuat(spareVec3, axis, this.orientation);
      cjs_2.scaleAndAdd(this.position, this.position, translation, distance);
      return this;
  };
  ViewMatrix.prototype.translateX = function translateX (distance) {
      return this.translateOnAxis(xAxis, distance);
  };
  ViewMatrix.prototype.translateY = function translateY (distance) {
      return this.translateOnAxis(yAxis, distance);
  };
  ViewMatrix.prototype.translateZ = function translateZ (distance) {
      return this.translateOnAxis(zAxis, distance);
  };

  /**
   * https://github.com/gre/bezier-easing
   * BezierEasing - use bezier curve for transition easing function
   * by Gaëtan Renaudeau 2014 - 2015 – MIT License
   */

  // These values are established by empiricism with tests (tradeoff: performance VS precision)
  var NEWTON_ITERATIONS = 4;
  var NEWTON_MIN_SLOPE = 0.001;
  var SUBDIVISION_PRECISION = 0.0000001;
  var SUBDIVISION_MAX_ITERATIONS = 10;

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  var float32ArraySupported = typeof Float32Array === 'function';

  function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
  function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
  function C (aA1)      { return 3.0 * aA1; }

  // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
  function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

  // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
  function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

  function binarySubdivide (aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
    return currentT;
  }

  function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
   for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
     var currentSlope = getSlope(aGuessT, mX1, mX2);
     if (currentSlope === 0.0) {
       return aGuessT;
     }
     var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
     aGuessT -= currentX / currentSlope;
   }
   return aGuessT;
  }

  function LinearEasing (x) {
    return x;
  }

  var src = function bezier (mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
      throw new Error('bezier x values must be in [0, 1] range');
    }

    if (mX1 === mY1 && mX2 === mY2) {
      return LinearEasing;
    }

    // Precompute samples table
    var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
    for (var i = 0; i < kSplineTableSize; ++i) {
      sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }

    function getTForX (aX) {
      var intervalStart = 0.0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;

      // Interpolate to provide an initial guess for t
      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;

      var initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= NEWTON_MIN_SLOPE) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }
    }

    return function BezierEasing (x) {
      // Because JavaScript number are imprecise, we should guarantee the extremes are right.
      if (x === 0) {
        return 0;
      }
      if (x === 1) {
        return 1;
      }
      return calcBezier(getTForX(x), mY1, mY2);
    };
  };

  // Predefined set of animations. Similar to CSS easing functions
  var animations = {
    ease:  src(0.25, 0.1, 0.25, 1),
    easeIn: src(0.42, 0, 1, 1),
    easeOut: src(0, 0, 0.58, 1),
    easeInOut: src(0.42, 0, 0.58, 1),
    linear: src(0, 0, 1, 1)
  };


  var amator = animate;
  var makeAggregateRaf_1 = makeAggregateRaf;
  var sharedScheduler = makeAggregateRaf();


  function animate(source, target, options) {
    var start = Object.create(null);
    var diff = Object.create(null);
    options = options || {};
    // We let clients specify their own easing function
    var easing = (typeof options.easing === 'function') ? options.easing : animations[options.easing];

    // if nothing is specified, default to ease (similar to CSS animations)
    if (!easing) {
      if (options.easing) {
        console.warn('Unknown easing function in amator: ' + options.easing);
      }
      easing = animations.ease;
    }

    var step = typeof options.step === 'function' ? options.step : noop;
    var done = typeof options.done === 'function' ? options.done : noop;

    var scheduler = getScheduler(options.scheduler);

    var keys = Object.keys(target);
    keys.forEach(function(key) {
      start[key] = source[key];
      diff[key] = target[key] - source[key];
    });

    var durationInMs = typeof options.duration === 'number' ? options.duration : 400;
    var durationInFrames = Math.max(1, durationInMs * 0.06); // 0.06 because 60 frames pers 1,000 ms
    var previousAnimationId;
    var frame = 0;

    previousAnimationId = scheduler.next(loop);

    return {
      cancel: cancel
    }

    function cancel() {
      scheduler.cancel(previousAnimationId);
      previousAnimationId = 0;
    }

    function loop() {
      var t = easing(frame/durationInFrames);
      frame += 1;
      setValues(t);
      if (frame <= durationInFrames) {
        previousAnimationId = scheduler.next(loop);
        step(source);
      } else {
        previousAnimationId = 0;
        setTimeout(function() { done(source); }, 0);
      }
    }

    function setValues(t) {
      keys.forEach(function(key) {
        source[key] = diff[key] * t + start[key];
      });
    }
  }

  function noop() { }

  function getScheduler(scheduler) {
    if (!scheduler) {
      var canRaf = typeof window !== 'undefined' && window.requestAnimationFrame;
      return canRaf ? rafScheduler() : timeoutScheduler()
    }
    if (typeof scheduler.next !== 'function') { throw new Error('Scheduler is supposed to have next(cb) function') }
    if (typeof scheduler.cancel !== 'function') { throw new Error('Scheduler is supposed to have cancel(handle) function') }

    return scheduler
  }

  function rafScheduler() {
    return {
      next: window.requestAnimationFrame.bind(window),
      cancel: window.cancelAnimationFrame.bind(window)
    }
  }

  function timeoutScheduler() {
    return {
      next: function(cb) {
        return setTimeout(cb, 1000/60)
      },
      cancel: function (id) {
        return clearTimeout(id)
      }
    }
  }

  function makeAggregateRaf() {
    var frontBuffer = new Set();
    var backBuffer = new Set();
    var frameToken = 0;

    return {
      next: next,
      cancel: next,
      clearAll: clearAll
    }

    function clearAll() {
      frontBuffer.clear();
      backBuffer.clear();
      cancelAnimationFrame(frameToken);
      frameToken = 0;
    }

    function next(callback) {
      backBuffer.add(callback);
      renderNextFrame();
    }

    function renderNextFrame() {
      if (!frameToken) { frameToken = requestAnimationFrame(renderFrame); }
    }

    function renderFrame() {
      frameToken = 0;

      var t = backBuffer;
      backBuffer = frontBuffer;
      frontBuffer = t;

      frontBuffer.forEach(function(callback) {
        callback();
      });
      frontBuffer.clear();
    }
  }
  amator.makeAggregateRaf = makeAggregateRaf_1;
  amator.sharedScheduler = sharedScheduler;

  /**
   * Allows smooth kinetic scrolling of the surface
   */
  function createKineticAnimation(getCurrentPoint, moveCallback, settings) {
      if (typeof settings !== 'object')
          { settings = {}; }
      var EPS = 1e-3;
      var minVelocity = typeof settings.minVelocity === 'number' ? settings.minVelocity : EPS;
      var amplitude = typeof settings.amplitude === 'number' ? settings.amplitude : 0.01;
      var cancelAnimationFrame = typeof settings.cancelAnimationFrame === 'function'
          ? settings.cancelAnimationFrame
          : getCancelAnimationFrame();
      var requestAnimationFrame = typeof settings.requestAnimationFrame === 'function'
          ? settings.requestAnimationFrame
          : getRequestAnimationFrame();
      var lastPoint;
      var timestamp;
      var timeConstant = 342;
      var trackValueHandle;
      var vx, ax;
      var vy, ay;
      var vz, az;
      var animationHandle;
      return {
          start: start,
          setAmplitude: setAmplitude,
          getAmplitude: getAmplitude,
          stop: stop,
          impulse: impulse,
          cancel: cancel
      };
      function setAmplitude(newAmplitude) {
          amplitude = newAmplitude;
      }
      function getAmplitude() {
          return amplitude;
      }
      function cancel() {
          cancelAnimationFrame(trackValueHandle);
          cancelAnimationFrame(animationHandle);
      }
      function start() {
          lastPoint = getCurrentPoint();
          ax = ay = vx = vy = vz = 0;
          timestamp = new Date();
          cancelAnimationFrame(trackValueHandle);
          cancelAnimationFrame(animationHandle);
          // we start polling the point position to accumulate velocity
          // Once we stop(), we will use accumulated velocity to keep scrolling
          // an object.
          trackValueHandle = requestAnimationFrame(track);
      }
      function track() {
          var now = Date.now();
          var elapsed = now - timestamp;
          timestamp = now;
          var currentPoint = getCurrentPoint();
          var dx = currentPoint.x - lastPoint.x;
          var dy = currentPoint.y - lastPoint.y;
          var dz = (currentPoint.z || 0) - lastPoint.z;
          lastPoint = currentPoint;
          var dt = 1000 / (1 + elapsed);
          // moving average
          vx = 0.8 * dx * dt + 0.2 * vx;
          vy = 0.8 * dy * dt + 0.2 * vy;
          vz = 0.8 * dz * dt + 0.2 * vz;
          trackValueHandle = requestAnimationFrame(track);
      }
      function stop() {
          if (!trackValueHandle)
              { return; }
          cancelAnimationFrame(trackValueHandle);
          trackValueHandle = 0;
          cancelAnimationFrame(animationHandle);
          animationHandle = 0;
          impulse(vx, vy, vz);
      }
      function impulse(vx, vy, vz) {
          timestamp = Date.now();
          if (vx < -minVelocity || vx > minVelocity) {
              ax = amplitude * vx;
          }
          if (vy < -minVelocity || vy > minVelocity) {
              ay = amplitude * vy;
          }
          if (vz < -minVelocity || vz > minVelocity) {
              az = amplitude * vz;
          }
          animationHandle = requestAnimationFrame(kineticMove);
      }
      function kineticMove() {
          var elapsed = Date.now() - timestamp;
          var moving = false;
          var dx = 0;
          var dy = 0;
          var dz = 0;
          var fade = Math.exp(-elapsed / timeConstant);
          if (ax) {
              dx = ax * fade;
              if (dx > EPS || dx < -EPS)
                  { moving = true; }
              else
                  { dx = ax = 0; }
          }
          if (ay) {
              dy = ay * fade;
              if (dy > EPS || dy < -EPS)
                  { moving = true; }
              else
                  { dy = ay = 0; }
          }
          if (az) {
              dz = az * fade;
              if (dz > EPS || dz < -EPS)
                  { moving = true; }
              else
                  { dz = az = 0; }
          }
          if (moving) {
              var p = getCurrentPoint();
              moveCallback(p.x + dx, p.y + dy, p.z + dz);
              animationHandle = requestAnimationFrame(kineticMove);
          }
      }
  }
  function getCancelAnimationFrame() {
      if (typeof cancelAnimationFrame === 'function')
          { return cancelAnimationFrame; }
      return clearTimeout;
  }
  function getRequestAnimationFrame() {
      if (typeof requestAnimationFrame === 'function')
          { return requestAnimationFrame; }
      return function (handler) {
          return setTimeout(handler, 16);
      };
  }

  /**
   * Just to track changes for a single touch event, we create this state:
   */
  var TouchState = function TouchState(touch) {
      this.x = touch.clientX;
      this.y = touch.clientY;
      this.lastX = this.x;
      this.lastY = this.y;
      this.id = touch.identifier;
      this.createdAt = Date.now();
  };
  TouchState.prototype.move = function move (touch) {
      this.lastX = this.x;
      this.lastY = this.y;
      this.x = touch.clientX;
      this.y = touch.clientY;
  };
  // When two fingers touch the scene we want to "lock" interaction to either rotation
  // or scaling. When locked to rotation, we also allow scaling. When Locked to scaling
  // only scaling is allowed
  var UNKNOWN = 0; // here we don't know yet. Collect more input to make a decision
  var SCALE = 1; // Locked to scaling.
  var ROTATE = 2; // Locked to rotation.
  var INCLINE = 3; // Locked to inclination.
  /**
   * This state is used to detect gestures. It answers the questions:
   * - Should we scale with this gesture?
   * - Should we rotate with this gesture?
   * - Should we change incline with this gesture?
   */
  var MultiTouchState = function MultiTouchState(allowRotation) {
      this.allowRotation = allowRotation;
      this.state = UNKNOWN;
      this.canRotate = false;
      this.canScale = false;
      this.canIncline = false;
      this.first = undefined;
      this.second = undefined;
      this.stateChanged = false;
  };
  MultiTouchState.prototype.reset = function reset () {
      this.state = UNKNOWN;
      this.canRotate = false;
      this.canScale = false;
      this.canIncline = false;
      this.first = undefined;
      this.second = undefined;
  };
  MultiTouchState.prototype.isUnknown = function isUnknown () {
      return this.state === UNKNOWN;
  };
  MultiTouchState.prototype.track = function track (first, second) {
      this.stateChanged = false;
      if (this.state !== UNKNOWN)
          { return; } // Already resolved the state.
      if (!(this.first && this.second)) {
          this.first = {
              id: first.id,
              x: first.x,
              y: first.y
          };
          this.second = {
              id: second.id,
              x: second.x,
              y: second.y
          };
          // we are not ready yet to process anything. Wait for more data:
          return;
      }
      // Make sure we have the same first/second touches:
      var originalFirst = this.first;
      var originalSecond = this.second;
      if (first.id === originalSecond.id && second.id === originalFirst.id) {
          var t = originalFirst;
          originalFirst = originalSecond;
          originalSecond = t;
      }
      // Now let's figure out what gesture we are dealing with...
      var dfy = originalFirst.y - originalSecond.y;
      var dfx = originalFirst.x - originalSecond.x;
      var dcy = first.y - second.y;
      var dcx = first.x - second.x;
      // We compare how much the distance has changed between first two touches and
      // current two touches:
      var scaleChange = Math.abs(Math.hypot(dfy, dfx) - Math.hypot(dcy, dcx));
      // Also compare how much the angle has changed:
      var initialAngle = Math.atan2(dfy, dfx);
      var angleChange = Math.abs(initialAngle - Math.atan2(dcy, dcx));
      // Now let's see if this is incline change:
      initialAngle = (Math.abs(initialAngle) * 180) / Math.PI;
      // Two fingers have to be roughly on the horizontal line
      var horizontalAngleInDegrees = 60;
      var isHorizontalLine = initialAngle < horizontalAngleInDegrees ||
          180 - initialAngle < horizontalAngleInDegrees;
      if (isHorizontalLine &&
          this.allowRotation &&
          Math.abs(first.createdAt - second.createdAt) < 100) {
          // we take a sum of two vectors:
          // direction of the first finger + direction of the second finger
          // In case of incline change we want them to move either up or down
          // which means X change should be small, why Y change should be large
          var vx = first.x - originalFirst.x + second.x - originalSecond.x;
          var vy = first.y - originalFirst.y + second.y - originalSecond.y;
          if (Math.abs(vx) < 10 && Math.abs(vy) > 42) {
              this.canIncline = true;
          }
      }
      if (this.canIncline) {
          this.canRotate = false;
          this.canScale = false;
          this.canIncline = true;
          this.state = INCLINE;
      }
      else if (angleChange > 0.1 && this.allowRotation) {
          // When we are rotating we want to be able to scale too:
          this.canRotate = true;
          this.canScale = true;
          this.canIncline = false;
          this.state = ROTATE;
      }
      else if (scaleChange > 15) {
          // But when we are scaling, only scaling should be allowed
          // (otherwise it's too annoying):
          this.canRotate = false;
          this.canScale = true;
          this.canIncline = false;
          this.state = SCALE;
      }
      this.stateChanged = true;
  };

  function createTouchController(inputTarget, camera) {
      var listening = false;
      var activeTouches = new Map();
      var allowRotation = camera.allowRotation;
      var allowPinchRotation = camera.allowPinchRotation;
      var panAnimation = camera.panAnimation;
      var rotateAnimation = camera.rotateAnimation;
      var multiTouchState = new MultiTouchState(allowPinchRotation && allowRotation);
      // used for double tap distance check: if they tapped to far, it is not a double tap:
      var lastTouch;
      var lastTouchEndEventTime = Date.now();
      var lastMultiTouchEventTime = lastTouchEndEventTime;
      listenToEvents();
      return { dispose: dispose };
      function dispose() {
          inputTarget.removeEventListener('touchstart', handleTouchStart, { passive: false });
          stopDocumentTouchListeners();
      }
      function listenToEvents() {
          inputTarget.addEventListener('touchstart', handleTouchStart, { passive: false });
      }
      function handleTouchStart(e) {
          if (!listening) {
              startDocumentTouchListeners();
              listening = true;
          }
          panAnimation.cancel();
          rotateAnimation.cancel();
          if (e.touches.length === 1) {
              // only when one touch is active we want to have inertia
              panAnimation.start();
          }
          for (var i = 0; i < e.touches.length; ++i) {
              var touch = e.touches[i];
              if (!activeTouches.has(touch.identifier)) {
                  activeTouches.set(touch.identifier, new TouchState(touch));
              }
          }
          e.stopPropagation();
          e.preventDefault();
      }
      function handleTouchMove(e) {
          var now = Date.now();
          var dx = 0;
          var dy = 0; // total difference between touches.
          var cx = 0;
          var cy = 0; // center of the touches
          var first, second; // fingers.
          var needRedraw = false;
          var touches = e.touches;
          for (var i = 0; i < touches.length; ++i) {
              var touch = touches[i];
              var state = activeTouches.get(touch.identifier);
              if (!state) {
                  // We never tracked this touch - how is this even possible?
                  continue;
              }
              state.move(touch);
              cx += state.x;
              cy += state.y;
              dx += state.x - state.lastX;
              dy += state.y - state.lastY;
              if (!first)
                  { first = state; }
              else if (!second)
                  { second = state; }
          }
          var changedCount = touches.length;
          dx /= changedCount;
          dy /= changedCount;
          cx /= changedCount;
          cy /= changedCount;
          if (!second)
              { multiTouchState.reset(); }
          // todo: find something better than `first` and `second` tracking?
          if (first && second) {
              lastMultiTouchEventTime = now;
              var dx$1 = second.x - first.x;
              var dy$1 = second.y - first.y;
              var lastDx = second.lastX - first.lastX;
              var lastDy = second.lastY - first.lastY;
              var zoomChange = Math.hypot(dx$1, dy$1) / Math.hypot(lastDx, lastDy) - 1;
              var angle = Math.atan2(dy$1, dx$1) - Math.atan2(lastDy, lastDx);
              multiTouchState.track(first, second);
              if (multiTouchState.stateChanged) {
                  rotateAnimation.start();
                  panAnimation.cancel();
              }
              if (multiTouchState.canScale) {
                  camera.zoomToClientCoordinates(cx, cy, zoomChange);
                  needRedraw = true;
              }
              if (multiTouchState.canRotate) {
                  camera.rotateByAngle(angle, 0);
                  needRedraw = true;
              }
              if (multiTouchState.canIncline) {
                  var totalMove = second.y - second.lastY + first.y - first.lastY;
                  camera.rotateByAbsoluteOffset(0, totalMove);
                  needRedraw = true;
              }
              e.preventDefault();
              e.stopPropagation();
          }
          var timeSinceLastTouchEnd = now - lastTouchEndEventTime;
          var shouldSkipPanning = multiTouchState.canIncline || // can't pan when incline is changed
              timeSinceLastTouchEnd < 300 || // don't pan if they just released a finger.
              (e.touches.length > 1 && multiTouchState.isUnknown());
          if ((dx !== 0 || dy !== 0) && !shouldSkipPanning) {
              // we are panning around
              camera.panByAbsoluteOffset(dx, dy);
              needRedraw = true;
          }
          if (needRedraw) {
              camera.redraw();
          }
      }
      function handleTouchEnd(e) {
          var now = Date.now();
          var timeSinceLastTouchEnd = now - lastTouchEndEventTime;
          lastTouchEndEventTime = now;
          var touches = e.changedTouches;
          for (var i = 0; i < touches.length; ++i) {
              var touch = touches[i];
              activeTouches.delete(touch.identifier);
          }
          if (e.touches.length < 2) {
              multiTouchState.reset(); // prepare for more multi-touch gesture detection
              rotateAnimation.stop(); // spin if necessary.
              panAnimation.stop();
          }
          if (e.touches.length === 0) {
              // Just in case we missed a finger in the map - clean it here.
              activeTouches.clear();
          }
          if (activeTouches.size === 0 && e.changedTouches.length === 1) {
              listening = false;
              stopDocumentTouchListeners();
              panAnimation.stop();
              if (timeSinceLastTouchEnd < 350 && now - lastMultiTouchEventTime > 350) {
                  // Double tap?
                  var newLastTouch = e.changedTouches[0];
                  var dx = Math.abs(newLastTouch.clientX - lastTouch.clientX);
                  var dy = Math.abs(newLastTouch.clientY - lastTouch.clientY);
                  if (Math.hypot(dx, dy) < 30) {
                      // Yes! They tapped close enough to the last tap. Zoom in:
                      camera.zoomToClientCoordinates(lastTouch.clientX, lastTouch.clientY, 0.5, true);
                  }
              }
              lastTouch = e.changedTouches[0];
          }
      }
      function startDocumentTouchListeners() {
          document.addEventListener('touchmove', handleTouchMove, { passive: false });
          document.addEventListener('touchend', handleTouchEnd, { passive: false });
          document.addEventListener('touchcancel ', handleTouchEnd, { passive: false });
      }
      function stopDocumentTouchListeners() {
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
          document.removeEventListener('touchcancel ', handleTouchEnd);
      }
  }

  function getSpherical(r, theta, phi) {
      var z = r * Math.cos(theta);
      var x = r * Math.sin(theta) * Math.cos(phi);
      var y = r * Math.sin(theta) * Math.sin(phi);
      return [x, y, z];
  }
  function clamp(v, min, max) {
      if (v < min)
          { v = min; }
      if (v > max)
          { v = max; }
      return v;
  }
  function option(value, fallback) {
      if (value === undefined)
          { return fallback; }
      return value;
  }
  function clampTo(x, threshold, clampValue) {
      return Math.abs(x) < threshold ? clampValue : x;
  }

  function createKeyboardController(inputTarget, camera) {
      var frameHandle = 0;
      var vx = 0, vy = 0, vz = 0; // velocity of the panning
      var dx = 0, dy = 0, dz = 0; // actual offset of the panning
      var dPhi = 0, vPhi = 0; // rotation 
      var dRadius = 0, vRadius = 0; // radius
      var dIncline = 0, vIncline = 0; // inclination
      listenToEvents();
      return { dispose: dispose };
      function listenToEvents() {
          if (!inputTarget.getAttribute('tabindex')) {
              inputTarget.setAttribute('tabindex', '0');
          }
          inputTarget.addEventListener('keydown', handleKeyDown);
          inputTarget.addEventListener('keyup', handleKeyUp);
      }
      function dispose() {
          inputTarget.removeEventListener('keydown', handleKeyDown);
          inputTarget.removeEventListener('keyup', handleKeyUp);
          cancelAnimationFrame(frameHandle);
      }
      function frame() {
          frameHandle = 0;
          var dampFactor = 0.9;
          var needRedraw = false;
          dx = clampTo(dx * dampFactor + vx, 0.5, 0);
          dy = clampTo(dy * dampFactor + vy, 0.5, 0);
          dz = clampTo(dz * dampFactor + vz, 0.5, 0);
          if (dx || dy) {
              camera.panByAbsoluteOffset(dx, dy);
              needRedraw = true;
          }
          if (dz) {
              camera.slideCenterUpDown(dz);
              needRedraw = true;
          }
          dPhi = clampTo((dPhi * dampFactor + vPhi / 2), Math.PI / 360, 0);
          dIncline = clampTo((dIncline * dampFactor + vIncline / 6), Math.PI / 360, 0);
          if (dPhi || dIncline) {
              camera.rotateByAbsoluteOffset(dPhi, dIncline);
              needRedraw = true;
          }
          dRadius = clampTo((dRadius * 0.7 + vRadius), 0.5, 0);
          if (dRadius) {
              var scaleFactor = Math.sign(dRadius) * 0.025;
              camera.zoomCenterByScaleFactor(scaleFactor, 0, 0);
              needRedraw = true;
          }
          if (needRedraw) {
              camera.redraw();
              processNextInput();
          }
      }
      function processNextInput() {
          if (frameHandle)
              { return; } // already scheduled
          frameHandle = requestAnimationFrame(frame);
      }
      function handleKeyDown(e) {
          onKey(e, 1);
      }
      function handleKeyUp(e) {
          onKey(e, 0);
      }
      function onKey(e, isDown) {
          if (isModifierKey(e))
              { return; }
          // TODO: implement plane move on the z up/down?
          switch (e.which) {
              case 81: // q - roll right
                  vPhi = -isDown;
                  break;
              case 69: // e - roll left
                  vPhi = isDown;
                  break;
              case 187: // + - zoom in
                  vRadius = isDown;
                  break;
              case 189: // - - zoom in
                  vRadius = -isDown;
                  break;
              case 82: // r - incline up
                  vIncline = isDown;
                  break;
              case 70: // f - incline down
                  vIncline = -isDown;
                  break;
              case 37: // ←
              case 65: // a
                  vx = isDown;
                  break;
              case 39: // →
              case 68: // d
                  vx = -isDown;
                  break;
              case 38: // ↑
              case 87: // w
                  vy = isDown;
                  break;
              case 40: // ↓
              case 83: // s
                  vy = -isDown;
                  break;
              case 71: // g
                  vz = -isDown;
                  break;
              case 84: // t
                  vz = isDown;
                  break;
          }
          processNextInput();
      }
  }
  function isModifierKey(e) {
      return e.altKey || e.ctrlKey || e.metaKey;
  }

  function createMouseController(inputTarget, camera) {
      var mouseX, mouseY, isAltMouseMove;
      var allowRotation = camera.allowRotation;
      var panAnimation = camera.panAnimation;
      var rotateAnimation = camera.rotateAnimation;
      inputTarget.addEventListener('wheel', handleWheel, { passive: false });
      inputTarget.addEventListener('mousedown', handleMouseDown, {
          passive: false
      });
      inputTarget.addEventListener('dblclick', handleDoubleClick, {
          passive: false
      });
      return { dispose: dispose };
      function dispose() {
          inputTarget.removeEventListener('wheel', handleWheel, { passive: false });
          inputTarget.removeEventListener('mousedown', handleMouseDown, { passive: false });
          inputTarget.removeEventListener('dblclick', handleDoubleClick, { passive: false });
          // TODO: Should I be more precise here?
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
      }
      function handleMouseDown(e) {
          var isLeftButton = (e.button === 1 && window.event !== null) || e.button === 0;
          if (!isLeftButton)
              { return; }
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
          mouseX = e.clientX;
          mouseY = e.clientY;
          isAltMouseMove = e.altKey && allowRotation;
          panAnimation.cancel();
          rotateAnimation.cancel();
          if (isAltMouseMove) {
              rotateAnimation.start();
          }
          else {
              panAnimation.start();
          }
      }
      function onMouseMove(e) {
          var dy = e.clientY - mouseY;
          var dx = e.clientX - mouseX;
          if (isAltMouseMove) {
              camera.rotateByAbsoluteOffset(dx, dy);
          }
          else {
              camera.panByAbsoluteOffset(dx, dy);
          }
          mouseX = e.clientX;
          mouseY = e.clientY;
          camera.redraw();
      }
      function onMouseUp() {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
          if (isAltMouseMove) {
              rotateAnimation.stop();
          }
          else {
              panAnimation.stop();
          }
      }
      function handleDoubleClick(e) {
          camera.zoomToClientCoordinates(e.clientX, e.clientY, 0.5, true);
          e.preventDefault();
          e.stopPropagation();
      }
      function handleWheel(e) {
          // in windows FF it scrolls differently. Want to have the same speed there:
          var deltaFactor = e.deltaMode > 0 ? 100 : 1;
          var scaleFactor = getScaleFactorFromDelta(-e.deltaY * deltaFactor);
          camera.zoomToClientCoordinates(e.clientX, e.clientY, scaleFactor);
          e.preventDefault();
      }
      function getScaleFactorFromDelta(delta) {
          return Math.sign(delta) * Math.min(0.25, Math.abs(delta / 128));
      }
  }

  function getInputTarget(requestedTarget, fallback) {
      if (typeof requestedTarget === 'string') {
          var result = document.querySelector(requestedTarget);
          if (!result)
              { throw new Error('Cannot resolve input target element: ' + requestedTarget); }
          return result;
      }
      if (requestedTarget)
          { return requestedTarget; }
      return fallback;
  }

  var TransformEvent = function TransformEvent(scene) {
      this.drawContext = scene.getDrawContext();
      this.updated = false;
  };

  /**
   * Controls that are best suited for map-like applications with top-down view
   */
  function createMapControls(scene) {
      var drawContext = scene.getDrawContext();
      var view = drawContext.view;
      var rotationSpeed = Math.PI * 2;
      var inclinationSpeed = Math.PI * 1.618;
      var transformEvent = new TransformEvent(scene);
      var sceneOptions = scene.getOptions() || {};
      var allowRotation = sceneOptions.allowRotation === undefined ? true : !!sceneOptions.allowRotation;
      var allowPinchRotation = sceneOptions.allowPinchRotation === undefined ? allowRotation : !!sceneOptions.allowPinchRotation;
      // angle of rotation around Y axis, tracked from axis X to axis Z
      var minPhi = option(sceneOptions.minPhi, -Infinity);
      var maxPhi = option(sceneOptions.maxPhi, Infinity);
      // Rotate the camera so it looks to the central point in Oxy plane from distance r.
      var phi = clamp(-Math.PI / 2, minPhi, maxPhi);
      // camera inclination angle. (Angle above Oxz plane)
      var minTheta = option(sceneOptions.minTheta, 0);
      var maxTheta = option(sceneOptions.maxTheta, Math.PI);
      var theta = clamp(0, minTheta, maxTheta);
      // Distance to the point at which our camera is looking
      var minR = option(sceneOptions.minZoom, -Infinity);
      var maxR = option(sceneOptions.maxZoom, Infinity);
      var r = clamp(1, minR, maxR);
      var centerPointPosition = view.center;
      var cameraPosition = view.position;
      var panAnimation = createKineticAnimation(getCenterPosition, setCenterPosition);
      var rotateAnimation = createKineticAnimation(getCenterRotation, setCenterRotation, { minVelocity: 1 });
      var planeNormal = [0, 0, 1];
      var api = {
          dispose: dispose,
          setViewBox: setViewBox,
          panByAbsoluteOffset: panByAbsoluteOffset,
          slideCenterUpDown: slideCenterUpDown,
          rotateByAngle: rotateByAngle,
          rotateByAbsoluteOffset: rotateByAbsoluteOffset,
          zoomCenterByScaleFactor: zoomCenterByScaleFactor,
          zoomToClientCoordinates: zoomToClientCoordinates,
          redraw: redraw,
          allowRotation: allowRotation,
          allowPinchRotation: allowPinchRotation,
          rotateAnimation: rotateAnimation,
          panAnimation: panAnimation,
      };
      var inputTarget = getInputTarget(sceneOptions.inputTarget, drawContext.canvas);
      var keyboardController = createKeyboardController(inputTarget, api);
      var touchController = createTouchController(inputTarget, api);
      var mouseController = createMouseController(inputTarget, api);
      redraw();
      return api;
      function setViewBox() {
          cameraPosition = view.position;
          r = Math.hypot(cameraPosition[2]);
          centerPointPosition[0] = cameraPosition[0];
          centerPointPosition[1] = cameraPosition[1];
          centerPointPosition[2] = 0;
          theta = clamp(0, minTheta, maxTheta);
          phi = clamp(-Math.PI / 2, minPhi, maxPhi);
          redraw();
          return api;
      }
      function dispose() {
          rotateAnimation.cancel();
          panAnimation.cancel();
          touchController.dispose();
          keyboardController.dispose();
          mouseController.dispose();
      }
      function getZoomPlaneIntersection(clientX, clientY) {
          var viewPoint = scene.getSceneCoordinate(clientX, clientY);
          var ray = cjs_2.sub(viewPoint, viewPoint, cameraPosition);
          cjs_2.normalize(ray, ray);
          var denom = cjs_2.dot(planeNormal, ray);
          if (Math.abs(denom) > 1e-7) {
              var t = cjs_2.dot(cjs_2.sub([0, 0, 0], centerPointPosition, cameraPosition), planeNormal) / denom;
              return cjs_2.scaleAndAdd([0, 0, 0], cameraPosition, ray, t);
          }
      }
      function rotateByAngle(angleChange, thetaChange) {
          phi = clamp(phi + angleChange, minPhi, maxPhi);
          theta = clamp(theta + thetaChange, minTheta, maxTheta);
      }
      function rotateByAbsoluteOffset(dx, dy) {
          if (!allowRotation)
              { return; }
          var ar = drawContext.width / drawContext.height;
          phi -= (rotationSpeed * dx) / drawContext.width;
          theta -= ((inclinationSpeed * dy) / drawContext.height) * ar;
          theta = clamp(theta, minTheta, maxTheta);
          phi = clamp(phi, minPhi, maxPhi);
      }
      function panByAbsoluteOffset(dx, dy) {
          var ar = drawContext.width / drawContext.height;
          // the idea behind this formula is this. We turn dx and dy to be
          // in a range from [0..1] (as a ratio of the screen width or height),
          // We know the FoV angle, we want to know how much of the distance we
          // traveled on the frustrum plane.
          // Distance to frustrum is `r`, thus half length of the frustrum plane
          // is `r * tan(fov/2)`, we now extend it to full length by performing `2 * `
          // and take the ratio in dx and dy scale.
          var fCoefficient = 2 * r * Math.tan(drawContext.fov / 2);
          var x = (ar * fCoefficient * dx) / (drawContext.width / drawContext.pixelRatio);
          var y = (fCoefficient * dy) / (drawContext.height / drawContext.pixelRatio);
          moveCenterBy(x, -y); // WebGL Y is not the same as typical DOM Y.
      }
      function zoomToClientCoordinates(clientX, clientY, scaleFactor, shouldAnimate) {
          var p = getZoomPlaneIntersection(clientX, clientY);
          if (!p) {
              return;
          }
          var dx = p[0] - centerPointPosition[0];
          var dy = p[1] - centerPointPosition[1];
          if (shouldAnimate) {
              var from = { r: r, x: centerPointPosition[0], y: centerPointPosition[1] };
              var to = {
                  r: clamp(r * (1 - scaleFactor), minR, maxR),
                  x: from.x + dx * scaleFactor,
                  y: from.y + dy * scaleFactor
              };
              amator(from, to, {
                  step: function step(values) {
                      r = values.r;
                      centerPointPosition[0] = values.x;
                      centerPointPosition[1] = values.y;
                      redraw();
                  }
              });
          }
          else {
              zoomCenterByScaleFactor(scaleFactor, dx, dy);
              redraw();
          }
      }
      function moveCenterBy(dx, dy) {
          var cPhi = Math.cos(phi);
          var sPhi = Math.sin(phi);
          centerPointPosition[0] += cPhi * dy + sPhi * dx;
          centerPointPosition[1] += sPhi * dy - cPhi * dx;
      }
      function slideCenterUpDown(dz) {
          centerPointPosition[2] += dz * r * 0.001;
      }
      function getCenterPosition() {
          return {
              x: centerPointPosition[0],
              y: centerPointPosition[1],
              z: centerPointPosition[2]
          };
      }
      function getCenterRotation() {
          return {
              x: phi,
              y: theta,
              z: 0,
          };
      }
      function setCenterRotation(new_phi, new_theta) {
          theta = clamp(new_theta, minTheta, maxTheta);
          phi = clamp(new_phi, minPhi, maxPhi);
          redraw();
      }
      function setCenterPosition(x, y, z) {
          cjs_2.set(centerPointPosition, x, y, z);
          redraw();
      }
      function zoomCenterByScaleFactor(scaleFactor, dx, dy) {
          // `scaleFactor` defines whether we shrink the radius by multiplying it by something < 1
          // or increase it by multiplying by something > 1.
          var newR = clamp(r * (1 - scaleFactor), minR, maxR);
          if (newR === r)
              { return; }
          r = newR;
          // let's also move the center closer to the scrolling origin, this gives
          // better UX, similar to the one seen in maps: Map zooms into point under
          // mouse cursor.
          // How much should we move the center point?
          // (dx, dy) is current distance from the scroll point to the center. We should
          // keep it the same after we scaled!
          // dXScaled = dx * (1 - scaleFactor); // this is going to be the distance after we scaled.
          // newOffsetX = dx - dXScaled; // Thus we move the center by this amount. Which is the same as:
          // newOffsetX = dx - dx * (1 - scaleFactor) == dx * (1 - 1 + scaleFactor) == dx * scaleFactor;
          // Thus the formula below:
          centerPointPosition[0] += dx * scaleFactor;
          centerPointPosition[1] += dy * scaleFactor;
      }
      function redraw() {
          var newCameraPosition = getSpherical(r, theta, phi);
          // We want to know what is an up vector? The idea is that its position
          // can also be represented in spherical coordinates of a sphere with slightly larger
          // radius. How much larger?
          // Just assume `up` vector length is 1, then the sphere  radius is sqrt(r * r + 1 * 1):
          var upVectorSphereRadius = Math.hypot(r, 1); // Note: may run into precision error here.
          // We know a hypotenuse of the new triangle and its size. The angle would be
          // `Math.acos(r/upVectorSphereRadius)`, and since we don't care whether up is above or below
          // the actual `theta`, we pick one direction and stick to it:
          var upVectorTheta = theta - Math.acos(r / upVectorSphereRadius);
          // The rotation angle around z axis (phi) is the same as the camera position.
          var upVector = getSpherical(upVectorSphereRadius, upVectorTheta, phi);
          // Finally we know both start of the upVector, and the end of the up vector, let's find the direction:
          cjs_2.sub(upVector, upVector, newCameraPosition);
          cjs_2.set(cameraPosition, newCameraPosition[0], newCameraPosition[1], newCameraPosition[2]);
          cjs_2.add(cameraPosition, cameraPosition, centerPointPosition);
          // I'd assume this could be simplified? I just don't know and haven't thought yet how:
          cjs_6.targetTo(view.cameraWorld, cameraPosition, centerPointPosition, upVector);
          cjs_6.getRotation(view.orientation, view.cameraWorld);
          view.update();
          transformEvent.updated = false;
          scene.fire('transform', transformEvent);
          if (transformEvent.updated) {
              redraw();
              return;
          }
          scene.getRoot().scheduleMVPUpdate();
          scene.renderFrame();
      }
  }

  // Float32 is not enough for large scenes.
  cjs_10.setMatrixArrayType(Float64Array);
  function createScene(canvas, options) {
      if ( options === void 0 ) options = {};

      var width;
      var height;
      var pixelRatio = options.devicePixelRatio || window.devicePixelRatio;
      var wglContextOptions = options.wglContextOptions;
      var gl = (canvas.getContext('webgl', wglContextOptions) ||
          canvas.getContext('experimental-webgl', wglContextOptions));
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      var frameToken = 0;
      var sceneRoot = new Element();
      var hasMouseClickListeners = false;
      var hasMouseMoveListeners = false;
      var inputTarget = getInputTarget(options.inputTarget, canvas);
      // Keeping canvas rect in memory to speed things up
      var canvasRect;
      var view = new ViewMatrix();
      var projection = cjs_6.create();
      var inverseProjection = cjs_6.create();
      var fov = options.fov === undefined ? Math.PI * 45 / 180 : options.fov;
      var near = options.near === undefined ? 0.01 : options.near;
      var far = options.far === undefined ? Infinity : options.far;
      var drawContext = {
          width: window.innerWidth,
          height: window.innerHeight,
          pixelRatio: pixelRatio,
          canvas: canvas,
          projection: projection,
          inverseProjection: inverseProjection,
          view: view,
          fov: fov,
      };
      updateCanvasSize();
      var api = ngraph_events({
          appendChild: appendChild,
          getSceneCoordinate: getSceneCoordinate,
          getClientCoordinate: getClientCoordinate,
          getTransform: getTransform,
          getRoot: getRoot,
          getGL: getGL,
          removeChild: removeChild,
          setViewBox: setViewBox,
          setClearColor: setClearColor,
          getClearColor: getClearColor,
          clear: clear,
          dispose: dispose,
          renderFrame: renderFrame,
          getPixelRatio: getPixelRatio,
          setPixelRatio: setPixelRatio,
          getCameraController: getCameraController,
          setCameraController: setCameraController,
          getDrawContext: getDrawContext,
          getOptions: getOptions
      });
      var realOn = api.on;
      // We don't want to waste CPU resources if nobody cares about mouse events
      // only when they start listen to events we will perform the input listening
      api.on = trapOn;
      sceneRoot.bindScene(api);
      var cameraController = (options.controls || createMapControls)(api);
      var disposeClick;
      listenToEvents();
      renderFrame();
      return api;
      function getPixelRatio() {
          return pixelRatio;
      }
      function getDrawContext() {
          return drawContext;
      }
      function getOptions() {
          return options;
      }
      function setPixelRatio(newPixelRatio) {
          pixelRatio = newPixelRatio;
          drawContext.pixelRatio = pixelRatio;
          updateCanvasSize();
      }
      function getGL() {
          return gl;
      }
      function getRoot() {
          return sceneRoot;
      }
      function setCameraController(createCamera) {
          if (cameraController) {
              cameraController.dispose();
          }
          cameraController = createCamera(api, drawContext);
          return cameraController;
      }
      function getCameraController() {
          return cameraController;
      }
      function getTransform() {
          return sceneRoot.model;
      }
      function setClearColor(r, g, b, a) {
          gl.clearColor(r, g, b, a);
      }
      function getClearColor() {
          // [r, g, b, a]
          return gl.getParameter(gl.COLOR_CLEAR_VALUE);
      }
      function listenToEvents() {
          inputTarget.addEventListener('mousemove', onMouseMove);
          disposeClick = onClap(inputTarget, onMouseClick);
          window.addEventListener('resize', onResize, true);
      }
      function dispose() {
          inputTarget.removeEventListener('mousemove', onMouseMove);
          if (disposeClick)
              { disposeClick(); }
          window.removeEventListener('resize', onResize, true);
          cameraController.dispose();
          sceneRoot.dispose();
          if (frameToken) {
              cancelAnimationFrame(frameToken);
              frameToken = 0;
          }
      }
      function onResize() {
          updateCanvasSize();
      }
      function updateCanvasSize() {
          if (options.size) {
              // Fixed size canvas doesn't update. We assume CSS does the scaling.
              width = canvas.width = options.size.width;
              height = canvas.height = options.size.height;
          }
          else {
              width = canvas.width = canvas.offsetWidth * pixelRatio;
              height = canvas.height = canvas.offsetHeight * pixelRatio;
          }
          canvasRect = canvas.getBoundingClientRect();
          gl.viewport(0, 0, width, height);
          drawContext.width = width;
          drawContext.height = height;
          sceneRoot.worldTransformNeedsUpdate = true;
          cjs_6.perspective(projection, fov, width / height, near, far);
          cjs_6.invert(inverseProjection, projection);
          renderFrame();
      }
      function onMouseClick(e) {
          if (!hasMouseClickListeners)
              { return; }
          var p = getSceneCoordinate(e.clientX, e.clientY);
          if (!p)
              { return; } // need to zoom in!
          api.fire('click', {
              originalEvent: e,
              x: p[0],
              y: p[1],
              z: p[2]
          });
      }
      function onMouseMove(e) {
          if (!hasMouseMoveListeners)
              { return; }
          var p = getSceneCoordinate(e.clientX, e.clientY);
          if (!p)
              { return; }
          api.fire('mousemove', {
              originalEvent: e,
              x: p[0],
              y: p[1],
              z: p[2],
          });
      }
      function getSceneCoordinate(clientX, clientY) {
          clientX -= canvasRect.left;
          clientY -= canvasRect.top;
          var dpr = api.getPixelRatio();
          var clipSpaceX = (dpr * clientX / width) * 2 - 1;
          var clipSpaceY = (1 - dpr * clientY / height) * 2 - 1;
          var spare = [0, 0, 0];
          var mx = cjs_2.transformMat4(spare, [clipSpaceX, clipSpaceY, 0], inverseProjection);
          cjs_2.transformMat4(mx, mx, view.cameraWorld);
          cjs_2.sub(mx, mx, view.position);
          cjs_2.normalize(mx, mx);
          var targetZ = 0;
          // TODO: This is likely not going to work for all cases.
          var distance = (targetZ - view.position[2]) / mx[2];
          if (mx[2] > 0) ;
          cjs_2.scaleAndAdd(mx, view.position, mx, distance);
          return mx;
      }
      function getClientCoordinate(sceneX, sceneY, sceneZ) {
          if ( sceneZ === void 0 ) sceneZ = 0;

          // TODO: this is not optimized either.
          var mvp = cjs_6.multiply(cjs_6.create(), projection, view.matrix);
          cjs_6.multiply(mvp, mvp, sceneRoot.model);
          var coordinate = cjs_1.transformMat4([], [sceneX, sceneY, sceneZ, 1], mvp);
          var dpr = api.getPixelRatio();
          var x = width * (coordinate[0] / coordinate[3] + 1) * 0.5 / dpr;
          var y = height * (1 - (coordinate[1] / coordinate[3] + 1) * 0.5) / dpr;
          return { x: x, y: y };
      }
      function setViewBox(canvasRect) {
          var dpr = drawContext.pixelRatio;
          var nearHeight = dpr * Math.max((canvasRect.top - canvasRect.bottom) / 2, (canvasRect.right - canvasRect.left) / 2);
          var ref = drawContext.view;
          var position = ref.position;
          var orientation = ref.orientation;
          position[0] = (canvasRect.left + canvasRect.right) / 2;
          position[1] = (canvasRect.top + canvasRect.bottom) / 2;
          position[2] = nearHeight / Math.tan(drawContext.fov / 2);
          cjs_5.set(orientation, 0, 0, 0, 1);
          drawContext.view.update();
          if (cameraController.setViewBox) {
              cameraController.setViewBox(canvasRect);
          }
      }
      function renderFrame(immediate) {
          if ( immediate === void 0 ) immediate = false;

          if (immediate) {
              return frame();
          }
          if (!frameToken)
              { frameToken = requestAnimationFrame(frame); }
      }
      function frame() {
          gl.clear(gl.COLOR_BUFFER_BIT);
          sceneRoot.updateWorldTransform();
          sceneRoot.draw(gl, drawContext);
          frameToken = 0;
      }
      function clear() {
          gl.clear(gl.COLOR_BUFFER_BIT);
      }
      function appendChild(child, sendToBack) {
          if ( sendToBack === void 0 ) sendToBack = false;

          sceneRoot.appendChild(child, sendToBack);
          api.fire('append-child', child); // TODO: might need to add support for bubbling?
      }
      function removeChild(child) {
          sceneRoot.removeChild(child);
          api.fire('remove-child', child);
      }
      function trapOn(eventName, callback, context) {
          if (eventName === 'click')
              { hasMouseClickListeners = true; }
          if (eventName === 'mousemove')
              { hasMouseMoveListeners = true; }
          return realOn(eventName, callback, context);
      }
  }

  var glUtils = {
      compile: compile,
      link: link,
      getLocations: getLocations,
      getAttributes: getAttributes,
      getUniforms: getUniforms,
      initBuffer: initBuffer
  };
  function compile(gl, type, shaderSrc) {
      var shader = gl.createShader(type);
      if (!shader) {
          throw new Error('Failed to create a shared ' + shaderSrc);
      }
      gl.shaderSource(shader, shaderSrc);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          throw new Error(gl.getShaderInfoLog(shader) || 'Failed to compile shader ' + shaderSrc);
      }
      return shader;
  }
  function link(gl, vertexShader, fragmentShader) {
      var program = gl.createProgram();
      if (!program) {
          throw new Error('Failed to link a program');
      }
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          throw new Error(gl.getProgramInfoLog(program) || 'Failed to link a program');
      }
      return program;
  }
  function getLocations(gl, program) {
      return {
          attributes: getAttributes(gl, program),
          uniforms: getUniforms(gl, program)
      };
  }
  function getAttributes(gl, program) {
      var attributes = Object.create(null);
      var numberOfAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
      for (var i = 0; i < numberOfAttributes; ++i) {
          var activeAttribute = gl.getActiveAttrib(program, i);
          if (activeAttribute) {
              var name = activeAttribute.name;
              attributes[name] = gl.getAttribLocation(program, name);
          }
      }
      return attributes;
  }
  function getUniforms(gl, program) {
      var uniforms = Object.create(null);
      var numberOfUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (var i = 0; i < numberOfUniforms; ++i) {
          var activeUniform = gl.getActiveUniform(program, i);
          if (activeUniform) {
              var name = activeUniform.name;
              uniforms[name] = gl.getUniformLocation(program, name);
          }
      }
      return uniforms;
  }
  function initBuffer(gl, data, elementsPerVertex, attribute) {
      var buffer = gl.createBuffer();
      if (!buffer)
          { throw new Error('Failed to create a buffer'); }
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.vertexAttribPointer(attribute, elementsPerVertex, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(attribute);
  }

  /**
   * Naive implementation of a multi-key cache.
   */
  function createMultiKeyCache() {
      var cache = new Map();
      return {
          get: get,
          set: set,
          remove: remove
      };
      function get(keys) {
          if (!keys)
              { return; }
          var lastCache = cache;
          var entry;
          for (var i = 0; i < keys.length; ++i) {
              var key = keys[i];
              entry = lastCache.get(key);
              if (!entry)
                  { return; }
              lastCache = entry;
          }
          return entry;
      }
      function set(keys, value) {
          var lastCache = cache;
          for (var i = 0; i < keys.length - 1; ++i) {
              var key = keys[i];
              var entry = lastCache.get(key);
              if (!entry) {
                  entry = new Map();
                  lastCache.set(key, entry);
              }
              lastCache = entry;
          }
          lastCache.set(keys[keys.length - 1], value);
      }
      function remove(keys) {
          var lastCache = cache;
          for (var i = 0; i < keys.length - 1; ++i) {
              var key = keys[i];
              var entry = lastCache.get(key);
              if (!entry)
                  { return; }
              lastCache = entry;
          }
          lastCache.delete(keys[keys.length - 1]);
          // TODO: Might also want to remove parent elements if this was the last entity.
      }
  }

  var vertexProgramCache = createMultiKeyCache();
  function makePointsProgram(gl, pointCollection) {
      var allowColors = !!pointCollection.allowColors;
      var programKey = [allowColors, gl];
      var vertexProgram = vertexProgramCache.get(programKey);
      if (!vertexProgram) {
          var ref = getShadersCode(allowColors);
          var fragmentShaderCode = ref.fragmentShaderCode;
          var vertexShaderCode = ref.vertexShaderCode;
          var vertexShader = glUtils.compile(gl, gl.VERTEX_SHADER, vertexShaderCode);
          var fragmentShader = glUtils.compile(gl, gl.FRAGMENT_SHADER, fragmentShaderCode);
          vertexProgram = glUtils.link(gl, vertexShader, fragmentShader);
          vertexProgramCache.set(programKey, vertexProgram);
      }
      var locations = glUtils.getLocations(gl, vertexProgram);
      var gle = gl.getExtension('ANGLE_instanced_arrays');
      if (!gle) {
          // Not sure if this is going to be an error, given instancing is widely supported. But
          // If you get this error please ping me so that we can find a fallback solution
          throw new Error('PointCollection requires instancing. Please ping @anvaka so that we can add fallback');
      }
      var buffer = gl.createBuffer();
      if (!buffer)
          { throw new Error('failed to create a nodesBuffer'); }
      var instanceBuffer = gl.createBuffer();
      var instanceBufferValues = new Float32Array([
          -0.5, -0.5,
          -0.5, 0.5,
          0.5, 0.5,
          0.5, 0.5,
          0.5, -0.5,
          -0.5, -0.5 ]);
      var positionSize = pointCollection.is3D ? 3 : 2;
      var sizeOffset = positionSize * 4;
      var colorOffset = (positionSize + 1) * 4;
      var coloredPointStride = (positionSize + 2) * 4;
      var uncoloredPointStride = (positionSize + 1) * 4;
      return {
          draw: draw,
          dispose: dispose
      };
      function dispose() {
          // TODO: Do I need gl.deleteBuffer(buffer);?
          gl.deleteProgram(vertexProgram);
          vertexProgramCache.remove(programKey);
      }
      function draw(drawContext) {
          if (!pointCollection.count)
              { return; }
          gl.enable(gl.DEPTH_TEST);
          gl.depthFunc(gl.LEQUAL);
          gl.useProgram(vertexProgram);
          gl.uniformMatrix4fv(locations.uniforms.uModel, false, pointCollection.worldModel);
          gl.uniformMatrix4fv(locations.uniforms.projectionMatrix, false, drawContext.projection);
          gl.uniformMatrix4fv(locations.uniforms.uView, false, drawContext.view.matrix);
          gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, instanceBufferValues, gl.STATIC_DRAW);
          gl.enableVertexAttribArray(locations.attributes.aPoint);
          gl.vertexAttribPointer(locations.attributes.aPoint, 2, gl.FLOAT, false, 0, 0);
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          gl.bufferData(gl.ARRAY_BUFFER, pointCollection.buffer, gl.DYNAMIC_DRAW);
          if (allowColors) {
              gl.enableVertexAttribArray(locations.attributes.aPosition);
              gl.vertexAttribPointer(locations.attributes.aPosition, positionSize, gl.FLOAT, false, coloredPointStride, 0);
              gl.enableVertexAttribArray(locations.attributes.aPointSize);
              gl.vertexAttribPointer(locations.attributes.aPointSize, 1, gl.FLOAT, false, coloredPointStride, sizeOffset);
              gl.enableVertexAttribArray(locations.attributes.aColor);
              gl.vertexAttribPointer(locations.attributes.aColor, 4, gl.UNSIGNED_BYTE, true, coloredPointStride, colorOffset);
          }
          else {
              gl.enableVertexAttribArray(locations.attributes.aPosition);
              gl.vertexAttribPointer(locations.attributes.aPosition, positionSize, gl.FLOAT, false, uncoloredPointStride, 0);
              gl.enableVertexAttribArray(locations.attributes.aPointSize);
              gl.vertexAttribPointer(locations.attributes.aPointSize, 1, gl.FLOAT, false, uncoloredPointStride, sizeOffset);
              var color = pointCollection.color;
              gl.uniform4f(locations.uniforms.uColor, color.r, color.g, color.b, color.a);
          }
          gle.vertexAttribDivisorANGLE(locations.attributes.aPoint, 0);
          gle.vertexAttribDivisorANGLE(locations.attributes.aPosition, 1);
          gle.vertexAttribDivisorANGLE(locations.attributes.aPointSize, 1);
          gle.vertexAttribDivisorANGLE(locations.attributes.aColor, 1);
          gle.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6, pointCollection.count);
          gle.vertexAttribDivisorANGLE(locations.attributes.aPosition, 0);
          gle.vertexAttribDivisorANGLE(locations.attributes.aPoint, 0);
          gle.vertexAttribDivisorANGLE(locations.attributes.aPointSize, 0);
          gle.vertexAttribDivisorANGLE(locations.attributes.aColor, 0);
          gl.disable(gl.DEPTH_TEST);
      }
  }
  function getShadersCode(allowColors) {
      var fragmentShaderCode = "\n  precision highp float;\n  varying vec4 vColor;\n  varying vec3 vPosition;\n\n  void main() {\n    float dist = length(vPosition);\n\n    if (dist >= 0.5) {discard;}\n    gl_FragColor = vColor;\n  }\n  ";
      var vertexShaderCode = "\n  uniform vec4 uColor;\n  uniform mat4 projectionMatrix;\n  uniform mat4 uModel;\n  uniform mat4 uView;\n\n  attribute float aPointSize;\n  attribute vec3 aPosition;\n  attribute vec3 aPoint;\n  " + (allowColors ? 'attribute vec4 aColor;' : '') + "\n\n  varying vec4 vColor;\n  varying vec3 vPosition;\n\n  void main() {\n    vPosition = aPoint;\n    gl_Position = projectionMatrix * uView * uModel * vec4( aPosition + aPoint * aPointSize, 1.0 );\n    vColor = " + (allowColors ? 'aColor.abgr' : 'uColor') + ";\n  }\n";
      return {
          fragmentShaderCode: fragmentShaderCode, vertexShaderCode: vertexShaderCode
      };
  }

  var Color = function Color(r, g, b, a) {
      if ( a === void 0 ) a = 1;

      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a === undefined ? 1 : a;
  };

  /**
   * Provides access to a single point in the PointCollection
   */
  var PointAccessor = function PointAccessor(points, offset, data) {
      this.offset = offset;
      this._points = points;
      if (data !== undefined) {
          this.data = data;
      }
  };
  PointAccessor.prototype.update = function update (point) {
      var offset = this.offset;
      var points = this._points.positions;
      var is3D = this._points.is3D;
      points[offset] = point.x;
      offset++;
      points[offset] = point.y;
      offset++;
      if (is3D) {
          points[offset] = point.z || 0;
          offset++;
      }
      var size = point.size || this._points.size || 1;
      if (size !== undefined) {
          points[offset] = size;
      }
      this.setColor(point.color);
  };
  PointAccessor.prototype.setColor = function setColor (color) {
      if (!this._points.colors || color === undefined)
          { return; }
      var offset = this.offset + (this._points.is3D ? 4 : 3);
      this._points.colors[offset] = color;
  };

  var PointCollection = /*@__PURE__*/(function (Element) {
      function PointCollection(capacity, options) {
          if (capacity === undefined) {
              throw new Error('Point capacity should be defined');
          }
          Element.call(this);
          this.is3D = !options || options.is3D === undefined || options.is3D;
          this.allowColors = !options || options.allowColors === undefined || options.allowColors;
          this.itemsPerPoint = 3; // (x, y, size)
          if (this.is3D)
              { this.itemsPerPoint += 1; }
          if (this.allowColors)
              { this.itemsPerPoint += 1; }
          this.capacity = capacity;
          this.count = 0;
          this.color = new Color(1, 1, 1, 1);
          this._program = null;
          this.buffer = new ArrayBuffer(capacity * this.itemsPerPoint * 4);
          this.positions = new Float32Array(this.buffer);
          this.colors = this.allowColors ? new Uint32Array(this.buffer) : null;
      }

      if ( Element ) PointCollection.__proto__ = Element;
      PointCollection.prototype = Object.create( Element && Element.prototype );
      PointCollection.prototype.constructor = PointCollection;
      PointCollection.prototype.draw = function draw (gl, drawContext) {
          if (!this._program) {
              this._program = makePointsProgram(gl, this);
          }
          this._program.draw(drawContext);
      };
      PointCollection.prototype.dispose = function dispose () {
          if (this._program) {
              // TODO: Dispose only when last using element stops using this program
              // this._program.dispose();
              this._program = null;
          }
      };
      PointCollection.prototype.add = function add (point, data) {
          if (!point)
              { throw new Error('Point is required'); }
          if (this.count >= this.capacity) {
              this._extendArray();
          }
          var offset = this.count * this.itemsPerPoint;
          var ui = new PointAccessor(this, offset, data);
          ui.update(point);
          this.count += 1;
          return ui;
      };
      PointCollection.prototype._extendArray = function _extendArray () {
          // Every time we run out of space create new array twice bigger.
          var buffer = new ArrayBuffer(this.buffer.byteLength * 2);
          var extendedArray = new Float32Array(buffer);
          if (this.positions) {
              extendedArray.set(this.positions);
          }
          this.buffer = buffer;
          this.positions = extendedArray;
          if (this.allowColors) {
              this.colors = new Uint32Array(buffer);
          }
          this.capacity *= 2;
      };

      return PointCollection;
  }(Element));

  var lineProgramCache = createMultiKeyCache();
  function makeWireProgram(gl, wireCollection) {
      var allowColors = !!wireCollection.allowColors;
      var programKey = [allowColors, gl];
      var lineProgram = lineProgramCache.get(programKey);
      if (!lineProgram) {
          var ref = getShadersCode$1(allowColors);
          var frag = ref.frag;
          var vert = ref.vert;
          var lineVSShader = glUtils.compile(gl, gl.VERTEX_SHADER, vert);
          var lineFSShader = glUtils.compile(gl, gl.FRAGMENT_SHADER, frag);
          lineProgram = glUtils.link(gl, lineVSShader, lineFSShader);
          lineProgramCache.set(programKey, lineProgram);
      }
      var locations = glUtils.getLocations(gl, lineProgram);
      var lineBuffer = gl.createBuffer();
      var lineSize = wireCollection.is3D ? 3 : 2;
      var coloredLineStride = (lineSize + 1) * 4;
      var colorOffset = lineSize * 4;
      var api = {
          draw: draw,
          dispose: dispose
      };
      return api;
      function dispose() {
          gl.deleteBuffer(lineBuffer);
          gl.deleteProgram(lineProgram);
          lineProgramCache.remove(programKey);
      }
      function draw(drawContext) {
          if (wireCollection.count === 0)
              { return; }
          var data = wireCollection.buffer;
          gl.useProgram(lineProgram);
          gl.uniformMatrix4fv(locations.uniforms.uModel, false, wireCollection.worldModel);
          gl.uniformMatrix4fv(locations.uniforms.projectionMatrix, false, drawContext.projection);
          gl.uniformMatrix4fv(locations.uniforms.uView, false, drawContext.view.matrix);
          var color = wireCollection.color;
          gl.uniform4f(locations.uniforms.uColor, color.r, color.g, color.b, color.a);
          gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
          if (wireCollection.isDirtyBuffer) {
              gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
              wireCollection.isDirtyBuffer = false;
          }
          gl.enableVertexAttribArray(locations.attributes.aPosition);
          if (allowColors) {
              gl.vertexAttribPointer(locations.attributes.aPosition, lineSize, gl.FLOAT, false, coloredLineStride, 0);
              gl.enableVertexAttribArray(locations.attributes.aColor);
              gl.vertexAttribPointer(locations.attributes.aColor, 4, gl.UNSIGNED_BYTE, true, coloredLineStride, colorOffset);
          }
          else {
              gl.vertexAttribPointer(locations.attributes.aPosition, lineSize, gl.FLOAT, false, 4 * lineSize, 0);
          }
          gl.drawArrays(gl.LINES, 0, wireCollection.count * 2);
      }
  }
  function getShadersCode$1(allowColors) {
      return {
          vert: ("attribute vec3 aPosition;\n  varying vec4 vColor;\n  " + (allowColors ? 'attribute vec4 aColor;' : '') + "\n  uniform vec4 uColor;\n  uniform mat4 projectionMatrix;\n  uniform mat4 uModel;\n  uniform mat4 uView;\n\nvoid main() {\n  gl_Position = projectionMatrix * uView * uModel * vec4(aPosition, 1.0);\n  vColor = " + (allowColors ? 'aColor.abgr' : 'uColor') + ";\n}"),
          frag: "precision mediump float;\n    varying vec4 vColor;\n    void main() {\n      gl_FragColor = vColor;\n    }"
      };
  }

  var lineProgramCache$1 = createMultiKeyCache();
  function makeThickWireProgram(gl, wireCollection) {
      var allowWidth = Number.isFinite(wireCollection.width) &&
          wireCollection.width > 0 && wireCollection.width !== 1;
      var gle;
      if (allowWidth) {
          gle = gl.getExtension('ANGLE_instanced_arrays');
          if (!gle) {
              console.error('ANGLE_instanced_arrays is not supported, thick lines are not possible');
              return makeWireProgram(gl, wireCollection);
          }
      }
      else {
          return makeWireProgram(gl, wireCollection);
      }
      var allowColors = !!wireCollection.allowColors;
      var programKey = [allowColors, gl];
      var lineProgram = lineProgramCache$1.get(programKey);
      if (!lineProgram) {
          var ref = getShadersCode$2(allowColors);
          var frag = ref.frag;
          var vert = ref.vert;
          var lineVSShader = glUtils.compile(gl, gl.VERTEX_SHADER, vert);
          var lineFSShader = glUtils.compile(gl, gl.FRAGMENT_SHADER, frag);
          lineProgram = glUtils.link(gl, lineVSShader, lineFSShader);
          lineProgramCache$1.set(programKey, lineProgram);
      }
      var locations = glUtils.getLocations(gl, lineProgram);
      var lineBuffer = gl.createBuffer();
      var lineSize = wireCollection.is3D ? 3 : 2;
      var lineStride = allowColors ? 2 * (lineSize + 1) * 4 : 2 * lineSize * 4;
      var positionBuffer = gl.createBuffer();
      var quadPositions = new Float32Array([
          -0.5, 0, -0.5, 1, 0.5, 1,
          -0.5, 0, 0.5, 1, 0.5, 0 // Second 2D triangle of the quad
      ]);
      var api = {
          isThickWire: true,
          draw: draw,
          dispose: dispose
      };
      return api;
      function dispose() {
          if (lineBuffer)
              { gl.deleteBuffer(lineBuffer); }
          if (positionBuffer)
              { gl.deleteBuffer(positionBuffer); }
          if (locations) {
              gl.disableVertexAttribArray(locations.attributes.aFrom);
              gl.disableVertexAttribArray(locations.attributes.aFromColor);
              gl.disableVertexAttribArray(locations.attributes.aTo);
              gl.disableVertexAttribArray(locations.attributes.aToColor);
              gl.disableVertexAttribArray(locations.attributes.aPosition);
          }
          gl.deleteProgram(lineProgram);
          lineProgramCache$1.remove(programKey);
      }
      function draw(drawContext) {
          if (wireCollection.count === 0)
              { return; }
          var data = wireCollection.buffer;
          gl.useProgram(lineProgram);
          gl.uniformMatrix4fv(locations.uniforms.uModel, false, wireCollection.worldModel);
          gl.uniformMatrix4fv(locations.uniforms.projectionMatrix, false, drawContext.projection);
          gl.uniformMatrix4fv(locations.uniforms.uView, false, drawContext.view.matrix);
          gl.uniform3fv(locations.uniforms.uOrigin, drawContext.view.position);
          gl.uniform1f(locations.uniforms.uWidth, wireCollection.width);
          gl.uniform2f(locations.uniforms.uResolution, drawContext.width, drawContext.height);
          var color = wireCollection.color;
          gl.uniform4f(locations.uniforms.uColor, color.r, color.g, color.b, color.a);
          gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, quadPositions, gl.STATIC_DRAW);
          gl.enableVertexAttribArray(locations.attributes.aPosition);
          gl.vertexAttribPointer(locations.attributes.aPosition, 2, gl.FLOAT, false, 0, 0);
          gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
          gl.enableVertexAttribArray(locations.attributes.aFrom);
          gl.vertexAttribPointer(locations.attributes.aFrom, lineSize, gl.FLOAT, false, lineStride, 0);
          if (allowColors) {
              gl.enableVertexAttribArray(locations.attributes.aFromColor);
              gl.vertexAttribPointer(locations.attributes.aFromColor, 4, gl.UNSIGNED_BYTE, true, lineStride, (lineSize) * 4);
              gl.enableVertexAttribArray(locations.attributes.aTo);
              gl.vertexAttribPointer(locations.attributes.aTo, lineSize, gl.FLOAT, false, lineStride, (lineSize + 1) * 4);
              gl.enableVertexAttribArray(locations.attributes.aToColor);
              gl.vertexAttribPointer(locations.attributes.aToColor, 4, gl.UNSIGNED_BYTE, true, lineStride, (2 * lineSize + 1) * 4);
          }
          else {
              gl.enableVertexAttribArray(locations.attributes.aTo);
              gl.vertexAttribPointer(locations.attributes.aTo, lineSize, gl.FLOAT, false, lineStride, lineSize * 4);
          }
          gle.vertexAttribDivisorANGLE(locations.attributes.aPosition, 0);
          gle.vertexAttribDivisorANGLE(locations.attributes.aTo, 1);
          gle.vertexAttribDivisorANGLE(locations.attributes.aFrom, 1);
          gle.vertexAttribDivisorANGLE(locations.attributes.aFromColor, 1);
          gle.vertexAttribDivisorANGLE(locations.attributes.aToColor, 1);
          // Now that everything is setup - render!
          gle.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6, wireCollection.count);
          // Don't forget to clean up after we rendered:
          gle.vertexAttribDivisorANGLE(locations.attributes.aFrom, 0);
          gle.vertexAttribDivisorANGLE(locations.attributes.aTo, 0);
          gle.vertexAttribDivisorANGLE(locations.attributes.aFromColor, 0);
          gle.vertexAttribDivisorANGLE(locations.attributes.aToColor, 0);
      }
  }
  function getShadersCode$2(allowColors) {
      return {
          vert: ("attribute vec3 aPosition, aFrom, aTo;\n    varying vec4 vColor;\n    " + (allowColors ? 'attribute vec4 aFromColor, aToColor;' : '') + "\n    uniform vec4 uColor;\n    uniform mat4 projectionMatrix;\n    uniform mat4 uModel;\n    uniform mat4 uView;\n    uniform float uWidth;\n    uniform vec2 uResolution;\n  \n  void main() {\n    // let's get the model point to clip space:\n    vec4 clip0 = projectionMatrix * uView * uModel * vec4(aFrom, 1.0);\n    vec4 clip1 = projectionMatrix * uView * uModel * vec4(aTo, 1.0);\n\n    // And from the clip space move to the screen pixels \n    // (as we set width of the lines in pixels)\n    vec2 screen0 = uResolution * (0.5 * clip0.xy/clip0.w + 0.5);\n    vec2 screen1 = uResolution * (0.5 * clip1.xy/clip1.w + 0.5);\n\n    // this is direction along the x axis\n    vec2 xBasis = normalize(screen1 - screen0);\n    // But since we set the width, we get the direction along the Y:\n    vec2 yBasis = vec2(-xBasis.y, xBasis.x);\n\n    // Offset the original points:\n    vec2 pt0 = screen0 + uWidth * aPosition.x * yBasis;\n    vec2 pt1 = screen1 + uWidth * aPosition.x * yBasis;\n\n    // and interpolate along the Y of the instanced geometry \n    // (remember, Y changes from 0 to 1):\n    vec2 pt = mix(pt0, pt1, aPosition.y);\n    vec4 clip = mix(clip0, clip1, aPosition.y);\n\n    // Finally move back to the clip space:\n    gl_Position = vec4(clip.w * (2.0 * pt/uResolution - 1.0), clip.z, clip.w);\n    vColor = " + (allowColors ? 'mix(aFromColor.abgr, aToColor.abgr, aPosition.y)' : 'uColor') + ";\n  }"),
          frag: "precision mediump float;\n    varying vec4 vColor;\n    void main() {\n      gl_FragColor = vColor;\n    }"
      };
  }

  /**
   * Wire accessor provides access to the buffer that stores wires.
   *
   * Wires are "lines" with 1.0 width.
   */
  var WireAccessor = function WireAccessor(wireCollection, offset) {
      this.offset = offset;
      this._wire = wireCollection;
      this.update = wireCollection.is3D ? this.update3D : this.update2D;
  };
  WireAccessor.prototype.update2D = function update2D (from, to) {
      this._wire.isDirtyBuffer = true;
      var positions = this._wire.positions;
      var offset = this.offset;
      positions[offset + 0] = from.x;
      positions[offset + 1] = from.y;
      offset += 2;
      var hasColor = this._wire.allowColors;
      if (hasColor) {
          if (from.color !== undefined)
              { this._wire.colors[offset] = from.color; }
          offset += 1;
      }
      positions[offset + 0] = to.x;
      positions[offset + 1] = to.y;
      if (hasColor && to.color !== undefined) {
          this._wire.colors[offset + 2] = to.color;
      }
  };
  WireAccessor.prototype.update3D = function update3D (from, to) {
      this._wire.isDirtyBuffer = true;
      var positions = this._wire.positions;
      var offset = this.offset;
      positions[offset + 0] = from.x;
      positions[offset + 1] = from.y;
      positions[offset + 2] = from.z || 0;
      offset += 3;
      var hasColor = this._wire.allowColors;
      if (hasColor) {
          if (from.color !== undefined)
              { this._wire.colors[offset] = from.color; }
          else
              { this._wire.colors[offset] = toHex(this._wire.color); }
          offset += 1;
      }
      positions[offset + 0] = to.x;
      positions[offset + 1] = to.y;
      positions[offset + 2] = to.z || 0;
      if (hasColor) {
          if (to.color !== undefined)
              { this._wire.colors[offset + 3] = to.color; }
          else
              { this._wire.colors[offset + 3] = toHex(this._wire.color); }
      }
  };
  function toHex(color) {
      var r = Math.round(color.r * 255);
      var g = Math.round(color.g * 255);
      var b = Math.round(color.b * 255);
      var a = Math.round(color.a * 255);
      return (r << 24) | (g << 16) | (b << 8) | a;
  }

  function mixUint32Color(c0, c1, t) {
      if ( t === void 0 ) t = 0.5;

      var a = toRgba(c0);
      var b = toRgba(c1);
      return [
          a[0] * t + (1 - t) * b[0],
          a[1] * t + (1 - t) * b[1],
          a[2] * t + (1 - t) * b[2],
          a[3] * t + (1 - t) * b[3] ];
  }
  function toRgba(x) {
      return [
          (x >> 24) & 0xff / 255,
          (x >> 16) & 0xff / 255,
          (x >> 8) & 0xff / 255,
          (x) & 0xff / 255
      ];
  }
  function toHexColor(c) {
      var r = hexString(c[0]);
      var g = hexString(c[1]);
      var b = hexString(c[2]);
      return ("#" + r + g + b);
  }
  function hexString(x) {
      var v = Math.floor(x * 255).toString(16);
      return (v.length === 1) ? '0' + v : v;
  }

  /**
   * Collection of lines. TODO: I think I should rename this to LineCollection
   */
  var WireCollection = /*@__PURE__*/(function (Element) {
      function WireCollection(capacity, options) {
          Element.call(this);
          var bytesPerElement = 4; // float32 or uint32 - both require 4 bytes
          this.allowColors = !options || options.allowColors === undefined || options.allowColors;
          this.is3D = !options || options.is3D === undefined || options.is3D;
          this.itemsPerLine = 4; // (startX, startY) (endX, endY);
          if (this.is3D)
              { this.itemsPerLine += 2; } // Add two more for Z;
          if (this.allowColors)
              { this.itemsPerLine += 2; } // Add two more for color
          this.capacity = capacity;
          this.count = 0;
          this.color = new Color(1, 1, 1, 1);
          this.type = 'WireCollection';
          this._program = null;
          this.buffer = new ArrayBuffer(capacity * this.itemsPerLine * bytesPerElement);
          this.positions = new Float32Array(this.buffer);
          this.width = (options && options.width) || 1;
          if (this.allowColors) {
              // We are sharing the buffer!
              this.colors = new Uint32Array(this.buffer);
          }
          else {
              this.colors = null;
          }
          this.isDirtyBuffer = true;
      }

      if ( Element ) WireCollection.__proto__ = Element;
      WireCollection.prototype = Object.create( Element && Element.prototype );
      WireCollection.prototype.constructor = WireCollection;
      WireCollection.prototype.draw = function draw (gl, drawContext) {
          if (!this._program) {
              this._program = isWidthForThickWire(this.width) ? makeThickWireProgram(gl, this) : makeWireProgram(gl, this);
          }
          this._program.draw(drawContext);
      };
      WireCollection.prototype.setLineWidth = function setLineWidth (newLineWidth) {
          if (newLineWidth === this.width)
              { return; }
          var isThickWire = isWidthForThickWire(newLineWidth);
          this.width = newLineWidth;
          if (!this._program || !this.scene)
              { return; }
          if (isThickWire && this._program.isThickWire) {
              // next frame should handle this
              this.scene.renderFrame();
              return;
          }
          // we need to switch the program
          if (this.parent) {
              var parent = this.parent;
              parent.removeChild(this);
              this.dispose();
              parent.appendChild(this);
          }
      };
      WireCollection.prototype.add = function add (line) {
          if (!line)
              { throw new Error('Line is required'); }
          if (this.count >= this.capacity) {
              this._extendArray();
          }
          var offset = this.count * this.itemsPerLine;
          var ui = new WireAccessor(this, offset);
          ui.update(line.from, line.to);
          this.count += 1;
          return ui;
      };
      WireCollection.prototype.getLineColor = function getLineColor (from, to) {
          if (this.allowColors && from && from.color && to && to.color) {
              return mixUint32Color(from.color, to.color);
          }
          return [this.color.r, this.color.g, this.color.b, this.color.a];
      };
      WireCollection.prototype.forEachLine = function forEachLine (callback) {
          var ref = this;
          var positions = ref.positions;
          var count = ref.count;
          var itemsPerLine = ref.itemsPerLine;
          var maxOffset = count * itemsPerLine;
          if (this.is3D) {
              for (var i = 0; i < maxOffset; i += itemsPerLine) {
                  var from = {
                      x: positions[i],
                      y: positions[i + 1],
                      z: positions[i + 2]
                  };
                  var next = i + 3;
                  if (this.colors) {
                      from.color = this.colors[i + 3];
                      next += 1;
                  }
                  var to = {
                      x: positions[next],
                      y: positions[next + 1],
                      z: positions[next + 2]
                  };
                  if (this.colors) {
                      to.color = this.colors[next + 3];
                  }
                  callback(from, to);
              }
          }
          else {
              for (var i$1 = 0; i$1 < maxOffset; i$1 += itemsPerLine) {
                  var from$1 = {
                      x: positions[i$1],
                      y: positions[i$1 + 1],
                      z: 0,
                  };
                  var next$1 = i$1 + 2;
                  if (this.colors) {
                      from$1.color = this.colors[i$1 + 2];
                      next$1 += 1;
                  }
                  var to$1 = {
                      x: positions[next$1],
                      y: positions[next$1 + 1],
                      z: 0,
                  };
                  if (this.colors) {
                      to$1.color = this.colors[next$1 + 2];
                  }
                  callback(from$1, to$1);
              }
          }
      };
      WireCollection.prototype.dispose = function dispose () {
          if (this._program) {
              // TODO: Dispose only when last using element stops using this program.
              // this._program.dispose();
              this._program = null;
          }
      };
      WireCollection.prototype._extendArray = function _extendArray () {
          // Every time we run out of space create new array twice bigger.
          var buffer = new ArrayBuffer(this.buffer.byteLength * 2);
          var extendedArray = new Float32Array(buffer);
          if (this.positions) {
              extendedArray.set(this.positions);
          }
          this.buffer = buffer;
          this.positions = extendedArray;
          if (this.allowColors) {
              this.colors = new Uint32Array(buffer);
          }
          this.capacity *= 2;
      };

      return WireCollection;
  }(Element));
  function isWidthForThickWire(width) {
      return width !== undefined && width !== 1 && width > 0;
  }

  var lineProgramCache$2 = createMultiKeyCache();
  function makeLineStripProgram(gl, lineStripCollection) {
      var allowColors = lineStripCollection.allowColors;
      var is3D = lineStripCollection.is3D;
      allowColors = !!allowColors; // coerce to boolean.
      var programKey = [allowColors, gl];
      var lineProgram = lineProgramCache$2.get(programKey);
      var itemsPerVertex = 2 + (allowColors ? 1 : 0) + (is3D ? 1 : 0);
      var data = lineStripCollection.buffer;
      if (!lineProgram) {
          var ref = getShadersCode$3(allowColors);
          var lineFSSrc = ref.lineFSSrc;
          var lineVSSrc = ref.lineVSSrc;
          var lineVSShader = glUtils.compile(gl, gl.VERTEX_SHADER, lineVSSrc);
          var lineFSShader = glUtils.compile(gl, gl.FRAGMENT_SHADER, lineFSSrc);
          lineProgram = glUtils.link(gl, lineVSShader, lineFSShader);
          lineProgramCache$2.set(programKey, lineProgram);
      }
      var locations = glUtils.getLocations(gl, lineProgram);
      var lineSize = is3D ? 3 : 2;
      var coloredLineStride = (lineSize + 1) * 4;
      var colorOffset = lineSize * 4;
      var lineBuffer = gl.createBuffer();
      var api = {
          draw: draw,
          dispose: dispose
      };
      return api;
      function dispose() {
          gl.deleteBuffer(lineBuffer);
          gl.deleteProgram(lineProgram);
          lineProgramCache$2.remove(programKey);
      }
      function draw(lineStripCollection, drawContext) {
          // TODO: Why lineStripCollection passed second time?
          if (data.length === 0)
              { return; }
          gl.useProgram(lineProgram);
          gl.uniformMatrix4fv(locations.uniforms.uModel, false, lineStripCollection.worldModel);
          gl.uniformMatrix4fv(locations.uniforms.projectionMatrix, false, drawContext.projection);
          gl.uniformMatrix4fv(locations.uniforms.uView, false, drawContext.view.matrix);
          gl.uniform3fv(locations.uniforms.uOrigin, drawContext.view.position);
          var color = lineStripCollection.color;
          var nextElementIndex = lineStripCollection.nextElementIndex;
          var madeFullCircle = lineStripCollection.madeFullCircle;
          gl.uniform4f(locations.uniforms.uColor, color.r, color.g, color.b, color.a);
          gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
          gl.enableVertexAttribArray(locations.attributes.aPosition);
          gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
          if (allowColors) {
              gl.vertexAttribPointer(locations.attributes.aPosition, lineSize, gl.FLOAT, false, coloredLineStride, 0);
              gl.enableVertexAttribArray(locations.attributes.aColor);
              gl.vertexAttribPointer(locations.attributes.aColor, 4, gl.UNSIGNED_BYTE, true, coloredLineStride, colorOffset);
          }
          else {
              gl.vertexAttribPointer(locations.attributes.aPosition, lineSize, gl.FLOAT, false, 0, 0);
          }
          if (madeFullCircle) {
              var elementsCount = data.byteLength / 4 / itemsPerVertex - nextElementIndex;
              gl.drawArrays(gl.LINE_STRIP, nextElementIndex, elementsCount);
              if (nextElementIndex > 1)
                  { gl.drawArrays(gl.LINE_STRIP, 0, nextElementIndex - 1); }
          }
          else {
              gl.drawArrays(gl.LINE_STRIP, 1, nextElementIndex - 1);
          }
      }
  }
  function getShadersCode$3(allowColors) {
      var lineFSSrc = "precision mediump float;\nvarying vec4 vColor;\nvoid main() {\n  gl_FragColor = vColor;\n}\n";
      var lineVSSrc = "attribute vec3 aPosition;\n  varying vec4 vColor;\n  " + (allowColors ? 'attribute vec4 aColor;' : '') + "\n  uniform vec4 uColor;\n  uniform mat4 projectionMatrix;\n  uniform mat4 uModel;\n  uniform mat4 uView;\n  void main() {\n    gl_Position = projectionMatrix * uView * uModel * vec4(aPosition, 1.0);\n    vColor = " + (allowColors ? 'aColor.abgr' : 'uColor') + ";\n  }";
      return { lineVSSrc: lineVSSrc, lineFSSrc: lineFSSrc };
  }

  /**
   * Line strip is implemented as a cyclic buffer. Each subsequent element of the
   * buffer is connected with a line to the previous element of the buffer.
   */
  var LineStripCollection = /*@__PURE__*/(function (Element) {
      function LineStripCollection(capacity, options) {
          Element.call(this);
          var bytesPerElement = 4;
          this.drawCount = 0;
          this.madeFullCircle = false;
          this.allowColors = !options || options.allowColors === undefined || options.allowColors;
          this.is3D = !options || options.is3D === undefined || options.is3D;
          this.itemsPerLine = 2;
          if (this.allowColors)
              { this.itemsPerLine += 1; }
          if (this.is3D)
              { this.itemsPerLine += 1; }
          this.capacity = capacity;
          this.nextElementIndex = 1;
          this._program = null;
          this.color = new Color(1, 1, 1, 1);
          // Add extra one item to the buffer capacity to join two line strips and form a cycle.
          this.buffer = new ArrayBuffer((capacity + 1) * this.itemsPerLine * bytesPerElement);
          this.positions = new Float32Array(this.buffer);
          if (this.allowColors) {
              // We are sharing the buffer!
              this.colors = new Uint32Array(this.buffer);
          }
          else {
              this.colors = null;
          }
      }

      if ( Element ) LineStripCollection.__proto__ = Element;
      LineStripCollection.prototype = Object.create( Element && Element.prototype );
      LineStripCollection.prototype.constructor = LineStripCollection;
      LineStripCollection.prototype.draw = function draw (gl, drawContext) {
          if (!this._program) {
              this._program = makeLineStripProgram(gl, this);
          }
          this._program.draw(this, drawContext);
      };
      LineStripCollection.prototype.add = function add (point) {
          var offset = this.nextElementIndex * this.itemsPerLine;
          var positions = this.positions;
          positions[offset] = point.x;
          offset += 1;
          positions[offset] = point.y;
          offset += 1;
          if (this.is3D) {
              positions[offset] = point.z || 0;
              offset += 1;
          }
          if (this.colors) {
              this.colors[offset] = point.color === undefined ? 0xffffffff : point.color;
          }
          this.nextElementIndex += 1;
          this.drawCount += 1;
          if (this.nextElementIndex > this.capacity) {
              this.nextElementIndex = 1;
              var firstOffset = 0;
              positions[firstOffset] = point.x;
              firstOffset += 1;
              positions[firstOffset] = point.y;
              firstOffset += 1;
              if (this.is3D) {
                  positions[firstOffset] = point.z || 0;
                  firstOffset += 1;
              }
              if (this.colors) {
                  this.colors[firstOffset] = this.colors[offset];
              }
              this.madeFullCircle = true;
          }
      };
      LineStripCollection.prototype.dispose = function dispose () {
          if (this._program) {
              this._program.dispose();
              this._program = null;
          }
      };

      return LineStripCollection;
  }(Element));

  function isWebGLEnabled(canvas) {
      try {
          if (!window.WebGLRenderingContext)
              { return false; }
          if (!canvas)
              { canvas = document.createElement('canvas'); }
          return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      }
      catch (e) {
          return false;
      }
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
  var ngraph_graph = createGraph;



  /**
   * Creates a new graph
   */
  function createGraph(options) {
    // Graph structure is maintained as dictionary of nodes
    // and array of links. Each node has 'links' property which
    // hold all links related to that node. And general links
    // array is used to speed up all links enumeration. This is inefficient
    // in terms of memory, but simplifies coding.
    options = options || {};
    if ('uniqueLinkId' in options) {
      console.warn(
        'ngraph.graph: Starting from version 0.14 `uniqueLinkId` is deprecated.\n' +
        'Use `multigraph` option instead\n',
        '\n',
        'Note: there is also change in default behavior: From now on each graph\n'+
        'is considered to be not a multigraph by default (each edge is unique).'
      );

      options.multigraph = options.uniqueLinkId;
    }

    // Dear reader, the non-multigraphs do not guarantee that there is only
    // one link for a given pair of node. When this option is set to false
    // we can save some memory and CPU (18% faster for non-multigraph);
    if (options.multigraph === undefined) { options.multigraph = false; }

    if (typeof Map !== 'function') {
      // TODO: Should we polyfill it ourselves? We don't use much operations there..
      throw new Error('ngraph.graph requires `Map` to be defined. Please polyfill it before using ngraph');
    } 

    var nodes = new Map();
    var links = [],
      // Hash of multi-edges. Used to track ids of edges between same nodes
      multiEdges = {},
      suspendEvents = 0,

      createLink = options.multigraph ? createUniqueLink : createSingleLink,

      // Our graph API provides means to listen to graph changes. Users can subscribe
      // to be notified about changes in the graph by using `on` method. However
      // in some cases they don't use it. To avoid unnecessary memory consumption
      // we will not record graph changes until we have at least one subscriber.
      // Code below supports this optimization.
      //
      // Accumulates all changes made during graph updates.
      // Each change element contains:
      //  changeType - one of the strings: 'add', 'remove' or 'update';
      //  node - if change is related to node this property is set to changed graph's node;
      //  link - if change is related to link this property is set to changed graph's link;
      changes = [],
      recordLinkChange = noop,
      recordNodeChange = noop,
      enterModification = noop,
      exitModification = noop;

    // this is our public API:
    var graphPart = {
      /**
       * Adds node to the graph. If node with given id already exists in the graph
       * its data is extended with whatever comes in 'data' argument.
       *
       * @param nodeId the node's identifier. A string or number is preferred.
       * @param [data] additional data for the node being added. If node already
       *   exists its data object is augmented with the new one.
       *
       * @return {node} The newly added node or node with given id if it already exists.
       */
      addNode: addNode,

      /**
       * Adds a link to the graph. The function always create a new
       * link between two nodes. If one of the nodes does not exists
       * a new node is created.
       *
       * @param fromId link start node id;
       * @param toId link end node id;
       * @param [data] additional data to be set on the new link;
       *
       * @return {link} The newly created link
       */
      addLink: addLink,

      /**
       * Removes link from the graph. If link does not exist does nothing.
       *
       * @param link - object returned by addLink() or getLinks() methods.
       *
       * @returns true if link was removed; false otherwise.
       */
      removeLink: removeLink,

      /**
       * Removes node with given id from the graph. If node does not exist in the graph
       * does nothing.
       *
       * @param nodeId node's identifier passed to addNode() function.
       *
       * @returns true if node was removed; false otherwise.
       */
      removeNode: removeNode,

      /**
       * Gets node with given identifier. If node does not exist undefined value is returned.
       *
       * @param nodeId requested node identifier;
       *
       * @return {node} in with requested identifier or undefined if no such node exists.
       */
      getNode: getNode,

      /**
       * Gets number of nodes in this graph.
       *
       * @return number of nodes in the graph.
       */
      getNodeCount: getNodeCount,

      /**
       * Gets total number of links in the graph.
       */
      getLinkCount: getLinkCount,

      /**
       * Synonym for `getLinkCount()`
       */
      getLinksCount: getLinkCount,
      
      /**
       * Synonym for `getNodeCount()`
       */
      getNodesCount: getNodeCount,

      /**
       * Gets all links (inbound and outbound) from the node with given id.
       * If node with given id is not found null is returned.
       *
       * @param nodeId requested node identifier.
       *
       * @return Array of links from and to requested node if such node exists;
       *   otherwise null is returned.
       */
      getLinks: getLinks,

      /**
       * Invokes callback on each node of the graph.
       *
       * @param {Function(node)} callback Function to be invoked. The function
       *   is passed one argument: visited node.
       */
      forEachNode: forEachNode,

      /**
       * Invokes callback on every linked (adjacent) node to the given one.
       *
       * @param nodeId Identifier of the requested node.
       * @param {Function(node, link)} callback Function to be called on all linked nodes.
       *   The function is passed two parameters: adjacent node and link object itself.
       * @param oriented if true graph treated as oriented.
       */
      forEachLinkedNode: forEachLinkedNode,

      /**
       * Enumerates all links in the graph
       *
       * @param {Function(link)} callback Function to be called on all links in the graph.
       *   The function is passed one parameter: graph's link object.
       *
       * Link object contains at least the following fields:
       *  fromId - node id where link starts;
       *  toId - node id where link ends,
       *  data - additional data passed to graph.addLink() method.
       */
      forEachLink: forEachLink,

      /**
       * Suspend all notifications about graph changes until
       * endUpdate is called.
       */
      beginUpdate: enterModification,

      /**
       * Resumes all notifications about graph changes and fires
       * graph 'changed' event in case there are any pending changes.
       */
      endUpdate: exitModification,

      /**
       * Removes all nodes and links from the graph.
       */
      clear: clear,

      /**
       * Detects whether there is a link between two nodes.
       * Operation complexity is O(n) where n - number of links of a node.
       * NOTE: this function is synonim for getLink()
       *
       * @returns link if there is one. null otherwise.
       */
      hasLink: getLink,

      /**
       * Detects whether there is a node with given id
       * 
       * Operation complexity is O(1)
       * NOTE: this function is synonim for getNode()
       *
       * @returns node if there is one; Falsy value otherwise.
       */
      hasNode: getNode,

      /**
       * Gets an edge between two nodes.
       * Operation complexity is O(n) where n - number of links of a node.
       *
       * @param {string} fromId link start identifier
       * @param {string} toId link end identifier
       *
       * @returns link if there is one. null otherwise.
       */
      getLink: getLink
    };

    // this will add `on()` and `fire()` methods.
    ngraph_events(graphPart);

    monitorSubscribers();

    return graphPart;

    function monitorSubscribers() {
      var realOn = graphPart.on;

      // replace real `on` with our temporary on, which will trigger change
      // modification monitoring:
      graphPart.on = on;

      function on() {
        // now it's time to start tracking stuff:
        graphPart.beginUpdate = enterModification = enterModificationReal;
        graphPart.endUpdate = exitModification = exitModificationReal;
        recordLinkChange = recordLinkChangeReal;
        recordNodeChange = recordNodeChangeReal;

        // this will replace current `on` method with real pub/sub from `eventify`.
        graphPart.on = realOn;
        // delegate to real `on` handler:
        return realOn.apply(graphPart, arguments);
      }
    }

    function recordLinkChangeReal(link, changeType) {
      changes.push({
        link: link,
        changeType: changeType
      });
    }

    function recordNodeChangeReal(node, changeType) {
      changes.push({
        node: node,
        changeType: changeType
      });
    }

    function addNode(nodeId, data) {
      if (nodeId === undefined) {
        throw new Error('Invalid node identifier');
      }

      enterModification();

      var node = getNode(nodeId);
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
      var node = getNode(nodeId);
      if (!node) {
        return false;
      }

      enterModification();

      var prevLinks = node.links;
      if (prevLinks) {
        node.links = null;
        for(var i = 0; i < prevLinks.length; ++i) {
          removeLink(prevLinks[i]);
        }
      }

      nodes.delete(nodeId);

      recordNodeChange(node, 'remove');

      exitModification();

      return true;
    }


    function addLink(fromId, toId, data) {
      enterModification();

      var fromNode = getNode(fromId) || addNode(fromId);
      var toNode = getNode(toId) || addNode(toId);

      var link = createLink(fromId, toId, data);

      links.push(link);

      // TODO: this is not cool. On large graphs potentially would consume more memory.
      addLinkToNode(fromNode, link);
      if (fromId !== toId) {
        // make sure we are not duplicating links for self-loops
        addLinkToNode(toNode, link);
      }

      recordLinkChange(link, 'add');

      exitModification();

      return link;
    }

    function createSingleLink(fromId, toId, data) {
      var linkId = makeLinkId(fromId, toId);
      return new Link(fromId, toId, data, linkId);
    }

    function createUniqueLink(fromId, toId, data) {
      // TODO: Get rid of this method.
      var linkId = makeLinkId(fromId, toId);
      var isMultiEdge = multiEdges.hasOwnProperty(linkId);
      if (isMultiEdge || getLink(fromId, toId)) {
        if (!isMultiEdge) {
          multiEdges[linkId] = 0;
        }
        var suffix = '@' + (++multiEdges[linkId]);
        linkId = makeLinkId(fromId + suffix, toId + suffix);
      }

      return new Link(fromId, toId, data, linkId);
    }

    function getNodeCount() {
      return nodes.size;
    }

    function getLinkCount() {
      return links.length;
    }

    function getLinks(nodeId) {
      var node = getNode(nodeId);
      return node ? node.links : null;
    }

    function removeLink(link) {
      if (!link) {
        return false;
      }
      var idx = indexOfElementInArray(link, links);
      if (idx < 0) {
        return false;
      }

      enterModification();

      links.splice(idx, 1);

      var fromNode = getNode(link.fromId);
      var toNode = getNode(link.toId);

      if (fromNode) {
        idx = indexOfElementInArray(link, fromNode.links);
        if (idx >= 0) {
          fromNode.links.splice(idx, 1);
        }
      }

      if (toNode) {
        idx = indexOfElementInArray(link, toNode.links);
        if (idx >= 0) {
          toNode.links.splice(idx, 1);
        }
      }

      recordLinkChange(link, 'remove');

      exitModification();

      return true;
    }

    function getLink(fromNodeId, toNodeId) {
      // TODO: Use sorted links to speed this up
      var node = getNode(fromNodeId),
        i;
      if (!node || !node.links) {
        return null;
      }

      for (i = 0; i < node.links.length; ++i) {
        var link = node.links[i];
        if (link.fromId === fromNodeId && link.toId === toNodeId) {
          return link;
        }
      }

      return null; // no link.
    }

    function clear() {
      enterModification();
      forEachNode(function(node) {
        removeNode(node.id);
      });
      exitModification();
    }

    function forEachLink(callback) {
      var i, length;
      if (typeof callback === 'function') {
        for (i = 0, length = links.length; i < length; ++i) {
          callback(links[i]);
        }
      }
    }

    function forEachLinkedNode(nodeId, callback, oriented) {
      var node = getNode(nodeId);

      if (node && node.links && typeof callback === 'function') {
        if (oriented) {
          return forEachOrientedLink(node.links, nodeId, callback);
        } else {
          return forEachNonOrientedLink(node.links, nodeId, callback);
        }
      }
    }

    function forEachNonOrientedLink(links, nodeId, callback) {
      var quitFast;
      for (var i = 0; i < links.length; ++i) {
        var link = links[i];
        var linkedNodeId = link.fromId === nodeId ? link.toId : link.fromId;

        quitFast = callback(nodes.get(linkedNodeId), link);
        if (quitFast) {
          return true; // Client does not need more iterations. Break now.
        }
      }
    }

    function forEachOrientedLink(links, nodeId, callback) {
      var quitFast;
      for (var i = 0; i < links.length; ++i) {
        var link = links[i];
        if (link.fromId === nodeId) {
          quitFast = callback(nodes.get(link.toId), link);
          if (quitFast) {
            return true; // Client does not need more iterations. Break now.
          }
        }
      }
    }

    // we will not fire anything until users of this library explicitly call `on()`
    // method.
    function noop() {}

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
        throw new Error('Function is expected to iterate over graph nodes. You passed ' + callback);
      }

      var valuesIterator = nodes.values();
      var nextValue = valuesIterator.next();
      while (!nextValue.done) {
        if (callback(nextValue.value)) {
          return true; // client doesn't want to proceed. Return.
        }
        nextValue = valuesIterator.next();
      }
    }
  }

  // need this for old browsers. Should this be a separate module?
  function indexOfElementInArray(element, array) {
    if (!array) { return -1; }

    if (array.indexOf) {
      return array.indexOf(element);
    }

    var len = array.length,
      i;

    for (i = 0; i < len; i += 1) {
      if (array[i] === element) {
        return i;
      }
    }

    return -1;
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
      node.links.push(link);
    } else {
      node.links = [link];
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
    return fromId.toString() + '👉 ' + toId.toString();
  }

  function svg(scene, settings) {
      if ( settings === void 0 ) settings = {};

      var sceneRoot = scene.getRoot();
      sceneRoot.updateWorldTransform();
      var out = [];
      var context = Object.assign({
          background: toHexColor(scene.getClearColor()),
          write: write,
          scene: scene
      }, scene.getDrawContext());
      printHeader(context, settings);
      draw(sceneRoot.children);
      closeDocument(context, settings);
      return out.join('\n');
      function write(str) {
          out.push(str);
      }
      function draw(children) {
          var layerSettings = {
              beforeWrite: settings.beforeWrite || yes,
              round: settings.round === undefined ? undefined : settings.round
          };
          for (var i = 0; i < children.length; ++i) {
              var child = children[i];
              var lineCollection = getLineRenderTrait(child);
              if (lineCollection)
                  { renderLinesCollection(lineCollection, context, layerSettings); }
              draw(child.children);
          }
      }
  }
  function getLineRenderTrait(child) {
      if (!child || child['svgInvisible'])
          { return; }
      if (child.forEachLine)
          { return child; }
  }
  function yes() { return true; }
  function printHeader(context, settings) {
      var viewBox = "0 0 " + (context.width) + " " + (context.height);
      context.write('<?xml version="1.0" encoding="utf-8"?>');
      if (settings.open) {
          context.write(settings.open());
      }
      context.write(("<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n    viewBox=\"" + viewBox + "\">\n<style>\n  path {\n   vector-effect: non-scaling-stroke;\n  }\n</style>\n"));
      if (context.background) {
          context.write(("<rect id=\"background\" fill=\"" + (context.background) + "\" x=\"0\" y=\"0\" width=\"" + (context.width) + "\" height=\"" + (context.height) + "\"></rect>"));
      }
  }
  function closeDocument(context, settings) {
      if (settings.close) {
          context.write(settings.close());
      }
      context.write('</svg>');
  }
  function renderLinesCollection(element, context, settings) {
      if (!element.scene)
          { return; }
      var beforeWrite = settings.beforeWrite;
      var round = settings.round;
      var elementGraph = ngraph_graph();
      var project = getProjector(element, context, round);
      element.forEachLine(function (from, to) {
          var f = project(from.x, from.y, from.z);
          var t = project(to.x, to.y, to.z);
          if (f.isBehind || t.isBehind)
              { return; } // Not quite accurate.
          if (clipToViewPort(f, t, context.width, context.height)) {
              var stroke = toHexColor(element.getLineColor(from, to));
              var fromId = (f.x) + "|" + (f.y);
              var toId = (t.x) + "|" + (t.y);
              if (!elementGraph.getNode(fromId))
                  { elementGraph.addNode(fromId, f); }
              if (!elementGraph.getNode(toId))
                  { elementGraph.addNode(toId, t); }
              if (!elementGraph.hasLink(fromId, toId))
                  { elementGraph.addLink(fromId, toId, { stroke: stroke }); }
          }
      });
      if (elementGraph.getLinksCount() === 0)
          { return; } // all outside
      var strokeColor = toHexColor(element.getLineColor());
      var elementWidth = element.width === undefined ? 1 : element.width;
      var strokeWidth = elementWidth / element.scene.getPixelRatio();
      var style = "fill=\"none\" stroke-width=\"" + strokeWidth + "\" stroke=\"" + strokeColor + "\"";
      var openTag = element.id ? ("<g id=\"" + (element.id) + "\" " + style + ">") : ("<g " + style + ">");
      context.write(openTag);
      var globalOrder = getGlobalOrder(elementGraph);
      var lastNode = null;
      var lastPath = null;
      globalOrder.forEach(function (link) {
          var from = link.from;
          var to = link.to;
          if (from !== lastNode) {
              if (to === lastNode) {
                  // Swap them so that we can keep the path going.
                  var temp = from;
                  from = to;
                  to = temp;
              }
              else {
                  commitLastPath();
                  lastPath = [];
              }
          }
          if (lastPath)
              { lastPath.push(from, to); }
          lastNode = to;
      });
      commitLastPath();
      context.write('</g>');
      function commitLastPath() {
          if (!lastPath)
              { return; }
          var points = lastPath.map(function (x) {
              var node = elementGraph.getNode(x);
              if (node)
                  { return node.data; }
              throw new Error('Node is found in the path construction, but missing in the graph');
          });
          if (beforeWrite && !beforeWrite(points)) {
              return;
          }
          var d = "M" + (points[0].x) + " " + (points[0].y) + " L" + points.slice(1).map(function (p) { return ((p.x) + " " + (p.y)); }).join(',');
          context.write(("<path d=\"" + d + "\"/>"));
      }
  }
  function getGlobalOrder(graph) {
      var visited = new Set();
      var globalOrder = [];
      var stack = [];
      graph.forEachNode(function (node) {
          if (visited.has(node.id))
              { return; }
          stack.push({ to: node.id });
          runDFS();
      });
      return globalOrder;
      function runDFS() {
          var loop = function () {
              var fromTo = stack.pop();
              if (fromTo.to && fromTo.from) {
                  globalOrder.push({ from: fromTo.from, to: fromTo.to });
              }
              if (visited.has(fromTo.to))
                  { return; }
              visited.add(fromTo.to);
              graph.forEachLinkedNode(fromTo.to, function (other) {
                  if (!visited.has(other.id))
                      { stack.push({ from: fromTo.to, to: other.id }); }
              }, false);
          };

          while (stack.length) loop();
      }
  }
  function getProjector(element, context, roundFactor) {
      var width = context.width;
      var height = context.height;
      var projection = context.projection;
      var view = context.view;
      var mvp = cjs_6.multiply(cjs_6.create(), projection, view.matrix);
      cjs_6.multiply(mvp, mvp, element.worldModel);
      var rounder = makeRounder(roundFactor);
      return function (sceneX, sceneY, sceneZ) {
          var coordinate = cjs_1.transformMat4([0, 0, 0, 0], [sceneX, sceneY, sceneZ || 0, 1], mvp);
          var x = rounder(width * (coordinate[0] / coordinate[3] + 1) * 0.5);
          var y = rounder(height * (1 - (coordinate[1] / coordinate[3] + 1) * 0.5));
          return { x: x, y: y, isBehind: coordinate[3] <= 0 };
      };
  }
  function id(x) {
      return x;
  }
  function makeRounder(roundFactor) {
      if (roundFactor === undefined)
          { return id; }
      if (roundFactor === true || roundFactor === 0) {
          return Math.round;
      }
      return function (x) {
          return Math.round(x * roundFactor) / roundFactor;
      };
  }
  /**
   * Clips line to the screen rect
   */
  function clipToViewPort(from, to, width, height) {
      return clipToPlane(from, to, { x: 0, y: 0 }, { x: 0, y: 1 }) &&
          clipToPlane(from, to, { x: 0, y: 0 }, { x: 1, y: 0 }) &&
          clipToPlane(from, to, { x: 0, y: height }, { x: 0, y: -1 }) &&
          clipToPlane(from, to, { x: width, y: 0 }, { x: -1, y: 0 });
  }
  function clipToPlane(q1, q2, p, n) {
      var d1 = getDotNorm(q1, p, n);
      var d2 = getDotNorm(q2, p, n);
      if (d1 <= 0 && d2 <= 0)
          { return false; } // they are both out (or degenerative case)
      if (d1 > 0 && d2 > 0)
          { return true; } // they are entirely in, no need to clip
      // This means one is out, the other one is in.
      // see https://www.youtube.com/watch?v=og7hOFypKpQ&list=PL_w_qWAQZtAZhtzPI5pkAtcUVgmzdAP8g&index=6
      var t = d1 / (d1 - d2);
      var x = q1.x + t * (q2.x - q1.x);
      var y = q1.y + t * (q2.y - q1.y);
      if (d1 <= 0) {
          q1.x = x;
          q1.y = y;
      }
      else {
          q2.x = x;
          q2.y = y;
      }
      return true;
  }
  function getDotNorm(q, p, n) {
      return (q.x - p.x) * n.x + (q.y - p.y) * n.y;
  }

  var halfToRad = .5 * Math.PI / 180;
  var FRONT = [0, 0, -1];
  /**
   * This object tracks device orientation and applies it to a give object's quaternion (e.g. camera).
   *  See also: https://developers.google.com/web/fundamentals/native-hardware/device-orientation#device_coordinate_frame
   */
  function createDeviceOrientationHandler(inputTarget, objectOrientation, updated, events) {
      if (!updated)
          { updated = Function.prototype; }
      inputTarget.addEventListener('touchstart', pauseDeviceOrientation);
      inputTarget.addEventListener('touchend', resetScreenAdjustment);
      var deviceOrientationEventName = 'deviceorientationabsolute';
      window.addEventListener('orientationchange', updateScreenOrientation);
      var sceneAdjustmentNeedsUpdate = true;
      var sceneAdjustment = [0, 0, 0, 1];
      var deviceOrientation = [0, 0, 0, 1];
      var screenOrientation = [0, 0, 0, 1];
      updateScreenOrientation();
      var api = {
          isEnabled: false,
          isAbsolute: true,
          useCurrentOrientation: useCurrentOrientation,
          dispose: dispose,
          enable: enable,
      };
      return api;
      function enable(newEnabled) {
          api.isEnabled = newEnabled;
          if (api.isEnabled) {
              if (window.DeviceOrientationEvent !== undefined &&
                  window.DeviceOrientationEvent.requestPermission !== undefined) {
                  // We are in IOS? IOS doesn't have the deviceorientationabsolute for some reason.
                  DeviceOrientationEvent.requestPermission().then(function (response) {
                      if (response === 'granted') {
                          deviceOrientationEventName = 'deviceorientation';
                          window.addEventListener(deviceOrientationEventName, onDeviceOrientationChange);
                      }
                      else {
                          api.isEnabled = false;
                      }
                      if (events)
                          { events.fire('device-orientation', api.isEnabled); }
                  }).catch(function (e) {
                      api.isEnabled = false;
                      if (events)
                          { events.fire('device-orientation', api.isEnabled); }
                  });
              }
              else {
                  window.addEventListener(deviceOrientationEventName, onDeviceOrientationChange);
              }
          }
          else {
              pauseDeviceOrientation();
              if (events)
                  { events.fire('device-orientation', api.isEnabled); }
          }
      }
      function useCurrentOrientation() {
          sceneAdjustmentNeedsUpdate = true;
      }
      function onDeviceOrientationChange(e) {
          var alpha = e.alpha;
          var beta = e.beta;
          var gamma = e.gamma;
          if (e.absolute && alpha === null && beta === null && gamma === null) {
              // This means the device can never provide absolute values. We need to fallback
              // to relative device orientation which is not very accurate and prone to errors.
              // Consumers of this API better should allow users to switch to non-device-orientation based
              // means of movement
              window.removeEventListener('deviceorientationabsolute', onDeviceOrientationChange);
              window.addEventListener('deviceorientation', onDeviceOrientationChange);
              deviceOrientationEventName = 'deviceorientation';
              api.isAbsolute = false;
              return;
          }
          updateDeviceOrientationFromEuler(alpha, beta, gamma);
          // align with current object's orientation:
          if (sceneAdjustmentNeedsUpdate) {
              sceneAdjustmentNeedsUpdate = false;
              // Here we find an angle between device orientation and the object's orientation in XY plane
              var deviceFront = cjs_2.transformQuat([], FRONT, deviceOrientation);
              var cameraFront = cjs_2.transformQuat([], FRONT, objectOrientation);
              // Since we care only about 2D projection:
              var xyDot = deviceFront[0] * cameraFront[0] + deviceFront[1] * cameraFront[1];
              var deviceLength = Math.sqrt(deviceFront[0] * deviceFront[0] + deviceFront[1] * deviceFront[1]);
              var cameraLength = Math.sqrt(cameraFront[0] * cameraFront[0] + cameraFront[1] * cameraFront[1]);
              var angle = Math.acos(xyDot / (deviceLength * cameraLength)) / 2;
              // We care about the sign of the Z component of a cross product, as it gives us
              // direction of correct rotation to align the scene and device.
              // let sign = Math.sign(vec3.cross([], deviceFront, cameraFront)[2]);
              var sign = Math.sign(deviceFront[0] * cameraFront[1] - deviceFront[1] * cameraFront[0]);
              // These two are zero:
              // sceneAdjustment[0] = 0;
              // sceneAdjustment[1] = 0;
              sceneAdjustment[2] = sign * Math.sin(angle);
              sceneAdjustment[3] = Math.cos(angle);
          }
          cjs_5.mul(deviceOrientation, deviceOrientation, screenOrientation);
          // account for difference between lookAt and device orientation:
          cjs_5.mul(objectOrientation, sceneAdjustment, deviceOrientation);
          updated();
      }
      function updateScreenOrientation() {
          // TODO: `window.orientation` is deprecated, might need to sue screen.orientation.angle,
          // but that is not supported by ios
          var orientation = (window.orientation || 0);
          var screenAngle = -orientation * halfToRad;
          // We assume these two are zero:
          // screenOrientation[0] = 0;
          // screenOrientation[1] = 0;
          screenOrientation[2] = Math.sin(screenAngle);
          screenOrientation[3] = Math.cos(screenAngle);
      }
      function updateDeviceOrientationFromEuler(alpha, beta, gamma) {
          // These values can be nulls if device cannot provide them for some reason.
          var _x = beta ? beta * halfToRad : 0;
          var _y = gamma ? gamma * halfToRad : 0;
          var _z = alpha ? alpha * halfToRad : 0;
          var cX = Math.cos(_x);
          var cY = Math.cos(_y);
          var cZ = Math.cos(_z);
          var sX = Math.sin(_x);
          var sY = Math.sin(_y);
          var sZ = Math.sin(_z);
          // ZXY quaternion construction from Euler
          deviceOrientation[0] = sX * cY * cZ - cX * sY * sZ;
          deviceOrientation[1] = cX * sY * cZ + sX * cY * sZ;
          deviceOrientation[2] = cX * cY * sZ + sX * sY * cZ;
          deviceOrientation[3] = cX * cY * cZ - sX * sY * sZ;
      }
      function dispose() {
          inputTarget.removeEventListener('touchstart', pauseDeviceOrientation);
          inputTarget.removeEventListener('touchend', resetScreenAdjustment);
          window.removeEventListener('deviceorientationabsolute', onDeviceOrientationChange);
          window.removeEventListener('deviceorientation', onDeviceOrientationChange);
          window.removeEventListener('orientationchange', updateScreenOrientation);
      }
      function pauseDeviceOrientation(e) {
          if (sceneAdjustmentNeedsUpdate)
              { return; }
          sceneAdjustmentNeedsUpdate = true;
          if (e)
              { e.preventDefault(); }
          window.removeEventListener(deviceOrientationEventName, onDeviceOrientationChange);
      }
      function resetScreenAdjustment(e) {
          if (e.touches.length)
              { return; } // still touching. Wait till all are gone
          sceneAdjustmentNeedsUpdate = true;
          // just in case... to prevent leaking.
          if (api.isEnabled) {
              window.removeEventListener(deviceOrientationEventName, onDeviceOrientationChange);
              window.addEventListener(deviceOrientationEventName, onDeviceOrientationChange);
          }
      }
  }

  var FRONT_VECTOR = [0, 0, -1];
  var INPUT_COMMANDS = {
      MOVE_FORWARD: 1,
      MOVE_BACKWARD: 2,
      MOVE_LEFT: 3,
      MOVE_RIGHT: 4,
      MOVE_UP: 5,
      MOVE_DOWN: 6,
      TURN_LEFT: 7,
      TURN_RIGHT: 8,
      TURN_UP: 9,
      TURN_DOWN: 10,
  };
  /**
   * Game input controls similar to the first player games, where user can "walk" insider
   * the world and look around.
   */
  function createFPSControls(scene) {
      // Very likely spaceMap camera can be adjusted to support this navigation model too, but
      // for now, I'm using a separate camera. Should consider uniting them in the future if possible.
      var drawContext = scene.getDrawContext();
      var view = drawContext.view;
      // Player in the world is placed where the camera is:
      var cameraPosition = view.position;
      // And they look at the "center" of the scene:
      var centerPosition = view.center;
      // The camera follows "FPS" mode, but implemented on quaternions.
      var sceneOptions = scene.getOptions() || {};
      var upVector = [0, 0, 1];
      var rotationSpeed = Math.PI;
      var inclinationSpeed = Math.PI * 1.618;
      var captureMouse = option(sceneOptions.captureMouse, false); // whether rotation is done via locked mouse
      var mouseX, mouseY;
      var scrollRotation = [0, 0, 0, 1];
      var scrollT = 0;
      var originalOrientation = [0, 0, 0, 1];
      var targetOrientation = [0, 0, 0, 1];
      var scrollDirection = [0, 0, 0];
      var lastScrollTime = 0, lastScrollX = 0, lastScrollY = 0;
      var inputTarget = getInputTarget(sceneOptions.inputTarget, drawContext.canvas);
      inputTarget.style.outline = 'none';
      if (!inputTarget.getAttribute('tabindex')) {
          inputTarget.setAttribute('tabindex', '0');
      }
      inputTarget.addEventListener('keydown', handleKeyDown);
      inputTarget.addEventListener('keyup', handleKeyUp);
      inputTarget.addEventListener('mousedown', handleMouseDown);
      inputTarget.addEventListener('touchmove', handleTouchMove);
      inputTarget.addEventListener('touchstart', handleTouchStart);
      inputTarget.addEventListener('wheel', handleWheel);
      document.addEventListener('pointerlockchange', onPointerLockChange, false);
      var transformEvent = new TransformEvent(scene);
      var frameHandle = 0;
      var vx = 0, vy = 0, vz = 0; // velocity of the panning
      var dx = 0, dy = 0, dz = 0; // actual offset of the panning
      var dPhi = 0, vPhi = 0; // rotation 
      var dIncline = 0, vIncline = 0; // inclination
      var moveState = {};
      moveState[INPUT_COMMANDS.MOVE_FORWARD] = false;
      moveState[INPUT_COMMANDS.MOVE_BACKWARD] = false;
      moveState[INPUT_COMMANDS.MOVE_LEFT] = false;
      moveState[INPUT_COMMANDS.MOVE_RIGHT] = false;
      moveState[INPUT_COMMANDS.MOVE_UP] = false;
      moveState[INPUT_COMMANDS.MOVE_DOWN] = false;
      moveState[INPUT_COMMANDS.TURN_LEFT] = false;
      moveState[INPUT_COMMANDS.TURN_RIGHT] = false;
      moveState[INPUT_COMMANDS.TURN_UP] = false;
      moveState[INPUT_COMMANDS.TURN_DOWN] = false;
      var moveSpeed = .01; // TODO: Might wanna make this computed based on distance to surface
      var scrollSpeed = 3;
      var flySpeed = 1e-2;
      var api = {
          dispose: dispose,
          handleCommand: handleCommand,
          setViewBox: setViewBox,
          getUpVector: getUpVector,
          lookAt: lookAt,
          enableMouseCapture: enableMouseCapture,
          enableDeviceOrientation: enableDeviceOrientation,
          isDeviceOrientationEnabled: isDeviceOrientationEnabled,
          setRotationSpeed: function setRotationSpeed(speed) { rotationSpeed = speed; return api; },
          setMoveSpeed: function setMoveSpeed(speed) { moveSpeed = speed; return api; },
          setScrollSpeed: function setScrollSpeed(speed) { scrollSpeed = speed; return api; },
          setFlySpeed: function setFlySpeed(speed) { flySpeed = speed; return api; },
          setSpeed: function setSpeed(factor) { moveSpeed = factor; flySpeed = factor; return api; },
          getRotationSpeed: function getRotationSpeed() { return rotationSpeed; },
          getMoveSpeed: function getMoveSpeed() { return moveSpeed; },
          getScrollSpeed: function getScrollSpeed() { return scrollSpeed; },
          getFlySpeed: function getFlySpeed() { return flySpeed; },
          getKeymap: function getKeymap() { return keyMap; },
          getMouseCapture: function getMouseCapture() { return captureMouse; }
      };
      var keyMap = {
          /* W */ 87: INPUT_COMMANDS.MOVE_FORWARD,
          /* A */ 65: INPUT_COMMANDS.MOVE_LEFT,
          /* S */ 83: INPUT_COMMANDS.MOVE_BACKWARD,
          /* D */ 68: INPUT_COMMANDS.MOVE_RIGHT,
          /* Q */ 81: INPUT_COMMANDS.TURN_LEFT,
          /* ← */ 37: INPUT_COMMANDS.TURN_LEFT,
          /* E */ 69: INPUT_COMMANDS.TURN_RIGHT,
          /* → */ 39: INPUT_COMMANDS.TURN_RIGHT,
          /* ↑ */ 38: INPUT_COMMANDS.TURN_UP,
          /* ↓ */ 40: INPUT_COMMANDS.TURN_DOWN,
          /* Shift */ 16: INPUT_COMMANDS.MOVE_DOWN,
          /* Space */ 32: INPUT_COMMANDS.MOVE_UP
      };
      ngraph_events(api);
      var deviceOrientationHandler = createDeviceOrientationHandler(inputTarget, view.orientation, commitMatrixChanges, api);
      if (option(sceneOptions.useDeviceOrientation, true)) {
          deviceOrientationHandler.enable(true);
      }
      return api;
      function handleKeyDown(e) {
          onKey(e, 1);
      }
      function handleKeyUp(e) {
          onKey(e, 0);
      }
      function handleMouseDown(e) {
          if (e.which !== 1)
              { return; } // only left button works here.
          if (document.pointerLockElement) {
              document.exitPointerLock();
          }
          else if (captureMouse) {
              inputTarget.requestPointerLock();
          }
          else {
              inputTarget.focus();
              document.addEventListener('mousemove', onMouseMove);
              document.addEventListener('mouseup', onMouseUp);
              mouseX = e.clientX;
              mouseY = e.clientY;
              e.preventDefault();
          }
      }
      function handleTouchStart(e) {
          if (e.touches.length !== 1)
              { return; } // TODO: implement pinch move?
          mouseX = e.touches[0].clientX;
          mouseY = e.touches[0].clientY;
      }
      function handleWheel(e) {
          e.preventDefault();
          // in windows FF it scrolls differently. Want to have the same speed there:
          var deltaFactor = e.deltaMode > 0 ? 100 : 1;
          var scaleFactor = scrollSpeed * getScaleFactorFromDelta(-e.deltaY * deltaFactor);
          var now = +new Date();
          var nx = e.clientX, ny = e.clientY;
          if (document.pointerLockElement) {
              nx = drawContext.width / (drawContext.pixelRatio * 2);
              ny = drawContext.height / (drawContext.pixelRatio * 2);
          }
          if (document.pointerLockElement || now - lastScrollTime > 200 || Math.hypot(nx - lastScrollX, ny - lastScrollY) > 20) {
              var cursorPos = [0, 0, -1];
              cursorPos[0] = (nx * drawContext.pixelRatio / drawContext.width - 0.5) * 2;
              cursorPos[1] = ((1 - ny * drawContext.pixelRatio / drawContext.height) - 0.5) * 2;
              cjs_2.transformMat4(cursorPos, cursorPos, cjs_6.mul([], drawContext.view.cameraWorld, drawContext.inverseProjection));
              scrollDirection = cjs_2.sub([], cursorPos, view.position);
              cjs_2.normalize(scrollDirection, scrollDirection);
              var currentCenter = cjs_2.clone(centerPosition);
              originalOrientation = cjs_5.clone(view.orientation);
              lookAt(cameraPosition, cursorPos);
              targetOrientation = cjs_5.clone(view.orientation);
              lookAt(cameraPosition, currentCenter);
              lastScrollX = nx;
              lastScrollY = ny;
              scrollT = 0;
              lastScrollTime = now;
          }
          if (scrollT < 1) {
              cjs_5.slerp(scrollRotation, originalOrientation, targetOrientation, scrollT);
              cjs_5.set(view.orientation, scrollRotation[0], scrollRotation[1], scrollRotation[2], scrollRotation[3]);
              scrollT += 0.01;
          }
          cameraPosition[0] += moveSpeed * scaleFactor * scrollDirection[0];
          cameraPosition[1] += moveSpeed * scaleFactor * scrollDirection[1];
          cameraPosition[2] += moveSpeed * scaleFactor * scrollDirection[2];
          commitMatrixChanges();
          e.preventDefault();
      }
      function getScaleFactorFromDelta(delta) {
          return Math.sign(delta) * Math.min(0.25, Math.abs(delta / 128));
      }
      function handleTouchMove(e) {
          if (e.touches.length !== 1)
              { return; }
          var dy = e.touches[0].clientY - mouseY;
          var dx = e.touches[0].clientX - mouseX;
          updateLookAtByOffset(-dx, dy);
          mouseX = e.touches[0].clientX;
          mouseY = e.touches[0].clientY;
          e.preventDefault();
      }
      function onMouseMove(e) {
          var dy = e.clientY - mouseY;
          var dx = e.clientX - mouseX;
          updateLookAtByOffset(-dx, dy);
          mouseX = e.clientX;
          mouseY = e.clientY;
          e.preventDefault();
      }
      function onMouseUp(e) {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
      }
      function onPointerLockChange(e) {
          if (document.pointerLockElement) {
              document.addEventListener('mousemove', handleMousePositionChange, false);
          }
          else {
              document.removeEventListener('mousemove', handleMousePositionChange, false);
              // Stop any residual movements:
              dPhi = 0;
              dIncline = 0;
          }
          api.fire('pointer-locked', document.pointerLockElement);
      }
      function handleMousePositionChange(e) {
          // This handler only called when pointer is locked.
          updateLookAtByOffset(e.movementX, -e.movementY);
      }
      function updateLookAtByOffset(dx, dy) {
          var dYaw = (rotationSpeed * dx) / drawContext.width;
          var dPitch = (inclinationSpeed * dy) / drawContext.height;
          rotateBy(dYaw, dPitch);
          commitMatrixChanges();
      }
      function enableMouseCapture(isLocked) {
          captureMouse = isLocked;
          api.fire('mouse-capture', isLocked);
          return api;
      }
      function enableDeviceOrientation(isEnabled) {
          deviceOrientationHandler.enable(isEnabled);
      }
      function isDeviceOrientationEnabled() {
          return deviceOrientationHandler.isEnabled;
      }
      function onKey(e, isDown) {
          if (isModifierKey$1(e)) {
              // remove the move down if modifier was pressed after shift
              vz = 0;
              return;
          }
          var command = keyMap[e.which];
          if (command)
              { handleCommand(command, isDown); }
      }
      function handleCommand(commandId, value) {
          switch (commandId) {
              case INPUT_COMMANDS.MOVE_FORWARD:
                  vy = value;
                  break;
              case INPUT_COMMANDS.MOVE_BACKWARD:
                  vy = -value;
                  break;
              case INPUT_COMMANDS.MOVE_LEFT:
                  vx = value;
                  break;
              case INPUT_COMMANDS.MOVE_RIGHT:
                  vx = -value;
                  break;
              case INPUT_COMMANDS.MOVE_UP:
                  vz = value;
                  break;
              case INPUT_COMMANDS.MOVE_DOWN:
                  vz = -value;
                  break;
              case INPUT_COMMANDS.TURN_LEFT:
                  vPhi = -value;
                  break;
              case INPUT_COMMANDS.TURN_RIGHT:
                  vPhi = value;
                  break;
              case INPUT_COMMANDS.TURN_UP:
                  vIncline = value;
                  break;
              case INPUT_COMMANDS.TURN_DOWN:
                  vIncline = -value;
                  break;
              default: {
                  throw new Error('Unknown command ' + commandId);
              }
          }
          processNextInput();
      }
      function processNextInput() {
          if (frameHandle)
              { return; } // already scheduled
          frameHandle = requestAnimationFrame(frame);
      }
      function setViewBox(rect) {
          var dpr = scene.getPixelRatio();
          var nearHeight = dpr * Math.max((rect.top - rect.bottom) / 2, (rect.right - rect.left) / 2);
          var x = (rect.left + rect.right) / 2;
          var y = (rect.top + rect.bottom) / 2;
          var z = nearHeight / Math.tan(drawContext.fov / 2);
          lookAt([x, y, z], [x, y, 0]);
          return api;
      }
      function frame() {
          frameHandle = 0;
          var dampFactor = 0.9;
          var needRedraw = false;
          dx = clampTo(dx * dampFactor + vx, 0.5, 0);
          dy = clampTo(dy * dampFactor + vy, 0.5, 0);
          dz = clampTo(dz * dampFactor + vz, 0.5, 0);
          dPhi = clampTo((dPhi * dampFactor + vPhi / 2), Math.PI / 360, 0);
          dIncline = clampTo((dIncline * dampFactor + vIncline / 6), Math.PI / 360, 0);
          if (dx || dy) {
              moveCenterBy(dx * moveSpeed, dy * moveSpeed);
              needRedraw = true;
          }
          if (dz) {
              cameraPosition[2] += dz * flySpeed;
              needRedraw = true;
          }
          if (dIncline || dPhi) {
              rotateBy(dPhi * 0.01, dIncline * 0.01);
              needRedraw = true;
          }
          if (needRedraw) {
              commitMatrixChanges();
              processNextInput();
          }
          moveState[INPUT_COMMANDS.MOVE_LEFT] = dx > 0;
          moveState[INPUT_COMMANDS.MOVE_RIGHT] = dx < 0;
          moveState[INPUT_COMMANDS.MOVE_FORWARD] = dy > 0;
          moveState[INPUT_COMMANDS.MOVE_BACKWARD] = dy < 0;
          moveState[INPUT_COMMANDS.MOVE_UP] = dz > 0;
          moveState[INPUT_COMMANDS.MOVE_DOWN] = dz < 0;
          moveState[INPUT_COMMANDS.TURN_LEFT] = dPhi < 0;
          moveState[INPUT_COMMANDS.TURN_RIGHT] = dPhi > 0;
          api.fire('move', moveState);
      }
      function lookAt(eye, center) {
          cjs_2.set(cameraPosition, eye[0], eye[1], eye[2]);
          cjs_2.set(centerPosition, center[0], center[1], center[2]);
          cjs_6.targetTo(view.cameraWorld, cameraPosition, centerPosition, upVector);
          cjs_6.getRotation(view.orientation, view.cameraWorld);
          cjs_6.invert(view.matrix, view.cameraWorld);
          commitMatrixChanges();
          return api;
      }
      function getUpVector() {
          return upVector;
      }
      function commitMatrixChanges() {
          view.update();
          cjs_2.transformMat4(centerPosition, FRONT_VECTOR, view.cameraWorld);
          transformEvent.updated = false;
          scene.fire('transform', transformEvent);
          if (transformEvent.updated) {
              // the client has changed either position or rotation...
              // try one more time 
              commitMatrixChanges();
              return;
          }
          scene.getRoot().scheduleMVPUpdate();
          scene.renderFrame();
      }
      function rotateBy(yaw, pitch) {
          // Note order here is important: 
          // https://gamedev.stackexchange.com/questions/30644/how-to-keep-my-quaternion-using-fps-camera-from-tilting-and-messing-up/30669
          if (yaw) {
              cjs_5.mul(view.orientation, cjs_5.setAxisAngle([], FRONT_VECTOR, yaw), view.orientation);
              // Wanna make sure that device orientation based API is updated after this too
              deviceOrientationHandler.useCurrentOrientation();
          }
          if (pitch)
              { cjs_5.mul(view.orientation, view.orientation, cjs_5.setAxisAngle([], [1, 0, 0], pitch)); }
      }
      function moveCenterBy(dx, dy) {
          // TODO: this slow downs when camera looks directly down.
          // The `dy` is in `z` coordinate, because we are working with view matrix rotations
          // where z axis is going from the screen towards the viewer
          var delta = cjs_2.transformQuat([], [-dx, 0, -dy], view.orientation);
          cameraPosition[0] += delta[0];
          cameraPosition[1] += delta[1];
      }
      function dispose() {
          cancelAnimationFrame(frameHandle);
          frameHandle = 0;
          inputTarget.removeEventListener('keydown', handleKeyDown);
          inputTarget.removeEventListener('keyup', handleKeyUp);
          inputTarget.removeEventListener('mousedown', handleMouseDown);
          inputTarget.removeEventListener('touchmove', handleTouchMove);
          inputTarget.removeEventListener('touchstart', handleTouchStart);
          inputTarget.removeEventListener('wheel', handleWheel);
          document.removeEventListener('mousemove', handleMousePositionChange, false);
          document.removeEventListener('pointerlockchange', onPointerLockChange, false);
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
          deviceOrientationHandler.dispose();
      }
  }
  function isModifierKey$1(e) {
      return e.altKey || e.ctrlKey || e.metaKey;
  }

  function createFPSControlsUI(parent, inputControls) {
      //  <div class='navigation-controls'>
      var className = 'navigation-controls';
      var container = document.createElement('div');
      container.classList.add(className);
      container.innerHTML = getMarkup();
      var style = document.createElement('style');
      style.appendChild(document.createTextNode(getStyle(className)));
      document.querySelector('head').appendChild(style);
      parent.appendChild(container);
      var buttons = Array.from(container.querySelectorAll('a.navigation-btn'));
      var disposeList = buttons.map(createHandler);
      // Mouse capture handlers
      var captureMouse = container.querySelector('#capture-mouse');
      if (inputControls.getMouseCapture()) {
          captureMouse.checked = true;
      }
      captureMouse.addEventListener('change', onCaptureMouseChangedFromUI);
      // device orientation handlers
      var deviceOrientation = container.querySelector('#device-orientation');
      if (deviceOrientation) {
          deviceOrientation.checked = inputControls.isDeviceOrientationEnabled();
          deviceOrientation.addEventListener('change', onDeviceOrientationChangedFromUI);
      }
      inputControls.on('move', updateTransforms);
      inputControls.on('mouse-capture', onCaptureMouseChangedFromControls);
      inputControls.on('device-orientation', onDeviceOrientationChangedFromControls);
      inputControls.on('pointer-locked', onPointerLocked);
      return { dispose: dispose };
      function onPointerLocked(isLocked) {
          var cross = container.querySelector('.cross');
          if (cross)
              { cross.style.display = isLocked ? 'block' : 'none'; }
      }
      function createHandler(el) {
          var command = getMoveCommand(el);
          return createPressListener(el, function (isDown) {
              inputControls.handleCommand(command, isDown ? 1 : 0);
          });
      }
      function onCaptureMouseChangedFromUI(e) {
          inputControls.enableMouseCapture(captureMouse.checked);
      }
      function onCaptureMouseChangedFromControls(isCaptured) {
          captureMouse.checked = isCaptured;
      }
      function onDeviceOrientationChangedFromUI() {
          inputControls.enableDeviceOrientation(deviceOrientation.checked);
      }
      function onDeviceOrientationChangedFromControls(isEnabled) {
          if (deviceOrientation)
              { deviceOrientation.checked = isEnabled; }
      }
      function updateTransforms(e) {
          buttons.forEach(function (btn) {
              if (e[getMoveCommand(btn)]) {
                  btn.classList.add('down');
              }
              else {
                  btn.classList.remove('down');
              }
          });
      }
      function getMoveCommand(el) {
          return Number.parseInt(el.getAttribute('data-command'), 10);
      }
      function dispose() {
          inputControls.off('move', updateTransforms);
          inputControls.off('mouse-capture', onCaptureMouseChangedFromControls);
          inputControls.off('device-orientation', onDeviceOrientationChangedFromControls);
          inputControls.off('pointer-locked', onPointerLocked);
          disposeList.forEach(function (x) { return x(); });
          if (container.parentElement)
              { container.parentElement.removeChild(container); }
          if (style.parentElement)
              { style.parentElement.removeChild(style); }
      }
  }
  function getMarkup() {
      return ("\n  <div class='navigation-row padded'>\n    <div class='item'>\n      <a href=\"#\" class='navigation-btn secondary' data-command='" + (INPUT_COMMANDS.TURN_LEFT) + "'>\n        <svg viewBox=\"0 0 1024 1024\">\n        <path d=\"m884.6 622.6v192c0 11.333-3.834 20.833-11.5 28.5-7.667 7.666-17 11.5-28 11.5s-20.5-3.834-28.5-11.5c-8-7.667-12-17.167-12-28.5v-192c0-61.334-21.667-113.67-65-157-43.334-43.334-95.667-65-157-65h-340l113 112c7.333 8 11 17.5 11 28.5s-3.834 20.333-11.5 28c-7.667 7.666-17 11.5-28 11.5s-20.5-4-28.5-12l-178-178c-8-8-12-17.5-12-28.5s4-20.5 12-28.5l183-183c8-8 17.5-12 28.5-12s20.5 3.833 28.5 11.5c8 7.666 12 17 12 28s-4 20.5-12 28.5l-114 114h336c83.333 0 154.5 29.5 213.5 88.5s88.5 130.17 88.5 213.5z\"/>\n        </svg>\n        <div class='nav-key-legend'>Q</div>\n      </a>\n    </div>\n    <a href='#' class='item navigation-btn' data-command='" + (INPUT_COMMANDS.MOVE_FORWARD) + "'>\n      <svg viewBox=\"0 0 100 100\"><path d=\"M10,80 50,30 90,80z\"></path></svg>\n      <div class='nav-key-legend'>W</div>\n    </a>\n    <a href=\"#\" class='item navigation-btn secondary' data-command='" + (INPUT_COMMANDS.TURN_RIGHT) + "'>\n      <svg viewBox=\"0 0 1024 1024\">\n        <path d=\"m108.6 622.6v192c0 11.333 3.833 20.833 11.5 28.5 7.666 7.666 17 11.5 28 11.5s20.5-3.834 28.5-11.5c8-7.667 12-17.167 12-28.5v-192c0-61.334 21.666-113.67 65-157 43.333-43.334 95.666-65 157-65h340l-113 112c-7.334 8-11 17.5-11 28.5s3.833 20.333 11.5 28c7.666 7.666 17 11.5 28 11.5s20.5-4 28.5-12l178-178c8-8 12-17.5 12-28.5s-4-20.5-12-28.5l-183-183c-8-8-17.5-12-28.5-12s-20.5 3.833-28.5 11.5c-8 7.666-12 17-12 28s4 20.5 12 28.5l114 114h-336c-83.334 0-154.5 29.5-213.5 88.5s-88.5 130.17-88.5 213.5z\"/>\n      </svg>\n      <div class='nav-key-legend'>E</div>\n    </a>\n  </div>\n  <div class='navigation-row padded'>\n    <a href='#' class='item navigation-btn' data-command='" + (INPUT_COMMANDS.MOVE_LEFT) + "'>\n      <svg viewBox=\"0 0 100 100\" ><path d=\"M80,10 80,90 30,50z\"></path></svg>\n      <div class='nav-key-legend'>A</div>\n    </a>\n    <a href='#' class='item navigation-btn' data-command='" + (INPUT_COMMANDS.MOVE_BACKWARD) + "'>\n      <svg viewBox=\"0 0 100 100\"><path d=\"M10,30 50,80 90,30z\"></path></svg>\n      <div class='nav-key-legend'>S</div>\n    </a>\n    <a href='#' class='item navigation-btn' data-command='" + (INPUT_COMMANDS.MOVE_RIGHT) + "'>\n      <svg viewBox=\"0 0 100 100\" ><path d=\"M30,10 30,90 80,50z\"></path></svg>\n      <div class='nav-key-legend'>D</div>\n    </a>\n  </div>\n  <div class='navigation-row'>\n    <a href='#'  class='item navigation-btn wide' data-command='" + (INPUT_COMMANDS.MOVE_DOWN) + "'>\n      <svg width=\"100%\" height=\"100%\" viewBox=\"0 0 1024 1024\">\n          <path d=\"M364,666L522,824C528,830 535.5,833 544.5,833C553.5,833 561,830 567,824L725,666C731.667,659.333 735,651.667 735,643C735,634.333 731.667,626.667 725,620C719,614 711.5,611 702.5,611C693.5,611 686,614 680,620L576,724L576,32C576,23.333 573,15.833 567,9.5C561,3.167 553.333,0 544,0C535.333,0 527.833,3.167 521.5,9.5C515.167,15.833 512,23.333 512,32L512,724L409,620C403,614 395.5,611 386.5,611C377.5,611 370,614 364,620C358,626.667 355,634.333 355,643C355,651.667 358,659.333 364,666ZM1024,992C1024,1000.67 1020.83,1008.17 1014.5,1014.5C1008.17,1020.83 1000.67,1024 992,1024L32,1024C23.333,1024 15.833,1020.83 9.5,1014.5C3.167,1008.17 0,1000.67 0,992C0,983.333 3.167,975.833 9.5,969.5C15.833,963.167 23.333,960 32,960L992,960C1000.67,960 1008.17,963.167 1014.5,969.5C1020.83,975.833 1024,983.333 1024,992Z\" style=\"fill-rule:nonzero;\"/>\n      </svg>\n      <div class='nav-key-legend'>shift</div>\n    </a>\n    <a href='#' class='item navigation-btn wide' data-command='" + (INPUT_COMMANDS.MOVE_UP) + "'>\n      <svg viewBox=\"0 0 1024 1024\"><path d=\"M726 167L568 9q-9-9-22.5-9T523 9L365 167q-10 10-10 23t10 23q9 9 22.5 9t22.5-9l104-104v692q0 13 9 22.5t23 9.5q13 0 22.5-9.5T578 801V109l103 104q9 9 22.5 9t22.5-9q9-10 9-23t-9-23zm298 825q0 13-9.5 22.5T992 1024H32q-13 0-22.5-9.5T0 992t9.5-22.5T32 960h960q13 0 22.5 9.5t9.5 22.5z\"></path></svg>\n      <div class='nav-key-legend'>space</div>\n    </a>\n</div>\n  <div class='cursor-legend'>\n    <input type='checkbox' id='capture-mouse' name=\"capture-mouse\">\n    <label for='capture-mouse'>Capture mouse cursor</label>\n  </div>\n  " + (deviceOrientationBlock()) + "\n  <div class='cross'>+</div>\n</div>");
  }
  function deviceOrientationBlock() {
      if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
          return "<div class='device-orientation-legend'>\n    <input type='checkbox' id='device-orientation' name=\"device-orientation\">\n    <label for='device-orientation'>Use device orientation</label>\n  </div>";
      }
      return '';
  }
  function getStyle(className) {
      // TODO: this should really be part of a build tool.
      var prefix = "." + className;
      return ("\n" + prefix + " {\n  position: fixed;\n  bottom: 8px;\n  left: 8px;\n  font-family: 'Avenir', Helvetica, Arial, sans-serif\n}\n" + prefix + " * {\n  box-sizing: border-box;\n}\n" + prefix + " label {\n  color: white;\n}\n" + prefix + " .nav-key-legend {\n  text-align: center;\n  font-size: 14px;\n}\n" + prefix + " .navigation-row {\n  display: flex;\n}\n" + prefix + " .item {\n  width: 42px;\n  height: 42px;\n  margin: 2px;\n}\n" + prefix + " .navigation-btn {\n  background: rgba(0,0,0,0.2);\n  box-shadow: 0 2px 4px #000, 0 -1px 0 rgb(0 0 0 / 5%);\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  text-decoration: none;\n  display: flex;\n  width: 42px;\n  flex-direction: column;\n  color: #cecece;\n}\n" + prefix + " .navigation-btn.down {\n  background: rgba(250,250,250,.2);\n}\n" + prefix + " .padded {\n  margin-left: 10px;\n}\n" + prefix + " .navigation-btn.secondary {\n  width: 42px;\n  height: 42px;\n  transform: scale(0.70);\n}\n\n" + prefix + " .navigation-btn.secondary svg {\n  padding: 4px;\n}\n" + prefix + " .navigation-btn.secondary .nav-key-legend {\n  color: #aaa;\n}\n" + prefix + " .navigation-btn.secondary.left {\n  transform-origin: right bottom;\n}\n" + prefix + " .navigation-btn.secondary.right {\n  transform-origin: left bottom;\n}\n" + prefix + " .navigation-btn.wide {\n  width: 75px;\n}\n" + prefix + " .navigation-btn svg {\n  fill: white;\n  padding-top: 4px;\n}\n" + prefix + " .cursor-legend {\n  margin-top: 8px;\n  display: none;\n}\n\n" + prefix + " .cross {\n  position: fixed;\n  pointer-events: none;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-size: 68px;\n  color: white;\n  display: none;\n}\n@media (pointer: fine) {\n  " + prefix + " .cursor-legend {\n    display: block;\n  }\n}");
  }
  function createPressListener(el, handler, repeatFrequency) {
      if ( repeatFrequency === void 0 ) repeatFrequency = 15;

      var handle;
      el.addEventListener('mousedown', onDown);
      el.addEventListener('touchstart', onDown);
      el.addEventListener('keydown', onKeyDown);
      el.addEventListener('keyup', onKeyUp);
      return dispose;
      function dispose() {
          el.removeEventListener('mousedown', onDown);
          el.removeEventListener('touchstart', onDown);
          el.removeEventListener('keydown', onKeyDown);
          el.removeEventListener('keyup', onKeyUp);
          document.removeEventListener('mouseup', onMouseUp);
          document.removeEventListener('touchend', onTouchEnd);
          document.removeEventListener('touchcancel', onTouchEnd);
          clearTimeout(handle);
      }
      function onDown(e) {
          e.preventDefault();
          document.addEventListener('mouseup', onMouseUp);
          document.addEventListener('touchend', onTouchEnd);
          document.addEventListener('touchcancel', onTouchEnd);
          processLoop();
      }
      function processLoop() {
          handler(1);
          handle = setTimeout(processLoop, repeatFrequency);
      }
      function onMouseUp() {
          stopLoop();
      }
      function onKeyDown(e) {
          if (e.which === 13) { // return
              handler(1);
              e.preventDefault();
          }
      }
      function onKeyUp(e) {
          if (e.which === 13) { // return
              handler(0);
              e.preventDefault();
          }
      }
      function onTouchEnd() {
          stopLoop();
      }
      function stopLoop() {
          clearTimeout(handle);
          document.removeEventListener('mouseup', onMouseUp);
          document.removeEventListener('touchend', onTouchEnd);
          document.removeEventListener('touchcancel', onTouchEnd);
          handler(0);
      }
  }

  function createGuide(scene, options) {
      if ( options === void 0 ) options = {};

      var camera = scene.getCameraController();
      var nullElement = {
          redraw: Function.prototype,
          dispose: Function.prototype
      };
      // TODO: Move these to options.
      var lineColor = options.lineColor || 0x0bb1b122;
      var maxAlpha = options.maxAlpha || 0xff;
      var grid = createGrid(lineColor);
      var cursor = createCursor(options.cursorColor || 0xffffffff);
      scene.on('transform', update);
      return {
          dispose: dispose,
          update: update
      };
      function dispose() {
          scene.off('transform', update);
          grid.dispose();
          cursor.dispose();
      }
      function update() {
          grid.redraw();
          cursor.redraw();
      }
      function createGrid(color) {
          if (options.showGrid === false)
              { return nullElement; }
          var count = 32 * 2;
          var levelUp = new WireCollection(2 * (count + 1), { width: 2.5, is3D: true, allowColors: true });
          levelUp['svgInvisible'] = true;
          var levelDown = new WireCollection(2 * (count + 1), { width: 1.5, is3D: true, allowColors: true });
          levelDown['svgInvisible'] = true;
          var drawContext = scene.getDrawContext();
          var center = drawContext.view.center;
          redraw();
          scene.appendChild(levelDown);
          scene.appendChild(levelUp);
          return { redraw: redraw, dispose: dispose };
          function dispose() {
              scene.removeChild(levelDown);
              scene.removeChild(levelUp);
          }
          function getAlpha(x) {
              return 1 - (x - Math.floor(x));
          }
          function redraw() {
              var cameraPosition = scene.getDrawContext().view.position;
              var dx = cameraPosition[0] - center[0];
              var dy = cameraPosition[1] - center[1];
              var dz = cameraPosition[2] - center[2];
              var r = Math.sqrt(dx * dx + dy * dy + dz * dz);
              var size = r * Math.tan(drawContext.fov / 2);
              var l = Math.log10(size);
              var step = Math.pow(10, Math.floor(l));
              var t = getAlpha(l);
              var alpha = Math.round(t * maxAlpha);
              var left = Math.floor((center[0]) / step) * step - Math.floor(count * step / 2);
              var top = Math.floor((center[1]) / step) * step - Math.floor(count * step / 2);
              var right = left + step * count;
              var bottom = top + step * count;
              drawLevel(levelDown, left, top, right, bottom, step, alpha);
              drawLevel(levelUp, left, top, right, bottom, step * 10, maxAlpha - alpha);
          }
          function drawLevel(geometry, left, top, right, bottom, step, alpha) {
              geometry.model[14] = center[2];
              geometry.worldTransformNeedsUpdate = true;
              geometry.count = 0;
              var gridColor = (color & 0xffffff00) | alpha;
              var stepTop = Math.ceil(top / step) * step;
              for (var i = stepTop; i <= bottom; i += step) {
                  geometry.add({
                      from: { x: left, y: i, color: gridColor },
                      to: { x: right, y: i, color: gridColor }
                  });
              }
              var stepLeft = Math.ceil(left / step) * step;
              for (var i$1 = stepLeft; i$1 <= right; i$1 += step) {
                  geometry.add({
                      from: { x: i$1, y: top, color: gridColor },
                      to: { x: i$1, y: bottom, color: gridColor }
                  });
              }
          }
      }
      function createCursor(color) {
          if (options.showCursor === false)
              { return nullElement; }
          var count = 360;
          var center = scene.getDrawContext().view.center;
          var cameraPosition = scene.getDrawContext().view.position;
          var geometry = new WireCollection(count + 1, { width: 3, is3D: true, allowColors: true });
          geometry['svgInvisible'] = true;
          var prevPoint;
          var points = [];
          for (var i = 0; i <= count; ++i) {
              // This doesn't really matter, we redraw later anyway:
              points.push(geometry.add({
                  from: { x: 0, y: 0, color: color },
                  to: { x: i, y: i, color: color },
              }));
          }
          scene.appendChild(geometry);
          redraw();
          return { redraw: redraw, dispose: dispose };
          function dispose() {
              scene.removeChild(geometry);
          }
          function redraw() {
              var dx = cameraPosition[0] - center[0];
              var dy = cameraPosition[1] - center[1];
              var dz = cameraPosition[2] - center[2];
              var r = Math.sqrt(dx * dx + dy * dy + dz * dz);
              r *= 0.025;
              for (var i = 0; i <= count + 1; ++i) {
                  var alpha = i / count * 2 * Math.PI;
                  if (i === 0) {
                      prevPoint = {
                          x: r * Math.cos(alpha),
                          y: r * Math.sin(alpha),
                          color: color
                      };
                      continue;
                  }
                  var nextPoint = {
                      x: r * Math.cos(alpha),
                      y: r * Math.sin(alpha),
                      color: color
                  };
                  points[i - 1].update(prevPoint, nextPoint);
                  prevPoint = nextPoint;
              }
              geometry.model[12] = center[0];
              geometry.model[13] = center[1];
              geometry.model[14] = center[2];
              geometry.worldTransformNeedsUpdate = true;
          }
      }
  }

  /**
   * Maps a glsl uniform type to correponding
   */
  var UniformTypeToFunctionName = {
      mat4: 'uniformMatrix4fv',
      mat3: 'uniformMatrix3fv',
      mat2: 'uniformMatrix2fv',
      vec4: 'uniform4fv',
      vec3: 'uniform3fv',
      vec2: 'uniform2fv',
      float: 'uniform1f'
  };
  /**
   * Defines a single uniform attribute in the GLSL shader
   */
  var ActiveUniform = function ActiveUniform(name, variableType) {
      var functionName = UniformTypeToFunctionName[variableType];
      if (!functionName)
          { throw new Error('Function name for uniform is required'); }
      this.name = name;
      this.functionName = functionName;
      this.location = (this.name) + "UniformLocation";
  };
  ActiveUniform.prototype.getInitBlockForDraw = function getInitBlockForDraw () {
      return ("let " + (this.location) + " = gl.getUniformLocation(program, '" + (this.name) + "');");
  };
  ActiveUniform.prototype.getDraw = function getDraw () {
      if (this.functionName.indexOf('Matrix') > -1) {
          return ("gl." + (this.functionName) + "(" + (this.location) + ", false, uniforms." + (this.name) + ");");
      }
      else {
          return ("gl." + (this.functionName) + "(" + (this.location) + ", uniforms." + (this.name) + ");");
      }
  };

  /**
   * Describes a single texture in the glsl program.
   *
   * Note: this class is very limited at the moment and has strong assumptions about texture format and source
   * It will grow based on client needs.
   */
  var ActiveTexture = function ActiveTexture(name, offset) {
        if ( offset === void 0 ) offset = 0;

        this.name = name;
        this.offset = offset;
        this.variableName = name + "Texture";
        this.ready = (this.variableName) + "Ready";
        this.location = (this.name) + "UniformLocation";
        this.isTexture = true;
    };
    ActiveTexture.prototype.getInitBlockForDraw = function getInitBlockForDraw () {
        return ("\n  let " + (this.location) + " = gl.getUniformLocation(program, '" + (this.name) + "');\n  let " + (this.variableName) + " = gl.createTexture();\n  let " + (this.ready) + " = false;\n");
    };
    ActiveTexture.prototype.getTextureInitCanvasBlock = function getTextureInitCanvasBlock () {
        return ("\n  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);\n  gl.bindTexture(gl.TEXTURE_2D, " + (this.variableName) + ");\n  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvas);\n  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);\n  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);\n  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\n  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\n  gl.bindTexture(gl.TEXTURE_2D, null);\n  " + (this.ready) + " = true");
    };
    ActiveTexture.prototype.getDraw = function getDraw () {
        return ("\n    gl.activeTexture(gl.TEXTURE" + (this.offset) + ");\n    gl.bindTexture(gl.TEXTURE_2D, " + (this.variableName) + ");\n    gl.uniform1i(" + (this.location) + ", " + (this.offset) + ");\n");
    };

  /**
   * Base class for attribute code generators. Attribute code generators are responsible
   * for mapping glsl attributes to javascript buffers and states.
   *
   * For example, imagine your glsl has the following attribute:
   *
   * ``` glsl
   * attribute vec2 point;
   * ```
   *
   * We generate a code that allows javascript clients add vertex to collection:
   *
   * ``` js
   * program.add({
   *   point: [1, 4]
   * })
   * ```
   *
   * And render it:
   *
   * ``` js
   * program.draw()
   * ```
   *
   * Code generator from glsl type to javascript starts in BaseAttribute:
   */
  var BaseAttribute = function BaseAttribute() {
      this.type = 'gl.FLOAT';
      this.debug = false;
      this.bufferViewType = 'Float32Array';
      this.count = 1;
      this.name = undefined;
      this.bytePerElement = 4;
  };
  BaseAttribute.prototype.setName = function setName (name) {
      this.name = name;
  };
  BaseAttribute.prototype.getInitBlockForBuffer = function getInitBlockForBuffer (includeDeclaration) {
      this.ensureNameIsSet();
      var prefix = includeDeclaration ? 'let ' : '';
      return ("" + prefix + (this.name) + "Array = new " + (this.bufferViewType) + "(buffer);");
  };
  BaseAttribute.prototype.getInitBlockForDraw = function getInitBlockForDraw () {
      this.ensureNameIsSet();
      var ref = this;
          var name = ref.name;
      return ("let " + name + "AttributeLocation = gl.getAttribLocation(program, '" + name + "');");
  };
  /**
   * "Add block" returns code that adds attribute values to the shared buffer.
   */
  BaseAttribute.prototype.getAddBlock = function getAddBlock (offset, join) {
      throw new Error('Concrete types have to implement this');
  };
  BaseAttribute.prototype.getMoveBlock = function getMoveBlock (offset, join) {
      throw new Error('Concrete type have to implement `getMoveBlock`');
  };
  /**
   * "Get block" returns code that reconstructs attribute's values from the shared buffer
   */
  BaseAttribute.prototype.getGetBlock = function getGetBlock (offset) {
      throw new Error('Concrete types have to implement `getGetBlock`');
  };
  BaseAttribute.prototype.getDivisor = function getDivisor (divisor) {
      this.ensureNameIsSet();
      var location = (this.name) + "AttributeLocation";
      return ("if (" + location + " > -1) gle.vertexAttribDivisorANGLE(" + location + ", " + divisor + ");");
  };
  BaseAttribute.prototype.getDraw = function getDraw (stride, offset) {
      this.ensureNameIsSet();
      var location = (this.name) + "AttributeLocation";
      return ("\n    gl.enableVertexAttribArray(" + location + ");\n    gl.vertexAttribPointer(" + location + ", " + (this.count) + ", " + (this.type) + ", false, " + stride + ", " + offset + ");");
  };
  BaseAttribute.prototype.ensureNameIsSet = function ensureNameIsSet () {
      if (!this.name) {
          throw new Error('You have to call setName() before using attributes');
      }
  };

  var FloatAttribute = /*@__PURE__*/(function (BaseAttribute) {
      function FloatAttribute(count) {
          BaseAttribute.call(this);
          this.count = count;
      }

      if ( BaseAttribute ) FloatAttribute.__proto__ = BaseAttribute;
      FloatAttribute.prototype = Object.create( BaseAttribute && BaseAttribute.prototype );
      FloatAttribute.prototype.constructor = FloatAttribute;
      FloatAttribute.prototype.getAddBlock = function getAddBlock (offset, lineJoin) {
          if ( lineJoin === void 0 ) lineJoin = '\n';

          var name = this.name;
          var variableName = name + "Array";
          var code = [];
          if (this.debug) {
              code.push(("if (item." + name + " === undefined) throw new Error('Attribute \"" + name + "\" is missing');\n"));
          }
          for (var i = 0; i < this.count; ++i) {
              var read = "item." + name + "[" + i + "]";
              if (this.debug) {
                  code.push(("if (" + read + " === undefined) throw new Error('Attribute \"" + name + "\" is missing value at index " + i + "');\n"));
              }
              code.push((variableName + "[index + " + (offset + i) + "] = " + read + ";"));
          }
          return {
              code: code.join(lineJoin),
              offset: offset + this.count,
          };
      };
      FloatAttribute.prototype.getMoveBlock = function getMoveBlock (offset, lineJoin) {
          if ( lineJoin === void 0 ) lineJoin = '\n';

          var name = this.name;
          var variableName = name + "Array";
          var code = [];
          for (var i = 0; i < this.count; ++i) {
              code.push((variableName + "[to + " + (offset + i) + "] = " + variableName + "[from + " + (offset + i) + "];"));
          }
          return code.join(lineJoin);
      };
      FloatAttribute.prototype.getGetBlock = function getGetBlock (offset) {
          var variableName = (this.name) + "Array";
          var code = [];
          for (var i = 0; i < this.count; ++i) {
              code.push((variableName + "[index + " + (offset + i) + "]"));
          }
          return ((this.name) + ": [" + (code.join(', ')) + "]");
      };

      return FloatAttribute;
  }(BaseAttribute));

  var NumberAttribute = /*@__PURE__*/(function (BaseAttribute) {
      function NumberAttribute () {
          BaseAttribute.apply(this, arguments);
      }

      if ( BaseAttribute ) NumberAttribute.__proto__ = BaseAttribute;
      NumberAttribute.prototype = Object.create( BaseAttribute && BaseAttribute.prototype );
      NumberAttribute.prototype.constructor = NumberAttribute;

      NumberAttribute.prototype.getAddBlock = function getAddBlock (offset) {
          var name = this.name;
          var variableName = name + "Array";
          var code = '';
          if (this.debug) {
              code = "if (item." + name + " === undefined) throw new Error('Attribute \"" + name + "\" is missing');";
          }
          code += variableName + "[index + " + offset + "] = item." + name + ";";
          return {
              code: code,
              offset: offset + this.count,
          };
      };
      NumberAttribute.prototype.getMoveBlock = function getMoveBlock (offset, lineJoin) {
          if ( lineJoin === void 0 ) lineJoin = '\n';

          var name = this.name;
          var variableName = name + "Array";
          var code = '';
          code += variableName + "[to + " + offset + "] = " + variableName + "[from + " + offset + "];" + lineJoin;
          return code;
      };
      NumberAttribute.prototype.getGetBlock = function getGetBlock (offset) {
          return ((this.name) + ": " + (this.name) + "Array[index + " + offset + "]");
      };

      return NumberAttribute;
  }(BaseAttribute));

  /**
   * Maps a glsl attribute type to corresponding Attribute class.
   */
  var GLTypeToBufferType = {
      vec4: function () { return new FloatAttribute(4); },
      vec3: function () { return new FloatAttribute(3); },
      vec2: function () { return new FloatAttribute(2); },
      float: function () { return new NumberAttribute; }
  };

  function getProgramInfo(programDefinition) {
      var attributes = [];
      var instancedAttributes = [];
      var parsedProgram = parseProgram(programDefinition.vertex, programDefinition.fragment);
      parsedProgram.attributes.forEach(function (attribute) {
          var name = attribute.name;
          var type = attribute.type;
          var typeDef = programDefinition.attributes && programDefinition.attributes[name];
          if (!typeDef && typeof GLTypeToBufferType[type] === 'function') {
              typeDef = GLTypeToBufferType[type]();
          }
          if (!typeDef) {
              console.error(("Unknown type " + type + " for " + name));
              throw new Error(("Unknown type " + type + " for " + name));
          }
          typeDef.debug = (programDefinition && programDefinition.debug) || false;
          typeDef.setName(name);
          var instancedAttribute = programDefinition.instanced && programDefinition.instanced[name];
          if (instancedAttribute) {
              instancedAttribute.setTypeDefinition(typeDef);
              instancedAttributes.push(instancedAttribute);
          }
          else {
              attributes.push(typeDef);
          }
      });
      var uniforms = [];
      var textureCount = 0;
      parsedProgram.uniforms.forEach(function (uniform) {
          var name = uniform.name;
          if (uniform.type === 'sampler2D') {
              uniforms.push(new ActiveTexture(name, textureCount++));
          }
          else {
              uniforms.push(new ActiveUniform(name, uniform.type));
          }
      });
      var bytePerVertex = 0;
      var itemPerVertex = 0;
      attributes.forEach(function (attribute) {
          itemPerVertex += attribute.count;
          bytePerVertex += attribute.count * attribute.bytePerElement;
      });
      if (programDefinition.attributeLayout) {
          var order = new Map();
          programDefinition.attributeLayout.forEach(function (item, index) { return order.set(item, index); });
          attributes.sort(function (a, b) { return order.get(a.name) - order.get(b.name); });
      }
      return {
          bytePerVertex: bytePerVertex,
          itemPerVertex: itemPerVertex,
          attributes: attributes,
          instanced: instancedAttributes,
          uniforms: uniforms,
      };
  }
  function parseProgram(vertex, fragment) {
      // TODO: this wouldn't work for multiline attribute definitions
      var attribute = /attribute\s+(.+);/;
      var uniform = /uniform\s+(.+);/;
      var attributes = [];
      var uniforms = [];
      vertex.split('\n').forEach(function (line) {
          var attributeMatch = line.match(attribute);
          if (attributeMatch && !line.trim().startsWith('//')) {
              appendVariables(attributeMatch[1], attributes);
              return;
          }
          var uniformMatch = line.match(uniform);
          if (uniformMatch && !line.trim().startsWith('//')) {
              appendVariables(uniformMatch[1], uniforms);
              return;
          }
      });
      // fragment can have only uniforms
      fragment.split('\n').forEach(function (line) {
          var uniformMatch = line.match(uniform);
          if (uniformMatch)
              { appendVariables(uniformMatch[1], uniforms); }
      });
      return { attributes: attributes, uniforms: uniforms };
      function appendVariables(variableDefinition, collection) {
          var parts = variableDefinition.replace(/,/g, ' ').split(' ').filter(function (x) { return x; });
          var type = parts[0];
          var loop = function ( i ) {
              var name = parts[i];
              if (!collection.find(function (x) { return x.name === name; }))
                  { collection.push({ type: type, name: name }); }
          };

          for (var i = 1; i < parts.length; ++i) loop( i );
      }
  }

  /**
   * Helper class that holds intermediate state of the code before it is
   * compiled to javascript.
   */
  var FinalCode = function FinalCode() {
      this.api = [];
      this.init = [];
      this.implementation = [];
      // Share buffer init so that multiple programs can re-use buffers.
      this.bufferInit = [];
  };
  FinalCode.prototype.addToInit = function addToInit (block) {
      if (block)
          { this.init.push(block); }
  };
  FinalCode.prototype.addBufferInit = function addBufferInit (block) {
      if (block)
          { this.bufferInit.push(block); }
  };
  FinalCode.prototype.addToAPI = function addToAPI (block) {
      if (block)
          { this.api.push(block); }
  };
  FinalCode.prototype.addToImplementation = function addToImplementation (block) {
      if (block)
          { this.implementation.push(block); }
  };
  FinalCode.prototype.setAttributesDrawBlock = function setAttributesDrawBlock (block) {
      this.attributesDrawBlock = block;
  };
  FinalCode.prototype.link = function link () {
      var finalBuffer = [];
      this.init.forEach(addToFinalBuffer);
      addToFinalBuffer("  return {");
      this.api.forEach(addToFinalBuffer);
      addToFinalBuffer("  };");
      this.implementation.forEach(addToFinalBuffer);
      return finalBuffer.join("\n");
      function addToFinalBuffer(b) {
          if (Array.isArray(b))
              { finalBuffer.push(b.join("\n    ")); }
          else
              { finalBuffer.push(b); }
      }
  };

  function defineProgram(structure) {
      var gl = structure.gl;
      var programInfo = getProgramInfo(structure);
      var glProgram = link(structure.vertex, structure.fragment);
      var preDrawHook = structure.preDrawHook || nothing;
      var postDrawHook = structure.postDrawHook || nothing;
      // TODO: Sort attributes according to layout (if layout is passed);
      var code = constructCode(programInfo);
      var drawCode = code.link();
      var programAPI = new Function("gl", "program", drawCode)(gl, glProgram);
      if (structure.debug) {
          console.log("Compiled code: ");
          console.log(drawCode);
      }
      programAPI.getCode = function () { return code; };
      programAPI.dispose = function () {
          gl.deleteProgram(glProgram);
      };
      return programAPI;
      function constructCode(programInfo) {
          var finalCode = new FinalCode();
          addCodeThatCounts(programInfo, finalCode);
          if (structure.sourceBuffer) {
              addCodeThatSetsGLBuffer(programInfo, finalCode);
          }
          else {
              addCodeThatModifiesBuffer(programInfo, finalCode);
              addCodeThatCreatesGLBuffer(programInfo, finalCode);
          }
          addCodeThatSetsTextures(programInfo, finalCode);
          addCodeThatDrawsBuffer(programInfo, finalCode);
          return finalCode;
      }
      function addCodeThatSetsGLBuffer(programInfo, code) {
          code.addToInit(["let glBuffer;", ""]);
          code.addToAPI(["setGLBuffer: (newBuffer) => glBuffer = newBuffer,"]);
      }
      function addCodeThatCreatesGLBuffer(programInfo, code) {
          code.addToInit([
              "let glBuffer = gl.createBuffer();",
              "if (!glBuffer) throw new Error('failed to create a WebGL buffer');",
              "" ]);
          code.addToAPI(["getGLBuffer: () => glBuffer,"]);
      }
      function addCodeThatSetsTextures(programInfo, code) {
          var uniforms = programInfo.uniforms;
          var textures = [];
          uniforms.forEach(function (uniform) {
              if (uniform instanceof ActiveTexture)
                  { textures.push(uniform); }
          });
          if (!textures.length)
              { return; }
          code.addToAPI("setTextureCanvas: setTextureCanvas,");
          var cases = textures.map(function (t) {
              return ("\n      case '" + (t.name) + "': {\n        " + (t.getTextureInitCanvasBlock()) + "\n        return;\n      }\n      ");
          });
          code.addToImplementation(("\n  function setTextureCanvas(textureName, textureCanvas) {\n    switch(textureName) {\n      " + (cases.join("\n      ")) + "\n    }\n    throw new Error('Unknown texture name: ' + textureName);\n  }\n"));
      }
      function addCodeThatDrawsBuffer(programInfo, code) {
          var attributes = programInfo.attributes;
          var instanced = programInfo.instanced;
          var uniforms = programInfo.uniforms;
          var bytePerVertex = programInfo.bytePerVertex;
          var itemPerVertex = programInfo.itemPerVertex;
          var sourceBufferCode = structure.sourceBuffer && structure.sourceBuffer.getCode();
          if (sourceBufferCode) {
              code.addToInit(sourceBufferCode.bufferInit);
              code.addBufferInit(sourceBufferCode.bufferInit);
          }
          else {
              attributes.forEach(function (attribute) {
                  var bufferInitAttribute = "  " + attribute.getInitBlockForDraw();
                  code.addToInit(bufferInitAttribute);
                  code.addBufferInit(bufferInitAttribute);
              });
          }
          var textures = [];
          uniforms.forEach(function (uniform) {
              code.addToInit("  " + uniform.getInitBlockForDraw());
              if (uniform instanceof ActiveTexture)
                  { textures.push(uniform); }
          });
          if (instanced.length) {
              code.addToInit("  let gle = gl.getExtension('ANGLE_instanced_arrays');\n  if (!gle) {\n    // Not sure if this is going to be an error, given instancing is widely supported. But\n    // If you get this error please ping me so that we can find a fallback solution\n    throw new Error('Instanced collection requires instancing support. Please ping @anvaka so that we can add fallback');\n  }\n");
              instanced.forEach(function (instancedAttribute) {
                  code.addToInit("  " + instancedAttribute.getInitBlock());
              });
          }
          var attributesDrawBlock = [];
          if (sourceBufferCode) {
              attributesDrawBlock = sourceBufferCode.attributesDrawBlock;
          }
          else {
              var byteOffset = 0;
              attributes.forEach(function (attribute) {
                  attributesDrawBlock.push(attribute.getDraw(bytePerVertex, byteOffset));
                  byteOffset += attribute.count * attribute.bytePerElement;
              });
          }
          code.setAttributesDrawBlock(attributesDrawBlock);
          code.addToImplementation(getDrawImplementation());
          code.addToAPI(["draw: draw,"]);
          function getDrawImplementation() {
              var uniformsDrawBlock = uniforms.map(function (u) { return u.getDraw(); });
              var instancedDrawBlock = [];
              var setDivisorBlock = [];
              var unsetDivisorBlock = [];
              instanced.forEach(function (instancedAttribute) {
                  instancedDrawBlock.push(instancedAttribute.getDraw());
                  setDivisorBlock.push(instancedAttribute.getDivisor(0));
                  unsetDivisorBlock.push(instancedAttribute.getDivisor(0));
              });
              var drawCallBlock = [];
              if (instanced.length) {
                  attributes.forEach(function (attribute) {
                      setDivisorBlock.push(attribute.getDivisor(1));
                      unsetDivisorBlock.push(attribute.getDivisor(0));
                  });
                  drawCallBlock.push(setDivisorBlock.join("\n    "));
                  drawCallBlock.push("gle.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6, count)");
                  drawCallBlock.push(unsetDivisorBlock.join("\n    "));
              }
              else {
                  drawCallBlock.push("gl.drawArrays(gl.TRIANGLES, 0, count)");
              }
              return (" \n  function draw(uniforms, from, to) {\n    " + (checkDrawCode()) + "\n    " + (checkTexturesReady()) + "\n    " + (preDrawHook(programInfo)) + "\n\n    gl.useProgram(program);\n    " + (uniformsDrawBlock.join("\n    ")) + "\n    " + (instancedDrawBlock.join("\n    ")) + "\n\n    gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);\n    " + (bufferDataIfNeeded()) + "\n\n    " + (attributesDrawBlock.join("\n    ")) + "\n    " + (drawCallBlock.join("\n    ")) + "\n\n    " + (postDrawHook(programInfo)) + "\n  }");
              function bufferDataIfNeeded() {
                  if (structure.sourceBuffer)
                      { return ""; }
                  return "  if (isDirty) {\n          gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.DYNAMIC_DRAW);\n          isDirty = false;\n        }";
              }
              function checkDrawCode() {
                  return "if (count === 0) return;";
              }
              function checkTexturesReady() {
                  if (textures.length === 0)
                      { return ""; }
                  return textures
                      .map(function (texture) {
                      return ("if (!" + (texture.ready) + ") return;");
                  })
                      .join("\n    ");
              }
          }
      }
      function addCodeThatCounts(programInfo, code) {
          code.addToInit(["  var count = 0;"]);
          code.addToAPI([
              "setCount: (newCount) => count = newCount,",
              "getCount: () => count," ]);
      }
      function addCodeThatModifiesBuffer(programInfo, code) {
          var attributes = programInfo.attributes;
          var bytePerVertex = programInfo.bytePerVertex;
          var itemPerVertex = programInfo.itemPerVertex;
          code.addToInit([
              ("var bytePerVertex = " + bytePerVertex + ";"),
              ("var itemPerVertex = " + itemPerVertex + ";"),
              ("var capacity = " + ((structure.capacity || 1) * bytePerVertex) + ";"),
              'var buffer = new ArrayBuffer(capacity);',
              '',
              'var isDirty = true;',
              'var dirtyOffset = 0;' ]);
          attributes.forEach(function (attribute) {
              code.addToInit(attribute.getInitBlockForBuffer(/*includeDeclaration = */ true));
          });
          code.addToAPI([
              "add: add,",
              "get: get,",
              "update: update,",
              "remove: remove,",
              "getBuffer: getBuffer,",
              "appendBuffer: appendBuffer," ]);
          code.addToImplementation(getImplementationCode());
          function getImplementationCode() {
              var modifyBufferBlock = [];
              var getAttributeBlock = [];
              var moveBufferBlock = [];
              var extendBlock = [];
              var addOffset = 0;
              attributes.forEach(collectAttributeSpecificBlocks);
              return ("\n  function add(item) {\n    if (count * bytePerVertex >= capacity) {\n      extend();\n    }\n\n    var index = count * itemPerVertex;\n\n    " + (modifyBufferBlock.join("")) + "\n\n    isDirty = true;\n    return count++;\n  }\n\n  function update(index, item) {\n    " + (getUpdateMethodDebugAsserts()) + "\n    index *= itemPerVertex;\n    " + (modifyBufferBlock.join("\n    ")) + "\n    isDirty = true;\n  }\n\n  function remove(index) {\n    " + (getRemoveMethodDebugAsserts()) + "\n    isDirty = true;\n    count -= 1;\n    if (count <= 0) {\n      count = 0;\n      return count; // last element removed\n    }\n    // move last element to take this element's position\n    var from = count * itemPerVertex;\n    var to = index * itemPerVertex;\n    for (var i = 0; i < itemPerVertex; ++i) {\n      " + (moveBufferBlock.join('\n')) + "\n    }\n\n    return count;\n  }\n\n  function get(index) {\n    index *= itemPerVertex; \n    return {\n      " + (getAttributeBlock.join(",\n      ")) + "\n    };\n  }\n\n  function extend() {\n    var oldBuffer = buffer;\n    capacity *= 2;\n    buffer = new ArrayBuffer(capacity);\n    // Copy old buffer to the new buffer\n    new Uint8Array(buffer).set(new Uint8Array(oldBuffer));\n    // And re-assign views:\n    " + (extendBlock.join("\n    ")) + "\n  }\n\n  function getBuffer() {\n    return buffer.slice(0, count * bytePerVertex);\n  }\n\n  function appendBuffer(uint8Collection, byteOffset) {\n    var requiredCapacity = byteOffset + uint8Collection.byteLength;\n    if (requiredCapacity > capacity) {\n      // extend the buffer to fulfill the request:\n      let oldBuffer = buffer;\n      buffer = new ArrayBuffer(requiredCapacity);\n      new Uint8Array(buffer).set(new Uint8Array(oldBuffer));\n      capacity = requiredCapacity;\n    }\n\n    var view = new Uint8Array(buffer);\n    view.set(uint8Collection, byteOffset);\n    count = Math.floor(requiredCapacity / bytePerVertex);\n\n    " + (extendBlock.join("\n    ")) + "\n\n    isDirty = true;\n  }\n");
              function collectAttributeSpecificBlocks(attribute) {
                  var extendCollectionCode = attribute.getInitBlockForBuffer(
                  /* includeDeclaration = */ false);
                  if (extendCollectionCode)
                      { extendBlock.push(extendCollectionCode); }
                  // TODO: need a better name for this:
                  var addBlock = attribute.getAddBlock(addOffset, '\n    ');
                  modifyBufferBlock.push(addBlock.code);
                  moveBufferBlock.push(attribute.getMoveBlock(addOffset, '\n    '));
                  getAttributeBlock.push(attribute.getGetBlock(addOffset));
                  // Every time we add an item to the collection we need to move index in the buffer
                  addOffset = addBlock.offset;
              }
          }
      }
      function getUpdateMethodDebugAsserts() {
          if (!structure.debug)
              { return ''; }
          return "\n    if (!Number.isFinite(index)) throw new Error('update() requires integer value for \"index\", got: ' + index);\n    if (index < 0 || index >= count) throw new Error('update(' + index + ') is outside of [0..' + count + ') range');\n";
      }
      function getRemoveMethodDebugAsserts() {
          if (!structure.debug)
              { return ''; }
          return "\n    if (!Number.isFinite(index)) throw new Error('remove() requires integer value for \"index\", got: ' + index);\n    if (index < 0 || index >= count) throw new Error('remove(' + index + ') is outside of [0..' + count + ') range');\n";
      }
      function link(vertexSource, fragmentSource) {
          var vertex = compileShader(gl.VERTEX_SHADER, vertexSource);
          var fragment = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
          var program = gl.createProgram();
          if (!program)
              { throw new Error('Failed to link a program'); }
          gl.attachShader(program, vertex);
          gl.attachShader(program, fragment);
          gl.linkProgram(program);
          if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
              throw new Error(gl.getProgramInfoLog(program) || 'Failed to link a program');
          }
          return program;
      }
      function compileShader(type, shaderSource) {
          var shader = gl.createShader(type);
          if (!shader) {
              throw new Error("Failed to create a shared " + shaderSource);
          }
          gl.shaderSource(shader, shaderSource);
          gl.compileShader(shader);
          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
              console.error(gl.getShaderInfoLog(shader));
              throw new Error(gl.getShaderInfoLog(shader) ||
                  "Failed to compile shader " + shaderSource);
          }
          return shader;
      }
  }
  function nothing() {
      return "";
  }

  var ColorAttribute = /*@__PURE__*/(function (BaseAttribute) {
      function ColorAttribute() {
          BaseAttribute.call(this);
          this.type = 'gl.UNSIGNED_BYTE';
          this.bufferViewType = 'Uint32Array';
      }

      if ( BaseAttribute ) ColorAttribute.__proto__ = BaseAttribute;
      ColorAttribute.prototype = Object.create( BaseAttribute && BaseAttribute.prototype );
      ColorAttribute.prototype.constructor = ColorAttribute;
      ColorAttribute.prototype.getAddBlock = function getAddBlock (offset) {
          var variableName = (this.name) + "Array";
          var code = '';
          if (this.debug) {
              code = "if (item." + (this.name) + " === undefined) throw new Error('Attribute \"" + (this.name) + "\" is missing');\n";
          }
          code += variableName + "[index + " + offset + "] = item." + (this.name) + ";";
          return {
              code: code,
              offset: offset + this.count,
          };
      };
      ColorAttribute.prototype.getMoveBlock = function getMoveBlock (offset, lineJoin) {
          if ( lineJoin === void 0 ) lineJoin = '\n';

          var name = this.name;
          var variableName = name + "Array";
          var code = '';
          code += variableName + "[to + " + offset + "] = " + variableName + "[from + " + offset + "];" + lineJoin;
          return code;
      };
      ColorAttribute.prototype.getGetBlock = function getGetBlock (offset) {
          return ((this.name) + ": " + (this.name) + "Array[index + " + offset + "]");
      };
      ColorAttribute.prototype.getDraw = function getDraw (stride, offset) {
          var location = (this.name) + "AttributeLocation";
          return ("\n    if (" + location + " > -1) {\n      gl.enableVertexAttribArray(" + location + ");\n      gl.vertexAttribPointer(" + location + ", 4, " + (this.type) + ", true, " + stride + ", " + offset + ");\n    }");
      };

      return ColorAttribute;
  }(BaseAttribute));

  var InstancedAttribute = function InstancedAttribute(bufferValues) {
        this.bufferValues = bufferValues;
        this.typeDef = undefined;
    };
    InstancedAttribute.prototype.setTypeDefinition = function setTypeDefinition (typeDef) {
        this.typeDef = typeDef;
    };
    InstancedAttribute.prototype.getInitBlock = function getInitBlock () {
        var ref = this.typeDef;
          var name = ref.name;
        return ("\n  const " + name + "InstancedBuffer = gl.createBuffer();\n  if (!" + name + "InstancedBuffer) throw new Error('failed to create a WebGL buffer');\n  const " + name + "InstancedBufferValues = new Float32Array([" + (this.bufferValues.join(',')) + "]);\n  let " + name + "AttributeLocation = gl.getAttribLocation(program, '" + name + "');\n");
    };
    InstancedAttribute.prototype.getDivisor = function getDivisor (divisor) {
        return this.typeDef.getDivisor(divisor);
    };
    InstancedAttribute.prototype.getDraw = function getDraw () {
        var ref = this;
          var typeDef = ref.typeDef;
        var name = typeDef.name;
        return ("\n  gl.bindBuffer(gl.ARRAY_BUFFER, " + name + "InstancedBuffer);\n  gl.bufferData(gl.ARRAY_BUFFER, " + name + "InstancedBufferValues, gl.STATIC_DRAW);\n\n  gl.enableVertexAttribArray(" + name + "AttributeLocation);\n  gl.vertexAttribPointer(" + name + "AttributeLocation, " + (typeDef.count) + ", gl.FLOAT, false, 0, 0);\n");
    };

  var GLCollection = /*@__PURE__*/(function (Element) {
      function GLCollection(program) {
          Element.call(this);
          this.program = program;
          this.uniforms = undefined;
      }

      if ( Element ) GLCollection.__proto__ = Element;
      GLCollection.prototype = Object.create( Element && Element.prototype );
      GLCollection.prototype.constructor = GLCollection;
      GLCollection.prototype.getBuffer = function getBuffer () {
          return this.program.getBuffer();
      };
      GLCollection.prototype.appendBuffer = function appendBuffer (uint8Collection, offset) {
          this.program.appendBuffer(uint8Collection, offset);
          if (this.scene)
              { this.scene.renderFrame(); }
      };
      GLCollection.prototype.add = function add (vertex) {
          return this.program.add(vertex);
      };
      GLCollection.prototype.update = function update (id, point) {
          this.program.update(id, point);
      };
      GLCollection.prototype.remove = function remove (id) {
          return this.program.remove(id);
      };
      GLCollection.prototype.get = function get (id) {
          return this.program.get(id);
      };
      GLCollection.prototype.draw = function draw (gl, drawContext) {
          if (!this.uniforms) {
              this.uniforms = {
                  projectionMatrix: drawContext.projection,
                  model: this.worldModel,
                  view: drawContext.view.matrix,
                  modelViewProjection: this.modelViewProjection
              };
          }
          this.program.draw(this.uniforms);
      };
      GLCollection.prototype.dispose = function dispose () {
          Element.prototype.dispose.call(this);
          if (this.program) {
              this.program.dispose();
              // this.program = null; Should I do this?
          }
      };

      return GLCollection;
  }(Element));

  function epsilon(value) {
      return Math.abs(value) < 1e-10 ? 0 : value;
  }

  var SeeThroughCollection = /*@__PURE__*/(function (GLCollection) {
    function SeeThroughCollection(gl) {
          var program = defineProgram({
              gl: gl,
              vertex: "\n  uniform mat4 modelViewProjection;\n  attribute vec3 point;\n\n  void main() {\n    gl_Position = modelViewProjection * vec4(point, 1.0);\n  }",
              fragment: "\n      precision highp float;\n      void main() {\n        gl_FragColor = vec4(0., 0., 0., 0.);\n      }",
              preDrawHook: function preDrawHook( /* programInfo */) {
                  return "gl.disable(gl.BLEND);\n          gl.enable(gl.DEPTH_TEST);\n          gl.depthFunc(gl.LEQUAL);";
              },
              postDrawHook: function postDrawHook() {
                  return 'gl.enable(gl.BLEND); gl.disable(gl.DEPTH_TEST);';
              },
          });
          GLCollection.call(this, program);
          this.domElementToPoints = new Map();
          this.uiIDToUI = new Map();
      }

    if ( GLCollection ) SeeThroughCollection.__proto__ = GLCollection;
    SeeThroughCollection.prototype = Object.create( GLCollection && GLCollection.prototype );
    SeeThroughCollection.prototype.constructor = SeeThroughCollection;
      SeeThroughCollection.prototype.appendFromDomElement = function appendFromDomElement (dom) {
          var this$1 = this;

          // TODO: This might be a bit fragile!
          var width = Number.parseFloat(dom.el.style.width);
          var height = Number.parseFloat(dom.el.style.height);
          var quadPoints = [
              [-width / 2, -height / 2, 0],
              [width / 2, -height / 2, 0],
              [width / 2, height / 2, 0],
              [width / 2, height / 2, 0],
              [-width / 2, height / 2, 0],
              [-width / 2, -height / 2, 0] ];
          // We update the world transform here once. We should be doing this
          // every time when DomElement's transforms are changed!
          dom.updateWorldTransform();
          var quadPointTrackers = quadPoints.map(function (original) {
              var point = cjs_2.transformMat4([], original, dom.worldModel);
              var ui = {
                  original: original,
                  point: point,
                  uiId: -1
              };
              ui.uiId = this$1.add(ui);
              this$1.uiIDToUI.set(ui.uiId, ui);
              return ui;
          });
          this.domElementToPoints.set(dom, quadPointTrackers);
          dom.on('update-transform', this.updateDOMElementTransform, this);
          dom.on('disposed', this.disposeDomElement, this);
      };
      SeeThroughCollection.prototype.disposeDomElement = function disposeDomElement (domElement) {
          var this$1 = this;

          var quadTracker = this.domElementToPoints.get(domElement);
          if (!quadTracker)
              { throw new Error('Unknown dom element requested to be disposed'); }
          quadTracker.forEach(function (tracker) {
              var oldUI = tracker.uiId;
              var newUI = this$1.remove(oldUI);
              var movedUI = this$1.uiIDToUI.get(newUI);
              if (!movedUI) {
                  throw new Error('Cannot find moved vertex ui');
              }
              this$1.uiIDToUI.delete(newUI);
              if (newUI !== oldUI) {
                  // the vertex now lives on this location:
                  movedUI.uiId = oldUI;
                  this$1.uiIDToUI.set(oldUI, movedUI);
              }
          });
          // Clean up
          domElement.off('update-transform', this.updateDOMElementTransform);
          domElement.off('disposed', this.disposeDomElement);
          this.domElementToPoints.delete(domElement);
      };
      SeeThroughCollection.prototype.updateDOMElementTransform = function updateDOMElementTransform (domElement) {
          var this$1 = this;

          var quadTracker = this.domElementToPoints.get(domElement);
          if (!quadTracker)
              { throw new Error('Unknown dom element requested transform update'); }
          quadTracker.forEach(function (tracker) {
              cjs_2.transformMat4(tracker.point, tracker.original, domElement.worldModel);
              this$1.update(tracker.uiId, tracker);
          });
      };
      // draw(gl, drawContext: DrawContext) {
      //   if (!this.uniforms) {
      //     this.uniforms = {
      //       modelViewProjection: this.modelViewProjection,
      //     }
      //   }
      //   this.program.draw(this.uniforms);
      // }
      SeeThroughCollection.prototype.clear = function clear () {
          this.program.setCount(0);
      };

    return SeeThroughCollection;
  }(GLCollection));

  /**
   * Synchronizes CSS3 rendering with the parent drawing context.
   */
  var DomContainer = /*@__PURE__*/(function (Element) {
      function DomContainer(options) {
          Element.call(this);
          this.container = document.createElement('div');
          this.container.style.overflow = 'hidden';
          this.camera = document.createElement('div');
          this.camera.style.transformStyle = 'preserve-3d';
          this.camera.style.pointerEvents = 'none';
          this.camera.style.position = 'relative';
          this.container.appendChild(this.camera);
          this.container.style.pointerEvents = 'none';
          this.bound = false;
          this.lastCameraTransform = '';
          this.seeThrough = (options && (typeof options.seeThrough !== 'undefined')) ?
              options.seeThrough : false;
      }

      if ( Element ) DomContainer.__proto__ = Element;
      DomContainer.prototype = Object.create( Element && Element.prototype );
      DomContainer.prototype.constructor = DomContainer;
      DomContainer.prototype.bindScene = function bindScene (scene) {
          if (scene) {
              var dc = scene.getDrawContext();
              var parent = dc.canvas.parentElement;
              if (!parent) {
                  throw new Error('Scene does not have a parent element');
              }
              if (this.seeThrough)
                  { parent.insertBefore(this.container, dc.canvas); }
              else
                  { parent.append(this.container); }
              this.bound = true;
          }
          else {
              if (this.container.parentElement) {
                  this.container.parentElement.removeChild(this.container);
              }
              this.bound = false;
              if (this.seeThroughQuads && this.seeThroughQuads.parent) {
                  // TODO: need better dispose logic here.
                  this.seeThroughQuads.parent.removeChild(this.seeThroughQuads);
              }
          }
          Element.prototype.bindScene.call(this, scene);
      };
      DomContainer.prototype.acceptDomChild = function acceptDomChild (child) {
          this.camera.appendChild(child.el);
          if (!this.seeThrough) {
              return;
          }
          // For the case of "See through" we render DOM container behind the webgl canvas.
          // Since this places canvas on top of the DOM container, every item of the scene
          // will be visible on top of the DOM elements. We need to "cut out" wholes in the
          // scene, so that DOM elements can be seen as if they belong to the scene.
          // 
          // For this we use a collection of quads, synchronize their transform matrices with
          // DOM element transform matrices, and disable blending for them, while keeping them
          // transparent.
          if (!this.scene) {
              throw new Error('Scene should be available at this point!');
          }
          if (!this.seeThroughQuads) {
              this.seeThroughQuads = new SeeThroughCollection(this.scene.getGL());
              this.scene.appendChild(this.seeThroughQuads);
          }
          this.seeThroughQuads.appendFromDomElement(child);
      };
      DomContainer.prototype.draw = function draw (gl, drawContext) {
          if (!this.bound)
              { return; }
          this._updateCameraTransforms(drawContext);
          Element.prototype.draw.call(this, gl, drawContext);
      };
      DomContainer.prototype._updateCameraTransforms = function _updateCameraTransforms (drawContext) {
          // This is the same as 
          //   0.5 * drawContext.canvas.clientHeight  / Math.tan(drawContext.fov/2) 
          // and the idea behind this formula is to figure out how far from the plane is the camera
          var fov = drawContext.projection[5] * drawContext.height / (2 * drawContext.pixelRatio);
          var pixelRatioIndependentWidth = drawContext.width / drawContext.pixelRatio;
          var pixelRatioIndependentHeight = drawContext.height / drawContext.pixelRatio;
          var cameraTransform = 'translateZ(' + fov + 'px)' + getCameraCSSMatrix(drawContext.view.matrix) +
              'translate(' + (pixelRatioIndependentWidth / 2) + 'px,' + (pixelRatioIndependentHeight / 2) + 'px)';
          if (this.lastCameraTransform != cameraTransform) {
              this.lastCameraTransform = cameraTransform;
              this.camera.style.transform = this.lastCameraTransform;
              this.camera.style.width = pixelRatioIndependentWidth + 'px';
              this.camera.style.height = pixelRatioIndependentHeight + 'px';
              this.container.style.width = pixelRatioIndependentWidth + 'px';
              this.container.style.height = pixelRatioIndependentHeight + 'px';
              this.container.style.perspective = fov + 'px';
          }
      };

      return DomContainer;
  }(Element));
  function getCameraCSSMatrix(elements) {
      return 'matrix3d(' +
          epsilon(elements[0]) + ',' +
          epsilon(-elements[1]) + ',' +
          epsilon(elements[2]) + ',' +
          epsilon(elements[3]) + ',' +
          epsilon(elements[4]) + ',' +
          epsilon(-elements[5]) + ',' +
          epsilon(elements[6]) + ',' +
          epsilon(elements[7]) + ',' +
          epsilon(elements[8]) + ',' +
          epsilon(-elements[9]) + ',' +
          epsilon(elements[10]) + ',' +
          epsilon(elements[11]) + ',' +
          epsilon(elements[12]) + ',' +
          epsilon(-elements[13]) + ',' +
          epsilon(elements[14]) + ',' +
          epsilon(elements[15]) +
          ')';
  }

  var DomElement = /*@__PURE__*/(function (Element) {
      function DomElement(customStyle) {
          Element.call(this);
          this.lastTransform = '';
          this.el = document.createElement('div');
          var style = this.el.style;
          style.position = 'absolute';
          style.pointerEvents = 'initial';
          // style.transformStyle = 'preserve-3d';
          // style.backfaceVisibility = 'hidden';
          if (customStyle) {
              var ourStyle = this.el.style;
              Object.keys(customStyle).forEach(function (key) {
                  ourStyle[key] = customStyle[key];
              });
          }
          ngraph_events(this);
      }

      if ( Element ) DomElement.__proto__ = Element;
      DomElement.prototype = Object.create( Element && Element.prototype );
      DomElement.prototype.constructor = DomElement;
      DomElement.prototype.updateWorldTransform = function updateWorldTransform (force) {
          var updated = Element.prototype.updateWorldTransform.call(this, force);
          if (updated) {
              this.fire('update-transform', this);
          }
          return updated;
      };
      DomElement.prototype.bindScene = function bindScene (scene) {
          if (scene) {
              var domContainer = findDomContainer(this);
              if (!domContainer) {
                  throw new Error('DomElement should be part of DomContainer hierarchy');
              }
              domContainer.acceptDomChild(this);
          }
          else if (this.el.parentNode) {
              this.el.parentNode.removeChild(this.el);
              this.fire('disposed', this);
          }
          Element.prototype.bindScene.call(this, scene);
      };
      DomElement.prototype.draw = function draw ( /* gl: WebGLRenderingContext */) {
          var thisTransform = getObjectCSSMatrix(this.worldModel);
          if (thisTransform !== this.lastTransform) {
              this.el.style.transform = thisTransform;
              this.lastTransform = thisTransform;
          }
      };
      DomElement.prototype.dispose = function dispose () {
          if (this.el.parentNode) {
              this.el.parentNode.removeChild(this.el);
          }
      };

      return DomElement;
  }(Element));
  function getObjectCSSMatrix(elements) {
      var matrix3d = 'matrix3d(' +
          epsilon(elements[0]) + ',' +
          epsilon(elements[1]) + ',' +
          epsilon(elements[2]) + ',' +
          epsilon(elements[3]) + ',' +
          epsilon(-elements[4]) + ',' +
          epsilon(-elements[5]) + ',' +
          epsilon(-elements[6]) + ',' +
          epsilon(-elements[7]) + ',' +
          epsilon(elements[8]) + ',' +
          epsilon(elements[9]) + ',' +
          epsilon(elements[10]) + ',' +
          epsilon(elements[11]) + ',' +
          epsilon(elements[12]) + ',' +
          epsilon(elements[13]) + ',' +
          epsilon(elements[14]) + ',' +
          epsilon(elements[15]) + ')';
      return 'translate(-50%,-50%)' + matrix3d;
  }
  function findDomContainer(startFrom) {
      // Note: might be better to use duck typing instead.
      if (startFrom instanceof DomContainer)
          { return startFrom; }
      return startFrom.parent && findDomContainer(startFrom.parent);
  }

  exports.ColorAttribute = ColorAttribute;
  exports.DomContainer = DomContainer;
  exports.DomElement = DomElement;
  exports.Element = Element;
  exports.FloatAttribute = FloatAttribute;
  exports.GLCollection = GLCollection;
  exports.InstancedAttribute = InstancedAttribute;
  exports.LineStripCollection = LineStripCollection;
  exports.NumberAttribute = NumberAttribute;
  exports.PointCollection = PointCollection;
  exports.WireCollection = WireCollection;
  exports.createFPSControlsUI = createFPSControlsUI;
  exports.createGuide = createGuide;
  exports.createScene = createScene;
  exports.defineProgram = defineProgram;
  exports.fpsControls = createFPSControls;
  exports.isWebGLEnabled = isWebGLEnabled;
  exports.mapControls = createMapControls;
  exports.scene = createScene;
  exports.toSVG = svg;
  exports.utils = glUtils;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=wgl.js.map
