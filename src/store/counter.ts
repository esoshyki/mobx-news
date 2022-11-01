import { makeAutoObservable } from "mobx";

export default class Counter {
  value = 0;

  constructor() {
    makeAutoObservable(this)
  }

  increase() {
    this.value += 1;
  }
}