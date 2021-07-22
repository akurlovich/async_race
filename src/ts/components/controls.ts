import { Observer } from './observer';

export class Control extends Observer {
  element: HTMLElement;
  node: HTMLElement;
  public onClick!: () => void;
  constructor(
    parentNode?: HTMLElement,
    tagName = 'div',
    className = '',
    content = '',
  ) {
    super();
    this.element = document.createElement(tagName);
    this.element.className = className;
    this.element.textContent = content;
    parentNode && parentNode.appendChild(this.element);
    this.node = this.element;
    this.node.onclick = () => {
      this.onClick && this.onClick();
    };
  }
}
export class Buttons extends Control {
  constructor(
    {
      className = 'button',
      content = '',
    },
  ) {
    super();
    this.element = document.createElement('button');
    this.element.className = className;
    this.element.textContent = content;
  }
}

export class InputFeild extends Control {
  element: HTMLInputElement;
  constructor(
    parentNode: HTMLElement,
    className = '',
    inputType = '',
    placeholder = '',
  ) {
    super();
    this.element = document.createElement('input');
    this.element.className = className;
    this.element.setAttribute('type', inputType);
    this.element.setAttribute('placeholder', placeholder);
    parentNode && parentNode.appendChild(this.element);
  }
}
