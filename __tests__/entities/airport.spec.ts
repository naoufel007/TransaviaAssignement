import Airport from "@/app/entities/airport";

const entity = {
    code: 'AMS',
    description: "Amsterdam, NL"
}
describe("airport", () => {
    test("return airport", () => {
        const expected = {
            code: 'AMS',
            description: "Amsterdam, NL"
        };
        const result = new Airport(entity);
        expect(result.code).toEqual(expected.code);
        expect(result.description).toEqual(expected.description);
    });
    test("invalid code", () => {
        const invalid = {...entity, code: 'xxxx'};
        expect(() => new Airport(invalid as any)).toThrow('The airport code: xxxx is not valid');
    });
    test("invalid description", () => {
        const invalid = {...entity, description: 99};
        expect(() => new Airport(invalid as any)).toThrow('The airport description: 99 is not valid');
    })
});