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
        {{ id }}
      </li>
      <li>
        {{ model }}
      </li>
      <li>
        {{ token }}
      </li>
      <div class="card-body">
        <router-link
          to="/coinFlip"
          class="btn btn-primary"
        >
          BLA
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppBet',
  props: {
    id: {
      type: String,
      required: true,
      default: '',
    },
    model: {
      type: String,
      required: true,
      default: '',
    },
    token: {
      type: String,
      required: true,
      default: '',
    },
  },
  methods: {
  }
};
</script>
