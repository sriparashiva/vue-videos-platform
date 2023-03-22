<template>
  <div class="footer__loggedIn">
    <div class="footer__profile flex gap-x-3 items-center">
      <img
        alt="Avatar image"
        class="rounded-full w-8"
        :src="loginStore.getUser.picture"
      />
      <div class="profile__text flex flex-col gap-y-0">
        <p class="text-base font-medium">{{ loginStore.getUser.name }}</p>
        <div class="text-xs text-gray-400">E-Kailasian</div>
      </div>
    </div>
    <div class="footer__form mt-4 flex items-start gap-x-2">
      <div class="form__input w-full relative">
        <button
          aria-label="Clear"
          v-if="chatMessage.length > 0"
          class="form__closeIcon absolute right-0 z-2 mt-1 opacity-50"
          @click="chatMessage = ''"
        >
          <Icon class="resetIcon w-5" :icon="closeIcon" />
        </button>
        <input
          ref="messageInput"
          type="text"
          name="message"
          autocomplete="off"
          id="chatMessage"
          class="w-full bg-transparent outline-none text-sm border-b-1 border-text_dark border-opacity-30 pb-2 transition hover:border-opacity-80 focus:border-opacity-80"
          placeholder="Say something..."
          maxlength="200"
          v-model="chatMessage"
          @keyup.enter="sendMessage"
        />
        <p
          class="text-xs text-text_lighten dark:text-dark_text opacity-40 ml-auto text-right mt-1"
        >
          {{ `${chatMessage.length}/200` }}
        </p>
      </div>
      <button
        aria-label="Send"
        class="form__sendButton p-2 transition hover:bg-accent rounded-full"
        @click="sendMessage"
        :class="chatMessage.length == 0 ? 'disabled' : ''"
      >
        <Icon class="sendButton__icon w-4" :icon="sendIcon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useLoginStore } from '~~/stores/login'
  import {
    mdiSendOutline as sendIcon,
    mdiCloseCircle as closeIcon,
  } from '@mdi/js'
  const loginStore = useLoginStore()
  const chatMessage = ref('')
  const messageInput = ref<null | HTMLElement>(null)
  const emit = defineEmits(['sendMessage'])

  const sendMessage = () => {
    if (chatMessage.value.length > 0) {
      emit('sendMessage', chatMessage.value.trim())
      chatMessage.value = ''
      messageInput.value && messageInput.value.focus()
    }
  }
</script>

<style lang="scss">
  .form__sendButton {
    transition: 0.3s all ease-in-out;
    svg {
      fill: $accent;
    }
    &:hover {
      svg {
        fill: $accent_lighten;
        transform: scale(1.03);
      }
    }
    &.disabled {
      cursor: default;
      opacity: 0.3;
    }
  }
  .resetIcon {
    fill: $info_darken;
    transition: 0.2s all ease-in-out;
    &:hover {
      fill: $text;
    }
  }
  .dark .resetIcon {
    fill: $info_darken;
    &:hover {
      fill: $accent_lighten;
    }
  }
</style>
