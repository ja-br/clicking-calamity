describe('Clicking Counter Calamity', () => {
    let underTest;
    beforeEach(() => {
        underTest = new ClickCount();
        underTest._clickCount = 100;

    })
    describe('ClickCount() records clicks and Clickcounter can give the clickCount', () => {
        beforeEach(() => {
            underTest._clickCount = 0;
        })
        it('getClickCount() should return 1 when clicked once', () => {
            underTest.click();
            expect(underTest.getClickCount()).toBe(1);
        });
        it('getCountClick() should return clickCount of 2 when clicked twice', () => {
            underTest.click();
            underTest.click();
            expect(underTest.getClickCount()).toBe(2);
        });

        it('getClickCount() should be 1.2 when click() after collectCompounder', () => {
            underTest._clickCount = 10;
            underTest.collectCompounder();
            underTest.click();
            expect(underTest.getClickCount()).toBe(1.2);
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
            underTest._clickCount = 110;
            underTest.collectCompanion();
            expect(underTest.getClickCount()).toBe(0);
        });

        it('1 click should be added to clickCount for every companion', () => {
            underTest.collectCompanion();
            underTest._clickCount = 110;
            underTest.collectCompanion();
            underTest._clickCount = 0;
            underTest.cashClickCompanions();
            expect(underTest.getClickCount()).toBe(2);
        });

        it('should apply click compounder', () => {
            underTest.collectCompounder();
            underTest._clickCount = 0;
            underTest._compounderCount = 1;
            underTest._companionCount = 1;
            underTest.cashClickCompanions();
            expect(underTest.getClickCount()).toBe(1.2)
        });
        it('should apply click compounder', () => {
            underTest.collectCompounder();
            underTest.collectCompounder();
            underTest._clickCount = 0;
            underTest._compounderCount = 1;
            underTest._companionCount = 1;
            underTest.cashClickCompanions();
            expect(underTest.getClickCount()).toBe(1.44)
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

    });
    describe('Click Count Reset', () => {
        it('should reset all ClickCount() fields', () => {

            for (let i = 10000; i > 0; i--) {
                underTest.click();
            }
            underTest.collectCompanion();
            underTest.collectCompounder();
            underTest.reset();
            expect(underTest.getClickCount()).toBe(0);
            expect(underTest.getCompanionCount()).toBe(0);
            expect(underTest.getCompanionCost()).toBe(100);
            expect(underTest.getCompounderCost()).toBe(10);
            expect(underTest.getCompounderCount()).toBe(0);
            expect(underTest.getClickFactor()).toBe(1);
        });
    });

});