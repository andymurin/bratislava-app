<template>
  <BaseCard>
    <form @submit.prevent="submitForm" class="flex flex-col items-center gap-2">
      <div class="flex flex-col items-center gap-2">
        <label for="email" class="text-xl font-semibold">E-Mail</label>
        <input
          v-model.trim="email"
          type="email"
          id="email"
          class="block my-2 w-80 h-10 border-solid border-black border-2 rounded-md p-1 focus:outline-none focus:border-amber-600"
        />
      </div>
      <div class="flex flex-col items-center gap-2">
        <label for="password" class="text-xl font-semibold">Password</label>
        <input
          v-model.trim="password"
          type="password"
          id="password"
          class="block my-2 w-80 h-10 border-solid border-black border-2 rounded-md p-1 focus:outline-none focus:border-amber-600"
        />
      </div>
      <p v-if="!formIsValid">
        Invalid email or password (must be at least 6 characters). Please try
        again!
      </p>
      <div class="flex gap-8">
        <BaseButton>{{ mode === "login" ? "Login" : "Signup" }}</BaseButton>
        <BaseButton @click.prevent="switchAuthMode">
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
    };
  },
  methods: {
    submitForm() {
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
    },
    switchAuthMode() {
      this.mode === "login" ? (this.mode = "signup") : (this.mode = "login");
      this.formIsValid = true;
    },
  },
};
</script>
