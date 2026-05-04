/**
 * Componentes visuales para TowerArena.
 * Funciones puras que retornan strings de HTML/SVG.
 */

const Components = {
    /**
     * Renderiza el componente del héroe.
     * @param {Object} heroData - Datos del héroe (poder, etc.)
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
                    <div style="font-size: 0.8em; margin-top: 5px; background: rgba(0,0,0,0.5); padding: 2px 5px; border-radius: 4px;">Poder: ${heroData.power || 10}</div>
                </div>
            </div>
        `;
    },

    /**
     * Renderiza el componente del monstruo.
     * @param {Object} monsterData - Datos del monstruo (poder, etc.)
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
                    <div style="font-size: 0.8em; margin-top: 5px; background: rgba(0,0,0,0.5); padding: 2px 5px; border-radius: 4px;">Poder: ${monsterData.power || 5}</div>
                </div>
            </div>
        `;
    }
};

window.Components = Components;
