<template>
  <div>
    <Form
      autocomplete="off"
      @submit="onSubmit"
      class="registrationForm flex flex-col gap-2 mt-6"
    >
      <div class="inputItem flex gap-3 p-3 bg-white dark:bg-dark_info">
        <Icon
          :icon="nameIcon"
          color="fill-gray-400 w-4"
          class="transition hover:fill-white"
        />
        <Field
          type="text"
          name="fname"
          id="fname"
          placeholder="First Name"
          class="bg-transparent outline-none border-none text-sm w-full font-medium"
          v-model="fname"
          :rules="validateName"
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
      </div>

      <div class="inputItem flex gap-3 p-3 bg-white dark:bg-dark_info">
        <Icon
          :icon="nameIcon"
          color="fill-gray-400 w-4"
          class="transition hover:fill-white"
        />
        <Field
          type="text"
          name="lname"
          id="lname"
          placeholder="Last Name"
          class="bg-transparent outline-none border-none text-sm w-full font-medium"
          v-model="lname"
          :rules="validateName"
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
      </div>

      <div class="inputItem flex gap-3 p-3 bg-white dark:bg-dark_info">
        <Icon
          :icon="emailIcon"
          color="fill-gray-400 w-4"
          class="transition hover:fill-white"
        />
        <Field
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          class="bg-transparent outline-none border-none text-sm w-full font-medium"
          v-model="email"
          :rules="validateEmail"
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
      </div>

      <p
        class="text-base text-red-400 transition text-center w-full"
        :class="strapiError ? 'opacity-100 visible' : 'opacity-0 invisible'"
      >
        {{ strapiError }}
      </p>
      <button
        aria-label="Register"
        v-if="!submitLoader"
        type="submit"
        class="submitForm flex justify-center items-center gap-2 p-3 transition bg-accent hover:bg-accent_darken text-accent_lighten font-medium"
      >
        <Icon :icon="submitIcon" color="fill-white" class="w-4" />
        Register
      </button>
      <Loader v-else />
    </Form>
  </div>
</template>

<script setup lang="ts">
  import {
    mdiKeyVariant as pwdIcon,
    mdiAt as emailIcon,
    mdiClipboardAccount as nameIcon,
    mdiSend as submitIcon,
  } from '@mdi/js'
  import { Form, Field, ErrorMessage } from 'vee-validate'

  const user = useStrapiUser()
  const token = useStrapiToken()
  const { register } = useStrapiAuth()

  const emit = defineEmits(['registerSuccess'])

  const email = ref('')
  const fname = ref('')
  const lname = ref('')
  const password = ref('')
  const strapiError = ref('')
  const submitLoader = ref(false)

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
  const validateName = (value: string) => {
    // if the field is empty
    if (!value) {
      return 'This field is required'
    }

    // All is good
    return true
  }
  const validatePassword = (value: string) => {
    // if the field is empty
    if (!value) {
      return 'This field is required'
    }

    if (value.length < 8) {
      return 'Password must be at least 8 characters'
    }

    // All is good
    return true
  }

  const onSubmit = async () => {
    submitLoader.value = true
    try {
      await register({
        username: email.value,
        email: email.value,
        password: password.value,
        name: `${fname.value} ${lname.value}`,
        givenName: fname.value,
        familyName: lname.value,
      })

      submitLoader.value = false
      emit('registerSuccess', {
        user: user.value,
        jwt: token.value,
      })
    } catch (error: any) {
      strapiError.value = error.error.message
      submitLoader.value = false
    }
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
