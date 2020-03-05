describe('Clicking Counter Calamity', () => {
    let underTest;
    beforeEach(() => {
        underTest = new ClickCount();

    })
    describe('countClick() records clicks and Clickcounter can give the clickCount', () => {

        it('clickCount() 1 time should return 1', () => {
            underTest.click();
            expect(underTest.getClickCount()).toBe(1);
        });
        it('countClick() twice should return clickCount of 2', () => {
            underTest.click();
            underTest.click();
            expect(underTest.getClickCount()).toBe(2);
        });
    });

    describe('Clicking Companions', () => {


        it('ClickCounter should begin with 0 companions', () => {
            expect(underTest.getCompanionCount()).toBe(0);

        });
        it('purchaseCompanion should increase companioncount by 1', () => {
            underTest.purchaseCompanion();
            expect(underTest.getCompanionCount()).toBe(1);

        });
        it('purchaseCompanion does not run if there are insufficient clickCount', () => {
            underTest.purchaseCompanion();

        });
        it('purchaseCompanion reduces clickCount by 100', () => {
            underTest.purchaseCompanion();
            expect(underTest.getClickCount()).toBe(-100);
        });
        it('purchaseCompanion cost should increase by 20 everytime', () => {
            const numberOfCompanions = Math.floor(Math.random() * 20) + 1;
            let companionCost = 100;
            for (let i = 0; i <= numberOfCompanions; i++) {
                underTest.purchaseCompanion();
                companionCost += 20;
            }
            expect(underTest.getCompanionCost()).toBe(companionCost);

        });
        it('1 click should be added to clickCount for every companion', () => {
            underTest.purchaseCompanion();
            underTest.purchaseCompanion();
            underTest.corralClickCompanions();
            let clickCount = underTest.getClickCount();
            expect(clickCount).toBe(-218);
        });

    });

    describe('Culmination Compounder', () => {

        it('ClickCounter should begin with 0 compounders', () => {
            expect(underTest.getCompounderCount()).toBe(0);
        });
        it('purchaseCompounder should increase compounderCount by 1', () => {
            underTest.purchaseCompounder();
            expect(underTest.getCompounderCount()).toBe(1);
        });
        it('purchaseCompanion reduces clickCount by 10', () => {
            underTest.purchaseCompounder();
            expect(underTest.getClickCount()).toBe(-10);
        });
        it('purchaseCompounder cost should increase by 10 everytime', () => {
            const numberOfCompanions = Math.floor(Math.random() * 20) + 1;
            let compounderCost = 10;
            for (let i = 0; i <= numberOfCompanions; i++) {
                underTest.purchaseCompounder();
                compounderCost += 10;
            }
            expect(underTest.getCompounderCost()).toBe(compounderCost);
        });
    });

});