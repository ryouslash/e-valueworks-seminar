// DOMの読み込みの後
document.addEventListener('DOMContentLoaded', () => {
  funcViewportContent.funcInit()
  applyOrObserve('.js-observe-element', observer)
})

// リソース読み込み後
window.addEventListener('load', () => {
  initAnchorScroll()
})

/*
 *ビューポートタグをユーザーエージェントに応じて書き換えるロジック
 */
const funcViewportContent = {
  FIXED_PC_BASE_WIDTH: 1300,
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
    } else if (width >= this.FIXED_SP_BASE_WIDTH + 1 && width < 767) {
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
 *クラス削除関数（特定のセレクタにのみ適用）
 */
// function removeClassFromOtherElements(selector: string, className: string) {
//   document.querySelectorAll(selector).forEach((el) => {
//     el.classList.remove(className);
//   });
// }

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

/**
 * スムーススクロールの実装ロジック
 */
function initAnchorScroll() {
  const header: HTMLElement | null = document.querySelector('.l-header')
  const headerHeight = header ? header.offsetHeight : 0

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href')
      if (!href) return

      const target =
        href === '#' || href === '' ? document.documentElement : document.querySelector(href)
      if (!target) return

      const targetY = target.getBoundingClientRect().top + window.scrollY - headerHeight

      // 以下が smoothScrollTo の処理
      const startY = window.scrollY
      const distance = targetY - startY
      const duration = 1500
      const startTime = performance.now()

      //イージング関数（0.5までは数値が大きくなるほど速くなり、以降は1に近づくほど緩やかになる）
      function easeInOutQuad(t: number) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      }

      // currentTimeはrequestAnimationFrameによって自動で渡される引数
      function scrollStep(currentTime: number) {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = easeInOutQuad(progress)
        window.scrollTo(0, startY + distance * ease)

        //経過時間が設定したアニメーション時間を超えるまで再実行
        if (elapsed < duration) {
          requestAnimationFrame(scrollStep)
        }
      }
      // 初回に requestAnimationFrame(scrollStep) を呼び、次のフレームで scrollStep(currentTime) を実行
      requestAnimationFrame(scrollStep)
    })
  })
}
