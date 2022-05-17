<template>
  <div
    class="liveChat__container bg-accent_light dark:bg-dark_lighten rounded flex flex-col h-full overflow-hidden"
  >
    <ChatHeader />
    <div
      v-if="$store.getters.authChecked && $store.getters.loggedIn"
      ref="chatMessages"
      class="liveChat__messages flex-grow flex-shrink-0 py-3 px-4 w-full overflow-y-scroll <lg:min-h-50vh"
    >
      <div
        v-if="!messagesLoaded"
        class="h-full w-full flex flex-col justify-center align-center p-8"
      >
        <div class="Loader mx-auto"></div>
        <div class="text-sm text-center">Loading messages</div>
      </div>
      <ChatMessage
        v-if="messagesLoaded"
        v-for="message in messages"
        :key="message.id"
        :received="
          message.author_email == $store.getters.user.email ? false : true
        "
        :message="message"
      />
    </div>
    <div
      v-else
      class="flex flex-col justify-center items-center flex-grow flex-shrink-0 px-5 py-8"
    >
      <div>
        <g-link
          to="/login"
          class="googleLogin flex justify-center items-center gap-2 mt-6 py-3 px-5 transition bg-accent hover:bg-accent_darken"
        >
          <Icon :icon="loginIcon" color="fill-white w-4" />
          <span class="font-medium text-white">
            Sign in to Chat
          </span>
        </g-link>
      </div>
    </div>
    <div
      v-if="$store.getters.authChecked && $store.getters.loggedIn"
      class="liveChat__footer flex-shrink-0 border-t-1 border-text_light border-opacity-15 px-5 py-3"
    >
      <ChatFooter @sendMessage="sendMessage" />
    </div>
    <Toast :message="toastMessage" :type="toastType" :show="showToast" />
  </div>
</template>

