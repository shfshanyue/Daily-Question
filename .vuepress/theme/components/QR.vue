<template>
  <div class="qr">
    <img src="./qr.jpg" alt="山月行" width="120" height="120" loading="lazy">
    <p class="we-intro">
      如果你对前端，后端，DevOps，个人服务器或运维感兴趣的话，可以关注我的公众号<span class="we-highlight">全栈成长之路</span>。
    </p>
  </div>
</template>

<script>
export default {
  name: 'QR'
}
</script>

<style>
.qr {
  margin-top: 10px;
  margin-bottom: -1rem;
  display: flex;
}

.qr .we-intro {
  color: #0006;
  font-size: .8em;
  width: 54%;
}

.qr .we-highlight {
  color: #3eaf7c;
  font-weight: 900;
  font-style: italic;
}
</style>
