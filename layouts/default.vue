<!--
  Varsayılan layout: Tüm sayfaları saran ortak iskelet.
  Nuxt, layouts/default.vue dosyasını otomatik olarak her sayfada kullanır.
  <slot /> o anki sayfanın içeriğinin yerleşeceği yerdir.
-->
<template>
  <!-- v-app: Vuetify'ın kök bileşeni. Tema ve layout hesapları buradan yönetilir. -->
  <v-app>
    <AppHeader />

    <!-- v-main: header ve footer'ın kapladığı alanı hesaba katarak içeriği doğru yere koyar -->
    <v-main>
      <slot />
    </v-main>

    <AppFooter />
  </v-app>
</template>
