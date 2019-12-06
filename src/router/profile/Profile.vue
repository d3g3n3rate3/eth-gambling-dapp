<template>
  <div>
    <div class="container">
      <h3 class="text-center">
        Account: {{ $store.state.user.account }}
      </h3>
      <table class="table table-sm table-primary">
        <thead>
          <tr class="bg-primary">
            <th scope="col">
              Symbol
            </th>
            <th scope="col">
              Name
            </th>
            <th scope="col">
              Balance
            </th>
            <th scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="balance in $store.state.user.balances"
            :key="balance.address"
          >
            <th scope="row">
              {{ balance.iconUrl }} {{ balance.symbol }}
            </th>
            <td>
              {{ balance.name }}
            </td>
            <td>
              {{ balance.formatAmount }}
            </td>
            <td>
              <a
                href="#"
                class="px-2 stretched-link"
              >Play</a>
              <a
                href="#"
                class="px-2 stretched-link"
              >Deposit</a>
              <a
                href="#"
                class="px-2 stretched-link"
              >Withdraw</a>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        class="table table-sm table-primary"
      >
        <thead>
          <tr class="bg-primary">
            <th scope="col">
              Id
            </th>
            <th scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="bet in $store.state.user.bets"
            :key="bet"
          >
            <th scope="row">
              {{ bet }}
            </th>
            <td> ACTION </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
  },
  async mounted() {
    await this.getUser();
  },
  methods: {
    ...mapActions(['getUser'])
  }
};
</script>
