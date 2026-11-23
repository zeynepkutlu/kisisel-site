<script setup lang="ts">
// /contact sayfası: doğrulamalı ve Formspree'ye gönderen iletişim formu.
usePageSeo({
  title: 'İletişim',
  description:
    'Zeynep Kutlu ile iletişime geç: iş birliği, staj teklifi ya da projeler hakkında soruların için kısa bir mesaj bırakabilirsin.',
})

// nuxt.config.ts'teki runtimeConfig'ten Formspree ID'sini oku
const config = useRuntimeConfig()
const formspreeId = config.public.formspreeId

// ref(): değişince arayüzün otomatik güncellendiği (reaktif) değişken
const form = ref() // v-form bileşenine erişmek için (template'te ref="form")
const name = ref('')
const email = ref('')
const message = ref('')

const loading = ref(false) // gönderilirken butonda dönen ikon
const sent = ref(false) // başarı bildirimi
const error = ref(false) // hata bildirimi

// Doğrulama kuralları: true dönerse geçerli, metin dönerse o metin hata olarak gösterilir
const rules = {
  required: (v: string) => !!v || 'Bu alan zorunlu',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Geçerli bir e-posta adresi gir',
}

async function submit() {
  const { valid } = await form.value.validate()
  if (!valid || !formspreeId) return

  loading.value = true
  try {
    // $fetch: Nuxt'ın HTTP isteği fonksiyonu. Formspree'ye JSON olarak gönderiyoruz.
    await $fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: { name: name.value, email: email.value, message: message.value },
    })
    sent.value = true
    form.value.reset()
  } catch {
    error.value = true
  } finally {
    // finally: başarılı da olsa hata da olsa çalışır
    loading.value = false
  }
}
</script>

<template>
  <v-container style="max-width: 760px">
    <PageHeader
      kicker="İletişim"
      title="Merhaba de."
      lead="Bir sorun, fikrin ya da iş birliği teklifin mi var? Aşağıdaki formdan yazabilirsin."
    />

    <!-- Formspree ID ayarlanmadıysa geliştiriciye uyarı göster -->
    <v-alert v-if="!formspreeId" type="warning" variant="tonal" class="mb-6">
      Form henüz bağlı değil. <code>.env</code> dosyasına <code>NUXT_PUBLIC_FORMSPREE_ID</code> ekle.
    </v-alert>

    <v-card class="pa-6 pa-md-8">
      <!-- @submit.prevent: sayfanın yenilenmesini engeller, submit() fonksiyonunu çalıştırır -->
      <v-form ref="form" :disabled="loading" @submit.prevent="submit">
        <v-text-field v-model="name" label="Adın" :rules="[rules.required]" prepend-inner-icon="mdi-account-outline" class="mb-2" />
        <v-text-field v-model="email" label="E-posta" type="email" :rules="[rules.required, rules.email]" prepend-inner-icon="mdi-email-outline" class="mb-2" />
        <v-textarea v-model="message" label="Mesajın" :rules="[rules.required]" rows="5" prepend-inner-icon="mdi-message-outline" class="mb-2" />
        <v-btn
          type="submit"
          color="primary"
          size="large"
          block
          append-icon="mdi-send"
          :loading="loading"
          :disabled="!formspreeId"
        >
          Gönder
        </v-btn>
      </v-form>
    </v-card>

    <v-snackbar v-model="sent" color="success" timeout="4000">Mesajın gönderildi, teşekkürler!</v-snackbar>
    <v-snackbar v-model="error" color="error" timeout="5000">Mesaj gönderilemedi, lütfen tekrar dene.</v-snackbar>
  </v-container>
</template>
