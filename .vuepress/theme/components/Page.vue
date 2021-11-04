<template>
  <main class="page">
    <slot name="top" />

    <div :class="{ 'theme-default-content': true, lock: isLock }">
      <Content />
      <div class="content-lock" v-if="isLock">
        <p>扫码关注公众号<span>互联网大厂面试</span>，并发送 <span v-text="code"></span></p>
        <p>即可在关注期间<span>无限制</span>浏览本站全部文章内容</p>
        <img src="./we.jpg" width="180" height="180">
        <!-- <p>该提示信息随机出现，你可以<span>再次刷新</span>页面，来浏览本站全部文章</p> -->
        <p>
          你也可以在文章<a href="https://github.com/shfshanyue/op-note/blob/master/blog-to-wechat.md">关于回复公众号扫码解锁全站的技术实现</a>中获得解锁代码，永久解锁本站全部文章
        </p>
      </div>
      <div :style="{ border: '1px solid #eee', padding: '1rem', borderRadius: '6px' }">
        <h2>
          关于山月
        </h2>
        <div>我的项目：</div>
        <ul>
          <li>
            <a href="https://geek.shanyue.tech">极客时间返利</a>
          </li>
          <li>
            <a href="https://npm.devtool.tech">npm 在线执行</a>
          </li>
          <li>
            <a href="https://geek.shanyue.tech">面试每日一题</a>
          </li>
          <li>
            <a href="https://devtool.tech">开发者工具箱</a>
          </li>
          <li>
            <a href="https://weekly.shanyue.tech">山月前端周刊</a>
          </li>
          <li>
            <a href="https://shici.xiange.tech">诗词小站</a>
          </li>
        </ul>
        <div>我的微信：shanyue94，欢迎交流</div>
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

import request from '../util/api'
import isMobile from 'ismobilejs'

const mobile = isMobile()

function getCode () {
  if (localStorage.code) {
    return localStorage.code
  }
  const code = Math.random().toString().slice(2, 6)
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
      return !mobile.any && this.lock ? Math.random() > 0.01 : false
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
  .content__default >
    :nth-child(5)
      opacity .5

    :nth-child(6)
      opacity .2

    :nth-child(n+7)
      display none

  .content-lock
    display block


.theme-default-content:not(.custom):nth-child(2)
  padding-top 0

.theme-default-content:not(.custom) div.content__default
  margin-top 0
</style>
