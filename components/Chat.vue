<template>
  <div
    class="liveChat__container max-h-80vh bg-accent_lighten dark:bg-dark_lighten rounded flex flex-col h-full overflow-hidden"
  >
    <ChatHeader />
    <div
      v-if="loginStore.getAuthChecked && !loginStore.getLoggedIn"
      class="liveChat__loggedOutState flex flex-col justify-center items-center flex-grow flex-shrink-0 px-5 py-8"
    >
      <div>
        <NuxtLink
          to="/login"
          class="googleLogin flex justify-center items-center gap-2 mt-6 py-3 px-5 transition bg-accent hover:bg-accent_darken"
        >
          <Icon :icon="loginIcon" color="fill-white w-4" />
          <span class="font-medium text-white"> Sign in to Chat </span>
        </NuxtLink>
      </div>
    </div>
    <div
      v-else
      ref="chatMessages"
      class="liveChat__messages flex-grow flex-shrink py-3 px-4 w-full overflow-y-scroll min-h-50vh lg:min-h-none max-h-19/25"
    >
      <div
        v-show="!messagesLoaded"
        class="h-full w-full flex flex-col justify-center align-center p-8"
      >
        <Loader class="mb-1" />
        <div class="text-sm text-center">Loading messages</div>
      </div>
      <div
        v-show="messagesLoaded && messages.length == 0"
        class="h-full w-full flex flex-col justify-center align-center p-8"
      >
        <div class="text-sm text-center">No messages to display</div>
      </div>
      <ChatMessage
        v-if="messagesLoaded"
        v-for="message in messages"
        :key="message.id"
        :received="
          loginStore.getUser && message.author_email == loginStore.getUser.email
            ? false
            : true
        "
        :message="message"
      />
    </div>
    <div
      v-if="loginStore.getAuthChecked && loginStore.getLoggedIn"
      class="liveChat__footer flex-shrink-0 border-t-1 border-accent_darken border-opacity-15 px-5 py-3"
    >
      <ChatFooter @sendMessage="sendMessage" />
    </div>
    <Toast :message="toastMessage" :type="toastType" :show="showToast" />
  </div>
</template>

<script setup lang="ts">
  import { io } from 'socket.io-client'
  import { mdiLoginVariant as loginIcon } from '@mdi/js'
  import { useLoginStore } from '~~/stores/login'
  let socket: any
  const loginStore = useLoginStore()
  const messagesLoaded = ref(false)
  const chatMessages = ref<null | HTMLElement>(null)
  const messages = ref<Array<any>>([])
  const toastMessage = ref('')
  const toastType = ref('')
  const showToast = ref(false)
  const config = useRuntimeConfig()
  const client = useStrapiClient()

  const connectSocket = (jwt: string) => {
    socket = io(config.public.livechatServer, {
      auth: { jwt: jwt },
    })

    socket.on('connect', async (err: any) => {
      if (!messagesLoaded.value) await getRecentMessages()
      scrollChatToBottom()
    })

    socket.on('connect_error', async (err: any) => {
      // console.log('Chat connect error')
      // console.log(err)
      toastMessage.value =
        'Error connecting to live chat. Please try again later'
      toastType.value = 'error'
      await displayToast()
    })

    socket.on('broadcast', (data: any) => {
      if (
        messages.value.length > 0 &&
        messages.value.at(-1).author_email === data.author_email
      ) {
        messages.value.at(-1).content.push(data.content)
        messages.value.at(-1).updatedAt = new Date(
          Number(data.updatedAt)
        ).toISOString()
      } else {
        // messages = [...messages, data];
        messages.value.push({
          author: data.author,
          author_email: data.author_email,
          picture: data.picture,
          updatedAt: new Date(Number(data.updatedAt)).toISOString(),
          content: [data.content],
        })
      }
      scrollChatToBottom()
    })

    socket.on('message_send_error', async (err: any) => {
      toastMessage.value = 'Error sending message. Please try again later'
      toastType.value = 'error'
      await displayToast()
    })
  }

  const scrollChatToBottom = () => {
    chatMessages.value &&
      chatMessages.value.scroll({
        top: chatMessages.value.scrollHeight,
        behavior: 'smooth',
      })
  }

  const getRecentMessages = async () => {
    const last3Hours = new Date(new Date().getTime() - 3 * 60 * 60 * 1000)
    const formattedTime = last3Hours.toISOString()

    // const resp: any = await $fetch(
    //   `${config.public.strapi.url}/api/chat-messages?filters[updatedAt][$gte]=${formattedTime}&populate[author][fields][0]=name&populate[author][fields][1]=email&populate[author][fields][2]=picture&populate[author][fields][3]=username`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${loginStore.getJwt}`,
    //     },
    //   }
    // )

    const resp: any = await client(`/chat-messages`, {
      headers: {
        Authorization: `Bearer ${loginStore.getJwt}`,
      },
      params: {
        filters: {
          updatedAt: {
            $gte: formattedTime,
          },
        },
        populate: {
          author: {
            fields: ['name', 'email', 'picture', 'username'],
          },
        },
      },
    })

    resp.data.forEach((message: any, index: number) => {
      if (index === 0) {
        messages.value.push({
          author: message.attributes.author.data.attributes.name
            ? message.attributes.author.data.attributes.name
            : message.attributes.author.data.attributes.username,
          author_email: message.attributes.author.data.attributes.email,
          picture: message.attributes.author.data.attributes.picture,
          updatedAt: message.attributes.updatedAt,
          content: [message.attributes.content],
        })
        return
      }
      if (
        messages.value.at(-1).author_email ===
        message.attributes.author.data.attributes.email
      ) {
        messages.value.at(-1).content.push(message.attributes.content)
        messages.value.at(-1).updatedAt = message.attributes.updatedAt
        return
      }
      messages.value.push({
        author: message.attributes.author.data.attributes.name
          ? message.attributes.author.data.attributes.name
          : message.attributes.author.data.attributes.username,
        author_email: message.attributes.author.data.attributes.email,
        picture: message.attributes.author.data.attributes.picture,
        updatedAt: message.attributes.updatedAt,
        content: [message.attributes.content],
      })
    })

    messagesLoaded.value = true
    scrollChatToBottom()
  }
  const sendMessage = (message: string) => {
    socket.emit('send-message', {
      content: message,
    })
  }
  const displayToast = async () => {
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 3000)
  }
  onBeforeMount(() => {
    if (loginStore.getLoggedIn && loginStore.getJwt) {
      // If user is already logged in, connect to the chat server
      connectSocket(loginStore.getJwt)
    }
    // else {
    //   // If user is not logged in, watch for authentication check
    //   unwatch = $store.watch(
    //     (state, getters) => getters.authChecked,
    //     (newValue, oldValue) => {
    //       // If authentication is checked and user is logged in, connect to socket
    //       if (newValue && !$store.getters.jwt) {
    //         connectSocket($store.getters.jwt)
    //       }
    //     }
    //   )
    // }
  })
  onBeforeUnmount(() => {
    if (socket) {
      socket.disconnect()
    }
  })
</script>
