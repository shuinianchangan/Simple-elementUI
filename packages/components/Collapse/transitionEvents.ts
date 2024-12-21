// 设置高度为0
const _setHeightZero = (el: HTMLElement) => (el.style.height = "0px");
// 设置高度为内容高度
const _setHeightScroll = (el: HTMLElement) =>
  (el.style.height = `${el.scrollHeight}px`);
// 清除高度设置
const _setHeightEmpty = (el: HTMLElement) => (el.style.height = "");
// 设置溢出隐藏
const _setOverflowHidden = (el: HTMLElement) => (el.style.overflow = "hidden");
// 清除溢出设置
const _setOverflowEmpty = (el: HTMLElement) => (el.style.overflow = "");

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  // 进入过渡之前
  beforeEnter(el) {
    _setHeightZero(el); // 初始高度设为0
    _setOverflowHidden(el); // 防止内容溢出
  },
  // 进入过渡中
  enter: (el) => _setHeightScroll(el), // 展开到内容实际高度
  // 进入过渡后
  afterEnter(el) {
    _setHeightEmpty(el); // 清除高度限制
    _setOverflowEmpty(el); // 恢复正常溢出行为
  },
  // 离开过渡前
  beforeLeave(el) {
    _setHeightScroll(el); // 设置当前高度
    _setOverflowHidden(el); // 防止内容溢出
  },
  // 离开过渡中
  leave: (el) => _setHeightZero(el), // 收起到高度为0
  // 离开过渡后
  afterLeave(el) {
    _setHeightEmpty(el); // 清除高度限制
    _setOverflowEmpty(el); // 恢复正常溢出行为
  },
};

export default transitionEvents;
