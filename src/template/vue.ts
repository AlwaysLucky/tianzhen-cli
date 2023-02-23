export const templateVueFn = function (plugins: String[]) {
  let str = "";
  plugins.forEach((item) => {
    str += `<li>${item}</li>`;
  });

  const templateVue = `
<template>
  <section class="app">
    <header>
      <img :src="avatar" />
      <h3>{{ msg }}</h3>
    </header>
    <h3>your template includes:</h3>
    <ul>
      ${str}
    </ul>
  </section>
</template>

<script setup>
import avatar from './assets/avatar.jpg'
const msg = 'tianzhen'
</script>

<style>
.app {
  text-align: center
}
img {
  width: 60px;
  vertical-align: middle;
}
ul{
  padding: 0;
}
li{
  list-style-type: none;
}
</style>
`;
  return templateVue;
};
