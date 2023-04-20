<script setup>
import q from '@/queries/posts.gql';

const { data } = await useAsyncQuery(q);

const loading = ref(false);
const pagination = ref({
    hasNextPage: false,
    endCursor: null,
});

const posts = ref([]);

if (data.value) {
    posts.value = data.value.posts.nodes;
    pagination.value = {
        hasNextPage: data.value.posts.pageInfo.hasNextPage,
        endCursor: data.value.posts.pageInfo.endCursor,
    };
}

async function handleLoadMore() {
    loading.value = true;

    const { data, pending } = await useAsyncQuery(q, { after: pagination.value.endCursor });
    posts.value = posts.value.concat(data.value.posts.nodes);
    pagination.value = {
        hasNextPage: data.value.posts.pageInfo.hasNextPage,
        endCursor: data.value.posts.pageInfo.endCursor,
    };

    if (!pending.value) {
        loading.value = false;
    }
}

</script>

<template>
    <!-- TODO : SEO -->
    <h1 class="text-4xl font-bold mb-6">Derniers articles</h1>
    <div v-if="posts" class="flex flex-col gap-6">
        <div v-for="post in posts" class="flex gap-6 items-center">
            <Post :post="post" />
        </div>
    </div>
    <div class="flex mt-6 justify-center" v-if="pagination.hasNextPage">
        <button class="btn btn-primary" :class="(loading) ? 'loading' : ''" @click="handleLoadMore"
            v-text="(loading) ? 'Chargement en cours' : 'Afficher plus d\'articles'"></button>
    </div>
</template>