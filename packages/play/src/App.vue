<script lang="ts" setup>
import { ErInput } from "../../components/Input";
import { ref } from "vue";
const value = ref("123");
</script>

<template>
  <er-input v-model="value" type="password" showPassword />
  <er-input type="textarea" v-model="value" />
</template>
