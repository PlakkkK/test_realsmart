// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
   compatibilityDate: "2024-04-03",
   devtools: { enabled: true },
   css: ["~/assets/css/main.css", "sweetalert2/src/sweetalert2.scss"],
   postcss: {
      plugins: {
         tailwindcss: {},
         autoprefixer: {},
      },
   },
   modules: ["@pinia/nuxt"],
   components: false,
});
