// DOMの読み込みの後
document.addEventListener('DOMContentLoaded', () => {
  funcViewportContent.funcInit()
})

/*
 *ビューポートタグをユーザーエージェントに応じて書き換えるロジック
 */
const funcViewportContent = {
  FIXED_PC_MAX_WIDTH: 1920,
  FIXED_SP_MIN_WIDTH: 375,

  insertViewport(content: string) {
    const metaTag = `<meta name="viewport" id="viewport" content="${content}">`
    document.querySelector('#viewport')?.remove()
    document.head.insertAdjacentHTML('afterbegin', metaTag)
  },

  funcInit() {
    const width = document.documentElement.clientWidth
    const debug = true

    if (debug) console.log(width)

    if (width < this.FIXED_SP_MIN_WIDTH) {
      // 〜375未満
      if (debug) console.log('〜375未満')
      this.insertViewport(`width=${this.FIXED_SP_MIN_WIDTH}`)
    } else if (width >= this.FIXED_SP_MIN_WIDTH && width < 768) {
      if (debug) console.log('375以上〜768未満')
      // 375以上〜768未満
      this.insertViewport('width=device-width, initial-scale=1.0')
    } else if (width >= 768 && width <= this.FIXED_PC_MAX_WIDTH) {
      if (debug) console.log('768以上〜1920以下')
      // 768以上〜1920以下
      this.insertViewport('width=device-width, initial-scale=1.0')
    } else {
      // 1921以上
      this.insertViewport(`width=${this.FIXED_PC_MAX_WIDTH}`)
    }
  },
}
