import Vue from 'vue'
import EasyTable from 'vue-easytable'

import 'vue-easytable/libs/themes-base'

Vue.component(EasyTable.VTable.name, EasyTable.VTable)
Vue.component(EasyTable.VPagination.name, EasyTable.VPagination)
Vue.component(EasyTable.VCheckbox.name, EasyTable.VCheckbox)
Vue.component(EasyTable.VCheckboxGroup.name, EasyTable.VCheckboxGroup)
Vue.component(EasyTable.VSelect.name, EasyTable.VSelect)
Vue.component(EasyTable.VDropdown.name, EasyTable.VDropdown)

export default {...EasyTable}
