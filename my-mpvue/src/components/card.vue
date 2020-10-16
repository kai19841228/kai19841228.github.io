<template>
  <div>
    <p class="card" @click="handle">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    handle () {
      console.log(this.text)
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
