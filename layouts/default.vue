<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      fixed="top"
      sticky
      :variant="$nuxt.isOffline ? 'danger' : 'primary'"
    >
      <b-navbar-brand href="#">
        <span v-if="$nuxt.isOffline">Jesteś offline</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <NuxtLink to="/" tag="b-nav-item">Home</NuxtLink>
          <NuxtLink :to="{ name: 'services' }" tag="b-nav-item">
            Zlecenia
          </NuxtLink>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            v-if="$auth.user"
            :text="$auth.user.shortName"
            right
          >
            <b-dropdown-item @click="logout">Wyloguj</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <Nuxt />

    <b-container>
      <PageFooter />
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class DefaultLayout extends Vue {
  async logout() {
    await this.$auth.logout()
  }
}
</script>
