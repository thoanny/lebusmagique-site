<script setup>
defineProps(['post']);
</script>

<template>
    <div v-if="post.featuredImage" class="aspect-square w-52 h-52 shrink-0">
        <RouterLink :to="post.uri">
            <img :src="post.featuredImage.node.sourceUrl" :srcset="post.featuredImage.node.sourceSet" alt=""
                class="object-cover w-full h-full rounded">
        </RouterLink>
    </div>
    <div class="flex flex-col w-full gap-4 items-start">
        <RouterLink :to="post.uri">
            <h4 class="text-2xl font-bold">{{ post.title }}</h4>
        </RouterLink>
        <div class="flex flex-wrap gap-4 opacity-75 text-sm">
            <div class="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                {{ new Date(Date.parse(post.date)).toLocaleDateString('FR-fr', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                }) }}
            </div>
            <div v-if="post.categories" class="flex gap-2 flex-wrap items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                </svg>
                <RouterLink v-for="category in post.categories.nodes"
                    :to="{ name: 'categories-slug', params: { slug: category.slug } }" :key="category.id">{{
                        category.name }}
                </RouterLink>
            </div>
            <div class="flex gap-2 flex-wrap items-center" v-if="post.commentCount">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <span v-if="post.commentCount == 0">Aucun commentaire</span>
                <span v-else>{{ post.commentCount }} {{ (post.commentCount == 1) ? 'commentaire' : 'commentaires' }}</span>
            </div>
        </div>
        <div v-html="post.excerpt"></div>
        <RouterLink :to="post.uri" class="btn btn-sm btn-primary">Lire la suite</RouterLink>
    </div>
</template>