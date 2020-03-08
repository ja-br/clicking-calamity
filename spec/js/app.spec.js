describe('app.js manipulates the DOM to reflect the status of a ClickCounter object', () => {
    let testCounterObject;
    let testDisplayElement;
    let testAddClickButton;
    let testCollectElement;

    beforeEach(() => {
        testCounterObject = new ClickCount();
        testDisplayElement = document.createElement('div');
        testAddClickButton = document.createElement('button');
        testCollectElement = document.createElement('div')
        testCounterObject._clickCount = 0;
        testCounterObject._companionCount = 0;
        testCounterObject._compounderCount = 0;
        testCounterObject._companionCost = 100;
        testCounterObject._compounderCost = 10;
        testCounterObject._clickFactor = 1;
    })
    describe('Clicker', () => {
        it('testClickDisplay should have an innerText of "0" if there are no clicks', () => {
            updateClickCount(testDisplayElement, testCounterObject);
            expect(testDisplayElement.innerText).toBe('0');
        });
        it('testDisplayClicksElement should reflect the number of times click() is called', () => {
            testCounterObject.click();
            updateClickCount(testDisplayElement, testCounterObject)
            expect(testDisplayElement.innerText).toBe('1');
            testCounterObject.click();
            testCounterObject.click();
            updateClickCount(testDisplayElement, testCounterObject);
            expect(testDisplayElement.innerText).toBe('3');
        });
    });
    describe('compounderElements', () => {
        it('testDisplay should have in innerText of "0" if there are no compounders', () => {
            updateCompounderCount(testDisplayElement, testCounterObject);
            expect(testDisplayElement.innerText).toBe('0')
        });
        it('testDisplayElement should reflect the number of compounders', () => {
            testCounterObject._compounderCount = 10
            updateCompounderCount(testDisplayElement, testCounterObject);
            expect(testDisplayElement.innerText).toBe('10')
        });
        it('should update display with cost of buying a new compounder', () => {
            testCounterObject._clickCount = 30;
            updateCompounderCost(testDisplayElement, testCounterObject)
            expect(testDisplayElement.innerText).toBe('10')
            testCounterObject.collectCompounder();
            updateCompounderCost(testDisplayElement, testCounterObject)
            expect(testDisplayElement.innerText).toBe('20')
            testCounterObject.collectCompounder();
            updateCompounderCost(testDisplayElement, testCounterObject)
            expect(testDisplayElement.innerText).toBe('30')
        });
    });
    describe('change companion elements', () => {
        it('testDisplay should have in innerText of "0" if there are no companions', () => {
            updateCompanionCount(testDisplayElement, testCounterObject);
            expect(testDisplayElement.innerText).toBe('0')
        });
        it('testDisplayElement should reflect the number of companions', () => {
            testCounterObject._companionCount = 10
            updateCompanionCount(testDisplayElement, testCounterObject);
            expect(testDisplayElement.innerText).toBe('10')
        });
        it('updateCompanionCost() update display with cost of buying new companion', () => {
            testCounterObject._clickCount = 100;
            updateCompanionCost(testDisplayElement, testCounterObject);
            testCounterObject.collectCompanion()
            updateCompanionCost(testDisplayElement, testCounterObject);
            expect(testDisplayElement.innerText).toBe('120');
        });
    });
    describe('hideCollectElement() changes element class to hide', () => {
        it('should add class of hide to element', () => {
            hideElement(testCollectElement);
            expect(testCollectElement.className).toBe("hide");
        });
    });
    describe('updateClickFactor changes element innerText to match clickFactor', () => {
        it('should begin at "1"', () => {
            updateClickFactor(testDisplayElement, testCounterObject);
            expect(testDisplayElement.innerText).toBe('1');
        });

    })
})