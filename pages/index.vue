<template>
  <div>
    <b-table-simple>
      <b-tbody>
        <b-tr>
          <b-td>Online:</b-td>
          <b-th>{{ $nuxt.isOnline }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Logged in:</b-td>
          <b-th>{{ $auth.loggedIn }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>ID:</b-td>
          <b-th>{{ $auth.user.id }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Login:</b-td>
          <b-th>{{ $auth.user.email }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Name:</b-td>
          <b-th>{{ $auth.user.name }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Name Short:</b-td>
          <b-th>{{ $auth.user.nameShort }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>First name:</b-td>
          <b-th>{{ $auth.user.firstName }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Name Reversed:</b-td>
          <b-th>{{ $auth.user.nameReversed }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Initials:</b-td>
          <b-th>{{ $auth.user.initials }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Is Admin:</b-td>
          <b-th>{{ $auth.user.isAdmin }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Is Mobile:</b-td>
          <b-th>{{ $auth.user.isMobile }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Is Technik:</b-td>
          <b-th>{{ $auth.user.isTechnik }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Technik Obj:</b-td>
          <b-th>{{ Boolean($auth.user.technik) }}</b-th>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-button @click="logout">Logout</b-button>
    <b-button @click="fetchUser">fetchUser</b-button>
    <div>schedules: {{ schedules.length }}</div>
    <div>events: {{ events.length }}</div>
    <div>
      <div v-for="event in events" :key="event.id">
        {{ event.durationFormatted }} ,
        {{ event.startHour }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Schedule from '~/models/Schedule'
import Event from '~/models/Event'

@Component
export default class LoginPage extends Vue {
  async logout() {
    await this.$auth.logout()
  }

  async fetchUser() {
    try {
      await this.$axios.get('/me')
      this.$swal({
        title: 'Success',
        icon: 'success'
      })
    } catch (e: any) {
      this.$swal({
        title: 'Error',
        text: e.message,
        icon: 'error'
      })
    }
  }

  get schedules() {
    return Schedule.query().withAll().get()
  }

  get events() {
    return Event.all()
  }

  mounted() {
    Schedule.fetch({ dateString: '2022-03-25' })
  }
}
</script>
