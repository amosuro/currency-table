const CurrencyTable = require('../currencyTable.js');

describe("CurrencyTable.displayPriceName is a method that", () => {
    it('returns the given currency pair as a formatted string', () => {
        expect(CurrencyTable.constructor.displayPriceName('usdjpy')).toEqual('USD/JPY');
    });
});
