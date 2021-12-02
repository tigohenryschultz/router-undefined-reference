import {createStore} from 'vuex'
import parentStore from "./parentStore"

const debug = process.env.NODE_ENV !== 'production'

export const store = createStore({
  ...parentStore,
  modules: {},
  strict: debug
});

export default store
