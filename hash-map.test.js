import { expectFailure } from "node:test";
import { HashMap } from "./hash-map.js";

const hm = new HashMap();
const kvPairs = [
    ['apple', 'red'], ['banana', 'yellow'], ['carrot', 'orange'], ['dog', 'brown'],
    ['elephant', 'gray'], ['frog', 'green'], ['grape', 'purple'], ['hat', 'black'],
    ['ice cream', 'white'], ['jacket', 'blue'], ['kite', 'pink'], ['lion', 'golden'],
]
kvPairs.forEach(pair => hm.set(...pair));
console.log(hm.toString());

describe("hashmap testing", () => {
    test("calculate length", () => {
        expect(hm.length()).toBe(kvPairs.length);
    });
    test("get value", () => {
        expect(hm.get("banana")).toBe("yellow");
        expect(hm.get("lion")).toBe("golden");
        expect(hm.get("dog")).toBe("brown");
    });

    test("get all entries", () => {
        expect(hm.entries().toSorted((a,b) => a[0].charCodeAt()-b[0].charCodeAt())).toEqual(kvPairs.toSorted((a, b) => a[0].charCodeAt()-b[0].charCodeAt()));
    })

    test("set a new value for an existing key ", () => {
        hm.set("banana", "equador");
        expect(hm.length()).toBe(kvPairs.length);
        expect(hm.get("banana")).toBe("equador");

        hm.set("dog", "bark");
        expect(hm.length()).toBe(kvPairs.length);
        expect(hm.get("dog")).toBe("bark");
    });

    test("growing hash table after exceeding the load factor", () => {
        hm.set("moon", "silver");
        expect(hm.buckets.length).toBe(32);
        expect(hm.length()).toBe(13);
        console.log(hm.toString());
    });

    test("removing an entry from a hashmap", () => {
        hm.remove("grape");
        expect(hm.length()).toBe(12);
        console.log(hm.toString());
    });

})


