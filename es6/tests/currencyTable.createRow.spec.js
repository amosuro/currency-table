const CurrencyTable = require('../currencyTable.js');

describe("CurrencyTable.createRow is a method that", () => {
    let rowData, domElement;
    let table, tableBody;
    
    beforeEach(() => {
        table = document.createElement('table');
        tableBody = document.createElement('tbody');
        domElement = document.createElement('tr');
        
        document.body.appendChild(domElement);
        document.body.appendChild(table);
        table.appendChild(tableBody);
        
        rowData = {
            price: {
                name: 'usdjpy',
                bestBid: '10',
                bestAsk: '15',
                lastChangeBid: '15',
                lastChangeAsk: '25'
            }
        };
    });
    
    afterEach(() => {
        document.body.innerHTML = '';
    });
    
    it('prepares element properties, appends columns to DOM element and calls sortRows', () => {
        spyOn(CurrencyTable.constructor, 'displayPriceName').and.returnValue('USD/JPY');
        spyOn(CurrencyTable, 'sortRows');
        spyOn(domElement, 'appendChild');
        spyOn(CurrencyTable, 'createColumn');
        spyOn(CurrencyTable, 'createSparklineColumn');
        
        CurrencyTable.createRow(rowData, domElement);
        
        expect(CurrencyTable.constructor.displayPriceName).toHaveBeenCalledWith(rowData.price.name);
        expect(domElement.classList.contains('table__row')).toBe(true);
        expect(domElement.dataset.currencyPair).toEqual(rowData.price.name);
        expect(domElement.dataset.lastChangeBid).toEqual(rowData.price.lastChangeBid);
        expect(CurrencyTable.sortRows).toHaveBeenCalled();
        
        expect(domElement.appendChild.calls.count()).toEqual(6);
    });
});
