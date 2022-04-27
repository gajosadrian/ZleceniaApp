<template>
  <b-container fluid>device</b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Device from '~/models/Device'

@Component
export default class ServiceDevice extends Vue {
  @Prop({ type: Object }) readonly device!: Device | null
}
</script>
