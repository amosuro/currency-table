const CurrencyTable = require('../currencyTable.js');

describe("CurrencyTable.sortRows is a method that", () => {
    let createRowElement;
    
    beforeEach(() => {
        const mockRowElement1 = createRowElement(10);
        const mockRowElement2 = createRowElement(7);
        const mockRowElement3 = createRowElement(11);
        
        CurrencyTable.tableBody = document.createElement('tbody');
        CurrencyTable.tableBody.appendChild(mockRowElement1);
        CurrencyTable.tableBody.appendChild(mockRowElement2);
        CurrencyTable.tableBody.appendChild(mockRowElement3);
    });
    
    it('calls updateRow if isExistingPrice returns true', () => {    
        CurrencyTable.sortRows();
        
        const tableRows = [...CurrencyTable.tableBody.children];
        expect(tableRows[0].dataset.lastChangeBid).toEqual('11');
        expect(tableRows[1].dataset.lastChangeBid).toEqual('10');
        expect(tableRows[2].dataset.lastChangeBid).toEqual('7');
    });
    
    createRowElement = (lastChangeBid) => {
        const mockRowElement = document.createElement('tr');
        mockRowElement.dataset.lastChangeBid = lastChangeBid;
        
        return mockRowElement;
    }
});
