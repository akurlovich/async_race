import { Control } from './controls';
import { ControlsCar } from './controls_car';
import { RaceField } from './race_field/race_field';

export class Container extends Control {
  controlsCar: ControlsCar;
  raceFild: RaceField;
  constructor(
    parentNode?: HTMLElement,
  ) {
    super(parentNode);
    this.element.className = 'container';
    this.controlsCar = new ControlsCar(this.element);
    this.raceFild = new RaceField(this.element);
  }
}
