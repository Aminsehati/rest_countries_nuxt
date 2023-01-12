<template>
  <div :class="['form-group', { 'dark-mode': dark_mode }]">
    <input
      :type="type"
      class="form-control"
      :placeholder="placeholder"
      v-model="title"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, VModel, getModule } from 'nuxt-property-decorator'
import ThemeModule from '~/store/ThemeModule'
import './style.scss'
@Component({})
export default class TextFieldComponent extends Vue {
  @Prop({ type: String, default: '' }) type!: string
  @Prop({ type: String, default: '' }) placeholder!: string
  @VModel() title!: string
  darkMode: boolean = false
  public get dark_mode() {
    const _ThemeModule = getModule(ThemeModule, this.$store)
    return _ThemeModule.getDarkMode
  }
}
</script>