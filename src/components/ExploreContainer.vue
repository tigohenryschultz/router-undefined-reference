<template>
  <div id="container">
    <strong>{{ name }}</strong>
    <p>Explore
      <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a>
    </p>
    <ion-button @click="goBack(-3)">GO BACK -3</ion-button>
    <ion-button @click="goBack(-10)">GO BACK -10</ion-button>
    <ion-button @click="this.$router.goBackTo({name:'page1'})">GO BACK PAGE 1</ion-button>
    <ion-button @click="this.$router.goBackTo({name:'page3'})">GO BACK PAGE 3</ion-button>
  </div>
</template>

<script>
  // import {useRouter} from 'vue-router';

  export default {
    name: 'ExploreContainer',
    props: {
      name: String
    },

    setup() {
      // const router = useRouter();
      //
      // return {
      //   router
      // };
    },

    methods: {
      goBack(delta) {
        this.$router.go(delta);
      }
    }
  }
</script>

<style scoped>
  #container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  #container strong {
    font-size: 20px;
    line-height: 26px;
  }

  #container p {
    font-size: 16px;
    line-height: 22px;
    color: #8C8C8C;
    margin: 0;
  }

  #container a {
    text-decoration: none;
  }
</style>