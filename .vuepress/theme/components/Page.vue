<template>
  <main class="page">
    <slot name="top" />

    <div :class="{ 'theme-default-content': true, lock: isLock }">
      <Content />
      <div class="content-lock">
        <p>扫码关注公众号<span>全栈成长之路</span>，并发送 <span v-text="code"></span></p>
        <p>即可在关注期间<span>无限制</span>浏览本站全部文章内容</p>
        <p>公众号将会分享前后端以及 DevOps 相关文章，帮助开发者打破瓶颈，走向全栈之路</p>
        <img src="./qr.jpg" width="180" height="180">
        <p>（由于该提示信息随机出现，你也可以<span>再次刷新</span>页面，来浏览本文全部内容）</p>
        <p>（你也可以通过修改一行代码来屏蔽该提示消息）</p>
      </div>
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

import request from '../util/api'

function getCode () {
  if (localStorage.code) {
    return localStorage.code
  }
  const code = Array.from(Array(4), x => random(0, 9)).join('')
  localStorage.code = code
  return code
}

async function verifyCode (code) {
  const { data: { data: token } } = await request.post('/api/verifyCode', {
    code
  })
  return token
}

async function verifyToken (token) {
  const { data: { data: verify } } = await request.post('/api/verifyToken', {
    token
  })
  return verify
}

export default {
  data () {
    return {
      lock: false,
      code: ''
    }
  },
  async mounted () {
    const code = getCode()
    this.code = code
    if (!localStorage.token) {
      this.lock = true
      const token = await verifyCode(code)
      if (token) {
        localStorage.token = token
        this.lock = false
      }
    } else {
      const token = localStorage.token
      const verify = await verifyToken(token)
      if (!verify) {
        this.lock = true
      }
    }
  },
  computed: {
    isLock () {
      return this.lock ? Math.random() > 0.5 : false
      /* return false */
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
  display none
  text-align center
  padding 2rem
  font-size 1em

  p
    line-height 1.2em

  span
    color #3eaf7c
    font-weight 600

.theme-default-content.lock
  .content__default
    :nth-child(3)
      opacity .5

    :nth-child(4)
      opacity .2

    :nth-child(n+5)
      display none

  .content-lock
    display block
</style>
