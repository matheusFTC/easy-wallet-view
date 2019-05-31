<template lang="pug">
  .wrapper-view
    v-navigation-drawer(persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app)
      v-list
        v-list-tile(value="true"
          v-for="(item, index) in menu"
          :key="index"
          :to="{ name: item.to }")
          v-list-tile-action
            v-icon(v-html="item.icon")
          v-list-tile-content
            v-list-tile-title(v-text="item.title")
    v-toolbar(app
      flat
      prominent
      color="primary"
      dark)
      v-toolbar-side-icon(@click.stop="drawer = !drawer")
      v-toolbar-title(v-text="title")
      v-spacer
      v-toolbar-items
        v-btn(flat @click="logoff"): i.material-icons power_settings_new
    v-content
      router-view
</template>

<script lang="ts" src="./dashboard.ts">
</script>