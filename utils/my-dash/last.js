function last(list) {
  return list.length != undefined && list.length > 0
    ? list[list.length - 1]
    : undefined;
}
