// DOMの読み込みの後
document.addEventListener('DOMContentLoaded', () => {
  funcViewportContent.funcInit()
})

/*
 *ビューポートタグをユーザーエージェントに応じて書き換えるロジック
 */
const funcViewportContent = {
  insertViewport(content: string) {
    const metaTag = `<meta name="viewport" id="viewport" content="${content}">`
    document.querySelector('#viewport')?.remove()
    document.head.insertAdjacentHTML('afterbegin', metaTag)
  },

  funcInit() {
    const width = document.documentElement.clientWidth
    const debug = true
    if (debug) console.log(width)

    if (width < 375) {
      // 〜375未満
      if (debug) console.log('〜375未満')
      this.insertViewport('width=375')
    } else if (width >= 375 && width < 768) {
      if (debug) console.log('375以上〜768未満')
      // 375以上〜768未満
      this.insertViewport('width=device-width, initial-scale=1.0')
    } else if (width >= 768 && width < 1025) {
      if (debug) console.log('768以上〜1025未満')
      // 768以上〜1025未満
      this.insertViewport('width=1400')
    } else if (width >= 1025 && width < 1921) {
      if (debug) console.log('1025以上〜1921未満')
      // 1025以上〜1921未満
      this.insertViewport('width=device-width, initial-scale=1.0')
    } else {
      if (debug) console.log('1921以上')
      // 1921以上
      this.insertViewport('width=1920')
    }
  },
}
