import model, { DataType } from '../model/model';
import view from '../view/view';

export default {
  async init(page: number) {
    view.clearCars();
    const data = await model.getCarsOnPage<DataType>(page);

    for (let i = 0; i < data.length; i++) {
      view.putCar(data[i].name, data[i].color, data[i].id);
    }
  },
};
