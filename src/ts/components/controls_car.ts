import controller from '../controller/controller';
import model, { ICreateCar } from '../model/model';
import view from '../view/view';
import { Control, InputFeild } from './controls';

export class ControlsCar extends Control {
  createCar: Control;
  createCarName : InputFeild;
  createCarColor: InputFeild;
  createCarBtn: Control;
  updateCar: Control;
  updateCarName: InputFeild;
  updateCarColor: InputFeild;
  updateCarBtn: Control;
  controlsAllCars: Control;
  raceAllCars: Control;
  resetAllCars: Control;
  generateAllCars: Control;
  carID: number;
  constructor(
    parentNode?: HTMLElement,
  ) {
    super(parentNode);
    this.element.className = 'controls_cars';
    this.carID = 0;
    this.createCar = new Control(this.element, 'div', 'create_car');
    this.createCarName = new InputFeild(this.createCar.element, 'input_text', 'text', 'New Car Name');
    this.createCarColor = new InputFeild(this.createCar.element, 'input_color', 'color');
    this.createCarBtn = new Control(this.createCar.element, 'button', 'create_and_update', 'create');
    this.updateCar = new Control(this.element, 'div', 'update_car');
    this.updateCarName = new InputFeild(this.updateCar.element, 'input_text', 'text', 'Update Car Name');
    this.updateCarColor = new InputFeild(this.updateCar.element, 'input_color', 'color');
    this.updateCarBtn = new Control(this.updateCar.element, 'button', 'create_and_update', 'update');
    this.controlsAllCars = new Control(this.element, 'div', 'all_cars');
    this.raceAllCars = new Control(this.controlsAllCars.element, 'button', 'btn_all_cars', 'race');
    this.resetAllCars = new Control(this.controlsAllCars.element, 'button', 'btn_all_cars', 'reset');
    this.resetAllCars.element.classList.add('d_r_btn-disabled');
    this.generateAllCars = new Control(this.controlsAllCars.element, 'button', 'btn_all_cars', 'generate cars');
    this.createCarBtn.onClick = async () => {
      if (this.createCarName.element.value === '') return;
      await model.createCar<ICreateCar>({
        name: this.createCarName.element.value,
        color: this.createCarColor.element.value,
      });
      this.createCarName.element.value = '';
      controller.init(model.pageNumber);
      view.updateGarageCarsCout();
    };
    this.raceAllCars.onClick = async () => {
      this.raceAllCars.element.classList.add('d_r_btn-disabled');
      this.generateAllCars.element.classList.add('d_r_btn-disabled');
      await view.startAllCars();
      model.winCarArr = [];
      model.winSpeedArr = [];
      view.setNotActiveDriveBtn();
      setTimeout(() => {
        this.resetAllCars.element.classList.remove('d_r_btn-disabled');
      }, 10000);
    };
    this.resetAllCars.onClick = () => {
      this.resetAllCars.element.classList.add('d_r_btn-disabled');
      view.resetCars();
      this.raceAllCars.element.classList.remove('d_r_btn-disabled');
      this.generateAllCars.element.classList.remove('d_r_btn-disabled');
      view.setActiveDriveBtn();
    };
    this.generateAllCars.onClick = async () => {
      for (let i = 1; i <= 100; i++) {
        model.createCar<ICreateCar>({ name: model.carNameGeneration(), color: model.carColorGeneration() });
      }
      await view.updateGarageCarsCout();
      controller.init(model.pageNumber);
    };
    this.updateCarBtn.onClick = async () => {
      if (this.updateCarName.element.value === '') return;
      await model.updateCar<ICreateCar>(
        {
          name: this.updateCarName.element.value,
          color: this.updateCarColor.element.value,
        },
        this.carID,
      );
      controller.init(model.pageNumber);
      this.updateCarName.element.value = '';
    };
  }
}
