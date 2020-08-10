<template>
    <splitpanes class="default-theme" horizontal>
      <pane size="5">
        <banner></banner>
      </pane>
      <pane size="50">
        <splitpanes class="default-theme" vertical>
          <pane size="30">
            <div class="panel-header">Item of schema with SyncRule ('_local')</div>
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
            <div class="panel-header">Item of linked schema</div>
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
            <div class="panel-header">SyncRule</div>
            <monaco-editor
              width="100%"
              height="100%"
              theme="vs"
              language="json"
              :options="monaco_options"
              :value="syncRuleValue"
              @change="syncRuleCodeChange"
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
            <div class="panel-header">Result</div>
            <monaco-editor
              width="100%"
              height="100%"
              theme="vs"
              language="json"
              :options="monaco_result_options"
              :value="jsonataResult"
            ></monaco-editor>
          </pane>
        </splitpanes>
      </pane>
    </splitpanes>
</template>

<script>
import Banner from './Banner.vue';

const jsonata = require('jsonata');
const defaultValues = require('../data/defaultValues');

export default {
  name: 'Dashboard',
  components: {
    Banner,
  },
  data() {
    return {
      itemAValue: defaultValues.itemADefault,
      itemBValue: defaultValues.itemBDefault,
      syncRuleValue: defaultValues.syncRulesDefault,
      jsonataExtensionsValue: defaultValues.jsonataDefaultExtensions,
      jsonataResult: '',
      monaco_options: {
        lineNumbers: 'off',
        automaticLayout: true,
        autoIndent: true,
        autoSurround: true,
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
    itemACodeChange(value) {
      this.itemAValue = value;
      this.updateResult();
    },
    itemBCodeChange(value) {
      this.itemBValue = value;
      this.updateResult();
    },
    syncRuleCodeChange(value) {
      this.syncRuleValue = value;
      this.updateResult();
    },
    jsonataExtensionsCodeChange(value) {
      this.jsonataExtensionsValue = value;
      this.updateResult();
    },
    updateResult() {
      const itemAJson = JSON.parse(this.itemAValue);
      const itemBJson = JSON.parse(this.itemBValue);
      const evaluatedItems = {
        ...itemBJson,
        _local: {
          ...itemAJson,
        },
      };
      const singleLineExtensionsValue = this.jsonataExtensionsValue.replace(/\n/g, '');
      const jsonataExtensions = JSON.parse(singleLineExtensionsValue);

      const expression = jsonata(this.syncRuleValue);
      // eslint-disable-next-line no-restricted-syntax
      for (const extension of jsonataExtensions) {
        const singleLineCodeValue = extension.code.replace(/\n/g, '');
        // eslint-disable-next-line no-eval, no-loop-func
        const extensionMethod = eval(singleLineCodeValue);
        expression.registerFunction(extension.name, extensionMethod);
        console.log(`JSONata Extension loaded for '${extension.name}'`);
        console.log(extensionMethod);
      }
      this.jsonataResult = JSON.stringify(
        expression.evaluate(evaluatedItems), null, 1,
      );
    },
  },
  mounted() {
    this.updateResult();
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
  .panel-header {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    padding: 9px 0px;
    background-color: #3498db;
    box-shadow: 0 5px 10px rgba(0,0,0,.1);
    color: #fff;
    font: 700 11px/1 'Lato', sans-serif;
    text-shadow: 0 1px 1px rgba(0,0,0,.2);
    text-transform: uppercase;
    text-align: center;
  }
  .monaco_editor_container {
    position: absolute;
    top: 28px;
  }
</style>
