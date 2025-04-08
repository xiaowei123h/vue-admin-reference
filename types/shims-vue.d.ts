declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue3-puzzle-vcode' {
  import { DefineComponent } from 'vue'
  const Vcode: DefineComponent<{}, {}, any>
  export default Vcode
}

declare module 'three' {
  import * as THREE from 'three'
  const Vcode: DefineComponent<{}, {}, any>
  export default Vcode
}

declare module 'three/examples/jsm/libs/stats.module.js' {
  import Stats from 'three/examples/jsm/libs/stats.module.js'
  const Vcode: DefineComponent<{}, {}, any>
  export default Vcode
}