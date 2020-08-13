<template>
    <splitpanes class="default-theme" horizontal>
      <pane size="5" class="overflow-visible">
        <banner
          v-on:sampleSelected = "sampleSelected"
        >
        </banner>
      </pane>
      <pane size="50">
        <splitpanes class="default-theme" vertical>
          <pane size="30">
            <div class="panel-header">Item A - Origin ('_local.fields')</div>
            <monaco-editor
              width="100%"
              height="100%"
              theme="vs"
              language="json"
              :options="monaco_options"
              :value="itemAValue"
              @change="itemACodeChange"
            ></monaco-editor>
          </pane>
          <pane size="30">
            <div class="panel-header">Item B - Target ('fields')</div>
            <monaco-editor
              width="100%"
              height="100%"
              theme="vs"
              language="json"
              :options="monaco_options"
              :value="itemBValue"
              @change="itemBCodeChange"
            ></monaco-editor>
          </pane>
          <pane size="40">
            <div class="panel-header">Jsonata Expression</div>
            <monaco-editor
              width="100%"
              height="100%"
              theme="vs"
              language="json"
              :options="monaco_options"
              :value="jsonataExpressionValue"
              @change="jsonataExpressionCodeChange"
            ></monaco-editor>
          </pane>
        </splitpanes>
      </pane>
      <pane size="45">
        <splitpanes class="default-theme" vertical>
          <pane size="50">
            <div class="panel-header">Jsonata Extensions</div>
            <monaco-editor
              width="100%"
              height="100%"
              theme="vs"
              language="javascript"
              :options="monaco_options"
              @change="jsonataExtensionsCodeChange"
              :value="jsonataExtensionsValue"
            ></monaco-editor>
          </pane>
          <pane size="50">
            <div class="panel-header with_select">
              <dropdown :options="jsonataOperations"
                        :selected="resultType"
                        v-on:updateOption="updateResult"
                        :placeholder="jsonataOperations[0].name">
              </dropdown>
            </div>
            <monaco-editor
              width="100%"
              height="100%"
              theme="vs"
              language="json"
              :options="monaco_result_options"
              :value="result"
            ></monaco-editor>
          </pane>
        </splitpanes>
      </pane>
    </splitpanes>
</template>

<script>
import Dropdown from './Dropdown.vue';
import Banner from './Banner.vue';

const JsonataService = require('../services/jsonata');

const { ResultTypes } = JsonataService;
const sampleCollection = require('../data/sampleCollection');

const defaultSample = sampleCollection[0];

export default {
  name: 'Dashboard',
  components: {
    Banner,
    Dropdown,
  },
  data() {
    return {
      jsonataOperations: [
        { name: 'Jsonata Result (New object)', value: ResultTypes.JSONATA },
        { name: '_.merge Jsonata result (New object -> Item A)', value: ResultTypes.MERGE },
        { name: '_.assign Jsonata result (New object -> Item A)', value: ResultTypes.ASSIGN },
        { name: '_.extend Jsonata result (New object -> Item A)', value: ResultTypes.EXTEND },
      ],
      resultType: '',
      itemAValue: defaultSample.itemA,
      itemBValue: defaultSample.itemB,
      jsonataExpressionValue: defaultSample.jsonataExpression,
      jsonataExtensionsValue: defaultSample.jsonataExtensions,
      result: '',
      monaco_options: {
        language: 'json',
        lineNumbers: 'off',
        automaticLayout: true,
        autoIndent: true,
        autoSurround: true,
        glyphMargin: true,
        minimap: {
          enabled: false,
        },
      },
      monaco_result_options: {
        automaticLayout: true,
        autoIndent: true,
        autoSurround: true,
        minimap: {
          enabled: false,
        },
        readOnly: true,
      },
    };
  },
  methods: {
    sampleSelected(value) {
      this.itemAValue = value.itemA;
      this.itemBValue = value.itemB;
      this.jsonataExpressionValue = value.jsonataExpression;
      this.jsonataExtensionsValue = value.jsonataExtensions;
    },
    itemACodeChange(value) {
      this.itemAValue = value;
      this.updateResult();
    },
    itemBCodeChange(value) {
      this.itemBValue = value;
      this.updateResult();
    },
    jsonataExpressionCodeChange(value) {
      this.jsonataExpressionValue = value;
      this.updateResult();
    },
    jsonataExtensionsCodeChange(value) {
      this.jsonataExtensionsValue = value;
      this.updateResult();
    },
    updateResult(resultType) {
      if (resultType) {
        this.resultType = resultType;
      }
      const evaluatedObjects = {
        itemA: JSON.parse(this.itemAValue),
        itemB: JSON.parse(this.itemBValue),
      };
      this.result = JsonataService.getJsonataResult(
        evaluatedObjects, this.jsonataExpressionValue, this.jsonataExtensionsValue, this.resultType,
      );
    },
  },
  mounted() {
    this.updateResult(this.jsonataOperations[0]);
  },
};
</script>

<style>
  .splitpanes__pane {
    box-shadow: 0 0 3px rgba(0, 0, 0, .2) inset;
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;
  }
  .overflow-visible {
    overflow: visible;
  }
  .panel-header {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    padding: 9px 10px;
    background-color: #3498db;
    box-shadow: 0 5px 10px rgba(0,0,0,.1);
    color: #fff;
    font: 700 11px/1 'Lato', sans-serif;
    text-shadow: 0 1px 1px rgba(0,0,0,.2);
    text-transform: uppercase;
  }
  .panel-header.with_select{
    padding: 4px 10px;
  }
  .monaco_editor_container {
    position: absolute;
    top: 28px;
  }
  .default-theme.splitpanes .splitpanes .splitpanes__splitter {
    width: 8px;
    border-left: 1px solid #cacaca;
    margin-left: -1px;
    background-color: #efefef;
  }
  .vs .monaco-scrollable-element > .scrollbar > .slider {
    background: rgba(100, 100, 100, .08);
  }
</style>
