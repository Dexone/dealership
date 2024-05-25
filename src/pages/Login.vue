<template>
  <div v-if="productStore.user == 1">
    <div v-if="RegOrLogin == 1" class="max-w-80 mx-auto">
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Логин</label>
        <input placeholder="Dexone" v-model="regLogin"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Пароль</label>
        <input placeholder="•••••••••" v-model="regPass" type="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
      <button @click="registration()"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
        Зарегистрироваться
      </button>
      <button @click="RegOrLogin = 2" class="ml-3 text-gray-700">Уже есть аккаунт?</button>
    </div>

    <div v-if="RegOrLogin == 2" class="max-w-80 mx-auto">
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Логин</label>
        <input placeholder="Dexone" v-model="enterLogin"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
      <div class="mb-5">
        <label class="block mb-2 text-sm font-medium text-gray-900">Пароль</label>
        <input placeholder="•••••••••" v-model="enterPass" type="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
      <button @click="enter()"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
        Войти
      </button>
      <button @click="RegOrLogin = 1" class="ml-3 text-gray-700">У меня нет аккаунта</button>
    </div>
  </div>

  <div class="mx-auto max-w-80" v-if="productStore.user > 1">
    <div class="w-full max-w-80 bg-white border border-gray-200 rounded-lg shadow">
      <div class="flex justify-end px-4 pt-8"></div>
      <div class="flex flex-col items-center pb-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/public/user.png" />
        <h5 class="mb-1 text-xl font-medium text-gray-900">{{ productStore.name }}</h5>

        <div class="flex flex-col items-center" v-if="tfPassword == false">
          <span class="text-sm text-gray-500">ID аккаунта: {{ productStore.user }}</span>
          <span class="text-sm text-gray-500">Товаров в корзине: {{ productStore.quantity[0] }}</span>
          <span class="text-sm text-gray-500">Сумма товаров: {{ productStore.quantity[1] }}</span>
          <div class="flex mt-4 md:mt-6">
            <button @click="(productStore.user = 1), productStore.editQuantity()"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
              Выйти
            </button>
            <button @click="tfPassword = true"
              class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
              Сменить пароль
            </button>
          </div>

          <button @click="deleteAccount()"
            class="py-2 px-14 mt-2 text-sm font-medium focus:outline-none bg-red-50 rounded-lg border border-red-500 text-red-700 hover:bg-red-150 hover:text-red-900 focus:z-10 focus:ring-4 focus:ring-gray-100">
            Удалить аккаунт
          </button>
        </div>

        <div v-if="tfPassword == true">
          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Новый пароль</label>
            <input v-model="newPassword" type="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
              placeholder="•••••••••" />
          </div>
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900">Повторите пароль</label>
            <input v-model="newPasswordRepeat" type="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="•••••••••" />
          </div>
          <button @click="tfPassword = false"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            Назад
          </button>
          <button @click="editPassword()"
            class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
            Сменить пароль
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProduct } from '../../store/productStore';
import { useFavourite } from '../../store/productFavourite';
import axios from 'axios';

const productStore = useProduct();
const favouriteStore = useFavourite();

const RegOrLogin = ref(1); //выбор вход или регистрация

