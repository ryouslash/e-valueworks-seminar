// DOMの読み込みの後
document.addEventListener('DOMContentLoaded', () => {
  funcViewportContent.funcInit()
})

/*
 *ビューポートタグをユーザーエージェントに応じて書き換えるロジック
 */
const funcViewportContent = {
  FIXED_PC_BASE_WIDTH: 1200,
  FIXED_SP_BASE_WIDTH: 375,

  insertViewport(content: string) {
    const metaTag = `<meta name="viewport" id="viewport" content="${content}">`
    document.querySelector('#viewport')?.remove()
    document.head.insertAdjacentHTML('afterbegin', metaTag)
  },

  funcInit() {
    const width = document.documentElement.clientWidth
    const debug = true

    if (debug) console.log(width)

    if (width <= this.FIXED_SP_BASE_WIDTH) {
      // 〜375
      if (debug) console.log('〜375')
      this.insertViewport(`width=${this.FIXED_SP_BASE_WIDTH}`)
    } else if (width >= this.FIXED_SP_BASE_WIDTH + 1 && width <= 767) {
      if (debug) console.log('376〜767')
      // 376〜767
      this.insertViewport('width=device-width, initial-scale=1.0')
    } else {
      if (debug) console.log('768〜')
      // 768〜
      this.insertViewport(`width=${this.FIXED_PC_BASE_WIDTH}`)
    }
  },
}
