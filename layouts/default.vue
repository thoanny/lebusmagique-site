<script setup>
import Menu from '@/components/Menu.vue';
import q from '@/queries/menu.gql';

const { data } = await useAsyncQuery(q);
const menu = ref(null);

function setChilds(parent = null) {
    const childs = data.value.menu.menuItems.nodes.filter(item => item.parentId == parent);
    if (childs) {
        childs.forEach((c, k) => {
            childs[k].childs = setChilds(c.id);
        });

        return childs;
    }
    return [];
}

if (data) {
    menu.value = setChilds();
}

</script>

<template>
    <div class="min-h-screen">
        <div class="hidden 2xl:block p-6 fixed h-screen border-r border-slate-900" id="navigation">
            <div class="flex flex-col gap-4">
                <RouterLink to="/">
                    <h1
                        class="uppercase flex aspect-video bg-white bg-opacity-10 text-xl font-semibold items-center justify-center">
                        Le Bus Magique
                    </h1>
                </RouterLink>
                <div class="flex gap-2 justify-center">
                    <RouterLink to="/inscription" class="btn btn-sm">Inscription</RouterLink>
                    <RouterLink to="/connexion" class="btn btn-sm">Connexion</RouterLink>
                </div>
                <div id="menu">
                    <Menu :items="menu" v-if="menu" />
                </div>
            </div>

        </div>
        <div class="w-full flex gap-6 p-6 overflow-auto" id="content">
            <div id="primary" class="w-full">
                <slot />
            </div>
            <div id="secondary" class="hidden lg:block">
                <p>Sidebar</p>
            </div>
        </div>

    </div>
</template>

<style scoped>
#navigation,
#secondary {
    @apply overflow-hidden overflow-y-auto shrink-0;
    width: 300px;
}

#content {
    position: relative;
    left: 300px;
    width: calc(100% - 300px);
}
</style>