/**
 * app.js - Controlador (MVC)
 * Orquesta la interacción, las tiradas de dados y actualiza la Vista.
 */

const App = {
    init() {
        // Inicializar el Modelo
        if (window.State) {
            window.State.init();
        }
        
        this.cacheDOM();
        this.bindEvents();
        this.spawnMonster();
        this.render();
        this.log("¡Bienvenido a TowerArena! Prepárate para el combate.");
    },

    cacheDOM() {
        this.dom = {
            levelDisplay: document.getElementById('level-display'),
            floorDisplay: document.getElementById('floor-display'),
            powerDisplay: document.getElementById('power-display'),
            heroContainer: document.getElementById('hero-container'),
            monsterContainer: document.getElementById('monster-container'),
            btnAttack: document.getElementById('btn-attack'),
            logContainer: document.getElementById('log-container')
        };
    },

    bindEvents() {
        this.dom.btnAttack.addEventListener('click', () => this.combat());
    },

    // --- Helpers de Combate ---
    
    rollDice(sides) {
        return Math.floor(Math.random() * sides) + 1;
    },

    rollMultipleDice(count, sides) {
        let total = 0;
        for (let i = 0; i < count; i++) {
            total += this.rollDice(sides);
        }
        return total;
    },

    calculateMonsterHealth(floor) {
        const baseHealth = 10;
        return baseHealth + ((floor - 1) * 2);
    },

    // --- Control del Juego ---

    spawnMonster() {
        const stateData = window.State.data;
        const hp = this.calculateMonsterHealth(stateData.floor);
        window.State.setMonster({
            hp: hp,
            maxHp: hp
        });
    },

    combat() {
        const currentMonster = window.State.getMonster();
        if (!currentMonster) return;

        const stateData = window.State.data;

        // 1. Tirada de precisión (2d6)
        const accuracyRoll = this.rollMultipleDice(2, 6);
        const hitThreshold = 5; // Umbral > 5

        if (accuracyRoll > hitThreshold) {
            // 2. Cálculo de daño (base 1d6)
            let damage = this.rollMultipleDice(1, 6);

            const extraD6 = Math.floor(stateData.level / 4);
            if (extraD6 > 0) damage += this.rollMultipleDice(extraD6, 6);

            const extraD10 = Math.floor(stateData.level / 12);
            if (extraD10 > 0) damage += this.rollMultipleDice(extraD10, 10);

            // Actualizar HP del monstruo en el modelo
            currentMonster.hp -= damage;
            window.State.setMonster(currentMonster);
            
            this.logCombat(accuracyRoll, damage, true);

            if (currentMonster.hp <= 0) {
                this.log(`¡Has derrotado al monstruo! Avanzas al piso ${stateData.floor + 1}.`);
                window.State.nextFloor();
                window.State.levelUp();
                this.spawnMonster();
            }
        } else {
            // Fallo
            this.logCombat(accuracyRoll, 0, false);
        }

        this.render();
    },

    logCombat(rollResult, damage, isHit) {
        if (window.Components && window.Components.renderCombatLog) {
            const entryHtml = window.Components.renderCombatLog({ rollResult, damage, isHit });
            const entryWrapper = document.createElement('div');
            entryWrapper.innerHTML = entryHtml.trim();
            this.dom.logContainer.prepend(entryWrapper.firstChild);
        } else {
            const msg = isHit 
                ? `¡Has sacado un ${rollResult} en precisión! Daño: ${damage}` 
                : `¡Has fallado! (Precisión: ${rollResult})`;
            this.log(msg);
        }
    },

    log(message) {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        
        const timestamp = new Date().toLocaleTimeString('es-ES', { hour12: false });
        entry.textContent = `[${timestamp}] > ${message}`;
        
        this.dom.logContainer.prepend(entry);
    },

    // --- Actualización de Vista ---

    render() {
        const stateData = window.State.data;
        
        this.dom.levelDisplay.textContent = `Nivel: ${stateData.level}`;
        this.dom.floorDisplay.textContent = `Piso: ${stateData.floor}`;
        this.dom.powerDisplay.textContent = `Poder: ${stateData.heroPower}`;

        if (window.Components) {
            // Vista pura: le pasamos solo los datos que necesita
            this.dom.heroContainer.innerHTML = window.Components.renderHero({ 
                power: stateData.heroPower 
            });
            
            const currentMonster = window.State.getMonster();
            if (currentMonster) {
                this.dom.monsterContainer.innerHTML = window.Components.renderMonster({ 
                    hp: currentMonster.hp,
                    maxHp: currentMonster.maxHp
                });
            } else {
                this.dom.monsterContainer.innerHTML = '';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
