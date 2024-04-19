// Variables globales
let tacos = 0;
let autoClickerCost = 10;
let autoClickers = 0;
let clickMultiplierCost = 150;
let clickMultiplier = 1;
let bonusCost = 20;
let tacosPerSecond = 0; // Variable pour stocker le nombre de tacos par seconde
let currentLevel = 1;
let maxLevel = 7; // Par exemple, vous pouvez définir un maximum de 5 niveaux
let levelCost = 10000; // Coût initial pour débloquer le prochain niveau

// Éléments DOM
const tacosDisplay = document.getElementById('tacos');
const clickButton = document.getElementById('clickButton');
const autoClickerBtn = document.getElementById('autoClickerBtn');
const clickMultiplierBtn = document.getElementById('clickMultiplierBtn');
const bonusBtn = document.getElementById('bonusBtn');
const tpsDisplay = document.getElementById('tpsDisplay');
const clickFeedback = document.getElementById('clickFeedback');
const container = document.querySelector('.container');
const bonusTimerDisplay = document.getElementById('bonusTimerDisplay');

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
    updateBonusTimer(); // Mettre à jour le compte à rebours initial
    const bonusDuration = 10; // Durée du bonus en secondes
    const bonusExpirationTime = Date.now() + bonusDuration * 1000; // Calculer l'heure d'expiration du bonus

    const bonusTimerInterval = setInterval(() => {
        const timeRemaining = Math.max(0, Math.ceil((bonusExpirationTime - Date.now()) / 1000)); // Calculer le temps restant en secondes
        updateBonusTimer(timeRemaining); // Mettre à jour le compte à rebours avec le temps restant

        if (timeRemaining === 0) {
            clearInterval(bonusTimerInterval); // Arrêter le compte à rebours une fois le bonus expiré
            clickMultiplier /= 2; // Réinitialise le multiplicateur après la durée du bonus
            updateTacosPerClick(); // Mettre à jour le nombre de tacos par clic
            updateShopDisplay(); // Mettre à jour l'affichage de la boutique
        }
    }, 1000); // Mettre à jour le compte à rebours toutes les secondes
}

// Fonction pour mettre à jour l'affichage du compte à rebours
function updateBonusTimer(timeRemaining = 10) {
    bonusTimerDisplay.textContent = `Bonus Temporaire: ${timeRemaining} secondes restantes`;
}

let bonusCooldown = false; // Initialise le cooldown à false

// Fonction d'achat d'un bonus temporaire
bonusBtn.addEventListener('click', () => {
    if (!bonusCooldown && tacos >= bonusCost) { // Vérifie si le cooldown est désactivé et si le joueur a assez de tacos
        tacos -= bonusCost;
        // Appliquer le bonus temporaire
        applyBonus();
        // Double le prix du bonus pour le prochain achat
        bonusCost *= 2;
        updateTacosDisplay();
        updateShopDisplay();
        
        // Active le cooldown
        bonusCooldown = true;
        const cooldownDuration = 20000; // Durée du cooldown en millisecondes (20 secondes)
        const cooldownInterval = 100; // Intervalle de mise à jour de la jauge de cooldown en millisecondes
        const cooldownIncrement = (cooldownInterval / cooldownDuration) * 100; // Incrément de remplissage de la jauge
        
        const cooldownBar = document.getElementById('bonusCooldownBarFill');
        let cooldownProgress = 0;
        const cooldownTimer = setInterval(() => {
            cooldownProgress += cooldownIncrement;
            cooldownBar.style.width = cooldownProgress + '%';
            if (cooldownProgress >= 100) {
                clearInterval(cooldownTimer);
                cooldownBar.style.width = '0%';
                bonusCooldown = false; // Désactive le cooldown après la durée spécifiée
            }
        }, cooldownInterval);
    } else if (bonusCooldown) { // Si le cooldown est actif
        alert("Veuillez patienter, le cooldown est toujours en cours.");
    } else { // Si le joueur n'a pas assez de tacos
        alert("Pas assez de tacos !");
    }
});

// Démarrer les auto-clickers
startAutoClicker();

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

// Sélectionnez l'élément audio correspondant à l'effet sonore
const levelUpSound = document.getElementById('levelUpSound');

// Modifier la fonction d'achat de niveau
function buyLevel() {
    // Calcul du coût du prochain niveau en fonction du niveau actuel
    const newLevelCost = currentLevel * 10000; // Coefficient de 100 pour chaque niveau

    if (tacos >= newLevelCost && currentLevel < maxLevel) {
        tacos -= newLevelCost;
        currentLevel++;
        levelCost = (currentLevel * 10000); // Mettre à jour le coût avec le nouveau coût calculé
        updateTacosDisplay();
        updateShopDisplay();
        updateLevelDisplay(); // Mettre à jour l'affichage du niveau
        addUnlockedTrophy(); // Ajouter l'image du trophée débloqué
           
        // Jouer l'effet sonore de niveau
        levelUpSound.play();
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
// Fonction pour mettre à jour l'affichage des tacos par seconde
function updateTacosPerSecondDisplay() {
    const tpsDisplay = document.getElementById('tpsDisplay');
    tpsDisplay.textContent = `Tacos par seconde: ${tacosPerSecond}`;
}

// Fonction pour augmenter les tacos par seconde lorsque l'étoile est cliquée
function increaseTacosPerSecond() {
    tacosPerSecond++; // Augmentez les tacos par seconde de 1 à chaque clic sur l'étoile
    updateTacosPerSecondDisplay(); // Mettre à jour l'affichage des tacos par seconde
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
    const centralAreaHeight = window.innerHeight * 0.3; // 60% de la hauteur de la fenêtre
    // Générer des coordonnées aléatoires pour la position de l'image dans la zone centrale
    const randomX = (Math.random() * centralAreaWidth) + (window.innerWidth * 0.1); // Décalage pour centrer l'image horizontalement
    const randomY = (Math.random() * centralAreaHeight) + (window.innerHeight * 0.3); // Décalage pour centrer l'image verticalement
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

// animation coeur jaune
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

// Sélectionnez l'élément audio correspondant au son des pouvoirs de la boutique
const shopPowerSound = document.getElementById('shopPowerSound');

// Ajoutez un gestionnaire d'événements pour le clic sur chaque bouton de la boutique
autoClickerBtn.addEventListener('click', playShopPowerSound);
clickMultiplierBtn.addEventListener('click', playShopPowerSound);
bonusBtn.addEventListener('click', playShopPowerSound);

// Fonction pour jouer le son des pouvoirs de la boutique
function playShopPowerSound() {
    shopPowerSound.play();
}

// Ajoutez un gestionnaire d'événements pour le clic sur le bouton de burger
burgerButton.addEventListener('click', toggleMenu);

// Fonction pour basculer l'état du menu et jouer le son approprié
function toggleMenu() {
    const menu = document.querySelector('.menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
        menuOpenSound.play(); // Jouez le son d'ouverture du menu
    } else {
        menu.style.display = 'none';
        menuCloseSound.play(); // Jouez le son de fermeture du menu
    }
}

