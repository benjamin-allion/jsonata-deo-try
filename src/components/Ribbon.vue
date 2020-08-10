<template>
  <div class="ribbon ribbon-bottom-left">
    <span>Powered by Jsonata</span>
  </div>
</template>
<script>
export default {
  name: 'Ribbon',
};
</script>
<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Lato:700);
  body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f0f0;
  }
  .box {
  position: relative;
  max-width: 600px;
  width: 90%;
  height: 400px;
  background: #fff;
  box-shadow: 0 0 15px rgba(0,0,0,.1);
  }

  /* common */
  .ribbon {
    width: 225px;
    height: 27px;
    overflow: hidden;
    position: absolute;
  }
  .ribbon::before,
  .ribbon::after {
  position: absolute;
  z-index: -1;
  content: '';
  display: block;
  border: 5px solid #2980b9;
  }
  .ribbon span {
    position: absolute;
    display: block;
    width: 225px;
    padding: 8px 0;
    background-color: #ff4747;
    box-shadow: 0 5px 10px rgba(0,0,0,.1);
    color: #fff;
    font: 700 10px/1 'Lato', sans-serif;
    text-shadow: 0 1px 1px rgba(0,0,0,.2);
    text-transform: uppercase;
    text-align: center;
  }

  /* bottom left*/
  .ribbon-bottom-left {
  bottom: 0px;
  left: -10px;
  }
  .ribbon-bottom-left::before,
  .ribbon-bottom-left::after {
  border-bottom-color: transparent;
  border-left-color: transparent;
  }
  .ribbon-bottom-left::before {
  bottom: 0;
  right: 0;
  }
  .ribbon-bottom-left::after {
  top: 0;
  left: 0;
  }
</style>
