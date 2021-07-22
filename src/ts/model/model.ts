const baseUrl = 'http://127.0.0.1:3000';

const path = {
  cars: '/garage',
  engine: '/engine',
  winners: '/winners',
};
export interface DataType {
  name: string,
  color: string,
  id: number
}
export interface ICreateCar {
  name: string,
  color: string,
}
export interface IEngine {
  velocity: number,
  distance: number
}
export interface ISwitchEngine {
  success: boolean
}
export interface IWinners {
  id: number,
  wins: number,
  time: number
}
export interface IWinnerUpdate {
  wins: number,
  time: number
}
export interface ISaveWinner {
  carWinID: number,
  time: number
}
export interface IWinnerStatus {
  id: number,
  wins: number,
  time: number
}

export default {
  winCarArr: <Array<number>>[],
  winSpeedArr: <Array<number>>[],
  pageNumber: 1,
  pageWinNumber: 1,
  sortMain: 'time',
  sortOrder: 'ASC',

  async getTotalCars(): Promise<string | null> {
    const res = await fetch(`${baseUrl}${path.cars}?_page=1&_limit=7`);
    const count = res.headers.get('X-Total-Count');
    return count;
  },

  async getTotalWins(): Promise<string | null> {
    const res = await fetch(`${baseUrl}${path.winners}?_page=1&_limit=10`);
    const count = res.headers.get('X-Total-Count');
    return count;
  },

  async getCarsOnPage<DataType>(page: number, limit = 7): Promise<DataType[]> {
    return await (await fetch(`${baseUrl}${path.cars}?_page=${page}&_limit=${limit}`)).json();
  },

  async getCars<DataType>(): Promise<DataType[]> {
    return await (await fetch(`${baseUrl}${path.cars}`)).json();
  },

  async getCar<DataType>(carID: number): Promise<DataType> {
    return await (await fetch(`${baseUrl}${path.cars}/${carID}`)).json();
  },

  async getAllCars(page: number, limit = 7) {
    const res = await fetch(`${baseUrl}${path.cars}?_page=${page}&_limit=${limit}`);
    return {
      items: await res.json(),
      count: res.headers.get('X-Total-Count'),
    };
  },
  async deleteCar(carID: number) {
    await (await fetch(`${baseUrl}${path.cars}/${carID}`, { method: 'DELETE' })).json();
  },
  async updateCar<ICreateCar>(car: ICreateCar, carID: number): Promise<ICreateCar> {
    const response = await (await fetch(`${baseUrl}${path.cars}/${carID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    })).json();
    return response;
  },
  async stopCar<IEngine>(carID: number): Promise<IEngine> {
    return await (await fetch(`${baseUrl}${path.engine}?id=${carID}&status=stopped`)).json();
  },
  async driveCar<IEngine>(carID: number): Promise<IEngine> {
    const response = await fetch(`${baseUrl}${path.engine}?id=${carID}&status=drive`).catch();
    return response.status !== 200 ? { success: false } : { ...(await response.json()) };
  },
  getOrderSort(sort: string, order: string) {
    if (sort && order) return `&_sort=${sort}&_order=${order}`;
    return '';
  },
  async getWinner<IWinnerStatus>(carID: number): Promise<IWinnerStatus> {
    return await (await fetch(`${baseUrl}${path.winners}/${carID}`)).json();
  },
  async getWinnerStatus(carID: number) {
    return (await fetch(`${baseUrl}${path.winners}/${carID}`)).status;
  },
  async deleteWinner(carID: number) {
    await (await fetch(`${baseUrl}${path.winners}/${carID}`, { method: 'DELETE' })).json();
  },
  async createWinner<IWinnerStatus>(car: IWinnerStatus): Promise<IWinnerStatus> {
    const response = await fetch(`${baseUrl}${path.winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    const newCar = response.json();
    return newCar;
  },
  async updateWinner<IWinnerUpdate>(carID: number, car: IWinnerUpdate): Promise<IWinnerUpdate> {
    const response = await fetch(`${baseUrl}${path.winners}/${carID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    const newCar = response.json();
    return newCar;
  },
  async saveWinner({ id, time }: { id: number, time: number }) {
    const winStatus = await this.getWinnerStatus(id);
    if (winStatus === 404) {
      await this.createWinner({
        id,
        wins: 1,
        time,
      });
    } else {
      const win = await this.getWinner<IWinnerStatus>(id);
      await this.updateWinner(id, {
        wins: win.wins + 1,
        time: time < win.time ? time : win.time,
      });
    }
  },

  async getWinners<IWinners>(
    {
      page, limit = 10, sort, order,
    }:
    {
      page: number, limit: number, sort: string, order: string
    },
  ): Promise<IWinners> {
    const response = await fetch(
      `${baseUrl}${path.winners}?_page=${page}&_limit=${limit}${this.getOrderSort(sort, order)}`,
    );
    const items = response.json();
    return items;
  },

  async createCar<ICreateCar>(car: ICreateCar): Promise<ICreateCar> {
    const response = await fetch(`${baseUrl}${path.cars}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    const newCar = response.json();
    return newCar;
  },

  async startCar<IEngine>(carID: number): Promise<IEngine> {
    return await (await fetch(`${baseUrl}${path.engine}?id=${carID}&status=started`)).json();
  },

  async switchEngineCar(carID: number): Promise<number> {
    return (await fetch(`${baseUrl}${path.engine}?id=${carID}&status=drive`)).status;
  },

  showWinner(): { carWinID: number, time: number } {
    const speed = (Math.max(...this.winSpeedArr));
    const carWinID = (this.winCarArr[this.winSpeedArr.indexOf(speed)]);
    const time = Math.floor((500 / speed) * 100) / 100;
    return { carWinID, time };
  },

  brends: ['Tesla', 'VW', 'Audi', 'Lotus', 'Toyota', 'Ford', 'Honda', 'Mazda', 'Kia', 'Mersedes', 'BMW', 'Ferarri'],
  models: ['CyberTruck', 'A6', 'A5', 'Prius', 'Mondeo', 'Civic', 'RX-7', 'W222', 'M5', 'Spider'],

  carNameGeneration(): string {
    const brend = this.brends[Math.floor(Math.random() * this.brends.length)];
    const model = this.models[Math.floor(Math.random() * this.models.length)];
    return `${brend} ${model}`;
  },

  carColorGeneration(): string {
    const str = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += str[Math.floor(Math.random() * 16)];
    }
    return color;
  },
};
