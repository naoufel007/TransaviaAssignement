import airportDtoToEntity from "@/app/converters/airport-dto-to-entity";

describe("airportDtoToEntity", () => {
    test("convert to entity", () => {
        const dto = {
            ItemName: 'AMS',
            Description: "Amsterdam, NL"
        };
        const expected = {
            code: 'AMS',
            description: "Amsterdam, NL"
        };
        const result = airportDtoToEntity(dto);
        expect(result).toEqual(expected);
    });
});