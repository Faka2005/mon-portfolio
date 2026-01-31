export const projectsIoT = {
  "chronometre-arduino-multiplexage": {
    title: "Chronomètre multiplexé – Arduino Uno",
    description:
      "Chronomètre électronique avec affichage sur 2 afficheurs 7 segments utilisant multiplexage et Arduino.",
        img: "/images/chronomètre.png",

    technologies: ["arduino", "c", "electronique", "multiplexage"],
    demo: null,
    code: "https://github.com/Faka2005/chronometre-arduino",
    objective:
      "Créer un chronomètre de 0 à 99 utilisant 2 afficheurs 7 segments et le multiplexage pour minimiser les broches utilisées.",
    imageDesc: "Schéma de la carte avec Arduino, transistors et afficheurs 7 segments.",
    keyPoints: [
      "Maîtrise du multiplexage matériel",
      "Gestion du temps sans blocage",
      "Interaction Arduino et composants électroniques",
    ],
    codeSnippets: {
      multiplexage: `
if (millis() - dernierTemps >= intervalleMultiplexage) {
  dernierTemps = millis();

  chiffreUnites = compteur % 10;
  chiffreDizaines = compteur / 10;

  if (afficherUnites) {
    Choisir_Transistors(chiffreUnites, AFF1_U);
  } else {
    Choisir_Transistors(chiffreDizaines, AFF2_D);
  }
  afficherUnites = !afficherUnites;
}
      `,
      boutons: `
bool Pressed_Start() {
  return digitalRead(BTN_start) == HIGH;
}

bool Pressed_Reset() {
  return digitalRead(BTN_restart) == HIGH;
}
      `,
      affichage: `
void Choisir_Transistors(int chiffre, int afficheur) {
  digitalWrite(AFF1_U, LOW);
  digitalWrite(AFF2_D, LOW);

  afficherChiffre(chiffre);
  digitalWrite(afficheur, HIGH);
}
      `,
    },
  },

  "xbee-lora-communication": {
    title: "Carte de communication XBee / LoRa",
    description:
      "Carte électronique de communication longue portée utilisant XBee et LoRa.",
       img: "/images/lora.png",

    technologies: ["xbee", "lora", "rf", "electronique"],
    demo: null,
    code: "https://github.com/Faka2005/xbee-lora",
    objective:
      "Établir une communication sans fil fiable entre systèmes embarqués via XBee et LoRa.",
    imageDesc: "Schéma de communication point à point avec modules XBee/LoRa.",
    keyPoints: [
      "Communication radio longue portée",
      "Tests de stabilité et portée",
      "Intégration hardware / firmware",
    ],
    codeSnippets: {}, // Pas de code spécifique pour ce projet matériel
  },

  "xbee-lcd": {
    title: "Carte XBee avec affichage LCD",
    description:
      "Module XBee connecté à un microcontrôleur et affichage des données sur LCD 16x2.",
    img: "/images/lcd.png",
    technologies: ["xbee", "lcd", "arduino", "electronique"],
    demo: null,
    code: "https://github.com/Faka2005/xbee-lcd",
    objective:
      "Recevoir et afficher des données via XBee sur un écran LCD, avec boutons pour interaction utilisateur.",
    imageDesc: "Schéma UART XBee vers écran LCD 16x2 avec boutons.",
    keyPoints: [
      "Communication série UART",
      "Affichage temps réel sur LCD",
      "Gestion d’entrées utilisateur via boutons",
    ],
    codeSnippets: {
      uart: `
if (UART1_Data_Ready()) {
  uart_rd = UART1_Read();
  Lcd_Cmd(_LCD_CLEAR);
  Lcd_Out(1,1,"Donnees recues:");
  UART1_Write(uart_rd);
  Lcd_Chr(2,1,uart_rd);
}
      `,
      bouton: `
if (PORTD.F0 == 1) {
  Delay_ms(20);
  if (PORTD.F0 == 1) {
    press_time = 0;
    while (PORTD.F0 == 1) {
      Delay_ms(100);
      press_time += 100;
      if (press_time >= HOLD_TIME) {
        UART1_Write_Text(messages[message_index-1]);
        UART1_Write(10);
        UART1_Write(13);
        break;
      }
    }
  }
}
      `,
      lcdInit: `
Lcd_Init();
Lcd_Cmd(_LCD_CLEAR);
Lcd_Cmd(_LCD_CURSOR_OFF);
Lcd_Out(1,1," AFFICHAGE DE ");
Lcd_Out(2,1," DONNEES XBEE ");
      `,
    },
  },

  "zigbee-home-assistant": {
    title: "Carte Zigbee – Home Assistant",
    description:
      "Climatisation domotique pilotée via ESP32, Zigbee et Home Assistant avec écran ePaper.",
    img: "/images/Zigbee.png",
    technologies: ["zigbee", "home-assistant", "iot", "esp32"],
    demo: null,
    code: "https://github.com/Faka2005/zigbee-home-assistant",
    objective:
      "Permettre le contrôle d’un système de climatisation via Zigbee avec supervision Home Assistant et affichage ePaper.",
    
    imageDesc:
      "Schéma d’architecture ESP32 + boutons + écran ePaper + Zigbee vers Home Assistant.",
    keyPoints: [
      "Programmation embarquée ESP32 / FreeRTOS",
      "Gestion multitâche et boutons physiques",
      "Intégration domotique via Zigbee",
      "Affichage optimisé sur écran ePaper",
    ],
    codeSnippets: {
      debounce: `
int Bouton_appuyer(int button) {
    if (gpio_get_level(button) == 1) {
        vTaskDelay(pdMS_TO_TICKS(50));
        if (gpio_get_level(button) == 1) {
            while (gpio_get_level(button) == 1) {
                vTaskDelay(pdMS_TO_TICKS(10));
            }
            return 1;
        }
    }
    return 0;
}
      `,
      multitask: `
xTaskCreate(button_choix_plus_task, "choix+", 4096, NULL, 10, NULL);
xTaskCreate(button_vitesse_plus_task, "vitesse+", 4096, NULL, 10, NULL);
      `,
      ePaper: `
ior_epaper_draw_filled_rectangle(device, 70, 50, 270, 70, UNCOLORED);
iot_epaper_draw_string(device, 70, 50, Mode[mode_index], &epaper_font_16, COLORED);
      `,
    },
  },
};

export const projectsIoTData = [
  {
    title: "Chronomètre multiplexé – Arduino",
    desc: "Carte électronique de chronométrage avec multiplexage d’afficheurs.",
    img: "/images/chronomètre.png",
    slug: "chronometre-arduino-multiplexage",
  },
  {
    title: "Carte communication XBee / LoRa",
    desc: "Communication longue portée pour systèmes embarqués.",
    img: "/images/lora.png",
    slug: "xbee-lora-communication",
  },
  {
    title: "Carte XBee avec affichage LCD",
    desc: "Transmission XBee avec affichage temps réel sur écran LCD.",
    img: "/images/lcd.png",
    slug: "xbee-lcd",
  },
  {
    title: "Carte Zigbee – Home Assistant",
    desc: "Carte domotique Zigbee intégrée à Home Assistant.",
    img: "/images/Zigbee.png",
    slug: "zigbee-home-assistant",
  },
];
