function isEmpty(value) {
  if (
    value === null ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === undefined
  ) {
    return true;
  }

  if (typeof value === "string") {
    return value.length > 0 ? false : true;
  }

  if (Array.isArray(value)) {
    return false;
  }

  if (typeof value === "object") {
    if (Object.keys(value).length > 0) {
      return false;
    }
  }

  if (value instanceof Map) {
    if (value.size > 0) {
      return false;
    }
  }
  if (value instanceof Set) {
    if (value.size > 0) {
      return false;
    }
  }
}

console.log(isEmpty(null)); // => true
console.log(isEmpty(true)); // => true
console.log(isEmpty(1)); // => true
console.log(isEmpty([1, 2, 3])); // => false
console.log(isEmpty({ a: 1 })); // => false
console.log(isEmpty("123")); // => false
console.log(isEmpty(123)); // => true
console.log(isEmpty("")); // => true
console.log(isEmpty(0)); // => true
console.log(isEmpty(undefined)); // => true
console.log(
  isEmpty(
    new Map([
      ["1", "str1"],
      [1, "num1"],
      [true, "bool1"],
    ])
  )
); // => false
console.log(isEmpty(new Set(["value1", "value2", "value3"]))); // => false
