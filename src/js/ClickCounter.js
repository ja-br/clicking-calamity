class ClickCount {
    constructor() {
        this.clickCount = 0;
        this.companionCount = 0;
        this.compounderCount = 0;
        this.companionCost = 100;
        this.compounderCost = 10;
    }
    click() {
        this.clickCount++;
    }

    getCompanionCount() {
        return this.companionCount;
    }

    getCompanionCost() {
        return this.companionCost;
    }

    purchaseCompanion() {
        this.clickCount -= this.companionCost;
        this.companionCost += 20;
        this.companionCount++;
    }


    getCompounderCount() {
        return this.compounderCount;
    }

    getCompounderCost() {
        return this.compounderCost;
    }

    purchaseCompounder() {
        this.clickCount -= this.compounderCost;
        this.compounderCost += 10;
        this.compounderCount++;
    }
}