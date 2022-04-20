<template>
  <div>
    <b-container class="mt-3">
      <h4>
        Zlecenia:
        <span v-if="schedule && schedule.technician">
          {{ schedule.technician.shortName }}
        </span>
      </h4>
      <div class="d-flex justify-content-between">
        <div>
          <b-button
            variant="light"
            :disabled="$nuxt.isOffline || processing.fetchingSchedule"
            class="border shadow-sm"
            @click="fetchSchedule"
          >
            <b-icon icon="cloud-download" />
            Pobierz zlecenia
          </b-button>
        </div>
        <div>
          <b-input
            type="date"
            :value="scheduleDateString"
            :disabled="processing.fetchingSchedule"
            @change="changeDate"
          />
        </div>
      </div>
    </b-container>

    <div v-if="schedule">
      {{ [schedule.events.length, processing.fetchingSchedule] }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Schedule from '~/models/Schedule'

@Component
export default class ServicesIndexPage extends Vue {
  processing = {
    fetchingSchedule: false
  }

  get scheduleDate() {
    return this.$route.query.date
      ? this.$moment(<string>this.$route.query.date)
      : this.$moment()
  }

  get scheduleDateString() {
    return this.scheduleDate.format('YYYY-MM-DD')
  }

  async changeDate(dateString: string) {
    await this.$router.replace({
      query: { ...this.$route.query, date: dateString }
    })
    await this.fetchSchedule()
  }

  async fetchSchedule() {
    this.processing.fetchingSchedule = true
    await Schedule.fetch({ dateString: this.scheduleDateString })
    this.processing.fetchingSchedule = false
  }

  get schedule() {
    return Schedule.query()
      .where('dateString', this.scheduleDateString)
      .withAllRecursive()
      .first()
  }

  created() {
    this.fetchSchedule()
  }
}
</script>
