import { defineStore } from 'pinia';
import { useProduct } from './productStore';
import { useFavourite } from './productFavourite';
import axios from 'axios';

export const useFavouriteUser = defineStore('favouriteUser', {
  state: () => ({}),
  getters: {},
  actions: {
    async addToFavourite(value) {
      let editData
      await axios.get(`http://5.35.98.166:3000/favourite/${useProduct().user}`).then((res) => {
        editData = res.data.favourites
      })  //получить корзину пользователя

      editData[value.id] = 1;

      await axios.patch(`http://5.35.98.166:3000/favourite/${useProduct().user}`, { favourites: editData }) //пуш id товара в корзину



    },

    async deleteFromFavourite(value) {
      let editData
      await axios.get(`http://5.35.98.166:3000/favourite/${useProduct().user}`).then((res) => {
        editData = res.data.favourites
      })  //получить корзину пользователя

      delete editData[value];


      await axios.patch(`http://5.35.98.166:3000/favourite/${useProduct().user}`, { favourites: editData }) //пуш id товара в корзину
    },

    findFavourite() {
      //массив объектов {id: кол-во в корзине}
      setTimeout(() => {
        axios.get(`http://5.35.98.166:3000/favourite/${useProduct().user}`).then((res) => {
          useFavourite().simile = {};
          let keys = Object.keys(res.data.favourites); //ключи из объектов в один массив
          let keysNum = keys.map((item) => Number(item)); //строки в массиве в числа
          let values = Object.values(res.data.favourites); //значения из объектов в один массив
          for (let i = 1; i < 23; i++) {
            if (keysNum.indexOf(i) >= 0) {
              useFavourite().simile[i] = values[keysNum.indexOf(i)];
            } else {
              useFavourite().simile[i] = 0;
            }
          }
        });
      }, 500);
    }
  },
  persist: true
});
