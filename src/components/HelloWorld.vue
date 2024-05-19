<script setup>
import { ref } from 'vue'
import { useFavourite } from '../../store/productFavourite';
defineProps({
  msg: String,
})



const favouriteStore = useFavourite();
favouriteStore.addToFavourite()
console.log("тест3")

</script>

<template>
      <h5 class="mb-4 text-xm font-medium text-gray-500  pt-10">
       123123
      </h5>
</template>