const regLogin = ref(); //введенный логин в регистрации
const regPass = ref(); //введенный пароль в регистрации
async function registration() {
  let getData
  await axios.get(`http://5.35.98.166:5000/users`).then((res) => {
    getData = res.data
  })  //получить корзину пользователя

  let logins = []; //массив логинов
  for (let i = 0; i < getData.length; i++) {
    logins.push(getData[i].login); //пуш логинов
  }
  if (logins.includes(regLogin.value) == false) {
    //если такого логина ещё нет допускается регистрация
    let newId = getData[getData.length - 1].id + 1;


    await axios.post(`http://5.35.98.166:5000/users`, { id: newId, login: regLogin.value, pass: regPass.value }) //пуш id товара в корзину

    const { data } = await $fetch(`http://5.35.98.166:5000/users`, {
      method: 'POST',
      body: { id: newId, login: regLogin.value, pass: regPass.value }
    });
    const gettData = await $fetch(`http://5.35.98.166:5000/users`, { method: 'GET' });
    productStore.user = newId; //задает id пользователя в аккаунте
    const { data2 } = await $fetch(`http://5.35.98.166:5000/cart`, {
      method: 'POST',
      body: { id: newId, carts: {} }
    }); //создает корзину для нового пользователя
    const { data3 } = await $fetch(`http://5.35.98.166:5000/favourite`, {
      method: 'POST',
      body: { id: newId, favourites: {} }
    }); //создает избанное для нового пользователя
    productStore.name = regLogin.value;
    synchronizationCart();
  } else {
    alert('Пользователь с таким логином уже существует');
    regLogin.value = '';
    regPass.value = '';
  }
}
// getData[getData.length - 1]
const enterLogin = ref(); //введенный логин во входе
const enterPass = ref(); //введенный пароль во входе
async function enter() {
  const getData = await $fetch(`http://5.35.98.166:5000/users`, { method: 'GET' });
  let logins = []; //массив логинов
  let passes = []; //массив паолей
  for (let i = 0; i < getData.length; i++) {
    logins.push(getData[i].login); //пуш логинов
    passes.push(getData[i].pass); //пуш паролей
  }

  let indexLogin = logins.indexOf(enterLogin.value); //поиск введенного логина в массиве и возврат индекса, если найден
  if (indexLogin > 0 && enterPass.value == passes[indexLogin]) {
    // if индекс логина больше 0, введенный пароль = паролю с индексом логина в списке паролей
    productStore.user = indexLogin + 1;
    productStore.name = enterLogin.value;
    synchronizationCart();
  } else {
    // if индекс логина и пароля не совпадает >> productStore.user = 1, т.е. гость
    alert('неверный логин или пароль');
    productStore.user = 1;
    enterLogin.value = '';
    enterPass.value = '';
  }
}

const tfPassword = ref(false);
const newPassword = ref();
const newPasswordRepeat = ref();
async function editPassword() {
  const getData = await $fetch(`http://5.35.98.166:5000/users/${productStore.user}`, {
    method: 'GET'
  });
  if (newPassword.value == newPasswordRepeat.value) {
    const { data } = await $fetch(`http://5.35.98.166:5000/users/${productStore.user}`, {
      method: 'PATCH',
      body: { pass: newPassword.value }
    }
    ); //пуш id товара в корзину

    const getData = await fetch(`http://5.35.98.166:5000/cart/${productStore.user}`, {
      method: 'GET'
    });
    console.log(getData)


    alert('Успешно');
  } else {
    alert('Пароли не совпадают');
  }
}

async function deleteAccount() {
  await $fetch(`http://5.35.98.166:5000/users/${productStore.user}`, { method: 'DELETE' });
  await $fetch(`http://5.35.98.166:5000/cart/${productStore.user}`, { method: 'DELETE' });
  await $fetch(`http://5.35.98.166:5000/favourite/${productStore.user}`, {
    method: 'DELETE'
  });
  productStore.user = 1;
  productStore.editQuantity();
}

async function synchronizationCart() {
  let localData = productStore.cart;
  const getData = await $fetch(`http://5.35.98.166:5000/cart/${productStore.user}`, {
    method: 'GET'
  });
  let editData = getData.carts;

  let keysLocal = Object.keys(localData); //ключи из объектов в один массив
  let keysUser = Object.keys(editData); //ключи из объектов в один массив

  for (let i = 0; i < keysLocal.length; i++) {
    // TODO foreach и find
    let search = keysUser.includes(keysLocal[i]);
    if (search == true) {
      console.log('Ничего не делать');
    } else {
      editData[keysLocal[i]] = localData[keysLocal[i]];
    }
  }
  await $fetch(`http://5.35.98.166:3000/cart/${productStore.user}`, {
    method: 'PATCH',
    body: { carts: editData }
  });
  productStore.cart = {};
  synchronizationFavourite();
}

async function synchronizationFavourite() {
  let localData = favouriteStore.favourite;
  const getData = await $fetch(`http://5.35.98.166:5000/favourite/${productStore.user}`, {
    method: 'GET'
  });
  let editData = getData.favourites;

  let keysLocal = Object.keys(localData); //ключи из объектов в один массив
  let keysUser = Object.keys(editData); //ключи из объектов в один массив

  for (let i = 0; i < keysLocal.length; i++) {
    let search = keysUser.includes(keysLocal[i]);
    if (search == true) {
      console.log('Ничего не делать');
    } else {
      editData[keysLocal[i]] = localData[keysLocal[i]];
    }
  }
  await $fetch(`http://5.35.98.166:3000/favourite/${productStore.user}`, {
    method: 'PATCH',
    body: { favourites: editData }
  });
  favouriteStore.favourite = {};
  productStore.editQuantity();
}
</script>
