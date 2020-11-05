<template>
  <div class="qr">
    <img src="https://shanyue.tech/wechat.jpeg" alt="山月行" width="120" height="120" loading="lazy">
    <p class="we-intro">
      欢迎添加微信，一起交流面试题，共同进入大厂。
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
