class ClickCount {
    constructor() {
        this.clickCount = 0;
        this.companionCount = 0;
        this.compounderCount = 0;
    }
    click() {
        this.clickCount++;
    }

    getCompanionCount() {
        return this.companionCount;
    }

    purchaseCompanion() {
        this.clickCount -= 100;
        this.companionCount++;
    }

    getCompounderCount() {
        return this.compounderCount;
    }

    purchaseCompounder() {
        this.clickCount -= 10;
        this.compounderCount++;
    }
}