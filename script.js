// Variables globales
let tacos = 0;
let autoClickerCost = 10;
let autoClickers = 0;
let clickMultiplierCost = 50;
let clickMultiplier = 1;
let bonusCost = 20;
let tacosPerSecond = 0; // Variable pour stocker le nombre de tacos par seconde

// Éléments DOM
const tacosDisplay = document.getElementById('tacos');
const clickButton = document.getElementById('clickButton');
const autoClickerBtn = document.getElementById('autoClickerBtn');
const clickMultiplierBtn = document.getElementById('clickMultiplierBtn');
const bonusBtn = document.getElementById('bonusBtn');
const tpsDisplay = document.getElementById('tpsDisplay');

// Fonction de clic
clickButton.addEventListener('click', () => {
    tacos += clickMultiplier;
    updateTacosDisplay();
});

// Fonction d'achat d'un auto-clicker
autoClickerBtn.addEventListener('click', () => {
    if (tacos >= autoClickerCost) {
        tacos -= autoClickerCost;
        autoClickers++;
        autoClickerCost *= 2; // Augmentation du coût pour le prochain auto-clicker
        updateTacosDisplay();
        updateShopDisplay();
        updateTacosPerSecond(); // Mettre à jour le nombre de tacos par seconde
    } else {
        alert("Pas assez de tacos !");
    }
});

// Fonction d'achat d'un multiplicateur de clics
clickMultiplierBtn.addEventListener('click', () => {
    if (tacos >= clickMultiplierCost) {
        tacos -= clickMultiplierCost;
        clickMultiplier *= 2;
        clickMultiplierCost *= 2; // Augmentation du coût pour le prochain multiplicateur de clics
        updateTacosDisplay();
        updateShopDisplay();
        updateTacosPerClick(); // Mettre à jour le nombre de tacos par clic
        updateTacosPerSecond(); // Mettre à jour le nombre de tacos par seconde
    } else {
        alert("Pas assez de tacos !");
    }
});

// Fonction d'achat d'un bonus temporaire
bonusBtn.addEventListener('click', () => {
    if (tacos >= bonusCost) {
        tacos -= bonusCost;
        // Appliquer le bonus temporaire
        applyBonus();
        updateTacosDisplay();
        updateShopDisplay();
    } else {
        alert("Pas assez de tacos !");
    }
});

// Mise à jour de l'affichage des tacos
function updateTacosDisplay() {
    tacosDisplay.textContent = tacos;
}

// Mise à jour de l'affichage de la boutique
function updateShopDisplay() {
    autoClickerBtn.textContent = `Acheter Auto Clicker (Coût: ${autoClickerCost})`;
    clickMultiplierBtn.textContent = `Acheter Multiplicateur de Clics (Coût: ${clickMultiplierCost})`;
    bonusBtn.textContent = `Acheter Bonus Temporaire (Coût: ${bonusCost})`;
}

// Mettre à jour le nombre de tacos par seconde
function updateTacosPerSecond() {
    tacosPerSecond = autoClickers * clickMultiplier;
    tpsDisplay.textContent = `Tacos par seconde: ${tacosPerSecond}`;
}

// Mettre à jour le nombre de tacos par clic
function updateTacosPerClick() {
    const clickMultiplierDisplay = document.querySelector('.clickMultiplierDisplay');
    clickMultiplierDisplay.textContent = `Tacos par clic: ${clickMultiplier}`;
}

// Fonction pour démarrer les auto-clickers
function startAutoClicker() {
    setInterval(() => {
        tacos += tacosPerSecond;
        updateTacosDisplay();
    }, 1000); // Auto-clicker toutes les secondes
}

// Fonction pour appliquer un bonus temporaire
function applyBonus() {
    clickMultiplier *= 2; // Double le multiplicateur de clics pendant un certain temps
    setTimeout(() => {
        clickMultiplier /= 2; // Réinitialise le multiplicateur après la durée du bonus
    }, 30000); // Durée du bonus: 30 secondes
}

// Démarrer les auto-clickers
startAutoClicker();

// Fonction pour sauvegarder l'état du jeu dans le localStorage
function saveGame() {
    const gameState = {
        tacos: tacos,
        autoClickerCost: autoClickerCost,
        autoClickers: autoClickers,
        clickMultiplierCost: clickMultiplierCost,
        clickMultiplier: clickMultiplier,
        bonusCost: bonusCost,
        tacosPerSecond: tacosPerSecond
    };
    localStorage.setItem('clickerGameState', JSON.stringify(gameState));
}

// Fonction pour charger l'état du jeu depuis le localStorage
function loadGame() {
    const savedGameState = localStorage.getItem('clickerGameState');
    if (savedGameState) {
        const gameState = JSON.parse(savedGameState);
        tacos = gameState.tacos;
        autoClickerCost = gameState.autoClickerCost;
        autoClickers = gameState.autoClickers;
        clickMultiplierCost = gameState.clickMultiplierCost;
        clickMultiplier = gameState.clickMultiplier;
        bonusCost = gameState.bonusCost;
        tacosPerSecond = gameState.tacosPerSecond;
        updateTacosDisplay();
        updateShopDisplay();
        updateTacosPerSecond();
    }
}

// Appel de la fonction pour charger l'état du jeu au chargement de la page
window.onload = loadGame;

// Appel de la fonction pour sauvegarder l'état du jeu à chaque mise à jour importante
// Par exemple, à la fin de la fonction updateTacosDisplay()
updateTacosDisplay = () => {
    tacosDisplay.textContent = tacos;
    saveGame(); // Appel de la fonction pour sauvegarder l'état du jeu
};

// Fonction de réinitialisation du jeu
function resetGame() {
    tacos = 0;
    autoClickerCost = 10;
    autoClickers = 0;
    clickMultiplierCost = 50;
    clickMultiplier = 1;
    bonusCost = 20;
    tacosPerSecond = 0;

    updateTacosDisplay();
    updateShopDisplay();
    updateTacosPerSecond(); // Mettre à jour le nombre de tacos par seconde
    updateTacosPerClick(); // Mettre à jour le nombre de tacos par clic
}


