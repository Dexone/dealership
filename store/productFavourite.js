import { defineStore } from 'pinia';
import { useProduct } from './productStore';
import { useFavouriteUser } from './userFavourite';

export const useFavourite = defineStore('favouriteStore', {
  state: () => ({ favourite: {}, simile: {} }),
  getters: {
    getFavourite: (state) => state.favourite,
    getSimile: (state) => state.simile
  },
  actions: {
    async addToFavourite(value) {
      if (useProduct().user == 1) {
        //если гость (1)
        // this.cart.push(value);
        this.favourite[value.id] = 1;
      }
      if (useProduct().user > 1) {
        //если автоизован (>1)
        useFavouriteUser().addToFavourite(value);
      }
    },

    async deleteFromFavourite(value) {
      if (useProduct().user == 1) {
        //если гость (1)
        delete this.favourite[value];
      }
      if (useProduct().user > 1) {
        //если автоизован (>1)
        useFavouriteUser().deleteFromFavourite(value);
      }
    },

    findFavourite() {
      //массив объектов {id: кол-во в корзине}
      if (useProduct().user == 1) {
        // если пользователь гость
        this.simile = {};
        let keys = Object.keys(this.favourite); //ключи из объектов в один массив
        let keysNum = keys.map((item) => Number(item)); //строки в массиве в числа
        let values = Object.values(this.favourite); //значения из объектов в один массив
        for (let i = 1; i < 23; i++) {
          if (keysNum.indexOf(i) >= 0) {
            this.simile[i] = values[keysNum.indexOf(i)];
          } else {
            this.simile[i] = 0;
          }
        }
      }
      if (useProduct().user > 1) {
        //если пользователь авторизован
        useFavouriteUser().findFavourite();
      }
    }
  },
  persist: true
});
