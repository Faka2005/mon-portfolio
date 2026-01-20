

char uart_rd;  // Variable pour stocker les donn?es re?ues par UART

// Connexions du module LCD
sbit LCD_RS at RB4_bit;
sbit LCD_EN at RB5_bit;
sbit LCD_D4 at RB0_bit;
sbit LCD_D5 at RB1_bit;
sbit LCD_D6 at RB2_bit;
sbit LCD_D7 at RB3_bit;

sbit LCD_RS_Direction at TRISB4_bit;
sbit LCD_EN_Direction at TRISB5_bit;
sbit LCD_D4_Direction at TRISB0_bit;
sbit LCD_D5_Direction at TRISB1_bit;
sbit LCD_D6_Direction at TRISB2_bit;
sbit LCD_D7_Direction at TRISB3_bit;

// Textes statiques pour affichage initial
char txt3[] = " AFFICHAGE DE ";
char txt4[] = " DONNEES XBEE ";
char message_index = 0 ;
char* messages[] = {"XBEE", "LCD","BTS", "Retour"};

char i;  // Variable de boucle

unsigned long press_time = 0;  // Variable pour stocker le temps pendant lequel le bouton est pressé
const unsigned long HOLD_TIME = 2000;  // Durée en millisecondes pour maintenir le bouton (2 secondes)
void clearUARTBuffer() {
  // Fonction pour vider le buffer UART avant d'envoyer un nouveau message
  while (UART1_Data_Ready()) {
    UART1_Read();  // Lit et jette les données restantes dans le buffer
  }
}

void main() {
  ANSEL  = 0;  // Configure les broches AN comme numériques
  ANSELH = 0;

  UART1_Init(9600);  // Initialise le module UART à 9600 bauds
  Delay_ms(100);  // Attente pour stabiliser le module UART

  UART1_Write_Text("Start");
  UART1_Write(10);
  UART1_Write(13);
  C1ON_bit = 0;  // Désactive les comparateurs
  C2ON_bit = 0;

  Lcd_Init();  // Initialise le LCD

  Lcd_Cmd(_LCD_CLEAR);  // Efface l'affichage
  Lcd_Cmd(_LCD_CURSOR_OFF);  // Désactive le curseur
  Lcd_Out(1,1,txt3);  // Affiche le texte dans la première ligne
  Lcd_Out(2,1,txt4);  // Affiche le texte dans la deuxième ligne
  Delay_ms(3000);  // Affiche les textes pendant 3 secondes
  Lcd_Cmd(_LCD_CLEAR);  // Efface l'affichage

  // Affichage en attente de données UART
  Lcd_Out(1,1,"En attente de");  // Affiche un message d'attente
  Lcd_Out(2,1,"donnees UART");   // Affiche un message d'attente

  // Configure RA0 en entrée numérique


  while(1) {  // Boucle infinie
    if (UART1_Data_Ready()) {  // Si des données sont reçues
      uart_rd = UART1_Read();  // lit les données reçues
      Lcd_Cmd(_LCD_CLEAR);  // Efface l'affichage du LCD
      Lcd_Out(1,1,"Donnees recues:");  // Affiche un message d'informations
      UART1_Write(uart_rd);  // Renvoie les données à l'ordinateur via UART
      Lcd_Chr(2,1,uart_rd);  // Affiche le caractère reçu sur la deuxième ligne du LCD
    }

    if (PORTD.F0 == 1) {  // Vérifie si le bouton est pressé
      Delay_ms(20);  // Debouncing
      if (PORTD.F0 == 1) {  // Si le bouton est toujours pressé après le délai
        press_time = 0;  // Réinitialise la variable du temps de pression

        // Boucle pour détecter la durée de pression du bouton
        while (PORTD.F0 == 1) {  // Tant que le bouton est pressé
          Delay_ms(100);  // Temporisation pour l'augmentation de la durée
          press_time += 100;  // Incrémentation du temps de pression

          if (press_time >= HOLD_TIME) {  // Si le bouton est pressé pendant plus de 2 secondes
            Lcd_Cmd(_LCD_CLEAR);  // Efface l'affichage du LCD
            Lcd_Out(1,1,"Donnees recues:");  // Affiche un message d'envoi
            Lcd_Out(2,1, messages[message_index-1]);  // Affiche le message envoyé

            // Vide le buffer UART avant d'envoyer un message pour éviter les interférences
            clearUARTBuffer();

            // Envoi du message via UART au module XBee
            UART1_Write_Text(messages[message_index-1]);
            UART1_Write(10);  // Envoi d'un retour à la ligne
            UART1_Write(13);

            break;  // Quitte la boucle pour ne pas répéter l'envoi
          }
        }

        if (press_time < HOLD_TIME) {  // Si le bouton est pressé moins de 2 secondes
          Lcd_Cmd(_LCD_CLEAR);  // Efface l'affichage du LCD
          Lcd_Out(1,1,"Message Bouton:");  // Affiche un message d'informations
          Lcd_Out(2,1, messages[message_index]);  // Affiche le message personnalisé
          message_index = (message_index + 1) % 4;  // Passe au message suivant
        }

        while (PORTD.F0 == 1);  // Attend que le bouton soit relâché
      }
    }
  }
}

