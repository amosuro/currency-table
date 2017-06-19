const CurrencyTable = require('../currencyTable.js');

describe("CurrencyTable.insertRow is a method that", () => {
    let wrapper, newRow;
    
    beforeEach(() => {
        CurrencyTable.tableBody = document.createElement('tbody');
        document.body.appendChild(CurrencyTable.tableBody);
        
        wrapper = document.createElement('div');
        document.body.appendChild(wrapper);
        
        newRow = {
            price: {
                name: 'usdjpy',
                midprices: []
            },
            currencyPairs: {}
        }
    });
    
    afterEach(() => {
        document.body.innerHTML = '';
    });
    
    it('calls createRow with new row data and correspondingElement if correspondingElement exists', () => {
        const correspondingElement = document.createElement('div');
        correspondingElement.dataset.currencyPair = newRow.price.name;
        wrapper.appendChild(correspondingElement);
        
        spyOn(CurrencyTable, 'createRow');
        
        CurrencyTable.insertRow(newRow);
        
        expect(CurrencyTable.createRow).toHaveBeenCalledWith(newRow, correspondingElement);
    });
    
    it('calls createRow with new row data and new DOM element if correspondingElement does not exist', () => {
        const mockNewDOMNode = document.createElement('tr');
        
        spyOn(CurrencyTable, 'createRow');
        spyOn(document, 'createElement').and.returnValue(mockNewDOMNode)
        
        CurrencyTable.insertRow(newRow);
        
        expect(CurrencyTable.createRow).toHaveBeenCalledWith(newRow, mockNewDOMNode);
    });
});
