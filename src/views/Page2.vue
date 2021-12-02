<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Page 2</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Page 2</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-button  @click="this.$router.goBackTo({name:'page1'})">Go To Page 1</ion-button>
      <ion-button  @click="this.$router.push({name:'page3'})">Go To Page 3</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';

  export default {
    name: 'Page2',
    components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage}
  }
</script>