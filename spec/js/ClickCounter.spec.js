describe('Clicking Counter Calamity', () => {
    describe('countClick() records clicks and Clickcounter can give the clickCount', () => {
        beforeEach(() => {
            clickCount = 0;
        })
        it('clickCount() 1 time should return 1', () => {
            countClick();
            expect(clickCount).toBe(1);
        });
        it('countClick() twice should return clickCount of 2', () => {
            countClick();
            countClick();
            expect(clickCount)
        });
    });

});