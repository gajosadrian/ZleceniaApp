<template>
  <div>
    <div v-if="service" class="px-1">
      <b-table-simple small borderless class="mb-0">
        <b-tbody>
          <template v-for="notes in noteGroups">
            <b-tr
              v-for="note in notes.filter((note) => !note.type.includes('sms'))"
              :key="note.idx"
            >
              <b-td nowrap class="w-1">
                <div class="font-weight-bold small text-right">
                  <span v-if="note.type === 'technik'" class="text-danger">
                    {{ note.author }}
                  </span>
                  <span v-else-if="note.type.includes('sms')">
                    @ {{ note.author }}
                  </span>
                  <span v-else class="text-primary">
                    {{ _.truncate(note.author, { length: 10 }) }}
                  </span>
                </div>
                <div class="small text-right">
                  {{ _.truncate(note.date, { length: 11 }) }}
                </div>
              </b-td>
              <b-td class="px-0 w-1">
                <small><b-icon icon="caret-right-fill" /></small>
              </b-td>
              <b-td>
                <span v-html="getHtmlContent(note.content)" />
              </b-td>
            </b-tr>
          </template>
        </b-tbody>
      </b-table-simple>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import Service from '~/models/Service'

@Component
export default class ServiceDescription extends Vue {
  @Prop({ type: Object }) readonly service!: Service | null

  get noteGroups() {
    return this.service?.noteGroups ?? []
  }

  getHtmlContent(content: string) {
    let str = content
    const startTag = '<span class="selected-desc">'
    const endTag = '</span>'
    if (content.includes('>>') && content.includes('<<')) {
      str = _.replace(str, '>>', startTag)
      str = _.replace(str, '<<', endTag)
    }
    return str
  }
}
</script>

<style>
.selected-desc {
  background-color: #ffdb93 !important;
}
</style>
