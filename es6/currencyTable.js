class CurrencyTable {
    constructor() {
        this.tableData = [];
        
        this.tableBody = document.getElementsByTagName('tbody')[0];
    }
    
    init(latestPrice) {
        this.constructor.isExistingPrice(latestPrice, this.tableData) ? this.updateRow(latestPrice) : this.addRow(latestPrice);
    }
    
    addRow(price) {
        const newMidPrice = this.constructor.calculateMidPrice(price.bestBid, price.bestAsk);
        const currencyPairs = {
            name: price.name, 
            midprices: [newMidPrice]
        };
        const newRow = {
            price: price,
            currencyPairs: currencyPairs
        };
        
        this.tableData.push(newRow);
        this.insertRow(newRow);
    }
    
    updateRow(newPrice) {
        const priceIndex = this.constructor.findPriceIndex(this.tableData, newPrice);
        const tableRow = this.tableData[priceIndex];
        const newMidPrice = this.constructor.calculateMidPrice(newPrice.bestBid, newPrice.bestAsk);
        const existingMidPrice = tableRow.currencyPairs.midprices;
        
        if (existingMidPrice.length < 30) {
            existingMidPrice.push(newMidPrice);
        } else {
            existingMidPrice.shift();
        }
        
        tableRow.price = newPrice;
        
        this.insertRow(tableRow);
    }
    
    insertRow(newRow) {
        const correspondingElement = document.querySelectorAll(`[data-currency-pair=${newRow.price.name}]`)[0];
        
        if (correspondingElement) {
            this.createRow(newRow, correspondingElement);
        } else {
            const newElement = document.createElement('tr');
            this.tableBody.appendChild(newElement);
            
            this.createRow(newRow, newElement);   
        }
    }
    
    createRow(rowData, element) {
        const priceName = this.constructor.displayPriceName(rowData.price.name);
        element.innerHTML = '';
        element.classList.add('table__row');
        element.dataset.currencyPair = rowData.price.name;
        element.dataset.lastChangeBid = rowData.price.lastChangeBid;
        
        element.appendChild(this.createColumn(priceName, 'name'));
        element.appendChild(this.createColumn(rowData.price.bestBid, 'bestBid'));
        element.appendChild(this.createColumn(rowData.price.bestAsk, 'bestAsk'));
        element.appendChild(this.createColumn(rowData.price.lastChangeBid, 'lastChangeBid'));
        element.appendChild(this.createColumn(rowData.price.lastChangeAsk, 'lastChangeAsk'));
        element.appendChild(this.createSparklineColumn(rowData.price));
        
        this.sortRows();
    }
    
    sortRows() {
        const rows = [...this.tableBody.children];
        
        rows.sort((a, b) => b.dataset.lastChangeBid - a.dataset.lastChangeBid);
        
        this.tableBody.innerHTML = '';
        
        rows.map(row => {
            this.tableBody.appendChild(row);
        })
    }
        
    createColumn(content, field) {
        const tableCol = document.createElement('td');
        
        tableCol.classList.add('table__row__col');
        tableCol.dataset[field] = content;
        tableCol.innerHTML = content;
        
        return tableCol;
    }
    
    createSparklineColumn(content) {
        const priceIndex = this.constructor.findPriceIndex(this.tableData, content);
        const tableCol = document.createElement('td');
        const sparklineContainer = document.createElement('span');
        const sparklineInstance = new Sparkline(sparklineContainer);
        
        tableCol.classList.add('table__row__col');
        tableCol.appendChild(sparklineContainer);
        
        sparklineInstance.draw(this.tableData[priceIndex].currencyPairs.midprices);
        
        return tableCol;
    }
    
    static findPriceIndex(tableData, price) {
        return tableData.findIndex((data) => data.price.name === price.name);
    }
    
    static displayPriceName(pair) {
        const currencyOne = pair.slice(0,3);
        const currencyTwo = pair.slice(3,6);
        
        return `${currencyOne}/${currencyTwo}`.toUpperCase();
    }
    
    static isExistingPrice(latestPrice, data) {
        return !!data.some((data) => data.price.name === latestPrice.name);
    }
    
    static calculateMidPrice(bestBid, bestAsk) {
        return (bestBid + bestAsk)/2;
    }
}

module.exports = new CurrencyTable();
