<template>
  <b-button
    :href="href"
    variant="light"
    class="border shadow-sm"
    @click="$emit('click', $event)"
  >
    <slot />
  </b-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class WhiteButton extends Vue {
  @Prop({ type: String }) readonly href!: string | undefined
}
</script>
