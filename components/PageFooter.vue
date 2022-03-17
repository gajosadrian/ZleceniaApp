<template>
  <div>
    <hr class="mt-5" />
    <div class="d-flex justify-content-between text-muted">
      <div>
        Kontakt z administratorem:
        <a :href="`tel:${adminTel}`">{{ adminTel }}</a>
      </div>
      <div>v{{ $nuxt.$config.clientVersion }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class LoginPage extends Vue {
  get adminTel() {
    return process.env.ADMIN_TEL
  }
}
</script>
