<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Page 3</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Page 3</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-button @click="this.$router.goBackTo({name:'page2'})">Go To page 2</ion-button>
      <ion-button @click="this.$router.push({name:'tab1'})">Go To tab1</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';

  export default {
    name: 'Page3',
    components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage}
  }
</script>