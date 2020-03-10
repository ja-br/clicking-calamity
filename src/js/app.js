const clickButton = document.querySelector('#main-button')
const clickCount = document.querySelector('#click-count')
const resetButton = document.querySelector('#reset-button')
const companionCount = document.querySelector('#companion-count')
const compounderCount = document.querySelector('#compounder-count')
const clickFactor = document.querySelector('#click-factor')
const companionCollector = document.querySelector('#companions-button')
const compounderCollector = document.querySelector('#compounders-button')
const companionCollectionCost = document.querySelector('#companion-cost')
const compounderCollectionCost = document.querySelector('#compounder-cost')
const Counter = new ClickCount();

const updateClickCount = (displayClicksElement, counterObject) => {

    if (counterObject.getClickCount() > 0) {
        clickCount.classList.remove('container__communicator--hide');
    }
    if (counterObject.getClickCount() >= counterObject.getCompounderCost()) {
        compounderCollector.classList.remove('fly-out-right')
        compounderCollector.classList.add('fly-in-left')
    }
    if (counterObject.getClickCount() >= counterObject.getCompanionCost()) {
        companionCollector.classList.remove('fly-out-left')
        companionCollector.classList.add('fly-in-right')
    }
    displayClicksElement.innerText = Math.floor(counterObject.getClickCount());
}


const updateCompounderCount = (displayCompounderElement, counterObject) => {
    if (counterObject.getCompounderCount() > 0) {
        compounderCount.classList.remove('container__communicator--hide')
    }

    displayCompounderElement.innerText = "Compounders: " + counterObject.getCompounderCount();
}

const updateCompanionCount = (displayCompanionElement, counterObject) => {
    if (counterObject.getCompanionCount() > 0) {
        companionCount.classList.remove('container__communicator--hide')
    }
    displayCompanionElement.innerText = "Companions: " + counterObject.getCompanionCount();
}

const updateClickFactor = (displayClickFactorElement, counterObject) => {
    if (counterObject.getClickFactor() > 1) {
        clickFactor.classList.remove('container__communicator--hide')
    }
    displayClickFactorElement.innerText = "Each click is worth " + counterObject.getClickFactor().toFixed(2) + " clicks";
}

const updateCompounderCost = (displayCompounderCostElement, counterObject) => {
    displayCompounderCostElement.innerText = "Collection cost: " + counterObject.getCompounderCost();
}

const updateCompanionCost = (displayCompanionCostElement, counterObject) => {
    displayCompanionCostElement.innerText = "Collection cost: " + counterObject.getCompanionCost();
}

const checkCompounderPosition = (counterObject) => {
    if (counterObject.getCompounderCost() > counterObject.getClickCount() && compounderCollector.classList.contains('fly-in-left')) {
        compounderCollector.classList.add('fly-out-right')
        compounderCollector.classList.remove('fly-in-left')


    }
}

const checkCompanionPosition = (counterObject) => {
    if (counterObject.getCompanionCost() > counterObject.getClickCount() && companionCollector.classList.contains('fly-in-right')) {
        companionCollector.classList.add('fly-out-left')
        companionCollector.classList.remove('fly-in-right')


    }
}

const makeClickerButton = (clicker, clickCount, counterObject) => {
    clicker.addEventListener('click', () => {
        if (resetButton.classList.contains('container__communicator--hide')) {
            resetButton.classList.remove('container__communicator--hide')
        }
        counterObject.click();
        updateClickCount(clickCount, counterObject)
    })
}

const makeResetButton = (clicker, reset, counterObject) => {
    reset.addEventListener('click', () => {
        counterObject.reset();
        resetDisplay();
        updateAll();
    })
}

const makeCompanionCollector = (collector, counterObject) => {
    collector.addEventListener('click', () => {
        if (counterObject.getCompanionCount() == 0) {
            turnOnAutoClicker();
        }
        counterObject.collectCompanion();
        checkCompanionPosition(counterObject);
        checkCompounderPosition(counterObject);
        updateAll();
    })
}

const makeCompounderCollector = (collector, counterObject) => {
    collector.addEventListener('click', () => {
        counterObject.collectCompounder();
        checkCompounderPosition(counterObject);
        checkCompanionPosition(counterObject);
        updateAll();
    })
}

const resetDisplay = () => {
    clickCount.classList.add('container__communicator--hide');
    compounderCount.classList.add('container__communicator--hide')
    companionCount.classList.add('container__communicator--hide')
    clickFactor.classList.add('container__communicator--hide')
    resetButton.classList.add('container__communicator--hide')

}

const turnOnAutoClicker = () => {
    setInterval(() => {
        Counter.cashClickCompanions();
        updateAll()

    }, 1000);
}

const updateAll = () => {
    updateClickCount(clickCount, Counter)
    updateCompounderCount(compounderCount, Counter)
    updateCompanionCount(companionCount, Counter);
    updateClickFactor(clickFactor, Counter);
    updateCompounderCost(compounderCollectionCost, Counter);
    updateCompanionCost(companionCollectionCost, Counter);
    checkCompanionPosition(Counter);
    checkCompounderPosition(Counter);
}

const startCounter = () => {
    makeClickerButton(clickButton, clickCount, Counter)
    makeResetButton(clickButton, resetButton, Counter)
    makeCompanionCollector(companionCollector, Counter)
    makeCompounderCollector(compounderCollector, Counter)
    updateCompounderCost(compounderCollectionCost, Counter)
    updateCompanionCost(companionCollectionCost, Counter)
}


window.onload = () => {

    startCounter()
}