import controller from '../../controller/controller';
import model, { DataType, IEngine } from '../../model/model';
import view from '../../view/view';
import { Control } from '../controls';
import { CarSvg } from './car_svg';
import { FinishSvg } from './finish_svg';

export const winnersSpeed: number[] = [];
export const winnersID: number[] = [];

export class CarBlock extends Control {
  carBlockMain: Control;
  selectCarBtn: Control;
  removeCarBtn: Control;
  carBlockRace: Control;
  startCarBtn: Control;
  returnCarBtn: Control;
  carSvg: CarSvg;
  carName: Control;
  finishSvg: FinishSvg;
  raceLine: Control;
  carNameView: string;
  svgColor: string;
  speed: number;
  carID: number;
  carSpeed: number [] = [];
  constructor(
    parentNode: HTMLElement,
    carNameView = '',
    svgColor: string,
    carID: number,
  ) {
    super(parentNode);
    this.carNameView = carNameView;
    this.svgColor = svgColor;
    this.carID = carID;
    this.element.className = 'car_block';
    this.carBlockMain = new Control(this.element, 'div', 'car_block-main');
    this.selectCarBtn = new Control(this.carBlockMain.element, 'button', 'select_and_remove-btn', 'select');
    this.removeCarBtn = new Control(this.carBlockMain.element, 'button', 'select_and_remove-btn', 'remove');
    this.carName = new Control(this.carBlockMain.element, 'div', 'car_name', this.carNameView);
    this.carBlockRace = new Control(this.element, 'div', 'car_block-race');
    this.startCarBtn = new Control(this.carBlockRace.element, 'button', 'd_and_r-btn', 'D');
    this.returnCarBtn = new Control(this.carBlockRace.element, 'button', 'd_and_r-btn', 'R');
    this.returnCarBtn.element.classList.add('d_r_btn-disabled');
    this.carSvg = new CarSvg(this.carBlockRace.element, this.svgColor);
    this.finishSvg = new FinishSvg(this.carBlockRace.element);
    this.raceLine = new Control(this.element, 'div', 'race_line');
    this.speed = 50;
    this.startCarBtn.element.onclick = async () => {
      this.startCarBtn.element.classList.add('d_r_btn-disabled');
      await this.startCar(this.carID);
      this.returnCarBtn.element.classList.remove('d_r_btn-disabled');
    };
    this.selectCarBtn.onClick = async () => {
      const car = await model.getCar<DataType>(this.carID);
      view.setUpdateCar(car.name, car.color, car.id);
    };
    this.returnCarBtn.element.onclick = () => {
      this.resetCar(this.carID);
      this.startCarBtn.element.classList.remove('d_r_btn-disabled');
      this.returnCarBtn.element.classList.add('d_r_btn-disabled');
    };
    this.removeCarBtn.onClick = async () => {
      await model.deleteCar(this.carID);
      try {
        await model.deleteWinner(this.carID);
      } catch (err) {
        throw new Error(err);
      }
      controller.init(model.pageNumber);
    };
  }

  startCar = async (carID: number) => {
    const car = await model.startCar<IEngine>(carID);
    this.speed = (~~(car.velocity / 30));
    let myreq: number;
    let num = 0;
    const animate = () => {
      this.carSvg.element.style.left = 80 + num + 'px';
      num += this.speed;
      if (num < (window.innerWidth - 150)) {
        myreq = requestAnimationFrame(animate);
      }
    };
    myreq = requestAnimationFrame(animate);
    const carEng = await model.switchEngineCar(carID);
    if (carEng === 500) {
      window.cancelAnimationFrame(myreq); // console.log('2', myreg)
    } else {
      model.winSpeedArr.push(car.velocity);
      model.winCarArr.push(carID);
    }
  };
  async resetCar(carID: number) {
    await model.stopCar<IEngine>(carID);
    this.carSvg.element.style.left = '80px';
  }
  async getUpdateCarName() {
    const car = await model.getCar<DataType>(this.carID);
    return car.name;
  }
  setNotActiveDriveBtn() {
    this.startCarBtn.element.classList.add('d_r_btn-disabled');
  }
  setActiveDriveBtn() {
    this.startCarBtn.element.classList.remove('d_r_btn-disabled');
  }
}
