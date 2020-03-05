class ClickCount {
    constructor() {
        this._clickCount = 0;
        this._companionCount = 0;
        this._compounderCount = 0;
        this._companionCost = 100;
        this._compounderCost = 10;
        this._clickFactor = 1;
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

    collectCompanion() {
        if (this._clickCount >= this.getCompanionCost()) {
            this._clickCount -= this._companionCost;
            this._companionCost += 20;
            this._companionCount++;
        }

    }


    getCompounderCount() {
        return this._compounderCount;
    }

    getCompounderCost() {
        return this._compounderCost;
    }

    collectCompounder() {
        if (this._clickCount >= this.getCompounderCost()) {
            this._clickCount -= this._compounderCost;
            this._compounderCost += 10;
            this._compounderCount++;
            if (this._clickFactor == 1) {
                this._clickFactor = 1.2;
            } else {
                this._clickFactor = (this._clickFactor * this._clickFactor)
            }

        }

    }

    getClickCount() {
        return this._clickCount;
    }
    cashClickCompanions() {
        this._clickCount += this._companionCount;

    }

    getClickFactor() {
        return this._clickFactor;
    }
}