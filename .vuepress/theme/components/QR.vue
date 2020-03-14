<template>
  <div class="qr">
    <img src="https://mmbiz.qpic.cn/mmbiz_jpg/w7L7YMmnfhic7ooecF6PU5cGlHoakmTNBwKXf6VCC5TfAiagrmiahQ2kFxYLibPYgicicWsEgAFwsOrrOS16Bw2eml0w/0" alt="山月行" width="120" height="120" loading="lazy">
    <p class="we-intro">
      欢迎关注公众号<span class="we-highlight">互联网大厂招聘</span>。如果你是大厂招聘负责人，欢迎投递内推信息。如果你是候选人，将持续为你推送大厂内推机会及面经。
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
