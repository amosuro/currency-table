const CurrencyTable = require('../currencyTable.js');

describe("CurrencyTable.createColumn is a method that", () => {
    let content;
    
    beforeEach(() => {
        content = 'usdjpy';
    });
    
    it('returns a DOM node with table__row__col class and given content', () => {  
        expect(CurrencyTable.createColumn(content, 'name').classList.contains('table__row__col')).toBe(true);
        expect(CurrencyTable.createColumn(content, 'name').innerHTML).toEqual(content);
        expect(CurrencyTable.createColumn(content, 'name').dataset.name).toEqual(content);
    });
});
