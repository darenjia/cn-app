import Vue from 'vue';
import {
  Layout,
  Button,
  Row,
  Col,
  Card,
  Statistic,
  Tooltip,
  Icon,
  Divider,
  LocaleProvider,
  DatePicker,
  Popover,
  Switch,
  Checkbox,
} from 'ant-design-vue';

Vue.component(LocaleProvider.name, LocaleProvider);
Vue.component(Button.name, Button);
Vue.component(Layout.name, Layout);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Footer.name, Layout.Footer);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Card.name, Card);
Vue.component(Statistic.name, Statistic);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Icon.name, Icon);
Vue.component(Divider.name, Divider);
Vue.component(DatePicker.name, DatePicker);
Vue.component(DatePicker.RangePicker.name, DatePicker.RangePicker);
Vue.component(DatePicker.MonthPicker.name, DatePicker.MonthPicker);
Vue.component(DatePicker.WeekPicker.name, DatePicker.WeekPicker);
Vue.component(Popover.name, Popover);
Vue.component(Switch.name, Switch);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Checkbox.Group.name, Checkbox.Group);
