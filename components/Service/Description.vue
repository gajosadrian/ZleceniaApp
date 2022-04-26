<template>
  <b-container>description</b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Note } from '~/models/Service'

@Component
export default class ServiceDescription extends Vue {
  @Prop({ type: Array }) readonly noteGroups!: Note[][]
}
</script>
