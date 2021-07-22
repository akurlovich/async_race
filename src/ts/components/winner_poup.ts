import model, { DataType, ISaveWinner } from '../model/model';
import { Control } from './controls';

export class WinnerPopup extends Control {
  winnerContainer: Control;
  winnerBtn: Control;
  popupTitle: Control;
  winnerCar: ISaveWinner = { carWinID: 0, time: 0 };
  constructor(
    parentNode?: HTMLElement,
  ) {
    super(parentNode);
    this.element.className = 'winner';

    this.winnerContainer = new Control(this.element, 'div', 'winner-container');
    this.popupTitle = new Control(this.winnerContainer.element, 'div');
    this.winnerBtn = new Control(this.winnerContainer.element, 'button', 'winner-btn', 'ok');

    this.setData();

    this.winnerBtn.element.onclick = () => {
      this.element.remove();
    };
  }

  async setData() {
    this.winnerCar = model.showWinner();
    const car = await model.getCar<DataType>(this.winnerCar.carWinID);
    this.popupTitle.element.textContent = `Winner car "${car.name}" with time: ${this.winnerCar.time} ms`;
  }
}
