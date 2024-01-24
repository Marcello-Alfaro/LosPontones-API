import ErrorObject from './errorObject.js';
import { v4 as uuidv4 } from 'uuid';

export default class Image {
  static #imageQueue = [];

  constructor(stream, name, location = null) {
    this.id = uuidv4();
    this.stream = stream;
    this.location = location;
    this.name = name;
    Image.add(this);
  }

  static add(img) {
    this.#imageQueue.push(img);
  }

  static remove(id) {
    const index = this.#imageQueue.findIndex((image) => image.id === id);
    if (index === -1)
      throw new ErrorObject(`Image with id: ${id} was not found, could not remove.`);

    return this.#imageQueue.splice(index, 1)[0];
  }
}
