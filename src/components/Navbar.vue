<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <!-- icon redirect home -->
            <router-link to="/home" class="navbar-item">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
            </router-link>

            <!-- 3 lines (burger) icon -->
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="mainNavbar">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="mainNavbar" class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/rooms" class="navbar-item" id="looseFocus"> Save a Spot! </router-link>

                <button class="button" @click="toggleLogin" :class="{ 'is-primary': login }"> Toggle login </button>
                <button class="button" @click="toggleAdmin" :class="{ 'is-primary': admin }"> Toggle admin </button>
            </div>

            <div class="navbar-end">
                <div v-if="login" class="navbar-item">
                    <div class="buttons">
                        <router-link to="/home" v-if="admin" class="button is-link is-primary"> My Rooms </router-link>
                        <router-link to="/home" v-else class="button is-link"> My Reservations </router-link>
                        <router-link to="/home" class="button is-light"> Settings </router-link>
                    </div>
                </div>
                <div v-else class="navbar-item">
                    <div class="buttons">
                        <button @click="isLogin = false" class="button is-primary modal-button" data-target="form"> Sign up </button>
                        <button @click="isLogin = true" class="button is-light modal-button" data-target="form"> Log in </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- FORM OVERLAY -->
    <div class="modal" id="form">
        <div class="modal-background"></div>
        <div class="modal-card">
            <section class="modal-card-body">
                <Login v-if="isLogin" />
                <Signup v-else />
            </section>
        </div>
        <button class="modal-close is-large"></button>
    </div>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import Signup from './Signup.vue';
import Login from './Login.vue';


export default defineComponent({
    components: {
        Login,
        Signup
    },
    setup() {
        const login = ref(false);
        const isLogin = ref(false);
        const admin = ref(false);

        function toggleLogin() {
            login.value = !login.value
        }

        function toggleAdmin() {
            admin.value = !admin.value
        }

        return {
            isLogin,
            login,
            admin,
            toggleLogin,
            toggleAdmin
        }
    }
});


// create Bulma event binds
document.addEventListener('DOMContentLoaded', () => {

    // DROPDOWN MENU
    const $navbarBurgers = document.querySelectorAll('.navbar-burger');

    if ($navbarBurgers.length) {
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target element using the "data-target" attribute
                const $target = document.getElementById(el.getAttribute('data-target') ?? '');

                if ($target) {
                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');
                }
            });
        });
    }


    // BUTTONS
    // remove focus from bulma links so that their style resets to default
    const $links = document.querySelectorAll('#looseFocus');

    if ($links.length) {
        $links.forEach(el => {
            el.addEventListener('click', () => {
                if (el instanceof HTMLElement) {
                    el.blur();
                }
            });
        });
    }


    // OVERLAYS
    const rootEl = document.documentElement;
    const $modals = document.querySelectorAll('.modal');
    const $modalOpen = document.querySelectorAll('.modal-button');
    const modalCloseTargets = ['.modal-background', '.modal-close'];
    const $modalClose = document.querySelectorAll(modalCloseTargets.join(', '));

    if ($modalOpen) {
        $modalOpen.forEach(el => {
            el.addEventListener('click', () => {
                const $target = document.getElementById(el.getAttribute('data-target') ?? '');

                if ($target) {
                    $target.classList.toggle('is-active');
                    rootEl.classList.add('is-clipped');
                }
            });
        });
    }

    if ($modalClose) {
        $modalClose.forEach(el => {
            el.addEventListener('click', () => {
                rootEl.classList.remove('is-clipped');
                $modals.forEach(el => el.classList.remove('is-active'));
            });
        });
    }


    const $navbarDropdowns = document.querySelectorAll('.navbar-item.has-dropdown');

    if ($navbarDropdowns.length > 0) {

        // Add a click event on each of them
        $navbarDropdowns.forEach(el => {
            el.addEventListener('click', () => {
                el.classList.toggle('is-active');
            });
        });
    }

});
</script>
