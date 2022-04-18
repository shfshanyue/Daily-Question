<template>
  <div>
    <div v-for="catalog in sidebar" :key="catalog.title" :style="{ marginBottom: '1em' }">
      <div :style="{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }">{{ catalog.title }}</div>
      <div v-for="section in catalog.children" :key="section.title">
        <div :style="{ fontSize: '18px', marginBottom: '12px', fontWeight: 500 }">{{ section.title }}</div>
        <p :style="{ margin: '12px 0', fontSize: '15px' }">{{ section.description }}</p>
        <ul :style="{ marginBottom: '12px', columns: 3, columnGap: '10px', listStyle: 'none', paddingLeft: 0, marginTop: 0 }">
          <li v-for="post in section.children" :key="post.title" :style="{ marginBottom: '3px' }">
            <router-link :to="post.path + '.html'">{{post.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const { sidebar, generateSidebar } = require('../../data/engineering')

generateSidebar()

export default {
  data () {
    return {
      sidebar
    }
  }
}
</script>
