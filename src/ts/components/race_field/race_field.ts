import controller from '../../controller/controller';
import model from '../../model/model';
import { Control } from '../controls';
import { RaceBlock } from './race_block';

export class RaceField extends Control {
  h2name: Control;
  h3name: Control;
  raceBlock: RaceBlock;
  choosePage: Control;
  prevPage: Control;
  nextPage: Control;
  constructor(
    parentNode?: HTMLElement,
  ) {
    super(parentNode);
    this.element.className = 'race_field';
    this.h2name = new Control(this.element, 'h2', '', 'Garage (4)');
    this.h3name = new Control(this.element, 'h3', '', 'Page #1');
    this.raceBlock = new RaceBlock(this.element);
    this.choosePage = new Control(this.element, 'div', 'choose_page');
    this.prevPage = new Control(this.choosePage.element, 'button', 'prev_and_next-btns', 'prev');
    this.prevPage.element.classList.add('d_r_btn-disabled');
    this.nextPage = new Control(this.choosePage.element, 'button', 'prev_and_next-btns', 'next');
    this.nextPage.onClick = async () => {
      const allCars = await this.setCarsCount();
      let allPage = 0;
      if (allCars !== null) {
        allPage = Math.floor(+allCars / 7);
        if (+allCars === (allPage * 7)) {
          this.nextPage.element.classList.add('d_r_btn-disabled');
        }
      }

      model.pageNumber++;
      this.h3name.element.textContent = `Page #${model.pageNumber}`;
      controller.init(model.pageNumber);
      this.prevPage.element.classList.remove('d_r_btn-disabled');
      if (allPage < (model.pageNumber)) {
        this.nextPage.element.classList.add('d_r_btn-disabled');
      }
    };

    this.prevPage.onClick = () => {
      model.pageNumber--;
      this.h3name.element.textContent = `Page #${model.pageNumber}`;
      controller.init(model.pageNumber);
      this.nextPage.element.classList.remove('d_r_btn-disabled');
      if (model.pageNumber === 1) {
        this.prevPage.element.classList.add('d_r_btn-disabled');
      }
    };

    this.setCarsCount();
  }

  async setCarsCount() {
    const data = await model.getTotalCars();
    this.h2name.element.textContent = `Garage (${data})`;
    if (data !== null && +data <= 7) {
      this.nextPage.element.classList.add('d_r_btn-disabled');
    } else {
      this.nextPage.element.classList.remove('d_r_btn-disabled');
    }
    return data;
  }
}
