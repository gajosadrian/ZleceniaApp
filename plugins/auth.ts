import { Plugin } from '@nuxt/types'

const plugin: Plugin = async ({ $auth, $axios }) => {
  $axios.onError((e: any) => {
    if (e.response?.status === 401) {
      $auth.reset()
    }
  })

  try {
    await $auth.fetchUser()
  } catch (e: any) {}
}

export default plugin
