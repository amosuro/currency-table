const CurrencyTable = require('../currencyTable.js');

describe("CurrencyTable.updateRow is a method that", () => {
    let newPrice, mockMidPrice;
    
    beforeEach(() => {
        CurrencyTable.tableData = [
            {
                price: {},
                currencyPairs: {
                    name: 'usdjpy',
                    midprices: []
                }
            }
        ];
        
        newPrice = {
            bestBid: 10,
            bestAsk: 15
        };
        
        mockMidPrice = 'mock midprice'; 
        
        spyOn(CurrencyTable.constructor, 'findPriceIndex').and.returnValue(0);
        spyOn(CurrencyTable.constructor, 'calculateMidPrice').and.returnValue(mockMidPrice);
        spyOn(CurrencyTable, 'insertRow');
    });
    
    it('pushes a new midprice to the midprices array within the given price', () => {
        CurrencyTable.updateRow(newPrice);
        
        const expectedResult = [
            'mock midprice'
        ];
        
        expect(CurrencyTable.constructor.findPriceIndex).toHaveBeenCalledWith(CurrencyTable.tableData, newPrice);
        expect(CurrencyTable.constructor.calculateMidPrice).toHaveBeenCalledWith(newPrice.bestBid, newPrice.bestAsk);
        expect(CurrencyTable.tableData[0].currencyPairs.midprices).toEqual(expectedResult);
        expect(CurrencyTable.tableData[0].price).toEqual(newPrice);
        expect(CurrencyTable.insertRow).toHaveBeenCalledWith(CurrencyTable.tableData[0]); 
    });
    
    it('removes the first midprice from the midprices array within the given price', () => {
        const existingMockMidPrice = 'existing mock midprice';
        
        for (var i = 0; i < 31; i++) {
            CurrencyTable.tableData[0].currencyPairs.midprices.push(existingMockMidPrice);
        }
        
        CurrencyTable.updateRow(newPrice);
        
        expect(CurrencyTable.constructor.findPriceIndex).toHaveBeenCalledWith(CurrencyTable.tableData, newPrice);
        expect(CurrencyTable.constructor.calculateMidPrice).toHaveBeenCalledWith(newPrice.bestBid, newPrice.bestAsk);
        expect(CurrencyTable.tableData[0].currencyPairs.midprices.length).toEqual(30);
        expect(CurrencyTable.tableData[0].price).toEqual(newPrice);
        expect(CurrencyTable.insertRow).toHaveBeenCalledWith(CurrencyTable.tableData[0]);
    });
});
