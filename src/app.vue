<template lang="pug">
  v-app
    router-view
    notifications(group="simple-notifications" position="right bottom")
</template>

<script lang="ts" src="./app.ts">
</script>

<style lang="stylus">
.page-header {
  width: 100%;
  margin: 2rem 0;
  display: flex;
  align-items: center;

  .v-btn {
    @media screen and (min-width: 960px) {
      margin-left: -45px;
    }
  }
}

.page-title {
  font-size: 24px;
  font-weight: 500;
}

.page-sub-title {
  font-size: 18px;
  font-weight: 500;
}

.section-sub-title {
  font-size: 16px;
  font-weight: 400;
}

.action-element {
  cursor: pointer;
}
</style>