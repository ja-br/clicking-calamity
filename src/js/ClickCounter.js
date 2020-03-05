class ClickCount {
    constructor() {
        this._clickCount = 0;
        this._companionCount = 0;
        this._compounderCount = 0;
        this._companionCost = 100;
        this._compounderCost = 10;
    }

    click() {
        this._clickCount++;
    }

    getCompanionCount() {
        return this._companionCount;
    }

    getCompanionCost() {
        return this._companionCost;
    }

    purchaseCompanion() {
        this._clickCount -= this._companionCost;
        this._companionCost += 20;
        this._companionCount++;
    }


    getCompounderCount() {
        return this._compounderCount;
    }

    getCompounderCost() {
        return this._compounderCost;
    }

    purchaseCompounder() {
        this._clickCount -= this._compounderCost;
        this._compounderCost += 10;
        this._compounderCount++;
    }

    getClickCount() {
        return this._clickCount;
    }
    corralClickCompanions() {
        this._clickCount += this._companionCount;

    }
}