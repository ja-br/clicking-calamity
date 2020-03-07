const updateClickCount = (displayClicksElement, counterObject) => {
    displayClicksElement.innerText = counterObject.getClickCount();
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
    displayClickFactorElement.innerText = counterObject.getClickFactor();
}