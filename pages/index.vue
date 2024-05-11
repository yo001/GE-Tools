<script setup>
import { onMounted, ref } from 'vue'

const canvas = ref(null)
const canvasWidth = ref(400)
const canvasLine = ref(null)
const rotation = ref(0)
const wheelStyle = ref({})
const wheelArray = ref(Array.from({ length: 12 }))
wheelArray.value.forEach((_, index) => {
  wheelArray.value[index] = index + 1
})

const target = ref(null)
const isRunning = ref(false)
const transitionSec = ref(5)
const base_360 = ref(2)
function rotateWheel() {
  if (isRunning.value)
    return
  isRunning.value = true
  const randomIndex = utils.getRandomNonRepeatingNumbers(wheelArray.value.length - 1)[0]
  const baseAngle = 360 / wheelArray.value.length
  const randomAngle = utils.getRandomNonRepeatingNumbers((randomIndex * baseAngle) + (360 / wheelArray.value.length), randomIndex * baseAngle)[0]

  rotation.value = (360 - randomAngle) + (360 * utils.getRandomNonRepeatingNumbers(base_360.value + 2, base_360.value)[0])
  wheelStyle.value = {
    transform: `rotate(${rotation.value}deg)`,
    transition: `all ${transitionSec.value}s ease`,
  }

  base_360.value += (2 + 2)
  setTimeout(() => {
    target.value = wheelArray.value[randomIndex]
    isRunning.value = false
  }, transitionSec.value * 1000)
}

onMounted(() => {
  drawWheel()
})

function drawWheel() {
  const ctx = canvas.value.getContext('2d')
  const radius = 150
  const centerX = canvas.value.width / 2
  const centerY = canvas.value.height / 2
  const segmentAngle = (2 * Math.PI) / wheelArray.value.length

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  for (let i = 0; i < wheelArray.value.length; i++) {
    const startAngle = i * segmentAngle + rotation.value
    const endAngle = (i + 1) * segmentAngle + rotation.value

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, startAngle, endAngle)
    ctx.lineTo(centerX, centerY)
    ctx.fillStyle = i % 2 === 0 ? 'lightgray' : 'gray'
    ctx.fill()
    ctx.closePath()

    const labelX = centerX + radius * Math.cos(startAngle + segmentAngle / 2)
    const labelY = centerY + radius * Math.sin(startAngle + segmentAngle / 2)
    const labelAngle = startAngle + segmentAngle / 2

    ctx.save()
    ctx.translate(labelX, labelY)
    ctx.rotate(labelAngle)
    ctx.font = '16px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = 'black'
    ctx.fillText(wheelArray.value[i], 0, 0)
    ctx.restore()
  }

  // draw line
  const ctx1 = canvasLine.value.getContext('2d')
  const lineCenterX = canvasLine.value.width / 2
  const lineCenterY = canvasLine.value.height / 2
  ctx1.clearRect(0, 0, canvasLine.value.width, canvasLine.value.height)

  ctx1.beginPath()
  ctx1.moveTo(lineCenterX, lineCenterY)
  ctx1.lineTo(lineCenterX + radius, lineCenterY)
  ctx1.strokeStyle = 'red'
  ctx1.lineWidth = 2
  ctx1.stroke()

  ctx1.closePath()
}
</script>

<template>
  <div>
    <p class="label-text">
      {{ target }}
    </p>
    <div class="wheel">
      <canvas
        ref="canvas"
        :width="canvasWidth"
        :height="canvasWidth"
        class="wheel-canvas-main"
        :style="wheelStyle"
      />
      <canvas
        ref="canvasLine"
        :width="canvasWidth"
        :height="canvasWidth"
        class="wheel-canvas-line"
        @click.prevent="rotateWheel"
      />
    </div>
  </div>
</template>

<style scoped>
.wheel {
  position: relative;
}
.wheel-canvas-line {
  position: absolute;
  top: 0;
  left: 0;
}
.label-text {
  min-height: 18px;
}
</style>
