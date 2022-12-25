import type { Directive } from "vue";

const baseImageError: Directive<HTMLImageElement> = {
  created: (el: HTMLImageElement, binding: any) => {
    el.addEventListener("error", () => {
      const url = new URL("../assets/placeholder.png", import.meta.url).href;
      el.src = url;
      binding.instance.thumbnailUrl = url;
    });
  },
};

export default baseImageError;
