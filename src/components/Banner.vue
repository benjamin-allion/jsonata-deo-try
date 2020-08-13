<template>
  <div id="banner">
    <div id="banner-strip" class="bannerpart">
      <div id="title">JSONata.Deo - Extension</div>
      <div id="sample-selector">
        <dropdown :options="sampleCollection"
                  :selected="selectedSample"
                  v-on:updateOption="chooseSample"
                  :placeholder="'Choose an example...'">
        </dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from './Dropdown.vue';

const sampleCollection = require('../data/sampleCollection');

export default {
  name: 'Banner',
  components: {
    Dropdown,
  },
  data() {
    return {
      sampleCollection,
      selectedSample: {},
    };
  },
  methods: {
    chooseSample(value) {
      console.log(value);
    },
  },
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
  #title {
    padding: 8px;
  }
  #sample-selector {
    z-index: 1000;
    position: fixed;
    top: 6px;
    right: -18px;
    font: 700 11px/1 'Lato', sans-serif;
  }
  .dropdown-menu {
    background: #137ec5;
    right:0;
    left: auto;
  }
</style>
