<template>
  <div id="banner">
    <div id="banner-strip" class="bannerpart">
      <div id="banner1">JSONata.Deo - Extension</div>
      <div id="banner4">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
};
</script>

<style scoped>
  #banner {
    height: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
    width: 100%;
    font-family: Source Sans Pro,sans-serif;
    font-weight: 400;
    color: #fff;
    background-color: #285154;
    overflow: auto;
  }
  #banner-strip {
    display: flex;
    justify-content: space-between;
  }
  #banner1 {
    padding: 8px;
  }
</style>
