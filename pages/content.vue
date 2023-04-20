<script setup>
import q from '@/queries/content.gql';
const route = useRoute();

const params = {
    uri: route.path
};

const { data } = await useAsyncQuery(q, params);

const type = ref(null);
const content = ref(null);

if (data) {
    if (data.value.postBy) {
        type.value = 'post';
        content.value = data.value.postBy;
    } else if (data.value.pageBy) {
        type.value = 'page';
        content.value = data.value.pageBy;
    } else {
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }
}

</script>

<template>
    <div v-if="content">
        <div v-if="content.featuredImage">
            <img :src="content.featuredImage.node.sourceUrl" :srcset="content.featuredImage.node.srcSet" alt=""
                class="mb-6 rounded max-h-80 w-full object-cover">
        </div>
        <h1 class="text-6xl font-bold mb-6">{{ content.title }}</h1>
        <div class="flex flex-wrap gap-4 opacity-75 text-sm mb-6">
            <div class="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                {{ new Date(Date.parse(content.date)).toLocaleDateString('FR-fr', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                }) }}
            </div>
            <div v-if="content.categories" class="flex gap-2 flex-wrap items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                </svg>
                <RouterLink v-for="category in content.categories.nodes"
                    :to="{ name: 'categories-slug', params: { slug: category.slug } }" :key="category.id">{{
                        category.name }}
                </RouterLink>
            </div>
        </div>
        <div v-html="content.content" id="post"></div>
        <div v-if="content.tags" class="flex flex-wrap gap-2">
            <RouterLink v-for="tag in content.tags.nodes" :key="tag.id"
                :to="{ name: 'mots-cles-slug', params: { slug: tag.slug } }" class="btn btn-sm btn-primary rounded-full">{{
                    tag.name }}</RouterLink>
        </div>
    </div>
</template>