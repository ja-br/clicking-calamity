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

let stormActive = false;
let stormButtons = [];
let autoClickerInterval = null;
let clicksSinceLastStorm = 0;
let clicksNeededForStorm = Math.floor(Math.random() * 101) + 50; // 50-150 clicks

const updateClickCount = (displayClicksElement, counterObject) => {

    if (counterObject.getClickCount() > 0) {
        clickCount.classList.remove('container__communicator--hide');
    }
    if (counterObject.getClickCount() >= counterObject.getCompounderCost()) {
        compounderCollector.classList.remove('fly-out-right')
        compounderCollector.classList.add('fly-in-right')
    }
    if (counterObject.getClickCount() >= counterObject.getCompanionCost()) {
        companionCollector.classList.remove('fly-out-left')
        companionCollector.classList.add('fly-in-left')
    }

    displayClicksElement.innerText = Math.floor(counterObject.getClickCount());
}

const createClickRipple = (event) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';

    const size = 100; // Fixed smaller size
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - event.currentTarget.getBoundingClientRect().left - size / 2) + 'px';
    ripple.style.top = (event.clientY - event.currentTarget.getBoundingClientRect().top - size / 2) + 'px';

    event.currentTarget.appendChild(ripple);
    setTimeout(() => ripple.remove(), 400);
}

const createFloatingNumber = (value, x, y) => {
    const floatingNum = document.createElement('div');
    floatingNum.className = 'floating-number';
    floatingNum.innerText = '+' + value.toFixed(1);
    floatingNum.style.left = x + 'px';
    floatingNum.style.top = y + 'px';

    document.body.appendChild(floatingNum);
    setTimeout(() => floatingNum.remove(), 1000);
}

const showAchievementNotification = (achievement) => {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <h3>🏆 Achievement Unlocked!</h3>
        <p><strong>${achievement.name}</strong></p>
        <p>${achievement.description}</p>
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

const checkForNewAchievements = (counterObject) => {
    const newAchievements = counterObject.getNewAchievements();
    newAchievements.forEach(achievement => {
        showAchievementNotification(achievement);
    });
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
    if (counterObject.getCompounderCost() > counterObject.getClickCount() && compounderCollector.classList.contains('fly-in-right')) {
        compounderCollector.classList.add('fly-out-right')
        compounderCollector.classList.remove('fly-in-right')


    }
}

const checkCompanionPosition = (counterObject) => {
    if (counterObject.getCompanionCost() > counterObject.getClickCount() && companionCollector.classList.contains('fly-in-left')) {
        companionCollector.classList.add('fly-out-left')
        companionCollector.classList.remove('fly-in-left')


    }
}

const makeClickerButton = (clicker, clickCount, counterObject) => {
    clicker.addEventListener('click', (event) => {
        const clickValue = counterObject.getClickFactor();
        counterObject.click();

        // Visual feedback
        createClickRipple(event);
        createFloatingNumber(clickValue, event.clientX, event.clientY);

        // Track clicks for storm trigger
        clicksSinceLastStorm++;
        if (clicksSinceLastStorm >= clicksNeededForStorm && !stormActive) {
            startClickStorm();
            clicksSinceLastStorm = 0;
            clicksNeededForStorm = Math.floor(Math.random() * 101) + 50; // Reset for next storm
        }

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

const turnOnAutoClicker = () => {
    if (autoClickerInterval) {
        clearInterval(autoClickerInterval);
    }
    autoClickerInterval = setInterval(() => {
        Counter.cashClickCompanions();
        Counter.updateClicksPerSecond();
        updateAll()

    }, 1000);
}

// Click Storm Event System
const startClickStorm = () => {
    if (stormActive) return;

    stormActive = true;
    const stormDuration = 60000; // 60 seconds
    const spawnInterval = 1000; // Spawn new button every second

    // Spawn storm buttons
    const spawnStormButton = () => {
        const button = document.createElement('button');
        button.className = 'storm-button';

        // Scale storm value with click factor (5-10x current click value)
        const clickFactor = Counter.getClickFactor();
        const multiplier = Math.floor(Math.random() * 6) + 5; // 5-10x
        const value = Math.round(clickFactor * multiplier);
        button.innerText = '+' + Math.floor(value);

        // Random position
        const x = Math.random() * (window.innerWidth - 80) + 10;
        const y = Math.random() * (window.innerHeight - 80) + 10;
        button.style.left = x + 'px';
        button.style.top = y + 'px';

        button.addEventListener('click', () => {
            Counter._clickCount += value;
            Counter._totalClicksEver += value;
            Counter._clicksThisSecond += value;
            Counter._checkAchievements();
            updateAll();
            button.remove();
            const index = stormButtons.indexOf(button);
            if (index > -1) stormButtons.splice(index, 1);
        });

        document.body.appendChild(button);
        stormButtons.push(button);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (document.body.contains(button)) {
                button.remove();
                const index = stormButtons.indexOf(button);
                if (index > -1) stormButtons.splice(index, 1);
            }
        }, 3000);
    };

    // Spawn buttons during storm
    const spawnLoop = setInterval(() => {
        const numButtons = Math.floor(Math.random() * 3) + 1; // 1-3 buttons
        for (let i = 0; i < numButtons; i++) {
            spawnStormButton();
        }
    }, spawnInterval);

    // End storm after duration
    setTimeout(() => {
        clearInterval(spawnLoop);
        stormActive = false;
        stormButtons.forEach(btn => btn.remove());
        stormButtons = [];
    }, stormDuration);
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
    checkForNewAchievements(Counter);
}

const startCounter = () => {
    makeClickerButton(clickButton, clickCount, Counter)
    makeCompanionCollector(companionCollector, Counter)
    makeCompounderCollector(compounderCollector, Counter)
    updateCompounderCost(compounderCollectionCost, Counter)
    updateCompanionCost(companionCollectionCost, Counter)
}


window.onload = () => {

    startCounter()
}