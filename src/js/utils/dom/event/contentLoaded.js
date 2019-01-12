/**
 * DOM 内容就绪监听
 * @param {Function} callback 回调方法 
 */
export function contentLoaded (callback) {
  // bug: 根据 MDN 文档，IE 9/10 可能在 DOM 解析完成前进入 'interactive' 状态
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // 已就绪
    callback()
  }

  // 未就绪，监听
  window.addEventListener('DOMContentLoaded', callback)
}