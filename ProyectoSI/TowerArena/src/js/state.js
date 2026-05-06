/**
 * state.js - Modelo (MVC)
 * Gestiona los datos del juego y la persistencia en localStorage.
 */

const State = {
    data: {
        floor: 1,
        level: 1,
        xp: 0,
        equipment: [],
        heroPower: 10 // Por compatibilidad o futuras stats
    },

    currentMonster: null,

    init() {
        this.load();
    },

    save() {
        localStorage.setItem('towerArenaState', JSON.stringify(this.data));
    },

    load() {
        const saved = localStorage.getItem('towerArenaState');
        if (saved) {
            try {
                this.data = JSON.parse(saved);
            } catch (e) {
                console.error("Error loading state", e);
            }
        }
    },

    levelUp() {
        this.data.level++;
        this.save();
    },

    nextFloor() {
        this.data.floor++;
        this.save();
    },

    resetFloor() {
        this.data.floor = 1;
        this.save();
    },
    
    setMonster(monster) {
        this.currentMonster = monster;
    },
    
    getMonster() {
        return this.currentMonster;
    }
};

window.State = State;
