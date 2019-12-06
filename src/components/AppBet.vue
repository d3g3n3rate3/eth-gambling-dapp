<template>
  <div class="col-sm-3 py-3">
    <div
      class="card"
    >
      <img
        class="card-img-top"
        src="@/assets/logo.png"
        alt="Card image cap"
      >
      <li>
        {{ bet.id }}
      </li>
      <li>
        {{ bet.model }}
      </li>
      <li>
        {{ bet.token }}
      </li>
      <div class="card-body">
        <router-link
          to="/coin_flip/"
          +
          {{
          $route.params.id
          }}
          class="btn btn-primary"
        >
          Select
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppBet',
  props: {
    bet: {
      type: Object,
      required: true,
    },
  },
  methods: {
  }
};
</script>
