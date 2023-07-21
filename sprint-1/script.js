class MyArray {
  constructor(initialSize = 1) {
    if (
      Number(initialSize) !== initialSize ||
      Math.round(initialSize) !== initialSize
    ) {
      throw new Error("Длина массива должна быть целым числом");
    }

    if (!(initialSize > 0)) {
      throw new Error("Размер массива должен быть больше нуля");
    }

    this.size = initialSize;
    this.memory = allocate(initialSize);
    this.length = 0;
  }

  // Возвращает значение по индексу.
  // Если индекс за пределами — кидает ошибку.
  get(index) {
    const value = binarySearch(this.memory, index);
    if (value == -1) {
      throw new Error("Искомый индекс находится за пределами массива");
    } else {
      return value;
    }
  }

  // Устанавливает значение по индексу.
  // Если индекс за пределами — кидает ошибку.
  set(index, value) {
    const current = binarySearch(this.memory, index);
    if (current == -1) {
      throw new Error("Искомый индекс находится за пределами массива");
    } else {
      this.memory[index] = value;
    }
  }

  // Добавляет новый элемент в массив.
  // Если index не определён — добавляет в конец массива.
  // В противном случае — добавляет по индексу со сдвигом
  // всех последующих элементов.
  // Если индекс за пределами - кидает ошибку.
  // Увеличивает выделенную память вдвое, если необходимо.
  // Возвращает новую длину массива.
  add(value, index) {
    //	...
  }

  // Удаляет элемент по индексу со сдвигом всех последующих элементов.
  // Если индекс за пределами - кидает ошибку.
  // Возвращает новую длину массива.
  delete(index) {
    //	...
  }
}

function allocate(size) {
  const memory = {};

  for (let i = 0; i < size; i++) {
    memory[i] = undefined;
  }

  return memory;
}

function binarySearch(sortedNumbers, n) {
  // Определяем точки начала и конца поиска
  let start = 0;
  let end = sortedNumbers.length;

  while (start < end) {
    // Находим элемент в середине массива
    const middle = Math.floor((start + end) / 2);
    const value = sortedNumbers[middle];

    // Сравниваем аргумент со значением в середине массива
    if (n == value) {
      return middle;
    }

    // Если аргумент меньше, чем серединное значение, разделяем массив пополам
    // Теперь конец массива — это его бывшая середина
    if (n < value) {
      end = middle;
      // Иначе началом массива становится элемент, идущий сразу за «серединой»
    } else {
      start = middle + 1;
    }
  }

  // если искомое число не найдено, возвращаем -1
  return -1;
}

const arr = new MyArray();
console.log(arr);
