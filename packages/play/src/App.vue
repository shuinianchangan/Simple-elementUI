<script setup lang="ts">
import {
  ErDropdown,
  type DropdownItemProps,
} from "../../components/Dropdown/index";
const items: DropdownItemProps[] = [
  { label: "Item 1" },
  { label: "Item 2", command: "item2" },
];
</script>

<template>
  <er-dropdown trigger="click" splitButton :items="items">
    <slot name="default">Split Button</slot>
  </er-dropdown>
</template>

<style scoped></style>
