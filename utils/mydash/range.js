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

console.log(range(4));
console.log(range(-4));
console.log(range(1, 5));
console.log(range(0, 20, 5));
console.log(range(0, -4, -1));
console.log(range(1, 4, 0));
console.log(range(0));
