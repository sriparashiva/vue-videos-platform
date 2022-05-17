<template>
  <div
    class="chatMessage mb-4 max-w-3/4 flex gap-x-2 items-end"
    :class="received ? 'ml-auto' : 'mr-auto'"
  >
    <div
      class="chatMessage__avatar flex-grow-0 flex-shrink-0 rounded-full overflow-hidden w-9"
      :class="received ? 'order-2' : 'order-1'"
    >
      <img class="w-full h-full object-cover" :src="message.picture" />
    </div>
    <div
      class="chatMessage__content flex-grow flex-shrink"
      :class="received ? 'order-1' : 'order-2'"
    >
      <p
        class="chatMessage__sender text-11px max-w-full text-text_dark mb-1 mx-1 break-all"
        :class="received ? 'text-right' : 'text-left'"
      >
        {{ message.author }}
      </p>
      <div
        class="chatMessage__bubble p-3"
        :class="received ? 'received' : 'sent'"
      >
        <p
          class="text-12px mb-1 leading-normal"
          v-for="(item, index) in message.content"
          :key="index"
        >
          {{ item }}
        </p>
        <div class="mt-2 text-11px text-text_dark opacity-50">
          {{ formatTime(message.updatedAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require('moment')
export default {
  name: 'ChatMessage',
  props: {
    message: { type: Object, required: true },
    received: { type: Boolean, required: true },
  },
  methods: {
    formatTime(time) {
      // return moment(time).format('h:mm A')
      return moment(time).fromNow()
    },
  },
}
</script>

<style lang="scss">
.chatMessage {
  .chatMessage__bubble {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 0;
      height: 0;
      margin-bottom: -10px;
      clear: both;
    }
    &.received {
      background: #543030;
      &::after {
        content: '';
        right: 0;
        border-left: 10px solid transparent;
        border-top: 10px solid #543030;
      }
    }
    &.sent {
      background: $theme_bg;
      &::after {
        content: '';
        left: 0;
        border-right: 10px solid transparent;
        border-top: 10px solid $theme_bg;
      }
    }
  }
}
</style>
