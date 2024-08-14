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
        <BaseButton>{{ mode === "login" ? "Login" : "Signup" }}</BaseButton>
        <BaseButton
          @click.prevent="switchAuthMode"
          class="text-amber-600 border-amber-600"
        >
          {{
            mode === "login" ? "Signup instead" : "Login instead"
          }}</BaseButton
        >
      </div>
    </form>
  </BaseCard>
</template>

<script>
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
        if (this.mode === "login") {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch("signup", {
            email: this.email,
            password: this.password,
          });
        }
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

      if (error.message.includes("EMAIL_EXISTS")) {
        this.error =
          "This email is already in use. Please try a different one or login.";
      } else if (error.message.includes("USER_DISABLED")) {
        this.error = "This account has been disabled. Please contact support.";
      } else if (error.message.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
        this.error = "Too many failed attempts. Please try again later.";
      } else if (error.message.includes("INVALID_LOGIN_CREDENTIALS")) {
        this.error = "Incorrect email or password. Please try again.";
      } else {
        this.error =
          error.message || "An unexpected error occurred. Please try again.";
      }
    },

    switchAuthMode() {
      this.mode === "login" ? (this.mode = "signup") : (this.mode = "login");
      this.formIsValid = true;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
