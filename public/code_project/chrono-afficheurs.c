// Définition des broches pour les segments de l'afficheur
const int bit_A = 0;  // Broche 0 de l'arduino
const int bit_B = 1;  // Broche 1 de l'arduino
const int bit_C = 2;  // Broche 2 de l'arduino
const int bit_D = 3;  // Broche 3 de l'arduino
const int bit_E = 4;  // Broche 4 de l'arduino
const int bit_F = 5;  // Broche 5 de l'arduino
const int bit_G = 6;  // Broche 6 de l'arduino

// Broches pour les transistors des anodes communes
const int AFF1_U = 10;       // Commande pour l'afficheur des unités
const int AFF2_D = 9;        // Commande pour l'afficheur des dizaines
const int BTN_start = 11;    //Commande du bouton start
const int BTN_restart = 12;  //Commande du bouton restart

// Variables pour gérer le multiplexage
unsigned long dernierTemps = 0;
int intervalleMultiplexage = 5;  // 5 ms pour chaque afficheur
int chiffreUnites = 0;
int chiffreDizaines = 0;
bool afficherUnites = true;

bool compteurActif = false;  // Variable pour savoir si le compte à rebours est actif
int compteur = 0;            // Compteur global

void setup() {
  // Configurer les broches des segments comme sorties
  pinMode(bit_A, OUTPUT);
  pinMode(bit_B, OUTPUT);
  pinMode(bit_C, OUTPUT);
  pinMode(bit_D, OUTPUT);
  pinMode(bit_E, OUTPUT);
  pinMode(bit_F, OUTPUT);
  pinMode(bit_G, OUTPUT);

  // Configurer les broches des transistors comme sorties
  pinMode(AFF1_U, OUTPUT);
  pinMode(AFF2_D, OUTPUT);

  // Configurer les broches des boutons comme entrées avec pull-up interne
  pinMode(BTN_start, INPUT);
  pinMode(BTN_restart, INPUT);

  // Éteindre les afficheurs au démarrage
  digitalWrite(AFF1_U, LOW);
  digitalWrite(AFF2_D, LOW);
}

void loop() {
  // Vérifier l'état des boutons
  if (Pressed_Start()) {
    if (!compteurActif) {  // Si le compteur est arrêté, démarrer le compte à rebours
      compteurActif = true;
    } else {  // Si le compteur est déjà actif, l'arrêter
      arreter_compte_a_rebours();
    }
  }

  if (Pressed_Reset()) {
    reset_compte_a_rebours();  // Réinitialiser le compteur et redémarrer
  }

  if (compteurActif) {
    compte_a_rebours();  // Lancer ou continuer le compte à rebours si le compteur est actif
  }
}

// Simule un compteur de 0 à 99
void compte_a_rebours() {
  if (millis() - dernierTemps >= intervalleMultiplexage) {
    dernierTemps = millis();

    // Calculer les unités et dizaines du compteur
    chiffreUnites = compteur % 10;
    chiffreDizaines = compteur / 10;

    // Multiplexage : alterner entre les unités et les dizaines
    if (afficherUnites) {
      Choisir_Transistors(chiffreUnites, AFF1_U);
    } else {
      Choisir_Transistors(chiffreDizaines, AFF2_D);
    }
    afficherUnites = !afficherUnites;
  }

  // Augmenter le compteur toutes les 100 ms
  static unsigned long dernierIncrement = 0;
  if (millis() - dernierIncrement >= 100) {
    dernierIncrement = millis();
    compteur = (compteur + 1) % 100;  // Retour à 0 après 99
  }
}

// Permet d'afficher un chiffre dans un afficheur sélectionné
void Choisir_Transistors(int chiffre, int afficheur) {
  // Désactiver les deux afficheurs
  digitalWrite(AFF1_U, LOW);
  digitalWrite(AFF2_D, LOW);

  // Configurer les segments pour le chiffre à afficher
  afficherChiffre(chiffre);

  //Afficher la led correspandante
  afficher_leds_utilisateur(chiffre); 
  // Activer l'afficheur cible
  digitalWrite(afficheur, HIGH);
}

