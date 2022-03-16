import { Plugin } from '@nuxt/types'

const plugin: Plugin = ({ $auth, $axios }) => {
  $axios.onError((e: any) => {
    if (e.response.status === 401 && $auth.loggedIn) {
      $auth.logout()
    }
  })
}

export default plugin
