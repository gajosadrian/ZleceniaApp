<template>
  <b-container fluid>
    <div v-if="service && customer">
      <div class="h5 mb-0">
        <b-badge>{{ customer.symbol }}</b-badge>
      </div>
      <div>
        <span class="font-weight-bold">
          {{ customer.name }}
        </span>
        <i
          v-if="customer.satisfaction.id > 0"
          :class="`small text-${customer.satisfaction.color}`"
        >
          {{ customer.satisfaction.text }}
        </i>
      </div>
      <div>{{ customer.street }}</div>
      <div>{{ customer.postalCode }} {{ customer.city }}</div>
      <div>
        <white-button
          v-for="(phone, key) in customer.phones"
          :key="phone"
          :href="`tel:${phone}`"
          :class="{ 'border-success': key === 0 }"
          class="mt-2 mr-2"
        >
          <b-icon icon="telephone-fill" variant="success" />
          {{ phone }}
        </white-button>
      </div>
      <div class="mt-2">
        <white-button :href="customer.googleMapsLink" class="mr-2">
          <b-icon icon="geo-alt-fill" variant="primary" />
          Mapy
        </white-button>
        <white-button
          :href="customer.yanosikLink"
          class="mr-2"
          @click="$copyText(customer.addressForSearch)"
        >
          <b-icon icon="cursor-fill" variant="danger" />
          Yanosik
        </white-button>
        <white-button :href="customer.autoMapaLink" class="mr-2">
          <b-icon icon="capslock-fill" variant="secondary" />
          AutoMapa
        </white-button>
      </div>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Service from '~/models/Service'

@Component
export default class ServiceCustomer extends Vue {
  @Prop({ type: Object }) readonly service!: Service | null

  get customer() {
    return this.service?.customer
  }
}
</script>
