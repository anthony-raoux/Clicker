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
const clickFeedback = document.getElementById('clickFeedback');
const container = document.querySelector('.container');

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
        updateShopDisplay(); // Mettre à jour l'affichage de la boutique
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
        updateShopDisplay(); // Mettre à jour l'affichage de la boutique
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

// Fonction de réinitialisation du jeu
function resetGame() {
    // Demander une confirmation à l'utilisateur avant de réinitialiser le jeu
    const confirmation = confirm("Êtes-vous sûr de vouloir réinitialiser le jeu ?");
    if (confirmation) {
        // Remise à zéro des valeurs du jeu
        tacos = 0;
        autoClickerCost = 10;
        autoClickers = 0;
        clickMultiplierCost = 50;
        clickMultiplier = 1;
        bonusCost = 20;
        tacosPerSecond = 0;

        // Mise à jour de l'affichage
        updateTacosDisplay();
        updateShopDisplay();
        updateTacosPerSecond(); // Mettre à jour le nombre de tacos par seconde
        updateTacosPerClick(); // Mettre à jour le nombre de tacos par clic

        // Affichage du message d'alerte
        alert("Le jeu a été réinitialisé !");
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
    // Demander une confirmation à l'utilisateur avant de réinitialiser le jeu
    const confirmation = confirm("Êtes-vous sûr de vouloir réinitialiser le jeu ?");
    if (confirmation) {
        // Remise à zéro des valeurs du jeu
        tacos = 0;
        autoClickerCost = 10;
        autoClickers = 0;
        clickMultiplierCost = 50;
        clickMultiplier = 1;
        bonusCost = 20;
        tacosPerSecond = 0;

        // Mise à jour de l'affichage
        updateTacosDisplay();
        updateShopDisplay();
        updateTacosPerSecond(); // Mettre à jour le nombre de tacos par seconde
        updateTacosPerClick(); // Mettre à jour le nombre de tacos par clic

        // Affichage du message d'alerte
        alert("Le jeu a été réinitialisé !");
    }
}

clickButton.addEventListener('click', (event) => {
    const clickX = event.clientX - container.getBoundingClientRect().left;
    const clickY = event.clientY - container.getBoundingClientRect().top;

    const clickFeedback = document.createElement('div');
    clickFeedback.textContent = `+${clickMultiplier}`;
    clickFeedback.style.position = 'absolute';
    clickFeedback.style.top = `${clickY}px`;
    clickFeedback.style.left = `${clickX}px`;
    clickFeedback.style.fontSize = '24px';
    clickFeedback.style.color = 'black';
    clickFeedback.id = 'clickFeedback';

    container.appendChild(clickFeedback);

    setTimeout(() => {
        clickFeedback.remove();
    }, 1000);

    clickFeedback.classList.add('click-feedback-animation'); // Ajout de la classe pour l'animation

    tacos += clickMultiplier;
    updateTacosDisplay();
});

let currentLevel = 1;
let maxLevel = 10; // Par exemple, vous pouvez définir un maximum de 5 niveaux
let levelCost = 1000; // Coût initial pour débloquer le prochain niveau

// Mise à jour de l'affichage du niveau
function updateLevelDisplay() {
    const levelDisplay = document.getElementById('levelDisplay');
    levelDisplay.textContent = `Niveau actuel: ${currentLevel}`;
}

// Mise à jour de l'affichage de la boutique
function updateShopDisplay() {
    // Autres mises à jour de l'affichage de la boutique

    // Mise à jour du coût du niveau
    const levelButton = document.getElementById('levelButtons');
    if (currentLevel < maxLevel) {
        levelButton.innerHTML = `<button onclick="buyLevel()">Acheter Niveau Suivant (Coût: ${levelCost})</button>`;
    } else {
        levelButton.innerHTML = `<button disabled>Max Niveau Atteint</button>`;
    }
}

// Tableau contenant les chemins d'accès des images de tacos pour chaque niveau
const tacoImages = [
    'level1.png',
    './media/level2.png',
    './media/level3.png',


    // Ajoutez les chemins d'accès des images pour chaque niveau suivant
];

// Fonction d'achat de niveau
function buyLevel() {
    if (tacos >= levelCost && currentLevel < maxLevel) {
        tacos -= levelCost;
        currentLevel++;
        levelCost *= 2; // Augmentation du coût pour le prochain niveau
        updateTacosDisplay();
        updateShopDisplay();
        updateLevelDisplay(); // Mettre à jour l'affichage du niveau
        addUnlockedTrophy(); // Ajouter l'image du trophée débloqué
    } else if (currentLevel >= maxLevel) {
        alert("Vous avez atteint le niveau maximum !");
    } else {
        alert("Pas assez de tacos !");
    }
}

// Fonction pour ajouter une image de taco débloquée dans la section des trophées
function addUnlockedTrophy() {
    const trophyImagesContainer = document.getElementById('trophyImages');
    const trophyImage = document.createElement('img');

    // Récupérer le chemin d'accès de l'image débloquée correspondant au niveau actuel
    const imageIndex = currentLevel - 1; // Soustrayez 1 car les tableaux commencent à l'index 0
    const imagePath = tacoImages[imageIndex];

    trophyImage.src = imagePath; // Utilisez le chemin d'accès récupéré
    trophyImage.alt = 'Trophée'; // Texte alternatif pour l'image
    trophyImage.classList.add('trophy-image'); // Ajouter une classe pour les styles CSS
    trophyImagesContainer.appendChild(trophyImage); // Ajoutez l'image à la section des trophées
}

    tacoImage.src = imagePath; // Utilisez le chemin d'accès récupéré
    tacoImage.alt = 'Tacos'; // Texte alternatif pour l'image
    tacoImage.style.width = '50px'; // Ajustez la taille de l'image selon votre préférence
    tacoImage.style.height = 'auto'; // Ajustez la taille de l'image selon votre préférence
    tacoImage.style.opacity = '0'; // Initialisez l'opacité à 0 pour l'animation
    
    // Ajoutez l'image au conteneur
    levelImageContainer.innerHTML = '';
    levelImageContainer.appendChild(tacoImage);

    // Animation pour faire apparaître l'image avec une transition d'opacité
    setTimeout(() => {
        tacoImage.style.opacity = '1';
    }, 100); // Démarrez l'animation après un court délai

