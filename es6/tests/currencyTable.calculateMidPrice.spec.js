const CurrencyTable = require('../currencyTable.js');

describe("CurrencyTable.calculateMidPrice is a method that", () => {
    it('returns the calculated midprice of the bestBid and bestAsk values', () => {
        expect(CurrencyTable.constructor.calculateMidPrice(33, 55)).toEqual(44);
    });
});
