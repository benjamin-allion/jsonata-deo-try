<template>
    <div id="banner">
      <div id="banner-strip" class="bannerpart">
        <div id="title">{{ $t('header.title') }}</div>
        <div id="sample-selector">
          <dropdown :options="sampleCollection"
                    :selected="selectedSample"
                    float='right'
                    v-on:updateOption="chooseSample"
                    :placeholder="this.$i18n.t('header.selectExample')">
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
      this.$emit('sampleSelected', value);
    },
  },
};
</script>

<style scoped>
  #banner {
    z-index: 2;
    height: 100%;
    width: 100%;
    font-family: Source Sans Pro,sans-serif;
    font-weight: 400;
    color: #fff;
    background-color: #285154;
  }
  #banner-strip {
    margin: 0;
    position: relative;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  #title {
    padding: 8px;
  }
  #sample-selector {
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
