<template>
  <div>
    <div class="d-flex justify-content-between">
      <div class="my-auto px-2 text-nowrap text-center">
        <div>
          {{ event.startHour }}
        </div>
        <div class="text-muted small">
          {{ event.durationFormatted }}
        </div>
      </div>
      <div class="pr-2 w-100" @click="onEventClick">
        <div class="small text-muted">
          <span v-if="service">
            {{ service.kind.nameFormatted }}
          </span>
          <span v-else>
            <b-icon icon="x" />
            Termin usunięty
          </span>
        </div>
        <div v-if="customer">
          <div class="font-weight-bold">
            <span v-if="customer.satisfaction.id === 0">
              {{ _.truncate(customer.name, { length: 25 }) }}
            </span>
            <span v-else>
              {{ _.truncate(customer.name, { length: 20 }) }}
              <i :class="`small text-${customer.satisfaction.color}`">
                {{ customer.satisfaction.text }}
              </i>
            </span>
          </div>
          <div class="small">{{ customer.city }}, {{ customer.street }}</div>
        </div>
        <div v-if="service && service.device">
          <small>
            <b-icon icon="music-player-fill" />
            {{ service.device.name }}, {{ service.device.brand }}
          </small>
        </div>
        <div>
          <small v-if="!service || service.isCompleted">
            <b-icon icon="check2" />
            Zrealizowane
          </small>
          <span v-if="service">
            <span v-if="service.isCompleted"></span>
            <small
              v-else-if="service.hasToClarify"
              class="text-danger font-weight-bold"
            >
              <b-icon icon="exclamation-triangle-fill" />
              Do wyjaśnienia
            </small>
            <small v-else-if="service.isInWorkshop" class="text-warning">
              <b-icon icon="house-door-fill" />
              Warsztat
            </small>
            <small
              v-else-if="!service.isCompleted && !event.isAppointment"
              class="text-danger"
            >
              <b-icon icon="clock-fill" />
              Nieumówione
            </small>
            <small
              v-else-if="event.appointment && event.appointment.hasToCall"
              class="text-success font-weight-bold"
            >
              <b-icon icon="clock-fill" />
              Dzwonić wcześniej
            </small>
            <small v-else-if="!service.isCompleted" class="text-primary">
              <b-icon icon="clock-fill" />
              Oczekujące...
            </small>
          </span>
        </div>
      </div>
      <div class="border-left px-2">
        <div>
          <div v-if="service">
            <b-button v-if="service.hasToClarify" variant="danger" disabled>
              <b-icon icon="exclamation-triangle-fill" />
            </b-button>
            <b-button
              v-else-if="service.isCompleted"
              variant="success"
              disabled
            >
              <b-icon icon="check2" />
            </b-button>
            <b-button
              v-else-if="service.isInWorkshop"
              variant="warning"
              disabled
            >
              <b-icon icon="house-door-fill" />
            </b-button>
            <b-link
              v-else-if="!service.isCompleted"
              :class="
                event.isAppointment
                  ? 'btn btn-primary'
                  : 'btn btn-outline-primary'
              "
            >
              <b-icon icon="geo-alt-fill" />
            </b-link>
          </div>
          <b-button v-else variant="success" disabled>
            <b-icon icon="x" />
          </b-button>
        </div>
        <div
          v-if="customer && event.appointment && event.appointment.hasToCall"
          class="mt-2"
        >
          <b-link :href="`tel:${customer.phone}`" class="btn btn-success">
            <b-icon icon="telephone-fill" />
          </b-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Event from '~/models/Event'

@Component
export default class ScheduleEvent extends Vue {
  @Prop({ type: Object }) readonly event!: Event

  get service() {
    return this.event.service
  }

  get customer() {
    return this.event.customer
  }

  onEventClick() {
    if (!this.service) return
    this.$router.push({
      name: 'services-id',
      params: { id: this.service.id }
    })
  }
}
</script>
