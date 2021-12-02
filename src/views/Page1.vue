<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Page 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Page 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-button @click="this.$router.push({name:'page2'})">Go To Page 2</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';

  export default {
    name: 'Page1',
    components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage}
  }
</script>