// Fonction de réinitialisation du jeu
function resetGame() {
    // Demander une confirmation à l'utilisateur avant de réinitialiser le jeu
    const confirmation = confirm("Êtes-vous sûr de vouloir réinitialiser le jeu ?");
    if (confirmation) {
        // Remise à zéro des valeurs du jeu
        tacos = 0;
        autoClickerCost = 10;
        autoClickers = 0;
        clickMultiplierCost = 150;
        clickMultiplier = 1;
        bonusCost = 20;
        tacosPerSecond = 0;
        currentLevel = 1; // Réinitialiser le niveau à 1

        // Réinitialiser le coût du niveau au coût initial (niveau 1)
        levelCost = 10000;

        // Supprimer toutes les images des trophées
        const trophyImagesContainer = document.getElementById('trophyImages');
        trophyImagesContainer.innerHTML = '';

        // Mise à jour de l'affichage
        updateTacosDisplay();
        updateShopDisplay();
        updateTacosPerSecond(); // Mettre à jour le nombre de tacos par seconde
        updateTacosPerClick(); // Mettre à jour le nombre de tacos par clic
        updateLevelDisplay(); // Mettre à jour l'affichage du niveau

        // Affichage du message d'alerte
        alert("Le jeu a été réinitialisé !");
    }
}

// Fonction pour obtenir les chemins d'accès des images des trophées
function getTrophyImagePaths() {
    const trophyImagesContainer = document.getElementById('trophyImages');
    const trophyImages = trophyImagesContainer.querySelectorAll('.trophy-image');
    return Array.from(trophyImages).map(image => image.src);
}

// Fonction pour charger les images des trophées
function loadTrophyImages(imagePaths) {
    const trophyImagesContainer = document.getElementById('trophyImages');
    trophyImagesContainer.innerHTML = ''; // Effacer les images précédentes pour éviter les doublons
    imagePaths.forEach(imagePath => {
        const trophyImage = document.createElement('img');
        trophyImage.src = imagePath;
        trophyImage.alt = 'Trophée';
        trophyImage.classList.add('trophy-image');
        trophyImagesContainer.appendChild(trophyImage);
    });
}

// Appel de la fonction pour charger l'état du jeu au chargement de la page
window.onload = loadGame;

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
        levelCost = gameState.levelCost; // Mettre à jour le coût du niveau
        currentLevel = gameState.currentLevel;

        // Charger le nombre de tacos par clic depuis l'objet gameState
        const tacosPerClick = gameState.tacosPerClick || 1;
        updateTacosDisplay();
        updateShopDisplay();
        updateTacosPerSecond();
        updateLevelDisplay(); // Mettre à jour l'affichage du niveau
        loadTrophyImages(gameState.trophyImages); // Appel de la fonction pour charger les images des trophées

        // Mettre à jour l'affichage des tacos par clic
        const clickMultiplierDisplay = document.querySelector('.clickMultiplierDisplay');
        clickMultiplierDisplay.textContent = `Tacos par clic: ${tacosPerClick}`;
    }
}

// Fonction pour sauvegarder l'état du jeu dans le localStorage
function saveGame() {
    const clickMultiplierDisplay = document.querySelector('.clickMultiplierDisplay');
    const clickMultiplierText = clickMultiplierDisplay.textContent;
    const clickMultiplierValue = parseInt(clickMultiplierText.match(/\d+/)[0]); // Extraire le nombre de tacos par clic à partir du texte

    const gameState = {
        tacos,
        autoClickerCost,
        autoClickers,
        clickMultiplierCost,
        clickMultiplier,
        bonusCost,
        tacosPerSecond,
        currentLevel,
        levelCost, // Ajout du coût du niveau dans l'objet gameState
        trophyImages: getTrophyImagePaths(), // Appel de la fonction pour obtenir les chemins d'accès des images des trophées
        tacosPerClick: clickMultiplierValue // Ajout du nombre de tacos par clic
    };
    localStorage.setItem('clickerGameState', JSON.stringify(gameState));
}

// Fonction de mise à jour de l'affichage des tacos
function updateTacosDisplay() {
    tacosDisplay.textContent = tacos;
    saveGame(); // Appel de la fonction pour sauvegarder l'état du jeu
}

// Appel de la fonction pour sauvegarder l'état du jeu à chaque mise à jour importante
// Par exemple, à la fin de la fonction updateTacosDisplay()
updateTacosDisplay = () => {
    tacosDisplay.textContent = tacos;
    saveGame(); // Appel de la fonction pour sauvegarder l'état du jeu
};
