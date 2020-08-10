import Vue from 'vue';
import { Splitpanes, Pane } from 'splitpanes';
import MonacoEditor from 'monaco-editor-vue';
import 'splitpanes/dist/splitpanes.css';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.component('splitpanes', Splitpanes);
Vue.component('pane', Pane);
Vue.component('monaco-editor', MonacoEditor);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
