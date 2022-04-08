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
          <b-th>{{ $auth.user.login }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Name:</b-td>
          <b-th>{{ $auth.user.name }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Short name:</b-td>
          <b-th>{{ $auth.user.shortName }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>First name:</b-td>
          <b-th>{{ $auth.user.firstName }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Inverted name:</b-td>
          <b-th>{{ $auth.user.invertedName }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Acronym:</b-td>
          <b-th>{{ $auth.user.acronym }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Is admin:</b-td>
          <b-th>{{ $auth.user.isAdmin }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Is mobile:</b-td>
          <b-th>{{ $auth.user.isMobile }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Is technician:</b-td>
          <b-th>{{ $auth.user.isTechnician }}</b-th>
        </b-tr>
        <b-tr>
          <b-td>Technician obj:</b-td>
          <b-th>{{ Boolean($auth.user.technician) }}</b-th>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-button @click="logout">Logout</b-button>
    <b-button @click="fetchUser">fetchUser</b-button>
    <div>schedules: {{ schedules }}</div>
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
    return Schedule.query()
      .withAll()
      .with(['events.service', 'events.appointment.user'])
      .get()
  }

  get events() {
    return Event.all()
  }

  created() {
    Schedule.fetch({ dateString: '2022-04-08' })
    setTimeout(() => {
      console.log(this.schedules)
    }, 3000)
  }
}
</script>
