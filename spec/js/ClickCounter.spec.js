describe('Clicking Counter Calamity', () => {
    let underTest;
    beforeEach(() => {
        underTest = new ClickCount();
        underTest._clickCount = 100;

    })
    describe('countClick() records clicks and Clickcounter can give the clickCount', () => {

        it('clickCount() 1 time should return 1', () => {
            underTest.click();
            expect(underTest.getClickCount()).toBe(101);
        });
        it('countClick() twice should return clickCount of 2', () => {
            underTest.click();
            underTest.click();
            expect(underTest.getClickCount()).toBe(102);
        });
    });

    describe('Clicking Companions', () => {


        it('ClickCounter should begin with 0 companions', () => {
            expect(underTest.getCompanionCount()).toBe(0);

        });
        it('collectCompanion should increase companioncount by 1', () => {
            underTest.collectCompanion();
            expect(underTest.getCompanionCount()).toBe(1);

        });
        it('collectCompanion does not run if there are insufficient clickCount', () => {
            underTest._clickCount = 50;
            underTest.collectCompanion();
            expect(underTest.getClickCount()).toBe(50);
        });
        it('collectCompanion reduces clickCount by companionCost', () => {
            underTest.collectCompanion();
            underTest._clickCount = 120;
            underTest.collectCompanion();
            expect(underTest.getClickCount()).toBe(0);
        });
        it('collectCompanion cost should increase by 20 everytime', () => {
            underTest._clickCount = 999999;
            const numberOfCompanions = Math.floor(Math.random() * 20) + 1;
            let companionCost = 100;
            for (let i = 0; i <= numberOfCompanions; i++) {
                underTest.collectCompanion();
                companionCost += 20;
            }
            expect(underTest.getCompanionCost()).toBe(companionCost);

        });
        it('1 click should be added to clickCount for every companion', () => {
            underTest.collectCompanion();
            underTest.collectCompanion();
            underTest.cashClickCompanions();
            let clickCount = underTest.getClickCount();
            expect(clickCount).toBe(1);
        });

    });

    describe('Culmination Compounder', () => {

        it('ClickCounter should begin with 0 compounders', () => {
            expect(underTest.getCompounderCount()).toBe(0);
        });
        it('collectCompounder should increase compounderCount by 1', () => {
            underTest.collectCompounder();
            expect(underTest.getCompounderCount()).toBe(1);
        });
        it('collectCompounder reduces clickCount by 10', () => {
            underTest.collectCompounder();
            expect(underTest.getClickCount()).toBe(90);
        });
        it('collectCompounder cost should increase by 10 everytime', () => {
            underTest._clickCount = 999999;
            const numberOfCompanions = Math.floor(Math.random() * 20) + 1;
            let compounderCost = 10;

            for (let i = 0; i <= numberOfCompanions; i++) {

                underTest.collectCompounder();
                compounderCost += 10;
            }
            expect(underTest.getCompounderCost()).toBe(compounderCost);
        });
        it('collectCompounder() does not run if there are insufficient clickCount', () => {
            underTest._clickCount = 5;
            underTest.collectCompounder();
            expect(underTest.getClickCount()).toBe(5);
        })
        it('1 Compounder increases clickFactor to 1.2x', () => {
            underTest.collectCompounder();
            expect(underTest.getClickFactor()).toBe(1.2)
        });
        it('2 Compounders increase clickFactor to 1.44 ', () => {
            underTest.collectCompounder();
            underTest.collectCompounder();
            expect(underTest.getClickFactor()).toBe(1.44)
        });
        it('multiple compounders go super crazy', () => {
            underTest._clickCount = 999999;
            const numberOfCompounders = Math.floor(Math.random() * 20) + 1;
            let testClickFactor = 1.2;
            for (let i = 0; i <= numberOfCompounders; i++) {
                underTest.collectCompounder();
                testClickFactor = (testClickFactor * testClickFactor)
            }
            expect(underTest.getClickFactor()).toBe(testClickFactor);
        });
    });

});