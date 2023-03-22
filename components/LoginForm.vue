<template>
  <div>
    <Form
      autocomplete="off"
      @submit="onSubmit"
      class="registrationForm flex flex-col gap-2 mt-6"
    >
      <div class="inputItem flex gap-3 p-3 bg-white dark:bg-dark_info">
        <Icon
          :icon="emailIcon"
          color="fill-gray-400 w-4"
          class="transition hover:fill-white"
        />
        <Field
          type="email"
          name="email"
          :rules="validateEmail"
          id="email"
          placeholder="Email Address"
          class="bg-transparent outline-none border-none text-sm w-full font-medium"
          v-model="email"
        />
      </div>
      <div class="flex flex-col justify-end min-h-4 mt-2">
        <!-- <span
            class="text-xs text-red-400 transition"
            :class="
              (v.touched && v.failed) || (v.pristine && v.failed)
                ? 'opacity-100 visible'
                : 'opacity-0 invisible'
            "
            >{{ v.errors[0] }}</span
          > -->
        <ErrorMessage name="email" />
      </div>
      <div class="inputItem flex gap-3 p-3 bg-white dark:bg-dark_info">
        <Icon
          :icon="pwdIcon"
          color="fill-gray-400 w-4"
          class="transition hover:fill-white"
        />
        <Field
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          class="bg-transparent outline-none border-none text-sm w-full font-medium"
          v-model="password"
          :rules="validatePassword"
        />
      </div>
      <div class="flex flex-col justify-end min-h-4 mt-2">
        <!-- <span
            class="text-xs text-red-400 transition"
            :class="
              (v.touched && v.failed) || (v.pristine && v.failed)
                ? 'opacity-100 visible'
                : 'opacity-0 invisible'
            "
            >{{ v.errors[0] }}</span
          > -->
        <ErrorMessage name="password" />
      </div>
      <p
        class="text-base text-red-400 transition text-center w-full"
        :class="strapiError ? 'opacity-100 visible' : 'opacity-0 invisible'"
      >
        {{ strapiError }}
      </p>
      <button
        aria-label="Log in"
        v-if="!submitLoader"
        type="submit"
        class="submitForm flex justify-center items-center gap-2 p-3 transition bg-accent hover:bg-accent_darken text-accent_lighten font-medium"
      >
        <Icon :icon="submitIcon" color="fill-white" class="w-4" />
        Log in
      </button>
      <Loader v-else />
    </Form>
  </div>
</template>

<script setup lang="ts">
  import {
    mdiKeyVariant as pwdIcon,
    mdiAt as emailIcon,
    mdiSend as submitIcon,
  } from '@mdi/js'
  import { Form, Field, ErrorMessage } from 'vee-validate'

  const config = useRuntimeConfig()
  const user = useStrapiUser()
  const token = useStrapiToken()
  const { login } = useStrapiAuth()

  const email = ref('')
  const password = ref('')
  const strapiError = ref('')
  const submitLoader = ref(false)

  const emit = defineEmits(['loginSuccess'])

  const validateEmail = (value: string) => {
    // if the field is empty
    if (!value) {
      return 'This field is required'
    }

    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (!regex.test(value)) {
      return 'Not a valid email address'
    }

    // All is good
    return true
  }
  const validatePassword = (value: string) => {
    // if the field is empty
    if (!value) {
      return 'This field is required'
    }

    // All is good
    return true
  }
  const onSubmit = async () => {
    submitLoader.value = true
    try {
      await login({ identifier: email.value, password: password.value })
      submitLoader.value = false
      emit('loginSuccess', {
        user: user.value,
        jwt: token.value,
      })
    } catch (error: any) {
      strapiError.value = error.error.message
      submitLoader.value = false
    }
    // try {
    //   const response: any = await $fetch(
    //     `${config.public.strapi.url}/api/auth/local`,
    //     {
    //       method: 'POST',
    //       body: {
    //         identifier: email.value,
    //         password: password.value,
    //       },
    //     }
    //   )

    //   submitLoader.value = false
    //   emit('loginSuccess', {
    //     user: response.user,
    //     jwt: response.jwt,
    //   })
    // } catch (error: any) {
    //   strapiError.value = error.response.data.error.message
    //   submitLoader.value = false
    // }
  }
</script>

<style lang="scss" scoped>
  .registrationForm {
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      color: white !important;
      -webkit-box-shadow: 0 0 0px 1000px $theme_lighter inset !important;
      box-shadow: 0 0 0px 1000px $theme_lighter inset !important;
    }
  }
</style>
