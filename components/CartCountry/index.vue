<template>
  <div class="country_item">
    <nuxt-link :to="`/country/${countryInfo.name}`">
      <figure :class="['country-image', { 'dark-mode': dark_mode }]">
        <img :src="countryInfo.image" />
      </figure>
      <div :class="['country_content', { 'dark-mode': dark_mode }]">
        <div class="country-name">
          <span class="block text-16 font-800 text-dark1">
            {{ countryInfo.name }}
          </span>
        </div>
        <div class="country-population">
          <span class="font-700"> Population : </span>
          <span>
            {{ countryInfo.population }}
          </span>
        </div>
        <div class="country-region">
          <span class="font-700"> Region : </span>
          <span>
            {{ countryInfo.region }}
          </span>
        </div>
        <div class="country-region">
          <span class="font-700"> Capital : </span>
          <span>
            {{ countryInfo.capital }}
          </span>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, getModule } from 'nuxt-property-decorator'
import ThemeModule from '~/store/ThemeModule'
import './style.scss'
@Component({})
export default class CartCountryComponent extends Vue {
  @Prop({}) countryInfo!: any
  public get dark_mode() {
    const _ThemeModule = getModule(ThemeModule, this.$store)
    return _ThemeModule.getDarkMode
  }
}
</script>