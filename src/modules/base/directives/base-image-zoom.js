const imageZoomSize = "small";

const baseImageZoom = {
  created: (el) => {
    el.addEventListener("mouseenter", () => el.classList.add(imageZoomSize));
    el.addEventListener("mouseleave", () => el.classList.remove(imageZoomSize));
  },
};

export default baseImageZoom;
