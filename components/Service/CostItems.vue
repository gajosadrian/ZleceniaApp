<template>
  <b-container fluid>
    <div v-if="service">
      <ServiceCostItem
        v-for="costItem in costItems"
        :key="costItem.id"
        :service="service"
        :cost-item="costItem"
      />
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Service from '~/models/Service'

@Component
export default class ServiceDevice extends Vue {
  @Prop({ type: Object }) readonly service!: Service | null

  get costItems() {
    return this.service?.costItems ?? []
  }
}
</script>
