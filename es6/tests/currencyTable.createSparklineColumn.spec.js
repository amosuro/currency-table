const CurrencyTable = require('../currencyTable.js');

describe("CurrencyTable.createSparklineColumn is a method that", () => {
    let content;
    
    beforeEach(() => {
        CurrencyTable.tableData = [
            {
                currencyPairs: {
                    midprices: 'midprices mock'
                }
            }
        ];
        
        content = 10;
    });
    
    it('returns a DOM node with table__row__col class and inits Sparkline', () => {  
        const mockSparklineInstance = {
            draw: (content) => content
        };
        
        spyOn(window, 'Sparkline').and.returnValue(mockSparklineInstance);
        spyOn(mockSparklineInstance, 'draw');
        spyOn(CurrencyTable.constructor, 'findPriceIndex').and.returnValue(0);
        
        expect(CurrencyTable.createSparklineColumn(content).classList.contains('table__row__col')).toBe(true);
        
        expect(mockSparklineInstance.draw).toHaveBeenCalledWith(CurrencyTable.tableData[0].currencyPairs.midprices)
    });
});
