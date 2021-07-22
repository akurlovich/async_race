import model from '../../model/model';
import { Control } from '../controls';
import { WinnerPopup } from '../winner_poup';
import { CarBlock } from './car_block';

export class RaceBlock extends Control {
  carsArr: CarBlock[] = [];
  carsID: number[] = [];
  popup!: WinnerPopup;
  constructor(
    parentNode?: HTMLElement,
  ) {
    super(parentNode);
    this.element.className = 'race_block';
  }
  setCars(name: string, color: string, carID: number) {
    this.carsArr.push(new CarBlock(this.element, name, color, carID));
  }

  async startRace() {
    const newArr = [];
    for (let i = 0; i < this.carsArr.length; i++) {
      newArr.push(this.carsArr[i].startCar(this.carsArr[i].carID));
    }

    Promise.all(newArr)
      .then(() => {
        model.showWinner();
        this.popup = new WinnerPopup(document.body);
        const car = model.showWinner();
        model.saveWinner({ id: car.carWinID, time: car.time });
      });
  }

  resetCars() {
    this.carsArr.forEach((item) => {
      item.resetCar(item.carID);
    });
  }

  setNotActiveDriveBtn() {
    this.carsArr.forEach((item) => {
      item.setNotActiveDriveBtn();
    });
  }

  setActiveDriveBtn() {
    this.carsArr.forEach((item) => {
      item.setActiveDriveBtn();
    });
  }
}
