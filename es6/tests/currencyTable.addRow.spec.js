const CurrencyTable = require('../currencyTable.js');

describe("CurrencyTable.addRow is a method that", () => {
    let price;
    
    beforeEach(() => {
        CurrencyTable.tableData = [];
        
        price = {
            bestBid: 10,
            bestAsk: 15
        };
    });
    
    it('pushes price and currency pairs to the tableData array', () => {
        const mockMidPrice = 'mock midprice';
        spyOn(CurrencyTable.constructor, 'calculateMidPrice').and.returnValue(mockMidPrice);
        spyOn(CurrencyTable, 'insertRow')
        
        CurrencyTable.addRow(price);
        
        const expectedResult = [
            {
                price: price,
                currencyPairs: {
                    name: price.name,
                    midprices: [mockMidPrice]
                }
            }
        ]
        expect(CurrencyTable.constructor.calculateMidPrice).toHaveBeenCalledWith(price.bestBid, price.bestAsk);
        expect(CurrencyTable.tableData).toEqual(expectedResult);
        expect(CurrencyTable.insertRow).toHaveBeenCalledWith(expectedResult[0]);
    });
});
