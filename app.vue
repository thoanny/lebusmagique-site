<script setup>
useHead({
  meta: [
    { name: 'description', content: 'Le fansite, site communautaire du bus magique contenant actualité et guides sur Guildwars 2 : Heart of Thorns, Path of Fire et End of Dragons.' },
    { name: 'keywords', content: 'fansite, site, communautaire, LBM, lebusmagique, GW2, Guildwars 2, heart, of, thorns, Pages, guides, hot, pof, path, fire, eod, end, dragons' }
  ],
  titleTemplate: (t) => {
    return t ? `${t} | Le Bus Magique` : 'Le Bus Magique';
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
