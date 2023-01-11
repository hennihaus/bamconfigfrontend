import { describe, expect, it, vi } from "vitest";
import { getRandomAvatarThumbnailUrl } from "../thumbnail-service";

describe("ThumbnailService", () => {
  describe("getRandomAvatarThumbnailUrl", () => {
    it("should return a correct parsed url when Math.random() = 0.0", () => {
      vi.spyOn(global.Math, "random").mockReturnValue(0.0);

      const result: string = getRandomAvatarThumbnailUrl();

      expect(result).toBe(
        "https://semantic-ui.com/images/avatar2/large/elyse.png"
      );
    });

    it("should return a correct parsed url when Math.random() = 0.99", () => {
      vi.spyOn(global.Math, "random").mockReturnValue(0.99);

      const result: string = getRandomAvatarThumbnailUrl();

      expect(result).toBe(
        "https://semantic-ui.com/images/avatar2/large/rachel.png"
      );
    });

    it("should return a correct parsed url when size = tiny", () => {
      const size = "tiny";

      const result: string = getRandomAvatarThumbnailUrl(size);

      expect(result).toContain(size);
    });
  });
});
