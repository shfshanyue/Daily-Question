<template>
  <div class="container">
    <main class="main-page">
    </main>
    <aside class="aside-page">
      <!-- <Bar/> -->
      <h3>友情链接</h3>
      <hr>
      <ul class="friend-link">
        <li>
          <a href="https://github.com/LuckyWinty/blog">winty 的博客</a>
        </li>
        <li>
          <a href="http://www.inode.club">程序员成长之北</a>
        </li>
        <li>
          <a href="https://biaochenxuying.cn/">夜尽天明的个人博客网站</a>
        </li>
        <li>
          <a href="https://liuxiangyang.space">刘向洋，记录工作记录生活</a>
        </li>
        <li>
          <a href="https://ouyang.wang">Ouyang's Blog</a>
        </li>
        <li>
          <a href="http://www.javadaily.cn">Java 日知录</a>
        </li>
      </ul>
      <hr>
      <h3>找到我</h3>
      <ul>
        <li>微信(shanyue94)</li>
        <li><a href="https://www.zhihu.com/people/shfshanyue/activities">知乎</a></li>
        <li><a href="https://juejin.im/user/56a34361816dfa005925a654">掘金</a></li>
        <li><a href="https://www.jianshu.com/u/f014acb0b697">简书</a></li>
      </ul>
    </aside>
  </div>
</template>

<script>
import QR from '@theme/components/QR.vue'
import Bar from '@theme/components/Bar.vue'
import dayjs from 'dayjs'

export default {
  components: { QR, Bar },
  data () {
    return {
      dayjs
    }
  },
}
</script>

