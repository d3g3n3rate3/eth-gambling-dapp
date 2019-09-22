<template>
  <div>
    <div>
      <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-2">
          Eth gambling
        </h1>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <div
              class="card"
              style="width: 18rem;"
            >
              <img
                class="card-img-top"
                src="@/assets/logo.png"
                alt="Card image cap"
              >
              <div class="card-body">
                <router-link
                  to="/coinFlip"
                  class="btn btn-primary"
                >
                  Coin Flip
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div
              class="card"
              style="width: 18rem;"
            >
              <img
                class="card-img-top"
                src="@/assets/logo.png"
                alt="Card image cap"
              >
              <div class="card-body">
                <router-link
                  to="/"
                  class="btn btn-primary"
                >
                  P2P
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div
              class="card"
              style="width: 18rem;"
            >
              <img
                class="card-img-top"
                src="@/assets/logo.png"
                alt="Card image cap"
              >
              <div class="card-body">
                <router-link
                  to="/"
                  class="btn btn-primary"
                >
                  Massive
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
</script>
