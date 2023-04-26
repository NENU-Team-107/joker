<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const routerTo = (name) => {
  if (route.name !== name) {
    router.push({ name });
  }
};
</script>

<script>
export default {
  name: "PageLayout",
};
</script>

<template>
  <Layout
    :style="{
      border: '1px solid #d7dde4',
      background: '#f5f7f9',
      position: 'relative',
      'border-radius': '4px',
      overflow: 'hidden',
    }"
  >
    <Header class="layout-header">
      <Menu mode="horizontal" theme="light" :active-name="active" @on-select="routerTo">
        <div class="left">
          <MenuItem name="home">Home</MenuItem>
          <MenuItem name="about"></MenuItem>
          <MenuItem name="gdp">GDP</MenuItem>
        </div>
      </Menu>
    </Header>
    <Content class="layout-content">
      <RouterView />
    </Content>
    <Footer class="layout-footer-center"> </Footer>
  </Layout>
</template>

<style></style>
