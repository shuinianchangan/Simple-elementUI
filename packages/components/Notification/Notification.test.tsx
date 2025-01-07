import { describe, test, expect } from "vitest";
import { h, nextTick } from "vue";
import { notification } from "./method";

export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null);
        await nextTick();
      });
    });
  });
};

function getTopValue(element: Element) {
  const styles = window.getComputedStyle(element);
  const topValue = styles.getPropertyValue("top");
  return Number.parseFloat(topValue);
}

describe("createNotification", () => {
  test("call notification()", async () => {
    const handler = notification({
      message: "hello msg",
      duration: 0,
      position: "top-left",
    });
    await rAF();
    expect(document.querySelector(".er-notification")).toBeTruthy();
    handler.close();
    await rAF();
    expect(document.querySelector(".er-notification")).toBeFalsy();
  });

  test("Notification options", async () => {
    notification({ message: "hello msg1", duration: 0, position: "top-left" });
    notification("hello msg2");
    const vnode = h("div", "测试VNode");
    notification(vnode);
    await rAF();
    expect(document.querySelector(".er-notification")).toBeTruthy();
    notification.closeAll();
    await rAF();
    expect(document.querySelector(".er-notification")).toBeFalsy();
  });

  test("call notification() more times", async () => {
    notification({ message: "hello msg", duration: 0 });
    notification({ message: "hello msg", duration: 0 });
    await rAF();
    expect(document.querySelectorAll(".er-notification").length).toBe(2);
    notification.closeAll();
    await rAF();
    expect(document.querySelectorAll(".er-notification").length).toBe(0);
  });

  test("offset", async () => {
    notification({ message: "hello msg", duration: 0, offset: 100 });
    notification({ message: "hello msg", duration: 0, offset: 50 });
    await rAF();
    const elements = document.querySelectorAll(".er-notification");
    expect(elements.length).toBe(2);

    expect(getTopValue(elements[0])).toBe(100);
    expect(getTopValue(elements[1])).toBe(150);
  });
});
