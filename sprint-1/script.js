class MyArray {
  constructor(initialSize = 1) {
    if (
      Number(initialSize) !== initialSize ||
      Math.round(initialSize) !== initialSize
    ) {
      throw new Error('Длина массива должна быть целым числом');
    }

    if (!(initialSize > 0)) {
      throw new Error('Размер массива должен быть больше нуля');
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
      throw new Error('Искомый индекс находится за пределами массива');
    } else {
      return value;
    }
  }

  // Устанавливает значение по индексу.
  // Если индекс за пределами — кидает ошибку.
  set(index, value) {
    const current = binarySearch(this.memory, index);
    if (current == -1) {
      throw new Error('Искомый индекс находится за пределами массива');
    } else {
      this.memory[index] = value;
      throw new Error('Искомый индекс находится за пределами массива');
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
    const checkedIndex = checkIndex(index, this.length);
    if (checkedIndex === undefined) {
      this.memory[this.length] = value;
      this.length++;
      if (this.length >= this.size) {
        const copy = { ...this.memory };
        this.size = this.size * 2;
        this.memory = allocate(this.size);
        for (const property in copy) {
          this.memory[property] = copy[property];
        }
      }
    }

    if (checkedIndex >= this.length) {
      throw new Error('Искомый индекс находится за пределами массива');
    }

    if (checkedIndex && checkedIndex < this.length) {
      const copy = { ...this.memory };
      for (const property in this.memory) {
        if (property >= checkedIndex) {
          copy[property + 1] = this.memory[property];
        }
      }
      copy[checkedIndex] = value;
      this.memory = copy;
      this.length++;

      if (this.length >= this.size) {
        const copy = { ...this.memory };
        this.size = this.size * 2;
        this.memory = allocate(this.size);
        for (const property in copy) {
          this.memory[property] = copy[property];
        }
      }
    }
    return this.length;
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

function checkIndex(index, length) {
  if (index >= 0 && index < length) {
    return index;
  } else {
    return undefined;
  }
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
arr.add(5);
console.log(arr);
arr.add(4, 1);
console.log(arr);
arr.add(5, 1);
console.log(arr);
