import { Store } from 'vuex'
import ThemeModule from './ThemeModule'

export function createStore() {
    return new Store({
        modules: {
            ThemeModule
        }
    })
}