<template>
  <div>
    <b-container fluid class="mt-3 mb-3">
      <h4>
        Zlecenia:
        <span v-if="schedule && schedule.technician">
          {{ schedule.technician.shortName }}
        </span>
      </h4>
      <div class="d-flex justify-content-between">
        <div>
          <white-button
            :disabled="$nuxt.isOffline || processing.fetchingSchedule"
            @click="fetchSchedule"
          >
            <b-icon icon="cloud-download" />
            Pobierz zlecenia
          </white-button>
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
      <div v-for="event in schedule.events" :key="event.id">
        <div class="mb-2">
          <div class="small text-right mr-2">
            <span v-if="event.service && event.service.isCompleted">
              <span v-if="event.endAt.isBefore()">
                {{ event.endAt.fromNow() }}
              </span>
              <span v-else>przed czasem</span>
            </span>
            <span v-else>
              <span
                v-if="event.startAt.isBefore() && event.service"
                class="text-danger"
              >
                <b-icon icon="alarm-fill" />
                {{ event.startAt.fromNow() }}
              </span>
              <span v-else>
                {{ event.startAt.fromNow() }}
              </span>
            </span>
          </div>
          <div v-if="event.customer" class="bg-white py-2 shadow-sm">
            <ScheduleEvent :event="event" />
          </div>
          <div v-else>
            <ScheduleEventMessage :event="event" />
          </div>
        </div>
      </div>
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

  mounted() {
    this.fetchSchedule()
  }
}
</script>
