<template>
  <div
    class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3"
  >
    <Toast />
    <img
      :src="require('@/assets/logo.png')"
      alt="Logo"
      height="50"
      class="mr-0 lg:mr-2"
    /><span
      class="text-900 font-medium text-2xl line-height-3 mr-8"
      style="text-wrap: nowrap"
      >Fit culture</span
    >
    <div
      class="align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2"
      style="top: 120px"
    >
      <ul
        class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer"
      >
        <li>
          <a
            class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple"
            v-ripple
            @click="goHome"
          >
            <span>Home</span>
          </a>
        </li>
        <li>
          <a
            class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple"
            v-ripple
            @click="goArticles"
          >
            <span>Articles</span>
          </a>
        </li>
        <li>
          <a
            class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple"
            v-ripple
          >
            <span>Highlights</span>
          </a>
        </li>
        <li>
          <a
            class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple"
            v-ripple
          >
            <span>Pricing</span>
          </a>
        </li>
      </ul>
      <div
        class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0"
      >
        <Button
          label="Login"
          class="p-button-text p-button-rounded border-none font-light line-height-2 text-blue-500"
          @click="login"
        ></Button>
        <Button
          label="Register"
          class="p-button-rounded border-none ml-5 font-light text-white line-height-2"
          @click="goToRegister"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav-bar",
  methods: {
    login() {
      this.$router.push("/login");
    },
    goHome() {
      this.$router.push("/");
    },
    goToRegister() {
      this.$router.push("/register");
    },
    goArticles() {
      this.$router.push("/articles")
    }
  },
};
</script>
