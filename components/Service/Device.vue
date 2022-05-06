<template>
  <b-container fluid>
    <div v-if="service && device">
      <b-table-simple small borderless class="mb-0">
        <b-tbody>
          <b-tr>
            <b-td class="w-1 text-muted">Urządzenie:</b-td>
            <b-td>
              <span>{{ device.name }}</span>
              <span
                v-if="
                  service.isWarranty ||
                  (device.warranty && device.warranty.isDuring)
                "
                v-b-popover.bottom.hover="warrantyPopover"
              >
                <b-icon
                  v-if="!device.warranty"
                  icon="shield-exclamation"
                  variant="danger"
                />
                <b-icon
                  v-else-if="!device.warranty.isDuring"
                  icon="shield-slash-fill"
                  variant="danger"
                />
                <b-icon v-else icon="shield-fill-check" variant="success" />
              </span>
            </b-td>
          </b-tr>
          <b-tr v-if="device.brand">
            <b-td class="w-1 text-muted">Marka:</b-td>
            <b-td>
              <span>{{ device.brand }}</span>
              <span
                v-if="service.isWarranty && service.principal !== device.brand"
              >
                ({{ service.principal }})
              </span>
            </b-td>
          </b-tr>
          <b-tr v-if="device.model">
            <b-td class="w-1 text-muted">Model:</b-td>
            <b-td>{{ device.model }}</b-td>
          </b-tr>
          <b-tr v-if="device.serialNumber">
            <b-td class="w-1 text-muted">Nr seryjny:</b-td>
            <b-td>{{ device.serialNumber }}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Service from '~/models/Service'

@Component
export default class ServiceDevice extends Vue {
  @Prop({ type: Object }) readonly service!: Service | null

  get device() {
    return this.service?.device
  }

  get warrantyPopover() {
    return {
      html: true,
      variant: this.device?.warranty?.isDuring ? 'success' : 'danger',
      title: () => {
        if (!this.device?.warranty) return 'Gwarancja nieznana'
        return this.device?.warranty.isDuring
          ? 'Urządzenie na gwarancji'
          : 'Urządzenie po gwarancji'
      },
      content: () => {
        if (!this.device?.warranty) return ''
        return (
          'Od: ' +
          this.device?.warranty?.startAt.format('YYYY-MM-DD') +
          '<br>Do: ' +
          this.device?.warranty?.endAt.format('YYYY-MM-DD')
        )
      }
    }
  }
}
</script>
