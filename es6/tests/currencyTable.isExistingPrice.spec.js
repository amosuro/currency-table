const CurrencyTable = require('../currencyTable.js');

describe("CurrencyTable.isExistingPrice is a method that", () => {
    it('returns true if an element within given data array matches the given latestPrice name', () => {
        const latestPrice = {
            name: 'usdjpy'
        };
        
        const data = [
            {
                price: {
                    name: 'usdjpy'
                }
            },
            {
                price: {
                    name: 'gbpusd'
                }
            }
        ];
        
        expect(CurrencyTable.constructor.isExistingPrice(latestPrice, data)).toBe(true);
    });
    
    it('returns false if no elements within given data array match the given latestPrice name', () => {
        const latestPrice = {
            name: 'jpygbp'
        };
        
        const data = [
            {
                price: {
                    name: 'usdjpy'
                }
            },
            {
                price: {
                    name: 'gbpusd'
                }
            }
        ];
        
        expect(CurrencyTable.constructor.isExistingPrice(latestPrice, data)).toBe(false);
    });
});
