import view from '../view/view';
import { Buttons, Control } from './controls';

export class Navigation extends Control {
  toGarageBtn: Buttons;
  toWinnersBtn: Control;
  constructor(
    parentNode?: HTMLElement,
  ) {
    super(parentNode);
    this.element.className = 'nav_btns';
    this.toGarageBtn = new Control(this.element, 'button', 'garage_btn', 'to garage');
    this.toWinnersBtn = new Control(this.element, 'button', 'winner_btn', 'to winners');
    this.toWinnersBtn.element.style.backgroundColor = 'gray';
    this.toWinnersBtn.onClick = () => {
      this.toGarageBtn.element.style.backgroundColor = 'gray';
      this.toWinnersBtn.element.style.backgroundColor = 'aquamarine';
      view.chooseWinnerPage();
      view.updateWinnersPage();
    };
    this.toGarageBtn.onClick = () => {
      this.toWinnersBtn.element.style.backgroundColor = 'gray';
      this.toGarageBtn.element.style.backgroundColor = 'aquamarine';
      view.chooseGaragePage();
      view.setWinners();
    };
  }
}
