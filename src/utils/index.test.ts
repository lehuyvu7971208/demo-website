import { getPage, getSkip, isServer } from ".";

describe("Test @utils function", () => {
  test("Test isServer", () => {
    expect(isServer()).toBeFalsy();
  });

  test("Test getSkip", () => {
    expect(getSkip(1, 10)).toEqual(0);

    expect(getSkip(2, 10)).toEqual(10);

    expect(getSkip(2, 20)).toEqual(20);

    expect(getSkip(3, 20)).toEqual(40);
  });

  test("Test getPage", () => {
    expect(getPage(0, 10)).toEqual(1);

    expect(getPage(45, 15)).toEqual(4);
  });

  test("Test getPage with limit = 0", () => {
    expect(() => getPage(0, 0)).toThrow();
  });
});
