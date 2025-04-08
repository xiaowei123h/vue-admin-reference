<script lang="ts" setup>
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { onWindowResize, statsPosition } from '@/utils/common.js'
import { getCurrentInstance } from 'vue'

// 获取当前实例
const app = getCurrentInstance()

// 通过 app 访问全局属性
const THREE = app?.appContext.config.globalProperties.$THREE

let webglInnerWidth = null

function handleResize() {
  if (window.innerWidth >= 640) {
    webglInnerWidth = window.innerWidth - 281
  } else {
    webglInnerWidth = window.innerWidth
  }
}

handleResize()

onMounted(() => {
  window.addEventListener('resize', handleResize, false)
  init()
  animate()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

let camera: THREE.PerspectiveCamera | null = null;
let scene: THREE.Scene | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let stats: Stats | null = null;
let mesh: THREE.Mesh | null = null;

function init() {
  //
  camera = new THREE.PerspectiveCamera(27, webglInnerWidth / window.innerHeight, 1, 3500)
  camera.position.z = 64
  scene = new THREE.Scene()
  // new THREE.Color(0x050505)
  scene.background = new THREE.Color('#F2F3F5')
  //
  var light = new THREE.HemisphereLight()
  scene.add(light)
  //
  var geometry = new THREE.BufferGeometry()
  var indices = []
  var vertices = []
  var normals = []
  var colors = []
  var size = 20
  var segments = 10
  var halfSize = size / 2
  var segmentSize = size / segments
  // generate vertices, normals and color data for a simple grid geometry
  for (var i = 0; i <= segments; i ++) {
      var y = (i * segmentSize) - halfSize
      for (var j = 0; j <= segments; j ++) {
          var x = (j * segmentSize) - halfSize
          vertices.push(x, - y, 0)
          normals.push(0, 0, 1)
          var r = (x / size) + 0.5
          var g = (y / size) + 0.5
          colors.push(r, g, 1)
      }
  }
  // generate indices (data for element array buffer)
  for (var i = 0; i < segments; i ++) {
      for (var j = 0; j < segments; j ++) {
          var a = i * (segments + 1) + (j + 1)
          var b = i * (segments + 1) + j
          var c = (i + 1) * (segments + 1) + j
          var d = (i + 1) * (segments + 1) + (j + 1)
          // generate two faces (triangles) per iteration
          indices.push(a, b, d) // face one
          indices.push(b, c, d) // face two
      }
  }
  //
  geometry.setIndex(indices)
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  var material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      vertexColors: true
  })
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  //
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(webglInnerWidth, (window.innerHeight - 180))
  var container = document.getElementsByClassName('webglBuffergeometryIndexed-container')[0]
  container.appendChild(renderer.domElement)
  //
  stats = new Stats()
  statsPosition(stats)
  container.appendChild(stats.dom)
  //
  window.addEventListener('resize', windowResize, false)
}

function windowResize() {
  onWindowResize(camera, renderer)
  statsPosition(stats)
}

function animate() {
  requestAnimationFrame(animate)
  render()
  stats.update()
}

function render() {
  var time = Date.now() * 0.001
  mesh.rotation.x = time * 0.25
  mesh.rotation.y = time * 0.5
  renderer.render(scene, camera)
}
</script>

<template>
  <div class="webglBuffergeometryIndexed-container">
    <div id="container"></div>
  </div>
</template>

<style scoped>
.webglBuffergeometryIndexed-container {
  position: relative;
  width: 100%;
}
</style>