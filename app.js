/**
 * TowerArena - Lógica principal
 */

const App = {
    state: {
        floor: 1,
        level: 1,
        xp: 0,
        equipment: [],
        heroPower: 10
    },

    currentMonster: null,

    init() {
        this.loadState();
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

    // --- Persistencia ---
    
    saveState() {
        localStorage.setItem('towerArenaState', JSON.stringify(this.state));
    },

    loadState() {
        const saved = localStorage.getItem('towerArenaState');
        if (saved) {
            this.state = JSON.parse(saved);
        }
    },

    // --- Lógica del Juego ---

    calculateMonsterPower(floor) {
        // Crecimiento exponencial básico
        return Math.floor(5 * Math.pow(1.15, floor - 1));
    },

    spawnMonster() {
        this.currentMonster = {
            power: this.calculateMonsterPower(this.state.floor)
        };
    },

    combat() {
        if (!this.currentMonster) return;

        // Módulo de combate desacoplado
        const result = this.resolveCombat(this.state.heroPower, this.currentMonster.power);

        if (result === 'victory') {
            this.log(`¡Has derrotado al monstruo! Avanzas al piso ${this.state.floor + 1}.`);
            this.state.floor++;
            // Incremento temporal de poder para el placeholder, para no morir instantáneamente
            this.state.heroPower += 1;
            
            this.saveState();
            this.spawnMonster();
        } else {
            this.log(`El monstruo es demasiado fuerte. Has sido derrotado y caes al piso 1.`);
            // Reset por derrota para simplificar por ahora
            this.state.floor = 1;
            this.saveState();
            this.spawnMonster();
        }

        this.render();
    },

    resolveCombat(heroPower, monsterPower) {
        // Regla actual: heroPower >= monsterPower = Victory
        return heroPower >= monsterPower ? 'victory' : 'defeat';
    },

    // --- Interfaz ---

    log(message) {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        
        const timestamp = new Date().toLocaleTimeString('es-ES', { hour12: false });
        entry.textContent = `[${timestamp}] > ${message}`;
        
        this.dom.logContainer.prepend(entry);
    },

    render() {
        // Actualizar UI stats
        this.dom.levelDisplay.textContent = `Nivel: ${this.state.level}`;
        this.dom.floorDisplay.textContent = `Piso: ${this.state.floor}`;
        this.dom.powerDisplay.textContent = `Poder: ${this.state.heroPower}`;

        // Renderizar componentes usando las funciones puras
        if (window.Components) {
            this.dom.heroContainer.innerHTML = window.Components.renderHero({ power: this.state.heroPower });
            
            if (this.currentMonster) {
                this.dom.monsterContainer.innerHTML = window.Components.renderMonster({ power: this.currentMonster.power });
            } else {
                this.dom.monsterContainer.innerHTML = '';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
