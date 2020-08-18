import Vue from 'vue'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

import {
    Button, Container, Header,
    Image, Switch, Tabs, TabPane,
    Card, Row, Col, Input
} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Image)
Vue.use(Switch)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
