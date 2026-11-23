<script setup lang="ts">
// /projects sayfası. Veriler composables/useProjects.ts'ten geliyor.
usePageSeo({
  title: 'Projeler',
  description:
    "Zeynep Kutlu'nun projeleri: Vue.js, Node.js ve Supabase ile geliştirilip yayına alınan CRM uygulaması ve Node.js, Express.js, MySQL ile yapılan staj projeleri.",
})
const projects = useProjects()
</script>

<template>
  <v-container>
    <PageHeader
      kicker="Projeler"
      title="Yaptığım şeyler."
      lead="Staj dönemimde ve kendi başıma geliştirdiğim projeler."
    />

    <!-- Mobilde 1, tablette 2, masaüstünde 3 kart yan yana -->
    <v-row>
      <v-col v-for="(p, i) in projects" :key="p.title" cols="12" sm="6" md="4">
        <!-- v-bind="p": objenin tüm alanlarını prop olarak geçirir; index sıra numarası için -->
        <ProjectCard v-bind="p" :index="i" />
      </v-col>
    </v-row>
  </v-container>
</template>
