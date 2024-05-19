<script setup>
import { ref } from 'vue'
import { useFavourite } from '../../store/productFavourite';
defineProps({
  msg: String,
})



const favouriteStore = useFavourite();
favouriteStore.addToFavourite()

</script>

<template>
  123
</template>
