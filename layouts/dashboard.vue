<template>
  <v-app light>
    <v-content>
      <v-container class="fill-height">
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="12">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  middleware: 'authenticate',
};
</script>