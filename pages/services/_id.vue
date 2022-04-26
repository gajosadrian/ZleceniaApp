<template>
  <div>
    <div v-if="service">
      <ServiceHeader title="Klient" />
      <ServiceCustomer :customer="service.customer" />

      <ServiceHeader title="Zgłoszenie" />
      <ServiceData :service="service" />

      <ServiceHeader title="Urządzenie" />
      <ServiceHeader title="Opis" />

      <b-navbar type="dark" variant="danger" fixed="bottom">
        <b-navbar-nav>
          <b-nav-item href="#">
            Zlecenie
            <b-badge variant="dark">0</b-badge>
          </b-nav-item>
          <b-nav-item href="#">
            Kosztorys
            <b-badge variant="dark">0</b-badge>
          </b-nav-item>
          <b-nav-item href="#">
            Zdjęcia
            <b-badge variant="dark">0</b-badge>
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import Service from '@/models/Service'

@Component
export default class ScheduleEvent extends Vue {
  get serviceId() {
    return this.$route.params.id
  }

  get service() {
    return Service.query().withAllRecursive().find(this.serviceId)
  }
}
</script>
