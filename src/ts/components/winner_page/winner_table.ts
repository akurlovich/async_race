import model, { DataType, IWinners } from '../../model/model';
import { Control } from '../controls';
import { WinnerRow } from './winner_row';

export class WinnerTable extends Control {
  winArr: WinnerRow[] = [];
  dataLength!: number;
  winnerRow: WinnerRow;

  constructor(
    parentNode?: HTMLElement,
  ) {
    super(parentNode);
    this.element.className = 'winner_table';
    this.winnerRow = new WinnerRow(this.element);
    this.setItems();
    this.setWinners(1, 'time', 'ASC');
  }

  async getData() {
    const item = await model.getWinners<IWinners[]>({
      page: model.pageWinNumber, limit: 10, sort: model.sortMain, order: model.sortOrder,
    });
    return item;
  }
  async setItems() {
    const data = await this.getData();
    this.dataLength = data.length;

    for (let i = 1; i <= this.dataLength; i++) {
      this.winArr.push(new WinnerRow(this.element));
    }
    this.winArr.forEach((item) => {
      item.element.classList.add('win_row_item');
    });
  }

  async setWinners(page: number, sort: string, order: string) {
    const wins = await model.getWinners<IWinners[]>({
      page: page, limit: 10, sort: sort, order: order,
    });
    const cars = await model.getCars<DataType>();
    for (let i = 0; i < wins.length; i++) {
      this.winArr[i].setData(
        {
          num: (model.pageWinNumber > 1) ? (i + 1 + (10 * (model.pageWinNumber - 1))) : i + 1,
          car: cars[wins[i].id - 1] ? cars[wins[i].id - 1].color : 'red',
          name: cars[wins[i].id - 1] ? cars[wins[i].id - 1].name : 'VAZ',
          wins: wins[i].wins,
          time: wins[i].time,
        },
      );
    }
  }
}
