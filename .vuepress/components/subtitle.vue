<template>
  <div>
    <div v-for="line in caption" :key="line.start + line.text" :style="{ display: 'flex', marginBottom: '5px' }">
      <a :href="b + `?t=${line.start}`" target="_blank" v-text="line.time" :style="{ width: '6rem' }"></a>  
      <div v-text="line.text"></div>
    </div>
  </div>
</template>

<script>
function parseSrt (srt) {
  const lines = srt.split('\n\n').filter(Boolean).map(x => x.split('\n'))
  return lines.map(line => {
    const time = line[1].split(/[:,]/g)
    const start = time.slice(0, 3).reduce((acc, x) => {
      return acc * 60 + Number(x)
    }, 0)
    return {
      time: time.slice(0, 3).join(':'),
      start,
      text: line[2]
    }
  })
}

export default {
  props: ['srt', 'b'],
  computed: {
    caption () {
      const lines = parseSrt(this.srt)
      return lines
    }
  }
}
</script>
