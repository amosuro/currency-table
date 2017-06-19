const CurrencyTable = require('../currencyTable.js');

describe("CurrencyTable.findPriceIndex is a method that", () => {
    it('returns the index of the tableData element matching the given price name', () => {
        const tableData = [
            {
                price: {
                    name: 'gbpjpy'
                }
            },
            {
                price: {
                    name: 'usdjpy'
                }
            }
        ];
        const price = { name: 'usdjpy' };
        expect(CurrencyTable.constructor.findPriceIndex(tableData, price)).toEqual(1);
    });
});
