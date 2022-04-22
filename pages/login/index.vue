<template>
  <b-container>
    <div class="text-center my-4">
      <b-img src="/logo.png" style="width: 65%" />
    </div>

    <b-alert :show="$nuxt.isOffline" variant="danger">
      Brak połączenia z internetem
    </b-alert>

    <b-form v-if="$nuxt.isOnline" @submit.prevent="login">
      <b-form-group label="Login">
        <b-input v-model="form.email" name="login" size="lg" required />
      </b-form-group>
      <b-form-group label="Hasło">
        <b-input
          v-model="form.password"
          name="password"
          type="password"
          size="lg"
          required
        />
      </b-form-group>
      <b-form-group>
        <b-button
          :disabled="sending.login || $nuxt.isOffline"
          variant="primary"
          type="submit"
          size="lg"
          block
        >
          <span v-if="!sending.login">Zaloguj</span>
          <b-spinner v-else small />
        </b-button>
      </b-form-group>
    </b-form>

    <!--    <b-form-group>-->
    <!--      <b-button-->
    <!--        :disabled="sending.login"-->
    <!--        variant="danger"-->
    <!--        type="submit"-->
    <!--        size="lg"-->
    <!--        block-->
    <!--      >-->
    <!--        <b-icon icon="wifi-off" />-->
    <!--        <span v-if="$nuxt.isOffline">Zaloguj</span>-->
    <!--        Offline-->
    <!--      </b-button>-->
    <!--    </b-form-group>-->
  </b-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class LoginPage extends Vue {
  form = {
    email: '',
    password: '',
    deviceName: 'test-device'
  }

  sending = {
    login: false
  }

  get adminTel() {
    return process.env.ADMIN_TEL
  }

  async login() {
    if (this.sending.login) return
    this.sending.login = true

    try {
      await this.$auth.loginWith('local', {
        data: this.form
      })
    } catch (err) {
      this.$swal({
        title: 'Problem z logowaniem',
        icon: 'error'
      })
    }

    this.sending.login = false
  }
}
</script>
