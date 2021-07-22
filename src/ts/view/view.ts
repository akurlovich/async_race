import { Wrapper } from '../components/wrapper';
import model, { DataType, IWinners } from '../model/model';

const wrapper = new Wrapper(document.body);

export default {
  clearCars(): void {
    wrapper.container.raceFild.raceBlock.carsArr = [];
    wrapper.container.raceFild.raceBlock.element.innerHTML = '';
  },

  putCar(name: string, color: string, carID: number): void {
    wrapper.container.raceFild.raceBlock.setCars(name, color, carID);
  },

  async startAllCars(): Promise<void> {
    await wrapper.container.raceFild.raceBlock.startRace();
  },
  resetCars(): void {
    wrapper.container.raceFild.raceBlock.resetCars();
  },

  chooseWinnerPage(): void {
    wrapper.container.element.remove();
    wrapper.element.appendChild(wrapper.winnerContainer.element);
  },
  chooseGaragePage(): void {
    wrapper.winnerContainer.element.remove();
    wrapper.element.appendChild(wrapper.container.element);
  },
  async setWinners(): Promise<void> {
    const wins = await model.getWinners<IWinners[]>({
      page: 1, limit: 10, sort: 'time', order: 'ASC',
    });
    const cars = await model.getCars<DataType>();
    for (let i = 0; i < wins.length; i++) {
      wrapper.winnerContainer.winnerTable.winArr[i].setData(
        {
          num: i + 1,
          car: cars[wins[i].id] ? cars[wins[i].id].color : '#847f',
          name: cars[wins[i].id] ? cars[wins[i].id].name : 'Porshe',
          wins: wins[i].wins,
          time: wins[i].time,
        },
      );
    }
  },
  async updateGarageCarsCout() {
    await wrapper.container.raceFild.setCarsCount();
  },

  setUpdateCar(carName: string, carColor: string, carID: number): void {
    wrapper.container.controlsCar.updateCarName.element.value = carName;
    wrapper.container.controlsCar.updateCarColor.element.value = carColor;
    wrapper.container.controlsCar.carID = carID;
  },

  sortWinners(page: number, sort: string, order: string): void {
    wrapper.winnerContainer.winnerTable.setWinners(page, sort, order);
  },

  updateWinnersPage(): void {
    wrapper.winnerContainer.getWinCount();
    wrapper.winnerContainer.winnerTable.winArr.forEach((item) => {
      item.element.remove();
    });
    wrapper.winnerContainer.winnerTable.winArr.splice(0, wrapper.winnerContainer.winnerTable.winArr.length);
    wrapper.winnerContainer.winnerTable.setItems();
    wrapper.winnerContainer.winnerTable.setWinners(1, 'time', 'ASC');
  },

  setNotActiveDriveBtn(): void {
    wrapper.container.raceFild.raceBlock.setNotActiveDriveBtn();
  },

  setActiveDriveBtn(): void {
    wrapper.container.raceFild.raceBlock.setActiveDriveBtn();
  },
};
