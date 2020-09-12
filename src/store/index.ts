import { createStore } from 'vuex';

interface objConfig {
  [key: string]: any;
}

const modules: objConfig = {};
const require_module = require.context('./modules', false, /.ts$/);
require_module.keys().forEach(file_name => {
  modules[file_name.slice(2, -3)] = require_module(file_name).default;
});

export default createStore({
  modules
});
