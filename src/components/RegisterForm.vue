<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        autocomplete="off"
        @submit.prevent="handleSubmit(onSubmit)"
        class="registrationForm flex flex-col gap-2 mt-6"
      >
        <ValidationProvider
          name="First Name"
          rules="required|alpha_spaces"
          v-slot="v"
        >
          <div class="inputItem flex gap-3 p-3 bg-white dark:bg-dark_info">
            <Icon
              :icon="nameIcon"
              color="fill-gray-400 w-4"
              class="transition hover:fill-white"
            />
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="First Name"
              class="bg-transparent outline-none border-none text-sm w-full font-medium"
              v-model="fname"
            />
          </div>
          <div class="flex flex-col justify-end min-h-4 mt-2">
            <span
              class="text-xs text-red-400 transition"
              :class="
                (v.touched && v.failed) || (v.pristine && v.failed)
                  ? 'opacity-100 visible'
                  : 'opacity-0 invisible'
              "
              >{{ v.errors[0] }}</span
            >
          </div>
        </ValidationProvider>
        <ValidationProvider
          name="Last Name"
          rules="required|alpha_spaces"
          v-slot="v"
        >
          <div class="inputItem flex gap-3 p-3 bg-white dark:bg-dark_info">
            <Icon
              :icon="nameIcon"
              color="fill-gray-400 w-4"
              class="transition hover:fill-white"
            />
            <input
              type="text"
              name="lname"
              id="lname"
              placeholder="Last Name"
              class="bg-transparent outline-none border-none text-sm w-full font-medium"
              v-model="lname"
            />
          </div>
          <div class="flex flex-col justify-end min-h-4 mt-2">
            <span
              class="text-xs text-red-400 transition"
              :class="
                (v.touched && v.failed) || (v.pristine && v.failed)
                  ? 'opacity-100 visible'
                  : 'opacity-0 invisible'
              "
              >{{ v.errors[0] }}</span
            >
          </div>
        </ValidationProvider>
        <ValidationProvider
          name="Email Address"
          rules="required|email"
          v-slot="v"
        >
          <div class="inputItem flex gap-3 p-3 bg-white dark:bg-dark_info">
            <Icon
              :icon="emailIcon"
              color="fill-gray-400 w-4"
              class="transition hover:fill-white"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              class="bg-transparent outline-none border-none text-sm w-full font-medium"
              v-model="email"
            />
          </div>
          <div class="flex flex-col justify-end min-h-4 mt-2">
            <span
              class="text-xs text-red-400 transition"
              :class="
                (v.touched && v.failed) || (v.pristine && v.failed)
                  ? 'opacity-100 visible'
                  : 'opacity-0 invisible'
              "
              >{{ v.errors[0] }}</span
            >
          </div>
        </ValidationProvider>
        <ValidationProvider name="Password" rules="required|min:8" v-slot="v">
          <div class="inputItem flex gap-3 p-3 bg-white dark:bg-dark_info">
            <Icon
              :icon="pwdIcon"
              color="fill-gray-400 w-4"
              class="transition hover:fill-white"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              class="bg-transparent outline-none border-none text-sm w-full font-medium"
              v-model="password"
            />
          </div>
          <div class="flex flex-col justify-end min-h-4 mt-2">
            <span
              class="text-xs text-red-400 transition"
              :class="
                (v.touched && v.failed) || (v.pristine && v.failed)
                  ? 'opacity-100 visible'
                  : 'opacity-0 invisible'
              "
              >{{ v.errors[0] }}</span
            >
          </div>
        </ValidationProvider>
        <p
          class="text-base text-red-400 transition text-center w-full"
          :class="strapiError ? 'opacity-100 visible' : 'opacity-0 invisible'"
        >
          {{ strapiError }}
        </p>
        <button
          v-if="!submitLoader"
          type="submit"
          class="submitForm flex justify-center items-center gap-2 p-3 transition bg-accent hover:bg-accent_darken text-accent_lighten font-medium"
        >
          <Icon :icon="submitIcon" color="fill-white" class="w-4" />
          Register
        </button>
        <Loader v-else />
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'
import Loader from '@/components/Loader.vue'
import { mdiKeyVariant, mdiAt, mdiClipboardAccount, mdiSend } from '@mdi/js'
import { extend } from 'vee-validate'
import { required, email, alpha_spaces } from 'vee-validate/dist/rules'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
const axios = require('axios')

extend('email', {
  ...email,
  message: 'Not a valid email address',
})

extend('alpha_spaces', {
  ...alpha_spaces,
  message: '{_field_} must only contain alphabetic characters',
})

extend('min', {
  validate: (value, args) => {
    return value.length >= args.length
  },
  params: ['length'],
  message: '{_field_} must be at least {length} characters',
})

extend('required', {
  ...required,
  message: '{_field_} is required',
})

export default {
  name: 'RegisterForm',
  components: { Icon, ValidationProvider, ValidationObserver, Loader },
  data() {
    return {
      emailIcon: mdiAt,
      pwdIcon: mdiKeyVariant,
      submitIcon: mdiSend,
      nameIcon: mdiClipboardAccount,
      email: '',
      fname: '',
      lname: '',
      password: '',
      strapiError: null,
      submitLoader: false,
    }
  },
  methods: {
    async onSubmit() {
      this.submitLoader = true
      axios
        .post(`${process.env.GRIDSOME_STRAPI_URL}/api/auth/local/register`, {
          givenName: this.fname,
          familyName: this.lname,
          name: `${this.fname} ${this.lname}`,
          username: this.email,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // Handle success.
          // console.log('Well done!')
          // console.log('User profile', response.data.user)
          // console.log('User token', response.data.jwt)
          this.submitLoader = false
          this.$emit('registerSuccess', {
            user: response.data.user,
            jwt: response.data.jwt,
          })
        })
        .catch((error) => {
          // Handle error.
          // console.log('An error occurred:', error.response.data.error)
          this.strapiError = error.response.data.error.message
          this.submitLoader = false
        })
    },
  },
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
