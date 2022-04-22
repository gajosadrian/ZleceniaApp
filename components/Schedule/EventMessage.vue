<template>
  <b-alert variant="info" show class="rounded-0">
    {{ event.description }}
  </b-alert>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Event from '~/models/Event'

@Component
export default class ScheduleEventMessage extends Vue {
  @Prop({ type: Object }) readonly event!: Event
}
</script>
