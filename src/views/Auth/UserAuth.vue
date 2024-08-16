<template>
  <BaseCard v-if="!!error" class="flex flex-col justify-center items-center">
    <h1 class="text-2xl font-semibold my-5">An error occurred.</h1>
    <p class="font-semibold text-xl">{{ error }}</p>
    <div class="mt-6">
      <BaseButton @click="handleError">Close</BaseButton>
    </div>
  </BaseCard>
  <BaseCard v-else-if="isLoading">
    <p class="font-semibold text-xl">Authenticating...</p>
  </BaseCard>
  <BaseCard v-else>
    <form @submit.prevent="submitForm" class="flex flex-col items-center gap-2">
      <div class="flex flex-col items-center gap-1">
        <label for="email" class="text-xl font-semibold">E-Mail</label>
        <input
          v-model.trim="email"
          type="email"
          id="email"
          class="block my-1 w-80 h-8 border-solid border-black border-2 rounded-md p-1 focus:outline-none focus:border-amber-600"
        />
      </div>
      <div class="flex flex-col items-center gap-1">
        <label for="password" class="text-xl font-semibold">Password</label>
        <input
          v-model.trim="password"
          type="password"
          id="password"
          class="block my-1 w-80 h-8 border-solid border-black border-2 rounded-md p-1 focus:outline-none focus:border-amber-600"
        />
      </div>
      <p v-if="!formIsValid">
        Invalid email or password (must be at least 6 characters). Please try
        again!
      </p>
      <div class="flex gap-8">
        <BaseButton>{{ submitButtonText }}</BaseButton>
        <BaseButton
          @click.prevent="switchAuthMode"
          class="text-amber-600 border-amber-600"
        >
          {{ switchModeButtonText }}
        </BaseButton>
      </div>
    </form>
  </BaseCard>
</template>

<script>
const ERROR_MESSAGES = {
  EMAIL_EXISTS:
    "This email is already in use. Please try a different one or login.",
  USER_DISABLED: "This account has been disabled. Please contact support.",
  TOO_MANY_ATTEMPTS_TRY_LATER:
    "Too many failed attempts. Please try again later.",
  INVALID_LOGIN_CREDENTIALS: "Incorrect email or password. Please try again.",
  DEFAULT: "An unexpected error occurred. Please try again.",
};

export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonText() {
      return this.mode === "login" ? "Login" : "Signup";
    },
    switchModeButtonText() {
      return this.mode === "login" ? "Signup instead" : "Login instead";
    },
  },
  methods: {
    async submitForm() {
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      try {
        await this.$store.dispatch(this.mode, {
          email: this.email,
          password: this.password,
        });
        const redirectUrl = "/" + (this.$route.query.redirect || "venues");
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.handleAuthError(err);
      } finally {
        this.isLoading = false;
      }
    },
    handleAuthError(error) {
      console.error("Authentication error:", error);
      const errorMessage = error.message;
      for (const [key, message] of Object.entries(ERROR_MESSAGES)) {
        if (errorMessage.includes(key)) {
          this.error = message;
          return;
        }
      }
      this.error = ERROR_MESSAGES.DEFAULT;
    },
    switchAuthMode() {
      this.mode = this.mode === "login" ? "signup" : "login";
      this.formIsValid = true;
      this.error = null;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
