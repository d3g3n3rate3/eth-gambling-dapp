<template>
  <TheHeader />
</template>

<script>
import TheHeader from '@/components/TheHeader';

export default {
  name: 'App',
  components: {
    TheHeader: TheHeader,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');

html, body {
  font-family: 'Roboto Mono', sans-serif;
}

#app {
  font-family: 'Roboto Mono', sans-serif;
}
</style>
