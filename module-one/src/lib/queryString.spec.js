import { queryString, parse } from "./queryString";

describe("Object to query string", () => {
  it("should create a valid query string when an object is provided", () => {
    const obj = {
      name: "Ramon",
      profession: "Developer",
    };
    expect(queryString(obj)).toBe("name=Ramon&profession=Developer");
  });

  it("should create a valid query string even when a array is passed as value", () => {
    const obj = {
      name: "Ramon",
      abilities: ["Jest", "TDD"],
    };
    expect(queryString(obj)).toBe("name=Ramon&abilities=Jest,TDD");
  });

  it("should throw an error when an object is passed as value", () => {
    const obj = {
      name: "Ramon",
      abilities: {
        primary: "Jest",
        second: "TDD",
      },
    };
    expect(() => queryString(obj)).toThrowError();
  });
});

describe("Query string to object", () => {
  it("should convert a query string to object", () => {
    const qs = "name=Ramon&profession=Developer";
    expect(parse(qs)).toEqual({
      name: "Ramon",
      profession: "Developer",
    });
  });

  it("should convert a query string of a single key-value pair to object", () => {
    const qs = "name=Ramon";
    expect(parse(qs)).toEqual({
      name: "Ramon",
    });
  });

  it("should convert a query string to an object taking care of comma separated values", () => {
    const qs = "name=Ramon&abilities=Jest,TDD";
    expect(parse(qs)).toEqual({
      name: "Ramon",
      abilities: ["Jest", "TDD"],
    });
  });
});
