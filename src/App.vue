<template>



  <div>
    <header>
      <nav class="bg-white border-gray-200 pt-4 px-4 max-w-7xl mx-auto">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl pb-5">

          <RouterLink :to="{ name: 'home' }"> <a @click="page = 1"
              class="flex items-center space-x-3 rtl:space-x-reverse">
              <!-- <img src="../public/car.png" class="h-8" /> -->
              <span v-if="page === 1"
                class="text-blue-700 self-center text-2xl font-semibold whitespace-nowrap">MSHOP</span>
              <span v-else class="self-center text-2xl text-gray-700 font-semibold whitespace-nowrap">MSHOP</span>
            </a></RouterLink>




          <div class="flex items-center space-x-4 rtl:space-x-reverse font-medium pt-2">
            <RouterLink :to="{ name: 'favourite' }" @click="page = 2"> <svg class="w-[29px] h-[29px] text-gray-700"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
              </svg></RouterLink>
            <!-- 
            <NuxtLink to="/cart" @click="page = 3">
              <button class="relative inline-flex items-center pt-1.5 px-0.5 text-sm font-medium text-center">
                <svg class="w-[33px] h-[33px] text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
                </svg>

                <span v-if="productStore.quantity[0] == 'loader'"
                  class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-800 border-2 border-white rounded-full -top-2 -end-2">
                  <svg aria-hidden="true" class="inline w-3 h-3 text-gray-200 animate-spin fill-blue-600"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor" />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill" />
                  </svg>
                </span>

                <span v-else
                  class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-800 border-2 border-white rounded-full -top-2 -end-2">
                  {{ productStore.quantity[0] }}
                </span>
              </button>
            </NuxtLink>
 -->
            <RouterLink :to="{ name: 'login' }">
              <button type="button"
                class="py-1.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                <a v-if="productStore.user == 1">Войти</a>
                <a v-else>{{ productStore.name }}</a>
              </button>
            </RouterLink>


          </div>
        </div>
      </nav>
    </header>

    <div class="routerViews">
      <router-view>
      </router-view>
    </div>

    <footer>
      <hr class="my-6 border-gray-200 mx-auto" />
      <span class="block text-sm text-gray-500 text-center">© 2024 <a href="https://github.com/Dexone"
          class="hover:underline">Dexone</a>. All Rights
        Reserved.</span>
    </footer>
  </div>

















  <!-- <Home msg="Vite + Vue" /> -->


</template>




<script setup>
import { useProduct } from '../store/productStore';
import { onMounted, ref } from 'vue';
import { initFlowbite } from 'flowbite';
const productStore = useProduct();

const page = ref(0);

onMounted(() => {
  initFlowbite();
});
</script>