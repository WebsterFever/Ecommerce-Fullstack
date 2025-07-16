const multer = require('multer'); // Importe le module multer pour la gestion des fichiers uploadés
const path = require('path'); // Importe le module path pour gérer les extensions de fichiers

const storage = multer.diskStorage({ // Configure le stockage des fichiers sur le disque
  destination: (req, file, cb) => { // Définit le dossier de destination pour les fichiers
    cb(null, 'uploads/'); // Stocke les fichiers dans le dossier 'uploads/'
  },
  filename: (req, file, cb) => { // Définit le nom du fichier sauvegardé
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // Crée un suffixe unique avec timestamp et nombre aléatoire
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Concatène le suffixe avec l'extension d'origine du fichier
  },
});

const upload = multer({ storage }); // Crée une instance multer avec la configuration de stockage

module.exports = upload; // Exporte l'instance pour l'utiliser dans d'autres fichiers
