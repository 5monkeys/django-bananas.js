import Bananas from "../src";

test("Has App", () => {
  expect(Bananas.App).toBeDefined();
  expect(typeof Bananas.App).toBe("function");
});
