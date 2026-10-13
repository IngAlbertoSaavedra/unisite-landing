<script setup>
defineProps({ name: { type: String, required: true }, size: { type: [String, Number], default: 22 } })
</script>
<template>
  <svg :width="size" :height="size" class="site-icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use :href="`#i-${name}`" /></svg>
</template>
