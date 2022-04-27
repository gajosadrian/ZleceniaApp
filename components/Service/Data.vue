<template>
  <b-container fluid>
    <div v-if="service">
      <b-badge :variant="service.kind.color">
        {{ service.kind.nameFormatted }}
      </b-badge>
      <b-badge>
        {{ service.foreignNumber ? service.foreignNumber : service.number }}
      </b-badge>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Service from '~/models/Service'

@Component
export default class ServiceData extends Vue {
  @Prop({ type: Object }) readonly service!: Service | null
}
</script>
