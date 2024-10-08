<template>
    <ul :class="classContainer">
        <li v-for="(node, index) in nodes" :key="`node-${index}`" :class="{
        'nav-main-heading': node.heading,
        'nav-main-item': !node.heading,
        'open': node.sub && node.subActivePaths ? subIsActive(node.subActivePaths) : false}">
            {{ node.heading ? node.name : '' }}
            <template v-if="node.sub">
                <a v-if="!node.heading" href="#" class="nav-main-link"
                    :class="node.sub ? 'nav-main-link-submenu' : '' || (route().current(node.to)) ? 'active' : ''"
                    :event="node.sub ? '' : 'click'" @click="linkClicked($event, node.sub)">
                <template v-if="node.svg == true">
                    <template v-html="node.icon"></template>
                </template>
                <template v-else>
                    <i v-if="node.icon" :class="`${node.icon}`" class="nav-main-link-icon"></i>
                </template>
                <span v-if="node.name" class="sidebar-mini-hide">{{ node.name }}</span>
                <span v-if="node.badge" class="nav-main-link-badge badge badge-pill badge-primary"
                    :class="node['badge-variant'] ? `badge-${node['badge-variant']}` : 'badge-primary' ">{{ node.badge }}</span>
                </a>
            </template>
            <template v-else>
                <Link v-if="!node.heading" :href="node.to ? route(node.to) : '#'"
                    :class="node.sub ? 'nav-main-link-submenu' : '' || (route().current(node.to)) ? 'active' : ''" class="nav-main-link"
                    :event="node.sub ? '' : 'click'" @click="linkClicked($event, node.sub)">
                <template v-if="node.svg == true">
                    <template v-html="node.icon"></template>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" fill="currentColor" aria-hidden="true"
                     class="nav-main-link-icon" v-html="node.icon"></svg>
                </template>
                <template v-else>
                    <i v-if="node.icon" :class="`${node.icon}`" class="nav-main-link-icon"></i>
                </template>
                <span v-if="node.name" class="sidebar-mini-hide">{{ node.name }}</span>
                <span v-if="node.badge" class="nav-main-link-badge badge badge-pill badge-primary"
                    :class="node['badge-variant'] ? `badge-${node['badge-variant']}` : 'badge-primary' ">{{ node.badge }}</span>
                </Link>
            </template>
            <base-navigation v-if="node.sub" :nodes="node.sub" sub-menu></base-navigation>
        </li>
    </ul>
</template>

<script>
    import { Link } from '@inertiajs/vue3';
    export default {
        name: 'BaseNavigation',
        components: {
            Link
        },
        props: {
            nodes: {
                type: Array,
                description: 'The nodes of the navigation'
            },
            subMenu: {
                type: Boolean,
                default: false,
                description: 'If true, a submenu will be rendered'
            },
            dark: {
                type: Boolean,
                default: false,
                description: 'Dark mode for menu'
            },
            horizontal: {
                type: Boolean,
                default: false,
                description: 'Horizontal menu in large screen width'
            },
            horizontalHover: {
                type: Boolean,
                default: false,
                description: 'Hover mode for horizontal menu'
            },
            horizontalCenter: {
                type: Boolean,
                default: false,
                description: 'Center mode for horizontal menu'
            },
            horizontalJustify: {
                type: Boolean,
                default: false,
                description: 'Justify mode for horizontal menu'
            }
        },
        computed: {
            classContainer() {
                return {
                    'nav-main': !this.subMenu,
                    'nav-main-submenu': this.subMenu,
                    'nav-main-dark': this.dark,
                    'nav-main-horizontal': this.horizontal,
                    'nav-main-hover': this.horizontalHover,
                    'nav-main-horizontal-center': this.horizontalCenter,
                    'nav-main-horizontal-justify': this.horizontalJustify
                }
            }
        },
        methods: {
            subIsActive(paths) {
                const activePaths = Array.isArray(paths) ? paths : [paths]
                if(this.horizontal){
                    return false;
                }
                return this.route().current(paths);
            },
            linkClicked(e, submenu) {
                // Get window width
                let windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

                if (submenu) {
                    // Get closest li element
                    let el = e.target.closest('li')
                    if (!(windowW > 991 && this.horizontal && this.horizontalHover)) {
                        console.log(el);
                        if (el.classList.contains('open')) {
                            el.classList.remove('open')
                        } else {
                            var children = Array.prototype.slice.call(el.closest('ul').children);
                            children.forEach(element => {
                                element.classList.remove('open')
                            })
                            el.classList.add('open')
                        }
                    }
                } else {
                    // If we are in mobile, close the sidebar
                    if (windowW < 992) {
                        this.$store.commit('sidebar', {
                            mode: 'close'
                        })
                    }
                }
            }
        }
    }

</script>
