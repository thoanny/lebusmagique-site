<script setup>
import Menu from '@/components/Menu.vue';
defineProps(['items']);

const isActive = ref(false);

function handleClick(id) {
    if (isActive.value == id) {
        isActive.value = null;
    } else {
        isActive.value = id;
    }
}

</script>

<template>
    <ul v-if="items">
        <li v-for="item in items" :key="item.id"
            :class="{ active: isActive == item.id, hasChilds: item.childs.length > 0 }">
            <RouterLink :to="item.path" v-if="item.childs.length == 0" :target="item.target"
                :class="item.cssClasses.join(' ')">
                {{ item.label }}
            </RouterLink>
            <span v-else @click="handleClick(item.id)">
                <span class="truncate">{{ item.label }}</span>
                <span v-if="item.id == isActive">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
                <span v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path
                            d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                </span>
            </span>
            <Menu :items="item.childs" />
        </li>
    </ul>
</template>

<style scoped>
/* ul {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    @apply font-bold;
}

ul ul {
    @apply font-semibold;
}

ul ul ul {
    @apply font-normal;
}

ul>li ul {
    display: none;
}

li.active>ul {
    display: block;
}

li.active {}

li>a,
li>span {
    @apply block px-3 py-2 cursor-pointer border-t-2 border-slate-700;
} */
</style>