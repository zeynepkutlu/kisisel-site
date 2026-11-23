<!--
  Varsayılan layout: Tüm sayfaları saran ortak iskelet.
  Nuxt, layouts/default.vue dosyasını otomatik olarak her sayfada kullanır.
  <slot /> o anki sayfanın içeriğinin yerleşeceği yerdir.
  <v-app>: Vuetify'ın kök bileşeni; tema ve layout hesapları buradan yönetilir.
-->
<template>
  <v-app>
    <!-- Klavyeyle gezenler menüyü atlayıp içeriğe geçebilsin; sadece Tab ile odaklanınca görünür -->
    <a href="#icerik" class="skip-link">İçeriğe geç</a>

    <AppHeader />

    <!-- v-main: header ve footer'ın kapladığı alanı hesaba katarak içeriği doğru yere koyar -->
    <!-- tabindex="-1": "İçeriğe geç" linki odağı buraya taşıyabilsin -->
    <v-main id="icerik" tabindex="-1">
      <slot />
    </v-main>

    <AppFooter />
  </v-app>
</template>
