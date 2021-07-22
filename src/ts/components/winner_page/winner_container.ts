import model from '../../model/model';
import { Control } from '../controls';
import { WinnerTable } from './winner_table';

export class WinnerContainer extends Control {
  h2name: Control;
  h3name: Control;
  winnerTable: WinnerTable;
  choosePage: Control;
  prevPage: Control;
  nextPage: Control;
  constructor(
    parentNode?: HTMLElement,
  ) {
    super(parentNode);
    this.element.className = 'winner_page';
    this.h2name = new Control(this.element, 'h2', '', 'Winners (4)');
    this.h3name = new Control(this.element, 'h3', '', 'Page #1');
    this.winnerTable = new WinnerTable(this.element);
    this.choosePage = new Control(this.element, 'div', 'choose_page');
    this.prevPage = new Control(this.choosePage.element, 'button', 'prev_and_next-btns', 'prev');
    this.prevPage.element.classList.add('d_r_btn-disabled');
    this.nextPage = new Control(this.choosePage.element, 'button', 'prev_and_next-btns', 'next');
    this.nextPage.onClick = async () => {
      const allCars = await this.getWinCount();
      let allPage = 0;
      if (allCars !== null) {
        allPage = Math.floor(+allCars / 10);
        if (+allCars === (allPage * 10)) {
          this.nextPage.element.classList.add('d_r_btn-disabled');
        }
      }

      model.pageWinNumber++;
      this.h3name.element.textContent = `Page #${model.pageWinNumber}`;
      this.winnerTable.winArr.forEach((item) => {
        item.element.remove();
      });
      this.winnerTable.winArr.splice(0, this.winnerTable.winArr.length);
      this.winnerTable.setItems();
      this.winnerTable.setWinners(model.pageWinNumber, model.sortMain, model.sortOrder);
      this.prevPage.element.classList.remove('d_r_btn-disabled');
      if (allPage < (model.pageWinNumber)) {
        this.nextPage.element.classList.add('d_r_btn-disabled');
      }
    };

    this.prevPage.onClick = () => {
      model.pageWinNumber--;
      this.h3name.element.textContent = `Page #${model.pageWinNumber}`;
      this.winnerTable.winArr.forEach((item) => {
        item.element.remove();
      });
      this.winnerTable.winArr.splice(0, this.winnerTable.winArr.length);
      this.winnerTable.setItems();
      this.winnerTable.setWinners(model.pageWinNumber, model.sortMain, model.sortOrder);
      this.nextPage.element.classList.remove('d_r_btn-disabled');
      if (model.pageWinNumber === 1) {
        this.prevPage.element.classList.add('d_r_btn-disabled');
      }
    };

    this.getWinCount();
  }

  async getWinCount() {
    const data = await model.getTotalWins();
    this.h2name.element.textContent = `Winners (${data})`;
    if (data !== null && +data <= 10) {
      this.nextPage.element.classList.add('d_r_btn-disabled');
    } else {
      this.nextPage.element.classList.remove('d_r_btn-disabled');
    }
    return data;
  }
}
