<script setup>
import q from '@/queries/category.gql';

const route = useRoute();
const { data } = await useAsyncQuery(q, { id: route.params.slug });

const loading = ref(false);
const pagination = ref({
    hasNextPage: false,
    endCursor: null,
});

const posts = ref([]);

if (!data.value?.category) {
    throw createError({ statusCode: 404, statusMessage: 'Catégorie introuvable' })
} else {
    posts.value = data.value.category.posts.nodes;
    pagination.value = {
        hasNextPage: data.value.category.posts.pageInfo.hasNextPage,
        endCursor: data.value.category.posts.pageInfo.endCursor,
    };
}

async function handleLoadMore() {
    loading.value = true;

    const { data, pending } = await useAsyncQuery(q, { id: route.params.slug, after: pagination.value.endCursor });
    posts.value = posts.value.concat(data.value.category.posts.nodes);
    pagination.value = {
        hasNextPage: data.value.category.posts.pageInfo.hasNextPage,
        endCursor: data.value.category.posts.pageInfo.endCursor,
    };

    if (!pending.value) {
        loading.value = false;
    }
}

</script>

<template>
    <!-- TODO : SEO -->
    <h1 class="text-4xl font-bold mb-6">Catégorie&nbsp;: {{ data.category.name }}</h1>
    <div v-if="posts" class="flex flex-col gap-6">
        <div v-for="post in posts" :key="post.id" class="flex gap-6 items-center">
            <Post :post="post" />
        </div>
    </div>
    <div class="flex mt-6 justify-center" v-if="pagination.hasNextPage">
        <button class="btn btn-primary" :class="(loading) ? 'loading' : ''" @click="handleLoadMore"
            v-text="(loading) ? 'Chargement en cours' : 'Afficher plus d\'articles'"></button>
    </div>
</template>