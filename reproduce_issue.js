
const UPGRADES = [
    { id: 'multishot', name: "Bone Split", icon: "🦴", desc: "+1 Projectile", type: 'stat', stat: 'projectileCount', value: 1, weight: 10 },
    { id: 'rate', name: "Grave Haste", icon: "⚡", desc: "+15% Fire Rate", type: 'stat', stat: 'fireRate', value: 0.15, mult: true, weight: 12 },
    { id: 'speed', name: "Ghost Step", icon: "👻", desc: "+15% Move Speed", type: 'stat', stat: 'speed', value: 0.15, mult: true, weight: 10 },
    { id: 'damage', name: "Calcium Boost", icon: "💪", desc: "+20% Damage", type: 'stat', stat: 'damage', value: 0.2, mult: true, weight: 15 },
    { id: 'range', name: "Spectral Reach", icon: "🎯", desc: "+20% Range", type: 'stat', stat: 'range', value: 0.2, mult: true, weight: 10 },
    { id: 'health', name: "Marrow Shield", icon: "❤️", desc: "+25 Max HP & Heal", type: 'heal', value: 25, weight: 8 },
    { id: 'pickup', name: "Vacuum Ribs", icon: "🧲", desc: "+30% Pickup Range", type: 'stat', stat: 'pickupRange', value: 0.3, mult: true, weight: 8 }
];

function getRandomUpgrade() {
    let t = UPGRADES.reduce((a, b) => a + b.weight, 0);
    let r = Math.random() * t;
    for (let u of UPGRADES) { if (r < u.weight) return u; r -= u.weight; }
    return UPGRADES[0];
}

function test() {
    let triplicates = 0;
    let duplicates = 0;
    let clean = 0;
    let safetyHits = 0;

    for (let i = 0; i < 10000; i++) {
        const opts = [];
        let safety = 0;


        // Pool strategy
        const pool = [...UPGRADES]; // Copy
        while (opts.length < 3 && pool.length > 0) {
            let totalWeight = pool.reduce((a, b) => a + b.weight, 0);
            let r = Math.random() * totalWeight;

            let selectedIndex = -1;
            for (let j = 0; j < pool.length; j++) {
                if (r < pool[j].weight) {
                    selectedIndex = j;
                    break;
                }
                r -= pool[j].weight;
            }

            if (selectedIndex === -1) selectedIndex = 0; // Floating point safety

            opts.push(pool[selectedIndex]);
            pool.splice(selectedIndex, 1); // Remove
        }

        const ids = opts.map(o => o.id);
        const unique = new Set(ids).size;

        if (unique === 1) triplicates++;
        else if (unique === 2) duplicates++;
        else clean++;

    }

    console.log(`Results (10000 iterations):`);
    console.log(`Clean: ${clean}`);
    console.log(`Duplicates: ${duplicates}`);
    console.log(`Triplicates: ${triplicates}`);
    console.log(`Safety Hits: ${safetyHits}`);
}

test();
