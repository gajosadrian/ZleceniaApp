<template>
  <b-container>
    <div v-if="customer">
      <div>
        <b-badge>{{ customer.symbol }}</b-badge>
      </div>
      <div>
        <span class="font-weight-bold">
          {{ customer.name }}
        </span>
        <i :class="`small text-${customer.satisfaction.color}`">
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
        <white-button
          :href="`https://www.google.com/maps/search/?api=1&query=${customer.city}`"
          class="mr-2"
        >
          <b-icon icon="geo-alt-fill" variant="primary" />
          Mapy
        </white-button>
        <white-button
          href="https://play.google.com/store/apps/details?id=pl.neptis.yanosik.mobi.android&launch=true"
          class="mr-2"
          @click="$copyText(customer.city)"
        >
          <b-icon icon="cursor-fill" variant="danger" />
          Yanosik
        </white-button>
        <white-button
          :href="`intent://q=${customer.city}/#Intent;package=pl.aqurat.automapa;scheme=geo;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`"
          class="mr-2"
        >
          <b-icon icon="capslock-fill" variant="secondary" />
          Automapa
        </white-button>
      </div>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Customer from '~/models/Customer'

@Component
export default class ServiceCustomer extends Vue {
  @Prop({ type: Object }) readonly customer!: Customer | null
}
</script>
