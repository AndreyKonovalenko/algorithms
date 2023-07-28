function range(...args) {
  const result = [];
  let start = 0;
  let end;
  let step = 1;

  if (args.length == 0 || args.length > 3) {
    return undefined;
  }
  if (args.length == 1) {
    end = args[0];
  }
  if (args.length == 2) {
    start = args[0];
    end = args[1];
  }
  if (args.length == 3) {
    start = args[0];
    end = args[1];
    step = args[2];
  }

  if (args.length == 4) {
    start = args[0];
    end = args[1];
    step = args[2];
  }

  if (end === 0) {
    return [];
  }
  if (step === 0) {
    let n = 0;
    while (n < end) {
      result.push(start);
      n++;
    }
    return result;
  }

  for (
    let n = start;
    end > 0 ? n < end : n > end;
    end > 0 ? (n += step) : step > 0 ? (n -= step) : (n += step)
  ) {
    result.push(n);
  }
  return result;
}

function rangeRight(...args) {
  return range(...args).reverse();
}

console.log(rangeRight(4));
console.log(rangeRight(-4));
console.log(rangeRight(1, 5));
console.log(rangeRight(0, 20, 5));
console.log(rangeRight(0, -4, -1));
console.log(rangeRight(1, 4, 0));
console.log(rangeRight(0));
