<template>
  <div :class="`py-1 bg-${variant} mt-3 mb-1`">
    <b-container>
      <span class="font-weight-bold text-white">
        {{ _.toUpper(title) }}
      </span>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ServiceHeader extends Vue {
  @Prop({ type: String }) readonly title!: string
  @Prop({ type: String, default: 'primary' }) readonly variant!: string
}
</script>
