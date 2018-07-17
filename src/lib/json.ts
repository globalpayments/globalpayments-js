/* -----------------------------------------------------------------------------
This file is based on or incorporates material from the projects listed below
(collectively, "Third Party Code"). Microsoft is not the original author of the
Third Party Code. The original copyright notice and the license, under which
Microsoft received such Third Party Code, are set forth below. Such licenses
and notices are provided for informational purposes only. Microsoft, not the
third party, licenses the Third Party Code to you under the terms of the
Apache License, Version 2.0. See License.txt in the project root for complete
license information. Microsoft reserves all rights not expressly granted under
the Apache 2.0 License, whether by implication, estoppel or otherwise.
----------------------------------------------------------------------------- */

/*
    json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.

    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as "\t" or "&nbsp;"),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? "0" + n : n;
                    }

                    return this.getUTCFullYear()   + "-" +
                         f(this.getUTCMonth() + 1) + "-" +
                         f(this.getUTCDate())      + "T" +
                         f(this.getUTCHours())     + ":" +
                         f(this.getUTCMinutes())   + ":" +
                         f(this.getUTCSeconds())   + "Z";
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(["e", {pluribus: "unum"}]);
            // text is "["e",{"pluribus":"unum"}]"

            text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
            // text is "[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]"

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    "Date(" + this[key] + ")" : value;
            });
            // text is "["Date(---current time---)"]"

        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                let a;
                if (typeof value === "string") {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse("["Date(09/09/2001)"]", function (key, value) {
                let d;
                if (typeof value === "string" &&
                        value.slice(0, 5) === "Date(" &&
                        value.slice(-1) === ")") {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });

    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

export let JSON: any = {};

(() => {
  "use strict";

  function f(n: number) {
    // format integers to have at least two digits.
    return n < 10 ? "0" + n : n;
  }

  if (typeof Date.prototype.toJSON !== "function") {
    Date.prototype.toJSON = (_KEY?: any) => {
      return isFinite(this.valueOf())
        ? this.getUTCFullYear() +
            "-" +
            f(this.getUTCMonth() + 1) +
            "-" +
            f(this.getUTCDate()) +
            "T" +
            f(this.getUTCHours()) +
            ":" +
            f(this.getUTCMinutes()) +
            ":" +
            f(this.getUTCSeconds()) +
            "Z"
        : "";
    };

    const strProto: any = String.prototype;
    const numProto: any = Number.prototype;
    numProto.JSON = strProto.JSON = (Boolean.prototype as any).toJSON = (
      _KEY?: any,
    ) => this.valueOf();
  }

  const cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  // tslint:disable-next-line
  const esc = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  let gap: string;
  let indent: string;
  const meta = {
    // table of character substitutions
    "\b": "\\b",
    "\t": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    '"': '\\"',
    "\\": "\\\\",
  };
  let rep: string[] | (() => void);

  function quote(quoteStr: string) {
    // if the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // otherwise we must also replace the offending characters with safe escape
    // sequences.

    esc.lastIndex = 0;
    return esc.test(quoteStr)
      ? '"' +
          quoteStr.replace(esc, (a: string) => {
            const c = (meta as any)[a];
            return typeof c === "string"
              ? c
              : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
          }) +
          '"'
      : '"' + quoteStr + '"';
  }

  function str(key: string, holder: any): string | undefined {
    // produce a string from holder[key].

    let i: number; // the loop counter.
    let k: string; // the member key.
    let v: any; // the member value.
    let length: number;
    const mind = gap;
    let partial: string[];
    let value = holder[key];

    // if the value has a toJSON method, call it to obtain a replacement value.

    if (
      value &&
      typeof value === "object" &&
      typeof value.toJSON === "function"
    ) {
      value = value.toJSON(key);
    }

    // if we were called with a replacer function, then call the replacer to
    // obtain a replacement value.

    if (typeof rep === "function") {
      value = (rep as () => void).call(holder, key, value);
    }

    // what happens next depends on the value"s type.

    switch (typeof value as any) {
      case "string":
        return quote(value);

      case "number":
        // json numbers must be finite. Encode non-finite numbers as null.

        return isFinite(value) ? String(value) : "null";

      case "boolean":
      case "null":
        // if the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce "null". The case is included here in
        // the remote chance that this gets fixed someday.

        return String(value);

      // if the type is "object", we might be dealing with an object or an array or
      // null.

      case "object":
        // due to a specification blunder in ECMAScript, typeof null is "object",
        // so watch out for that case.

        if (!value) {
          return "null";
        }

        // make an array to hold the partial: string[] results of stringifying this object value.

        gap += indent;
        partial = [];

        // is the value an array?

        if (Object.prototype.toString.apply(value, []) === "[object Array]") {
          // the value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.

          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i.toString(), value) || "null";
          }

          // join all of the elements together, separated with commas, and wrap them in
          // brackets.

          v =
            partial.length === 0
              ? "[]"
              : gap
                ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                : "[" + partial.join(",") + "]";
          gap = mind;
          return v;
        }

        // if the replacer is an array, use it to select the members to be stringified.

        if (rep && typeof rep === "object") {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === "string") {
              k = rep[i];
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        } else {
          // otherwise, iterate through all of the keys in the object.

          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        }

        // join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v =
          partial.length === 0
            ? "{}"
            : gap
              ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
              : "{" + partial.join(",") + "}";
        gap = mind;
        return v;
    }

    return undefined;
  }

  // if the JSON object does not yet have a stringify method, give it one.

  if (typeof JSON.stringify !== "function") {
    JSON.stringify = (
      value: any,
      replacer: string[] | (() => void),
      space: number | string,
    ) => {
      // the stringify method takes a value and an optional replacer, and an optional
      // space parameter, and returns a JSON text. The replacer can be a function
      // that can replace values, or an array of strings that will select the keys.
      // a default replacer method can be provided. Use of the space parameter can
      // produce text that is more easily readable.

      let i: number;
      gap = "";
      indent = "";

      // if the space parameter is a number, make an indent string containing that
      // many spaces.

      if (typeof space === "number") {
        for (i = 0; i < space; i += 1) {
          indent += " ";
        }

        // if the space parameter is a string, it will be used as the indent string.
      } else if (typeof space === "string") {
        indent = space;
      }

      // if there is a replacer, it must be a function or an array.
      // otherwise, throw an error.

      rep = replacer;
      if (
        replacer &&
        typeof replacer !== "function" &&
        (typeof replacer !== "object" || typeof replacer.length !== "number")
      ) {
        throw new Error("JSON.stringify");
      }

      // make a fake root object containing our value under the key of "".
      // return the result of stringifying the value.

      return str("", { "": value });
    };
  }

  // if the JSON object does not yet have a parse method, give it one.

  if (typeof JSON.parse !== "function") {
    JSON.parse = (text: string, reviver: (() => void)) => {
      // the parse method takes a text and an optional reviver function, and returns
      // a JavaScript value if the text is a valid JSON text.

      let j: number;

      function walk(holder: any, key: string | number): {} {
        // the walk method is used to recursively walk the resulting structure so
        // that modifications can be made.

        let k: string;
        let v: any;
        const value: any = holder[key];
        if (value && typeof value === "object") {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              value[k] = v;
            }
          }
        }
        return reviver.call(holder, key, value);
      }

      // parsing happens in four stages. In the first stage, we replace certain
      // unicode characters with escape sequences. JavaScript handles many characters
      // incorrectly, either silently deleting them, or treating them as line endings.

      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) {
        text = text.replace(cx, (a) => {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        });
      }

      // in the second stage, we run the text against regular expressions that look
      // for non-JSON patterns. We are especially concerned with "()" and "new"
      // because they can cause invocation, and "=" because it can cause mutation.
      // but just to be safe, we want to reject all unexpected forms.

      // we split the second stage into 4 regexp operations in order to work around
      // crippling inefficiencies in IE"s and Safari"s regexp engines. First we
      // replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
      // replace all simple value tokens with "]" characters. Third, we delete all
      // open brackets that follow a colon or comma or that begin the text. Finally,
      // we look to see that the remaining characters are only whitespace or "]" or
      // "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

      if (
        /^[\],:{}\s]*$/.test(
          text
            .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
            .replace(
              /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
              "]",
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ""),
        )
      ) {
        // in the third stage we use the eval function to compile the text into a
        // javascript structure. The "{" operator is subject to a syntactic ambiguity
        // in JavaScript: it can begin a block or an object literal. We wrap the text
        // in parens to eliminate the ambiguity.

        j = new Function("return (" + text + ")")();

        // in the optional fourth stage, we recursively walk the new structure, passing
        // each name/value pair to a reviver function for possible transformation.

        return typeof reviver === "function" ? walk({ "": j }, "") : j;
      }

      // if the text is not JSON parseable, then a SyntaxError is thrown.

      throw new SyntaxError("JSON.parse");
    };
  }
})();
