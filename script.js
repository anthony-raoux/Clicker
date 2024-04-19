// Variables globales
let tacos = 0;
let autoClickerCost = 10;
let autoClickers = 0;
let clickMultiplierCost = 150;
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
        levelCost = 100; // Mettre à jour le coût du niveau à 100

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
    const clickMultiplierDisplay = document.querySelector('.clickMultiplierDisplay');
    const clickMultiplierText = clickMultiplierDisplay.textContent;
    const clickMultiplierValue = parseInt(clickMultiplierText.match(/\d+/)[0]); // Extraire le nombre de tacos par clic à partir du texte

    const gameState = {
        tacos: tacos,
        autoClickerCost: autoClickerCost,
        autoClickers: autoClickers,
        clickMultiplierCost: clickMultiplierCost,
        clickMultiplier: clickMultiplier,
        bonusCost: bonusCost,
        tacosPerSecond: tacosPerSecond,
        currentLevel: currentLevel,
        levelCost: levelCost, // Ajout du coût du niveau dans l'objet gameState
        trophyImages: getTrophyImagePaths(), // Appel de la fonction pour obtenir les chemins d'accès des images des trophées
        tacosPerClick: clickMultiplierValue // Ajout du nombre de tacos par clic
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
        levelCost = gameState.levelCost; // Mettre à jour le coût du niveau
        currentLevel = gameState.currentLevel;
        
        // Charger le nombre de tacos par clic depuis l'objet gameState
        const tacosPerClick = gameState.tacosPerClick;
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


// Fonction pour obtenir les chemins d'accès des images des trophées
function getTrophyImagePaths() {
    const trophyImagesContainer = document.getElementById('trophyImages');
    const trophyImages = trophyImagesContainer.querySelectorAll('.trophy-image');
    const imagePaths = [];
    trophyImages.forEach(image => {
        imagePaths.push(image.src);
    });
    return imagePaths;
}

// Appel de la fonction pour charger l'état du jeu au chargement de la page
window.onload = loadGame;

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
        clickMultiplierCost = 150;
        clickMultiplier = 1;
        bonusCost = 20;
        tacosPerSecond = 0;
        currentLevel = 1; // Réinitialiser le niveau à 1

        // Réinitialiser le coût du niveau au coût initial (niveau 1)
        levelCost = 100;

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

clickButton.addEventListener('click', (event) => {
    const clickX = event.clientX - container.getBoundingClientRect().left;
    const clickY = event.clientY - container.getBoundingClientRect().top;

    const clickFeedback = document.createElement('div');
    clickFeedback.textContent = '\uD83D\uDC9B'; // Texte vide
    clickFeedback.style.position = 'absolute';
    clickFeedback.style.top = `${clickY}px`;
    clickFeedback.style.left = `${clickX}px`;
    clickFeedback.style.fontSize = '24px';
    clickFeedback.style.color = '';
    clickFeedback.id = 'clickFeedback';

    container.appendChild(clickFeedback);

    setTimeout(() => {
        clickFeedback.remove();
    }, 1000);

    clickFeedback.classList.add('click-feedback-animation'); // Ajout de la classe pour l'animation
});

let currentLevel = 1;
let maxLevel = 10; // Par exemple, vous pouvez définir un maximum de 5 niveaux
let levelCost = 100; // Coût initial pour débloquer le prochain niveau

// Fonction de mise à jour de l'affichage du niveau
function updateLevelDisplay() {
    const levelDisplay = document.getElementById('levelDisplay');
    levelDisplay.textContent = `Niveau actuel: ${currentLevel}`;
}

// Mise à jour de l'affichage de la boutique pour inclure le coût du prochain niveau
function updateShopDisplay() {
    autoClickerBtn.textContent = `Acheter Auto Clicker (Coût: ${autoClickerCost})`;
    clickMultiplierBtn.textContent = `Acheter Multiplicateur de Clics (Coût: ${clickMultiplierCost})`;
    bonusBtn.textContent = `Acheter Bonus Temporaire (Coût: ${bonusCost})`;

    const levelButton = document.getElementById('levelButtons'); // Sélectionnez le conteneur du bouton de niveau

    if (currentLevel < maxLevel) {
        // Si le niveau actuel est inférieur au niveau maximum, affichez le bouton pour acheter le niveau suivant avec son coût
        levelButton.innerHTML = `<button onclick="buyLevel()">Acheter Niveau Suivant (Coût: ${levelCost})</button>`;
    } else {
        // Sinon, si le niveau maximum est atteint, affichez un bouton désactivé indiquant que le niveau maximum est atteint
        levelButton.innerHTML = `<button disabled>Max Niveau Atteint</button>`;
    }
}

// Tableau contenant les chemins d'accès des images de tacos pour chaque niveau
const tacoImages = [
    'level1.png',
    './media/level2.png',
    './media/level3.png',
    './media/level4.png',
    './media/level5.png',
    './media/level6.png',
    './media/level7.png',
    
    


    // Ajoutez les chemins d'accès des images pour chaque niveau suivant
];

// Modifier la fonction d'achat de niveau
function buyLevel() {
    // Calcul du coût du prochain niveau en fonction du niveau actuel
    const newLevelCost = currentLevel * 100; // Coefficient de 100 pour chaque niveau

    if (tacos >= newLevelCost && currentLevel < maxLevel) {
        tacos -= newLevelCost;
        currentLevel++;
        levelCost = (currentLevel * 100); // Mettre à jour le coût avec le nouveau coût calculé
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

    // Fonction pour ajouter une image de taco à un niveau
function addTacoImageToLevel(levelImageContainer, imagePath) {
    const tacoImage = document.createElement('img');
    tacoImage.src = imagePath; // Utilisez le chemin d'accès récupéré
    tacoImage.alt = 'Tacos'; // Texte alternatif pour l'image
    tacoImage.style.width = '50px'; // Ajustez la taille de l'image selon votre préférence
    tacoImage.style.height = '50px'; // Ajustez la taille de l'image selon votre préférence
    tacoImage.style.opacity = '0'; // Initialisez l'opacité à 0 pour l'animation
    
    // Ajoutez l'image au conteneur
    levelImageContainer.innerHTML = '';
    levelImageContainer.appendChild(tacoImage);

    // Animation pour faire apparaître l'image avec une transition d'opacité
    setTimeout(() => {
        tacoImage.style.opacity = '1';
    }, 100); // Démarrez l'animation après un court délai
}

function toggleMenu() {
    var menu = document.querySelector('.menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

// Fonction pour augmenter les tacos par clic
function increaseClickMultiplier() {
    // Augmenter le nombre de tacos par clic
    clickMultiplier++;
    // Mettre à jour l'affichage
    updateClickMultiplierDisplay();
}

// Fonction pour mettre à jour l'affichage des tacos par clic
function updateClickMultiplierDisplay() {
    const clickMultiplierDisplay = document.querySelector('.clickMultiplierDisplay');
    clickMultiplierDisplay.textContent = `Tacos par clic: ${clickMultiplier}`;
}

// Événement pour ajouter un écouteur de clic à l'icône miniIcon1
const miniIcon1 = document.getElementById('miniIcon1');
miniIcon1.addEventListener('click', increaseClickMultiplier);
miniIcon1.addEventListener('click', moveImageRandomly);

// Fonction pour déplacer l'image de façon aléatoire dans la zone centrale de la page
function moveImageRandomly() {
    const image = document.getElementById('miniIcon1');
    // Récupérer les dimensions de la zone centrale de la page
    const centralAreaWidth = window.innerWidth * 0.1; // 60% de la largeur de la fenêtre
    const centralAreaHeight = window.innerHeight * 0.4; // 60% de la hauteur de la fenêtre
    // Générer des coordonnées aléatoires pour la position de l'image dans la zone centrale
    const randomX = (Math.random() * centralAreaWidth) + (window.innerWidth * 0.1); // Décalage pour centrer l'image horizontalement
    const randomY = (Math.random() * centralAreaHeight) + (window.innerHeight * 0.4); // Décalage pour centrer l'image verticalement
    // Appliquer les nouvelles coordonnées de position à l'image
    image.style.left = randomX + 'px';
    image.style.top = randomY + 'px';
     // Masquer l'image pendant un certain temps après un clic
     image.style.visibility = 'hidden';
     setTimeout(() => {
         image.style.visibility = 'visible'; // Rendre à nouveau l'image visible après un délai
     }, 5000); // 2000 millisecondes (2 secondes) de délai
 }
 
 // music on et off de fond
 
 document.addEventListener("DOMContentLoaded", function() {
    const toggleMusicButton = document.getElementById("toggleMusicButton");
    const backgroundMusic = document.getElementById("backgroundMusic");
    let isMusicPlaying = true;

    // Fonction pour basculer la musique entre "On" et "Off"
    function toggleMusic() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            toggleMusicButton.textContent = "Music Off";
        } else {
            backgroundMusic.play();
            toggleMusicButton.textContent = "Music On";
        }
        isMusicPlaying = !isMusicPlaying;
    }

    // Gestionnaire d'événement pour le bouton de basculement de la musique
    toggleMusicButton.addEventListener("click", toggleMusic);

    // Démarrer la musique dès que le contenu de la page est chargé
    backgroundMusic.play();
});

// son étoile

document.addEventListener("DOMContentLoaded", function() {
    const miniIcon = document.getElementById("miniIcon1");
    const clickSound = document.getElementById("clickSound");

    // Gestionnaire d'événement pour le clic sur l'icône
    miniIcon.addEventListener("click", function() {
        // Jouer le son lorsque l'icône est cliquée
        clickSound.play();
    });
});



 //ajouter l'améloration des pouvoirs"

// son et animation aux trophée

