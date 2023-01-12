<template>
  <div :class="['country_page', { 'dark-mode': dark_mode }]">
    <div class="container">
      <div class="handler-action">
        <nuxt-link to="/" :class="{ 'dark-mode': dark_mode }">
          <i class="fas fa-arrow-left"></i>
          back
        </nuxt-link>
      </div>
      <div class="country_wrapper">
        <div class="country-image">
          <figure class="country-image-cover">
            <img :src="infoCountry.image" v-if="infoCountry.image" />
          </figure>
        </div>
        <div class="country-content">
          <h2 class="country-title text-20 font-900">
            {{ infoCountry.name }}
          </h2>
          <div class="flex mb-10 flex-wrap">
            <div class="w-1/2">
              <span class="font-700 text-16"> Native Name : </span>
              <span class="text-16">
                {{ infoCountry.nativeName }}
              </span>
            </div>
            <div class="w-1/2 flex">
              <span class="font-700 text-16"> Top level Dommain : </span>
              <div class="">
                <span
                  v-for="(item, index) in infoCountry.topLevel"
                  :key="index"
                >
                  {{ item }}
                  {{ infoCountry.topLevel.length !== index ? '' : '،' }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mb-10">
            <div class="w-1/2">
              <span class="font-700 text-16"> Population : </span>
              <span class="text-16">
                {{ infoCountry.population }}
              </span>
            </div>
            <div class="w-1/2 flex">
              <span class="font-700 text-16"> Currencies : </span>
              <div v-for="(item, index) in infoCountry.currencies" :key="index">
                <span>
                  {{ item.name }}
                  {{ infoCountry.currencies.length !== index ? '' : '،' }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mb-10">
            <div class="w-1/2">
              <span class="font-700 text-16"> Region : </span>
              <span class="text-16">
                {{ infoCountry.region }}
              </span>
            </div>
            <div class="w-1/2 flex">
              <span class="font-700 text-16"> Languages : </span>
              <div class="text-16">
                <span
                  v-for="(item, index) in infoCountry.languages"
                  :key="index"
                >
                  {{ item.name }}
                  {{ infoCountry.languages.length !== index + 1 ? '،' : '' }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mb-10">
            <div>
              <span class="font-700 text-16"> Sub Region : </span>
              <span class="text-16">
                {{ infoCountry.subregion }}
              </span>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="capital flex">
              <span class="font-700 text-16"> Captial : </span>
              <div class="ml-10">
                <span
                  v-for="(item, index) in infoCountry.capital"
                  :key="index"
                  class="text-16"
                >
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
          <div class="border-country-wrapper">
            <div
              class="border-contries flex flex-wrap"
              v-if="infoCountry.bordersCountry"
            >
              <span class="text-16 font-700 mr-15 inline-block">
                Border Countries :
              </span>
              <div class="flex flex-wrap">
                <nuxt-link
                  :to="`/country/${border}`"
                  v-for="(border, index) in infoCountry.bordersCountry"
                  :key="index"
                  :class="['mb-15', { 'dark-mode': dark_mode }]"
                >
                  {{ border }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component, getModule } from 'nuxt-property-decorator'
import { ICountryService } from '~/services/Country/ICountryService'
import { container } from '~/services/Ioc/inversify.config'
import { SYMBOLS } from '~/services/Ioc/SYMBOLS'
import ThemeModule from '~/store/ThemeModule'
import { Country } from '@/types/country.type'
import './style.scss'
@Component({
  async asyncData(ctx: Context) {
    try {
      const countryService = container.get<ICountryService>(
        SYMBOLS.ICountryService
      )
      const searchCountries = await countryService.searchCountries(
        ctx.params.name
      )
      const data = searchCountries[0]
      const infoCountry = {
        name: data?.name,
        image: data?.flags?.svg,
        nativeName: data?.nativeName,
        population: data?.population,
        currencies: data?.currencies,
        region: data?.region,
        languages: data?.languages,
        subregion: data?.subregion,
        capital: data?.capital,
        bordersCountry: data?.borders,
        topLevel: data?.topLevelDomain,
      }
      return {
        infoCountry,
      }
    } catch (error) {}
  },
})
export default class CountrySinglePage extends Vue {
  infoCountry: Country = new Country()
  public get dark_mode() {
    const _ThemeModule = getModule(ThemeModule, this.$store)
    return _ThemeModule.getDarkMode
  }
}
</script>