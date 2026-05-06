/**
 * components.js - Vista (MVC)
 * Funciones puras que retornan strings de HTML/SVG. No hay lógica de negocio aquí.
 */

const Components = {
    /**
     * Renderiza el componente del héroe.
     * @param {Object} heroData - Datos del héroe
     * @returns {string} HTML string
     */
    renderHero: (heroData) => {
        return `
            <div class="hero placeholder" style="
                width: 100px; 
                height: 150px; 
                background: linear-gradient(135deg, #2980b9, #3498db);
                border-radius: 8px;
                box-shadow: 0 0 20px rgba(52, 152, 219, 0.6);
                border: 2px solid #fff;
            ">
                <div style="text-align: center;">
                    <div style="font-size: 1.2rem; margin-bottom: 8px;">🧙‍♂️</div>
                    <div>Héroe</div>
                    <div style="font-size: 0.8em; margin-top: 5px; background: rgba(0,0,0,0.5); padding: 2px 5px; border-radius: 4px;">Poder: ${heroData.power}</div>
                </div>
            </div>
        `;
    },

    /**
     * Renderiza el componente del monstruo.
     * @param {Object} monsterData - Datos del monstruo
     * @returns {string} HTML string
     */
    renderMonster: (monsterData) => {
        return `
            <div class="monster placeholder" style="
                width: 120px; 
                height: 120px; 
                background: linear-gradient(135deg, #c0392b, #e74c3c);
                border-radius: 8px;
                box-shadow: 0 0 20px rgba(231, 76, 60, 0.6);
                border: 2px solid #fff;
            ">
                <div style="text-align: center;">
                    <div style="font-size: 1.2rem; margin-bottom: 8px;">👹</div>
                    <div>Monstruo</div>
                    <div style="font-size: 0.8em; margin-top: 5px; background: rgba(0,0,0,0.5); padding: 2px 5px; border-radius: 4px;">HP: ${monsterData.hp} / ${monsterData.maxHp}</div>
                </div>
            </div>
        `;
    },

    /**
     * Renderiza el log de combate.
     * @param {Object} data - Datos de la tirada
     * @returns {string} HTML string
     */
    renderCombatLog: (data) => {
        const color = data.isHit ? '#27ae60' : '#c0392b';
        const icon = data.isHit ? '⚔️' : '❌';
        const text = data.isHit 
            ? `¡Has sacado un ${data.rollResult} en precisión! Daño: <strong>${data.damage}</strong>`
            : `¡Has fallado el ataque! (Tirada: ${data.rollResult})`;

        return `
            <div class="log-entry combat-log" style="
                border-left: 4px solid ${color};
                padding: 8px 12px;
                margin-bottom: 8px;
                background: rgba(0,0,0,0.2);
                border-radius: 0 4px 4px 0;
            ">
                <span style="margin-right: 8px;">${icon}</span>
                <span>${text}</span>
            </div>
        `;
    }
};

window.Components = Components;
