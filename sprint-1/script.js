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
    if (index > 0 && index >= this.length) {
      throw new Error("Искомый индекс находится за пределами массива");
    }
    if (index >= 0 && index < this.length) {
      for (const property in this.memory) {
        if (property == index) {
          return this.memory[property];
        }
      }
    }
  }

  // Устанавливает значение по индексу.
  // Если индекс за пределами — кидает ошибку.

  set(index, value) {
    if (index > 0 && index >= this.length) {
      throw new Error("Искомый индекс находится за пределами массива");
    }
    if (index >= 0 && index < this.length) {
      for (const property in this.memory) {
        if (property == index) {
          this.memory[index] = value;
        }
      }
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
    if (index == undefined) {
      this.memory[this.length] = value;
      this.length++;
      if (this.length == this.size) {
        const copy = { ...this.memory };
        this.size = this.size * 2;
        this.memory = allocate(this.size);
        for (const property in copy) {
          this.memory[property] = copy[property];
        }
      }
    }

    if (index > 0 && index >= this.length) {
      throw new Error("Искомый индекс находится за пределами массива");
    }

    if (index >= 0 && index < this.length) {
      const copy = { ...this.memory };
      for (const property in this.memory) {
        if (property >= index) {
          copy[Number(property) + 1] = this.memory[property];
        }
      }
      copy[index] = value;
      this.memory = copy;
      this.length++;

      if (this.length == this.size) {
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
    if (index > 0 && index >= this.length) {
      throw new Error("Искомый индекс находится за пределами массива");
    }
    if (index >= 0 && index < this.length) {
      const copy = { ...this.memory };
      for (const property in this.memory) {
        if (property > index) {
          copy[Number(property) - 1] = this.memory[property];
        }
      }
      this.memory = copy;
      this.length--;
    }
    return this.length;
  }
}

function allocate(size) {
  const memory = {};
  for (let i = 0; i < size; i++) {
    memory[i] = undefined;
  }
  return memory;
}

let arr = new MyArray();

arr.add(5);
console.log({ ...arr });
arr.add(4, 0);
console.log({ ...arr });
arr.add(5, 1);
arr.add(3, 2);
arr.add(33, 3);
console.log({ ...arr });
arr.delete(2);
console.log({ ...arr });
