import { type Ref, computed } from "vue";

const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0,
};

// 统一生成随机id管理
export function useId(namespace: string = "er"): Ref<string> {
  const idRef = computed(
    () =>
      `${namespace}-id-${
        defaultIdInjection.prefix
      }-${defaultIdInjection.current++}`
  );

  return idRef;
}

export default useId;
