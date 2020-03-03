describe('Clicking Counter Calamity', () => {
    let underTest = new ClickCount();
    describe('countClick() records clicks and Clickcounter can give the clickCount', () => {
        beforeEach(() => {
            underTest.clickCount = 0;
        })
        it('clickCount() 1 time should return 1', () => {
            underTest.click();
            expect(underTest.clickCount).toBe(1);
        });
        it('countClick() twice should return clickCount of 2', () => {
            underTest.click();
            underTest.click();
            expect(underTest.clickCount).toBe(2);
        });
    });

});