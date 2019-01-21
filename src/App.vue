<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'ヒラギノ角ゴシック', 'Hiragino Sans', 'ヒラギノ角ゴ ProN W3', 'Hiragino Kaku Gothic ProN', 'メイリオ', 'Meiryo', 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif
}
#nav {
  text-align: center;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
