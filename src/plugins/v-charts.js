import Vue from 'vue';
import MyStyle from '../theme/v-chart/my-style.json';
import Bar from 'v-charts/lib/bar.common';
import Pie from 'v-charts/lib/pie.common';
import Histogram from 'v-charts/lib/histogram.common';
import Line from 'v-charts/lib/line.common';

Vue.prototype.$ChartTheme = MyStyle;
Vue.component(Bar.name, Bar);
Vue.component(Pie.name, Pie);
Vue.component(Histogram.name, Histogram);
Vue.component(Line.name, Line);
