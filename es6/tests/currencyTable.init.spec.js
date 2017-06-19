const CurrencyTable = require('../currencyTable.js');

describe("CurrencyTable.init is a method that", () => {
    let latestPrice;
    
    beforeEach(() => {
        latestPrice = {
            name: 'usdjpy'
        };
        
        spyOn(CurrencyTable, 'addRow');
        spyOn(CurrencyTable, 'updateRow');
    });
    
    it('calls updateRow if isExistingPrice returns true', () => {    
        spyOn(CurrencyTable.constructor, 'isExistingPrice').and.returnValue(true);
        
        CurrencyTable.init(latestPrice);
        
        expect(CurrencyTable.updateRow).toHaveBeenCalledWith(latestPrice);
        expect(CurrencyTable.addRow).not.toHaveBeenCalled();
    });
    
    it('calls addRow if isExistingPrice returns false', () => {    
        spyOn(CurrencyTable.constructor, 'isExistingPrice').and.returnValue(false);
        
        CurrencyTable.init(latestPrice);
        
        expect(CurrencyTable.addRow).toHaveBeenCalledWith(latestPrice);
        expect(CurrencyTable.updateRow).not.toHaveBeenCalled();
    });
});
