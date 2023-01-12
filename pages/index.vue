<template>
  <div :class="['Home', { 'dark-mode': dark_mode }]">
    <div class="container">
      <div class="filters_wrapper">
        <div class="left__">
          <TextFeild placeholder="Search for a country... " v-model="keyword" />
        </div>
        <div class="right__">
          <Dropdown @onChnage="changeDropdownItem" />
        </div>
      </div>
      <div class="grid grid-cols-4 gap-x-50 gap-y-70 list-country-items">
        <div v-for="(item, index) in listCountries" :key="index">
          <CartCountry :countryInfo="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component, Watch, getModule } from 'nuxt-property-decorator'
import { container, lazyInject } from '@/services/Ioc/inversify.config'
import './style.scss'
import { SYMBOLS } from '~/services/Ioc/SYMBOLS'
import { ICountryService } from '~/services/Country/ICountryService'
import ThemeModule from '@/store/ThemeModule'
@Component({
  async asyncData(ctx: Context) {
    try {
      const countryService = container.get<ICountryService>(
        SYMBOLS.ICountryService
      )
      const getCountries = await countryService.getCountries()
      const data = getCountries.map((item: any) => {
        return {
          name: item?.name,
          image: item?.flag,
          capital: item?.capital,
          population: item?.population,
          region: item?.region,
        }
      })
      return {
        listCountries: data,
      }
    } catch (error) {
      console.log(error)
    }
  },
})
export default class HomePage extends Vue {
  keyword: string = ''
  listCountries: any[] = []
  @lazyInject(SYMBOLS.ICountryService) _ICountryService!: ICountryService
  timeout: any = null
  changeDropdownItem(item: any) {
    this.getRegionCountry(item.name)
  }
  async getRegionCountry(region: string) {
    try {
      const httpReponse = await this._ICountryService.getRegionCountry(region)
      const data = httpReponse.map((item: any) => {
        return {
          ...item,
          name: item?.name,
          population: item?.population,
          region: item?.region,
          capital: item?.capital,
          image: item?.flags?.svg,
        }
      })
      this.listCountries = data
    } catch (error) {}
  }
  @Watch('keyword', { immediate: false })
  onChnageKeyword(value: string) {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.timeout = setTimeout(() => {
      this.searchListCountries(value)
    }, 700)
  }
  async searchListCountries(value: string) {
    try {
      const httpResponse = await this._ICountryService.searchCountries(value)
      const data = httpResponse.map((item: any) => {
        return {
          ...item,
          name: item?.name,
          image: item?.flag,
          capital: item.capital,
          population: item.population,
          region: item.subregion,
        }
      })
      this.listCountries = data
    } catch (error) {}
  }
  public get dark_mode(){
    const _ThemeModule = getModule(ThemeModule, this.$store)
    return _ThemeModule.getDarkMode
  }
}
</script>