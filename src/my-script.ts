// DOMの読み込みの後
document.addEventListener('DOMContentLoaded', () => {
  funcViewportContent.funcInit()
  applyOrObserve('.js-observe-element', observer)
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

/*
 *Intersection Observerを使ってビューポートに表示された要素に特定のクラス名をつけるロジック
 */
const observer = new IntersectionObserver(
  // 監視対象要素に対するコールバック
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-show')
        observer.unobserve(entry.target)
      }
    })
  },
  // オプション
  { root: null, rootMargin: '0px 0px -20% 0px' },
)

// すでに画面上部にある要素は `is-show` を即時適用し、それ以外は監視
function applyOrObserve(targetSelector: string, observer: IntersectionObserver) {
  const elements = document.querySelectorAll(targetSelector)
  elements.forEach(function (element) {
    const rect = element.getBoundingClientRect()
    if (rect.top < 0) {
      element.classList.add('is-show')
    } else {
      observer.observe(element)
    }
  })
}
