/**
 * 重设 HTML 根元素字号
 * @param {Number} ftSz 原始字号
 * @param {Number} wt 原始视口宽度
 */
export function resetFtSz ({ wt = 750, ftSz = 100 } = {}) {
  (document.documentElement || document.body).style.fontSize = `${Math.round(ftSz * (window.screen.width / wt))}px`
}
