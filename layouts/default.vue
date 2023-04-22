<script setup>
import Menu from '@/components/Menu.vue';
import q from '@/queries/menu.gql';

const { data } = await useAsyncQuery(q);
const menu = ref(null);
const activeSidebar = ref(null);

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
        <div class="fixed top-0 flex justify-between gap-6 w-full z-20 bg-black items-center px-6 py-4 2xl:hidden">
            <button class="btn btn-circle" @click="() => activeSidebar = 'navigation'">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <RouterLink to="/">
                <h1 class="">
                    Le Bus Magique
                </h1>
            </RouterLink>
            <button class="btn btn-circle lg:invisible" @click="() => activeSidebar = 'secondary'">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </button>
        </div>
        <div class="p-6 fixed h-screen border-r border-slate-900" id="navigation"
            :class="{ active: (activeSidebar == 'navigation') }">
            <button class="btn btn-circle 2xl:hidden" @click="() => activeSidebar = null">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
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
            <div id="secondary" :class="{ active: (activeSidebar == 'secondary') }">
                <button class="btn btn-circle lg:hidden" @click="() => activeSidebar = null">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <p>Sidebar</p>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
#navigation,
#secondary {
    @apply overflow-hidden overflow-y-auto shrink-0;
    width: 300px;
}

#content {
    position: relative;

    @screen 2xl {
        left: 300px;
        width: calc(100% - 300px);
    }
}

#navigation {
    @apply bg-slate-800;
    top: 0;
    left: 0;
    z-index: 30;
    transform: translateX(calc(-300px - 1.5rem));
    transition: all .2s ease;

    @screen 2xl {
        transform: translateX(0px);
    }

    &.active {
        transform: translateX(0px);
    }
}

#secondary {
    @apply bg-slate-800;
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 30;
    transform: translateX(calc(300px + 1.5rem));
    transition: all .2s ease;
    height: 100%;
    overflow: auto;

    @screen lg {
        position: relative;
        transform: translateX(0px);
    }

    &.active {
        transform: translateX(0px);
    }

}
</style>