// Active les broches pour afficher le chiffre choisis aux afficheurs
void afficherChiffre(int chiffre) {
  // Configuration des segments pour chaque chiffre
  switch (chiffre) {
    case 0: digitalWrite(bit_A, LOW); digitalWrite(bit_B, LOW); digitalWrite(bit_C, LOW);
            digitalWrite(bit_D, LOW); digitalWrite(bit_E, LOW); digitalWrite(bit_F, LOW);
            digitalWrite(bit_G, HIGH); break;
    case 1: digitalWrite(bit_A, HIGH); digitalWrite(bit_B, LOW); digitalWrite(bit_C, LOW);
            digitalWrite(bit_D, HIGH); digitalWrite(bit_E, HIGH); digitalWrite(bit_F, HIGH);
            digitalWrite(bit_G, HIGH); break;
    case 2: digitalWrite(bit_A, LOW); digitalWrite(bit_B, LOW); digitalWrite(bit_C, HIGH);
            digitalWrite(bit_D, LOW); digitalWrite(bit_E, LOW); digitalWrite(bit_F, HIGH);
            digitalWrite(bit_G, LOW); break;
    case 3: digitalWrite(bit_A, LOW); digitalWrite(bit_B, LOW); digitalWrite(bit_C, LOW);
            digitalWrite(bit_D, LOW); digitalWrite(bit_E, HIGH); digitalWrite(bit_F, HIGH);
            digitalWrite(bit_G, LOW); break;
    case 4: digitalWrite(bit_A, HIGH); digitalWrite(bit_B, LOW); digitalWrite(bit_C, LOW);
            digitalWrite(bit_D, HIGH); digitalWrite(bit_E, HIGH); digitalWrite(bit_F, LOW);
            digitalWrite(bit_G, LOW); break;
    case 5: digitalWrite(bit_A, LOW); digitalWrite(bit_B, HIGH); digitalWrite(bit_C, LOW);
            digitalWrite(bit_D, LOW); digitalWrite(bit_E, HIGH); digitalWrite(bit_F, LOW);
            digitalWrite(bit_G, LOW); break;
    case 6: digitalWrite(bit_A, LOW); digitalWrite(bit_B, HIGH); digitalWrite(bit_C, LOW);
            digitalWrite(bit_D, LOW); digitalWrite(bit_E, LOW); digitalWrite(bit_F, LOW);
            digitalWrite(bit_G, LOW); break;
    case 7: digitalWrite(bit_A, LOW); digitalWrite(bit_B, LOW); digitalWrite(bit_C, LOW);
            digitalWrite(bit_D, HIGH); digitalWrite(bit_E, HIGH); digitalWrite(bit_F, HIGH);
            digitalWrite(bit_G, HIGH); break;
    case 8: digitalWrite(bit_A, LOW); digitalWrite(bit_B, LOW); digitalWrite(bit_C, LOW);
            digitalWrite(bit_D, LOW); digitalWrite(bit_E, LOW); digitalWrite(bit_F, LOW);
            digitalWrite(bit_G, LOW); break;
    case 9: digitalWrite(bit_A, LOW); digitalWrite(bit_B, LOW); digitalWrite(bit_C, LOW);
            digitalWrite(bit_D, LOW); digitalWrite(bit_E, HIGH); digitalWrite(bit_F, LOW);
            digitalWrite(bit_G, LOW); break;
  }
}

bool Pressed_Start() { return digitalRead(BTN_start) == HIGH; }//Vérifie si le bouton start est pressé
bool Pressed_Reset() { return digitalRead(BTN_restart) == HIGH; }//Vérifie si le bouton reset  est pressé

void arreter_compte_a_rebours() { compteurActif = false; }//Arrête le chronomètre
void reset_compte_a_rebours() { compteur = 0; compteurActif = true; }//Remets le chronomètre à 0

// Fonction pour afficher le compteur sur les LEDs
void afficher_leds_utilisateur(int valeur) {
  for (int i = 0; i < 7; i++) {
    if (valeur & (1 << i)) {
      digitalWrite(leds[i], HIGH); // Allume la LED correspondante
    } else {
      digitalWrite(leds[i], LOW); // Éteint la LED correspondante
    }
  }
}