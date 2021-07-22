import model, { IWinners } from '../../model/model';
import view from '../../view/view';
import { Control } from '../controls';
import { CarSvg } from '../race_field/car_svg';

export interface IWinTable {
  num: number,
  car: string,
  name: string,
  wins: number,
  timw: number
}
export class WinnerRow extends Control {
  winNumber: Control;
  winCar: Control;
  winName: Control;
  winWins: Control;
  winTime: Control;
  constructor(
    parentNode?: HTMLElement,
  ) {
    super(parentNode);
    this.element.className = 'winner_row';
    this.winNumber = new Control(this.element, 'div', 'win_number win_row', 'Number');
    this.winCar = new Control(this.element, 'div', 'win_car win_row', 'Car');
    this.winName = new Control(this.element, 'div', 'win_name win_row', 'Name');
    this.winWins = new Control(this.element, 'div', 'win_wins win_row', 'Wins');
    this.winWins.element.style.cursor = 'pointer';
    this.winWins.onClick = () => {
      view.sortWinners(model.pageWinNumber, 'wins', (model.sortOrder === 'ASC' ? 'DESC' : 'ASC'));
      if (model.sortOrder === 'ASC') {
        model.sortOrder = 'DESC';
      } else {
        model.sortOrder = 'ASC';
      }
    };
    this.winTime = new Control(this.element, 'div', 'win_time win_row', 'Best time (seconds)');
    this.winTime.element.style.cursor = 'pointer';

    this.winTime.element.onclick = () => {
      view.sortWinners(model.pageWinNumber, 'time', (model.sortOrder === 'ASC' ? 'DESC' : 'ASC'));
      if (model.sortOrder === 'ASC') {
        model.sortOrder = 'DESC';
      } else {
        model.sortOrder = 'ASC';
      }
    };
  }

  async setData({
    num, car, name, wins, time,
  }: {
    num: number, car: string, name: string, wins: number, time: number,
  }) {
    this.winNumber.element.textContent = num.toString();
    this.winCar.element.textContent = '';
    const carSvg = new CarSvg(this.winCar.element, car);
    carSvg.element.className = 'win_svg';
    this.winName.element.textContent = name;
    this.winWins.element.textContent = wins.toString();
    this.winTime.element.textContent = time.toString();
  }

  async getData() {
    const item = await model.getWinners<IWinners[]>({
      page: 1, limit: 10, sort: 'time', order: 'ASC',
    });
    return item;
  }
}
