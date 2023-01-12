<template>
  <header :class="['header', { 'dark-mode': dark_mode }]">
    <div class="container">
      <div class="logo__area">
        <nuxt-link to="/">
          <h2 class="text-16 font-800">Where in the world ?</h2>
        </nuxt-link>
      </div>
      <div class="dark-mode">
        <span @click="activeDarkMode" class="cursor-pointer">
          <i class="fas fa-moon mr-10"></i>
          {{ dark_mode ? 'Light Mode' : 'Dark Mode' }}
        </span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component, getModule } from 'nuxt-property-decorator'
import ThemeModule from '~/store/ThemeModule'
import './style.scss'
@Component({})
export default class HeaderComponent extends Vue {
  darkMode: boolean = false
  activeDarkMode() {
    const _ThemeModule = getModule(ThemeModule, this.$store)
    _ThemeModule.setDarkMode(!_ThemeModule.getDarkMode); 
  }
  public get dark_mode() {
    const _ThemeModule = getModule(ThemeModule, this.$store);
    return _ThemeModule.getDarkMode
  }
}
</script>