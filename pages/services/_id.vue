<template>
  <div>
    <div v-if="service">
      <ServiceHeader
        title="Klient"
        :variant="
          service.customer && service.customer.satisfaction.id > 0
            ? service.customer.satisfaction.color
            : undefined
        "
      />
      <ServiceCustomer :service="service" />

      <ServiceHeader title="Zgłoszenie" />
      <ServiceData :service="service" />

      <ServiceHeader title="Urządzenie" />
      <ServiceDevice :service="service" />

      <ServiceHeader title="Opis" />
      <ServiceDescription :service="service" />

      <ServiceCostItems :service="service" />

      <b-navbar type="dark" variant="danger" fixed="bottom">
        <b-navbar-nav>
          <b-nav-item href="#" active>
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
