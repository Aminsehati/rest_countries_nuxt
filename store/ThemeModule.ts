import { Module, VuexModule, VuexMutation } from "nuxt-property-decorator";


@Module({ name: 'ThemeModule', stateFactory: true, namespaced: true })
export default class ThemeModule extends VuexModule {
    private _darkMode: boolean = false

    public get getDarkMode(): any {
        return this._darkMode
    }

    @VuexMutation public setDarkMode(value: boolean) {
        this._darkMode = value
    }

}