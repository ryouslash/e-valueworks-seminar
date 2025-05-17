import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGtag from 'vue-gtag-next'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faXmark, faSpinner, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './my-style.scss'
import './my-script'

library.add(faBars, faXmark, faSpinner, faChevronUp)

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(VueGtag, {
  property: { id: 'G-FVJW0BXDDP' },
})
app.use(router)

app.mount('#app')
