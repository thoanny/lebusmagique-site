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
        <div class="fixed top-0 flex justify-between gap-6 w-full z-20 bg-base-300 items-center px-6 py-4 2xl:hidden">
            <button class="btn btn-primary btn-circle" @click="() => activeSidebar = 'navigation'">
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
            <button class="btn btn-primary btn-circle lg:invisible" @click="() => activeSidebar = 'secondary'">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </button>
        </div>
        <div class="p-6 fixed h-screen border-r border-slate-900" id="navigation"
            :class="{ active: (activeSidebar == 'navigation') }">
            <button class="btn btn-primary absolute top-4 left-6 btn-circle 2xl:hidden" @click="() => activeSidebar = null">
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
                <div id="menu">
                    <Menu :items="menu" v-if="menu" />
                </div>
            </div>
        </div>
        <div class="w-full flex gap-6 p-6 overflow-auto" id="content">
            <div id="primary" class="w-full">
                <slot />
            </div>
            <div id="secondary" class="border-l border-slate-900 lg:border-0"
                :class="{ active: (activeSidebar == 'secondary') }">
                <button class="btn btn-primary absolute top-4 right-6 btn-circle lg:hidden"
                    @click="() => activeSidebar = null">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div class="flex flex-col gap-4">
                    <RouterLink to="/inscription" class="btn btn-primary gap-2 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg>

                        Créer un compte
                    </RouterLink>
                    <RouterLink to="/connexion" class="btn btn-primary w-full gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        Me connecter
                    </RouterLink>
                </div>

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
    background: url('@/assets/img/background.jpg') no-repeat center center;
    background-attachment: fixed;
    background-size: cover;

    @screen 2xl {
        left: 300px;
        width: calc(100% - 300px);
    }
}

#primary {
    @apply bg-black bg-opacity-50 rounded-lg p-6;
}

#navigation,
#secondary {
    @apply top-0 z-30 bg-base-300;
    transition: all .2s ease;
}

#navigation {
    @apply left-0;
    transform: translateX(calc(-300px - 1.5rem));

    @screen 2xl {
        transform: translateX(0px);
    }

    &.active {
        transform: translateX(0px);
    }
}

#secondary {
    @apply block right-0 fixed h-full overflow-y-auto p-20 px-6 pb-6;
    transform: translateX(calc(300px + 1.5rem));

    @screen lg {
        background: none;
        padding: 0;
        position: relative;
        transform: translateX(0px);
        z-index: 10;
    }

    &.active {

        transform: translateX(0px);
    }

}
</style>