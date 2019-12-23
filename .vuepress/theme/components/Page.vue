<template>
  <main class="page">
    <slot name="top" />


    <div class="theme-default-content">
      <Content />
      <!-- <div class="content-lock"> -->
      <!--   <p>下方扫码关注公众号<span class="light">全栈成长之路</span></p> -->
      <!--   <p>并发送 <span class="light">0F34</span></p> -->
      <!--   <p>即可在关注期间<span class="light">无限制</span>浏览本站全部文章内容</p> -->
      <!--   <img src="./qr.jpg" width="180" height="180"> -->
      <!--   <p>（由于该提示信息随机出现，你也可以<span class="light">再次刷新</span>页面，来浏览本文全部内容）</p> -->
      <!-- </div> -->
    </div>
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import random from 'lodash/random'
import get from 'lodash/get'

export default {
  data () {
    return {
      code: ''
    }
  },
  mounted () {
    this.code = this.getKey()
  },
  methods: {
    getKey () {
      if (localStorage.key) {
        return localStorage.key
      }
      const s = '0123456789abcdefghijklmnopqrstuvwxyz'
      const key = [0, 0, 0, 0].map(x => get(s, random(0, 31))).join('')
      localStorage.key = key
      return key
    }
  },
  components: { PageEdit, PageNav },
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block

.content-lock
  text-align center
  padding 2rem
  font-size 1em

  p
    line-height 1.2em

.light
  color #3eaf7c
  font-weight 600

.theme-default-content.lock
  h1 + .tip + *
    opacity .5

  h1 + .tip + * + *
    opacity .2

  h1 + .tip + * + * ~ *
    display none
</style>
