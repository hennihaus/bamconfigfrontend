const baseImageError = {
  created: (el, binding) => {
    el.addEventListener("error", () => {
      const url = new URL("../assets/placeholder.png", import.meta.url).href;
      el.src = url;
      binding.instance.thumbnailUrl = url;
    });
  },
};

export default baseImageError;
