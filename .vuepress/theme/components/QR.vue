<template>
  <div class="qr">
    <img src="https://camo.githubusercontent.com/978ad7a7b533ccfd98e93323530d8219b38ee84f/687474703a2f2f6d6d62697a2e717069632e636e2f6d6d62697a5f6a70672f77374c37594d6d6e66686963376f6f6563463650553563476c486f616b6d544e42774b58663656434335546641696167726d69616851326b4678594c69625059676963696357734567414677734f72724f533136427732656d6c30772f30" alt="山月行" width="120" height="120" loading="lazy">
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