<script>
import { io } from 'socket.io-client'
let socket
const axios = require('axios')
import Icon from '@/components/Icon.vue'
import ChatHeader from '@/components/chat/ChatHeader.vue'
import ChatMessage from '@/components/chat/ChatMessage.vue'
import ChatFooter from '@/components/chat/ChatFooter.vue'
import Toast from '@/components/Toast.vue'
import { mdiLoginVariant } from '@mdi/js'
export default {
  name: 'Chat',
  components: { Icon, ChatMessage, ChatHeader, ChatFooter, Toast },
  data() {
    return {
      messagesLoaded: false,
      messages: [],
      toastMessage: '',
      toastType: '',
      showToast: false,
      loginIcon: mdiLoginVariant,
    }
  },
  methods: {
    connectSocket(jwt) {
      socket = io(process.env.GRIDSOME_LIVECHAT_API, {
        auth: { jwt: jwt },
      })

      socket.on('connect', async (err) => {
        if (!this.messagesLoaded) await this.getRecentMessages()
        this.scrollChatToBottom()
      })

      socket.on('connect_error', async (err) => {
        console.log(err)
        this.toastMessage =
          'Error connecting to live chat. Please try again later'
        this.toastType = 'error'
        await this.displayToast()
      })

      socket.on('broadcast', (data) => {
        if (
          this.messages.length > 0 &&
          this.messages.at(-1).author_email === data.author_email
        ) {
          this.messages.at(-1).content.push(data.content)
          this.messages.at(-1).updatedAt = data.updatedAt
        } else {
          // this.messages = [...this.messages, data];
          this.messages.push({
            author: data.author,
            author_email: data.author_email,
            picture: data.picture,
            updatedAt: data.updatedAt,
            content: [data.content],
          })
        }
        this.scrollChatToBottom()
      })

      socket.on('message_send_error', async (err) => {
        this.toastMessage = 'Error sending message. Please try again later'
        this.toastType = 'error'
        await this.displayToast()
      })
    },
    scrollChatToBottom() {
      this.$refs.chatMessages?.scroll({
        top: this.$refs.chatMessages.scrollHeight,
        behavior: 'smooth',
      })
    },
    async getRecentMessages() {
      const last3Hours = new Date(new Date().getTime() - 3 * 60 * 60 * 1000)
      const formattedTime = last3Hours.toISOString()
      const { data: recent } = await axios.get(
        `${
          process.env.GRIDSOME_STRAPI_URL
        }/api/chat-messages?filters[updatedAt][$gte]=${formattedTime}&populate[author][fields][0]=name&populate[author][fields][1]=email&populate[author][fields][2]=picture`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GRIDSOME_STRAPI_TOKEN}`,
          },
        }
      )
      recent.data.forEach((message, index) => {
        if (index === 0) {
          this.messages.push({
            author: message.attributes.author.data.attributes.name,
            author_email: message.attributes.author.data.attributes.email,
            picture: message.attributes.author.data.attributes.picture,
            updatedAt: message.attributes.updatedAt,
            content: [message.attributes.content],
          })
          return
        }
        if (
          this.messages.at(-1).author_email ===
          message.attributes.author.data.attributes.email
        ) {
          this.messages.at(-1).content.push(message.attributes.content)
          this.messages.at(-1).updatedAt = message.attributes.updatedAt
          return
        }
        this.messages.push({
          author: message.attributes.author.data.attributes.name,
          author_email: message.attributes.author.data.attributes.email,
          picture: message.attributes.picture,
          updatedAt: message.attributes.updatedAt,
          content: [message.attributes.content],
        })
      })
      this.messagesLoaded = true
      this.scrollChatToBottom()
    },
    sendMessage(message) {
      socket.emit('send-message', {
        content: message,
      })
    },
    async displayToast() {
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 3000)
    },
  },
  beforeUnmount() {
    if (socket) {
      socket.disconnect()
    }
  },
  created() {
    if (this.$store.getters.loggedIn && this.$store.getters.jwt) {
      // If user is already logged in, connect to the chat server
      this.connectSocket(this.$store.getters.jwt)
    }
    // else {
    //   // If user is not logged in, watch for authentication check
    //   this.unwatch = this.$store.watch(
    //     (state, getters) => getters.authChecked,
    //     (newValue, oldValue) => {
    //       // If authentication is checked and user is logged in, connect to socket
    //       if (newValue && !this.$store.getters.jwt) {
    //         this.connectSocket(this.$store.getters.jwt)
    //       }
    //     }
    //   )
    // }
  },
  // beforeDestroy() {
  //   // Stop watching authentication check on component destroy
  //   this.unwatch()
  // },
}
</script>

<style lang="scss" scoped>
$Loader-size: 3rem;
$Loader-offset: 0.3rem;
$Loader-timing: ease-in-out;

.Loader {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: $Loader-size;
  margin-top: calc($Loader-size / 2);
  margin-bottom: calc($Loader-size / 2);
  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    animation-duration: 1.8s;
    animation-iteration-count: infinite;
    animation-timing-function: $Loader-timing;
    filter: drop-shadow(0 0 calc($Loader-offset / 2.25) rgba($accent, 0.75));
  }
  &:before {
    width: 100%;
    padding-bottom: 100%;
    box-shadow: inset 0 0 0 $Loader-offset $accent;
    animation-name: pulsA;
  }
  &:after {
    width: calc(100% - #{$Loader-offset}* 2);
    padding-bottom: calc(100% - #{$Loader-offset}* 2);
    box-shadow: 0 0 0 0 $accent;
    animation-name: pulsB;
  }
}

@keyframes pulsA {
  0% {
    box-shadow: inset 0 0 0 $Loader-offset $accent;
    opacity: 1;
  }
  50%,
  100% {
    box-shadow: inset 0 0 0 0 $accent;
    opacity: 0;
  }
}

@keyframes pulsB {
  0%,
  50% {
    box-shadow: 0 0 0 0 $accent;
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 $Loader-offset $accent;
    opacity: 1;
  }
}
</style>
