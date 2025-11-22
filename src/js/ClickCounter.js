class ClickCount {
    constructor() {
        this._clickCount = 0;
        this._companionCount = 0;
        this._compounderCount = 0;
        this._companionCost = 100;
        this._compounderCost = 10;
        this._clickFactor = 1;
        this._totalClicksEver = 0;
        this._clicksThisSecond = 0;
        this._clicksPerSecond = 0;
        this._achievements = new Set();
        this._newAchievements = [];
    }

    click() {
        this._clickCount += this._clickFactor;
        this._totalClicksEver += this._clickFactor;
        this._clicksThisSecond += this._clickFactor;
        this._checkAchievements();
    }

    reset() {
        this._clickCount = 0;
        this._companionCount = 0;
        this._compounderCount = 0;
        this._companionCost = 100;
        this._compounderCost = 10;
        this._clickFactor = 1;
        this._clicksThisSecond = 0;
        this._clicksPerSecond = 0;
    }

    getCompanionCount() {
        return this._companionCount;
    }

    getCompanionCost() {
        return this._companionCost;
    }

    collectCompanion() {
        if (this._clickCount >= this.getCompanionCost()) {
            this._clickCount -= this._companionCost;
            this._companionCount++;
            this._companionCost = Math.round(100 * Math.pow(1.35, this._companionCount));
            this._checkAchievements();
        }
    }

    getCompounderCount() {
        return this._compounderCount;
    }

    getCompounderCost() {
        return this._compounderCost;
    }

    collectCompounder() {
        if (this._clickCount >= this.getCompounderCost()) {
            this._clickCount -= this._compounderCost;
            this._compounderCount++;
            this._compounderCost = Math.round(10 * Math.pow(1.35, this._compounderCount));
            if (this._clickFactor == 1) {
                this._clickFactor = 1.2;
            } else {
                this._clickFactor = (Math.pow(1.2, this._compounderCount))
            }
            this._checkAchievements();
        }
    }

    getClickCount() {
        return this._clickCount;
    }

    cashClickCompanions() {
        for (let i = 1; i <= this.getCompanionCount(); i++) {
            this.click()
        }

    }

    getClickFactor() {
        return this._clickFactor;
    }

    getTotalClicksEver() {
        return this._totalClicksEver;
    }

    getClicksPerSecond() {
        return this._clicksPerSecond;
    }

    updateClicksPerSecond() {
        this._clicksPerSecond = this._clicksThisSecond;
        this._clicksThisSecond = 0;
    }

    getAchievements() {
        return Array.from(this._achievements);
    }

    getNewAchievements() {
        const newAchievements = [...this._newAchievements];
        this._newAchievements = [];
        return newAchievements;
    }

    _checkAchievements() {
        const achievements = [
            {
                id: 'first_click',
                name: 'First Click',
                description: 'Click for the first time',
                condition: () => this._totalClicksEver >= 1
            },
            {
                id: '100_clicks',
                name: '100 Clicks',
                description: 'Reach 100 total clicks',
                condition: () => this._totalClicksEver >= 100
            },
            {
                id: '1k_clicks',
                name: '1K Clicks',
                description: 'Reach 1,000 total clicks',
                condition: () => this._totalClicksEver >= 1000
            },
            {
                id: '10k_clicks',
                name: '10K Clicks',
                description: 'Reach 10,000 total clicks',
                condition: () => this._totalClicksEver >= 10000
            },
            {
                id: '100k_clicks',
                name: '100K Clicks',
                description: 'Reach 100,000 total clicks',
                condition: () => this._totalClicksEver >= 100000
            },
            {
                id: '1m_clicks',
                name: '1M Clicks',
                description: 'Reach 1,000,000 total clicks',
                condition: () => this._totalClicksEver >= 1000000
            },
            {
                id: 'first_companion',
                name: 'First Companion',
                description: 'Purchase your first Companion',
                condition: () => this._companionCount >= 1
            },
            {
                id: '10_companions',
                name: '10 Companions',
                description: 'Purchase 10 Companions',
                condition: () => this._companionCount >= 10
            },
            {
                id: '100_companions',
                name: '100 Companions',
                description: 'Purchase 100 Companions',
                condition: () => this._companionCount >= 100
            },
            {
                id: 'first_compounder',
                name: 'First Compounder',
                description: 'Purchase your first Compounder',
                condition: () => this._compounderCount >= 1
            },
            {
                id: '10_compounders',
                name: '10 Compounders',
                description: 'Purchase 10 Compounders',
                condition: () => this._compounderCount >= 10
            }
        ];

        achievements.forEach(achievement => {
            if (!this._achievements.has(achievement.id) && achievement.condition()) {
                this._achievements.add(achievement.id);
                this._newAchievements.push(achievement);
            }
        });
    }
}