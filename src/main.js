import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { Splitpanes, Pane } from 'splitpanes';
import MonacoEditor from 'monaco-editor-vue';
import 'splitpanes/dist/splitpanes.css';
import messages from './i18n/messages';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.component('splitpanes', Splitpanes);
Vue.component('pane', Pane);
Vue.component('monaco-editor', MonacoEditor);
Vue.use(VueI18n);

const locale = navigator.language;
const i18n = new VueI18n({
  locale,
  fallbackLocale: 'en',
  messages,
});

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount('#app');
