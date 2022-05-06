<template>
  <b-table-simple small borderless class="mb-0">
    <b-tbody>
      <b-tr :variant="costItem.type.variant">
        <b-th colspan="2">
          <b-icon
            :icon="costItem.type.icon"
            :variant="costItem.type.iconVariant"
          />
          {{ ware ? _.truncate(ware.name, { length: 35 }) : '' }}
          <span v-if="isLabor || isSettlement">
            ({{ ware ? ware.technicianName : '' }})
          </span>
        </b-th>
      </b-tr>
      <b-tr v-if="!isLabor && !isSettlement">
        <b-td class="text-muted w-1">Symbol:</b-td>
        <b-td v-if="ware">
          <div class="d-flex justify-content-between">
            <span>{{ ware.symbol }}</span>
            <span>{{ ware.foreignSymbol }}</span>
          </div>
        </b-td>
      </b-tr>
      <b-tr>
        <b-td class="text-muted w-1">Koszt:</b-td>
        <b-td>
          <span v-if="costItem.quantity > 1">
            {{ costItem.quantity }} x {{ costItem.grossPrice.toFixed(2) }} =
          </span>
          <span>{{ costItem.grossAmount.toFixed(2) }} zł</span>
        </b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Service from '~/models/Service'
import CostItem, { Type } from '~/models/CostItem'

@Component
export default class ServiceDevice extends Vue {
  @Prop({ type: Object }) readonly service!: Service | null
  @Prop({ type: Object }) readonly costItem!: CostItem

  get ware() {
    return this.costItem.ware
  }

  get isLabor() {
    return this.costItem.typeId === Type.Labor
  }

  get isDelivery() {
    return this.costItem.typeId === Type.Delivery
  }

  get isSettlement() {
    return this.costItem.typeId === Type.Settlement
  }
}
</script>
