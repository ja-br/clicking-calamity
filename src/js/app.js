const updateClickCount = (displayClicksElement, counterObject) => {
    displayClicksElement.innerText = Math.floor(counterObject.getClickCount());
}

const hideElement = (elementToHide) => {
    elementToHide.classList.add("hide")
}

const updateCompounderCount = (displayCompounderElement, counterObject) => {
    displayCompounderElement.innerText = counterObject.getCompounderCount();
}

const updateCompanionCount = (displayCompanionElement, counterObject) => {
    displayCompanionElement.innerText = counterObject.getCompanionCount();
}

const updateClickFactor = (displayClickFactorElement, counterObject) => {
    displayClickFactorElement.innerText = counterObject.getClickFactor().toFixed(2);
}

const updateCompounderCost = (displayCompounderCostElement, counterObject) => {
    displayCompounderCostElement.innerText = counterObject.getCompounderCost();
}

const updateCompanionCost = (displayCompanionCostElement, counterObject) => {
    displayCompanionCostElement.innerText = counterObject.getCompanionCost();
}

const updateAll = () => {
    updateClickCount(clickCount, Counter)
    updateCompounderCount(compounderCount, Counter)
    updateCompanionCount(companionCount, Counter);
    updateClickFactor(clickFactor, Counter);
    updateCompounderCost(compounderCollectionCost, Counter);
    updateCompanionCost(companionCollectionCost, Counter);
}

const makeClickerButton = (clicker, clickCount, counterObject) => {
    clicker.addEventListener('click', () => {
        counterObject.click();
        updateClickCount(clickCount, counterObject)
    })
}

const makeCompanionCollector = (collector, counterObject) => {
    collector.addEventListener('click', () => {
        counterObject.collectCompanion();
        updateAll();
    })
}

const makeCompounderCollector = (collector, counterObject) => {
    collector.addEventListener('click', () => {
        counterObject.collectCompounder();
        updateAll();
    })
}

const clickButton = document.querySelector('#main-button')
const clickCount = document.querySelector('#click-count')
const companionCount = document.querySelector('#companion-count')
const compounderCount = document.querySelector('#compounder-count')
const clickFactor = document.querySelector('#click-factor')
const companionCollector = document.querySelector('#companions-button')
const compounderCollector = document.querySelector('#compounders-button')
const companionCollectionCost = document.querySelector('#companion-cost')
const compounderCollectionCost = document.querySelector('#compounder-cost')
const Counter = new ClickCount();



makeClickerButton(clickButton, clickCount, Counter)
makeCompanionCollector(companionCollector, Counter)
makeCompounderCollector(compounderCollector, Counter)
updateAll()