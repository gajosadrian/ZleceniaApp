import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $enums: any
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    enums?: any
  }
}
