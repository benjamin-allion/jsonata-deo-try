<template>
    <splitpanes class="default-theme" horizontal>
      <pane size="5" class="overflow-visible">
        <banner/>
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
            <div class="panel-header with_select">
              <dropdown :options="jsonataOperations"
                        :selected="jsonataOperation"
                        v-on:updateOption="updateResult"
                        :placeholder="'Jsonata Result (B -> A)'">
              </dropdown>
            </div>
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
import Dropdown from './Dropdown.vue';
import Banner from './Banner.vue';

const jsonata = require('jsonata');
const safeEval = require('safe-eval');

export default {
  name: 'Dashboard',
  components: {
    Banner,
    Dropdown,
  },
  data() {
    return {
      jsonataOperations: [{ name: 'Jsonata Result (B -> A)' }, { name: 'Merge Jsonata result into A' }, { name: 'Assign Jsonata result into A' }],
      jsonataOperation: { name: 'Jsonata Result (B -> A)' },
      itemAValue: '',
      itemBValue: '',
      syncRuleValue: '',
      jsonataExtensionsValue: '',
      jsonataResult: '',
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
        const extensionMethod = safeEval(singleLineCodeValue);
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

<style scope>
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
