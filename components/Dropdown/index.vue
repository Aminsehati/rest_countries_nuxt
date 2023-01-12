<<template>
  <div class="dropdown-container" ref="slide">
    <div
      :class="['dropdown-title', { 'dark-mode': dark_mode }]"
      @click="showSelectBox = !showSelectBox"
    >
      <span>
        {{ labelSelectBox }}
      </span>
    </div>
    <div
      :class="['dropdown-wrapper', { 'dark-mode': dark_mode }]"
      v-if="showSelectBox"
    >
      <div
        v-for="item in dropdownItems"
        :key="item.id"
        class="dropdown-item"
        @click="chnageSelectBoxItem(item)"
      >
        <span class="font-500">
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, getModule } from 'nuxt-property-decorator'
import ThemeModule from '~/store/ThemeModule'
import './style.scss'
@Component({})
export default class DropDownComponent extends Vue {
  placeholder: string = 'Filter by Region'
  showSelectBox: boolean = false
  selectvalue: boolean = false
  dropdownItems: any[] = [
    {
      id: 1,
      name: 'Africa',
    },
    {
      id: 2,
      name: 'Americas',
    },
    {
      id: 3,
      name: 'Asia',
    },
    {
      id: 4,
      name: 'Europe',
    },
    {
      id: 5,
      name: 'Oceania',
    },
  ]
  get labelSelectBox() {
    if (this.selectvalue) {
      return this.selectvalue
    }
    return this.placeholder
  }
  chnageSelectBoxItem(item: any) {
    this.selectvalue = item.name
    this.showSelectBox = !this.showSelectBox
    this.$emit('onChnage', item)
  }
  mounted() {
    document && document.addEventListener('click', this.hideSelectBox)
  }
  destroyed() {
    document && document.removeEventListener('click', this.hideSelectBox)
  }
  hideSelectBox(e: any) {
    const slide:any = this.$refs.slide
    if (slide.contains(e.target)) {
      //
    } else {
      this.showSelectBox = false
    }
  }
   public get dark_mode() {
    const _ThemeModule = getModule(ThemeModule, this.$store)
    return _ThemeModule.getDarkMode
  }
}
</script>