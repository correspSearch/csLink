/*

Copyright (C) 2018 Berlin-Brandenburg Academy of Sciences and Humanities.

csLink is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

csLink is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with csLink.  If not, see <http://www.gnu.org/licenses/>.

*/

import { library } from '@fortawesome/fontawesome-svg-core';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';
import {
  TablePlugin,
  ListGroupPlugin,
  AlertPlugin,
  PopoverPlugin,
  TabsPlugin
} from 'bootstrap-vue';
import csLink from './csLink.vue';
import { Popover } from 'bootstrap';

library.add(faShareAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(TablePlugin)
  .use(ListGroupPlugin)
  .use(AlertPlugin)
  .use(PopoverPlugin)
  .use(TabsPlugin);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#csLink',
  components: { csLink },
  render(createElement) {
    return createElement(csLink, {
      props: {
        correspondent1Id: this.$el.attributes['data-correspondent-1-id'].value,
        correspondent2Id: this.$el.attributes['data-correspondent-2-id'].value,
        correspondent1Name: this.$el.attributes['data-correspondent-1-name'].value,
        correspondent2Name: this.$el.attributes['data-correspondent-2-name'].value,
        startDate: this.$el.attributes['data-start-date'].value,
        endDate: this.$el.attributes['data-end-date'].value,
        range: this.$el.attributes['data-range'].value,
        selectionWhen: this.$el.attributes['data-selection-when'].value,
        selectionSpan: this.$el.attributes['data-selection-span'].value,
        resultMax: this.$el.attributes['data-result-max'].value,
        excludeEdition: this.$el.attributes['data-exclude-edition'].value,
      },
    });
  },
});
