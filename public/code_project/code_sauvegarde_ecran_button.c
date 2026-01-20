#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "esp_random.h"
#include <string.h>
#include "driver/gpio.h"
#include "imagedata.h"
#include "epaper-29-ws.h"
#include "epaper_fonts.h"

static const char *TAG = "ePaper Example";


// === Configuration des pins ePaper ===
#define MOSI_PIN    25
#define MISO_PIN    -1
#define SCK_PIN     10
#define BUSY_PIN    0
#define DC_PIN      2
#define RST_PIN     1
#define CS_PIN      3

// === Définition des GPIO des boutons ===
#define BUTTON_VITESSE_PLUS GPIO_NUM_11
#define BUTTON_VITESSE_MOINS GPIO_NUM_26
#define BUTTON_CHOIX_PLUS GPIO_NUM_22
#define BUTTON_CHOIX_MOINS GPIO_NUM_12

// === Modes disponibles ===
const char *Mode[] = { "Chauffage", "Climatisation", "Ventilation", "Deshumidification" };
int currentModeIndex = 0;

// === Vitesse (entre 0 et 4) ===
const int VITESSE_MIN = 0;
const int VITESSE_MAX = 4;
int vitesse = 0;

// === ePaper device ===
epaper_handle_t device = NULL;

epaper_conf_t epaper_conf = {
    .busy_pin = BUSY_PIN,
    .cs_pin = CS_PIN,
    .dc_pin = DC_PIN,
    .miso_pin = MISO_PIN,
    .mosi_pin = MOSI_PIN,
    .reset_pin = RST_PIN,
    .sck_pin = SCK_PIN,

    .rst_active_level = 0,
    .busy_active_level = 1,

    .dc_lev_data = 1,
    .dc_lev_cmd = 0,

    .clk_freq_hz = 20 * 1000 * 1000,
    .spi_host = SPI2_HOST,

    .width = EPD_WIDTH,
    .height = EPD_HEIGHT,
    .color_inv = 1,
};

// === Configuration des boutons  ===
void configure_gpio() {
    gpio_set_direction(BUTTON_VITESSE_PLUS, GPIO_MODE_INPUT);
    gpio_set_direction(BUTTON_VITESSE_MOINS, GPIO_MODE_INPUT);
    gpio_set_direction(BUTTON_CHOIX_PLUS, GPIO_MODE_INPUT);
    gpio_set_direction(BUTTON_CHOIX_MOINS, GPIO_MODE_INPUT);
}

// === Convertir vitesse en chaîne ===
const char* char_vitesse(int num) {
    switch (num) {
        case 0: return "0";
        case 1: return "1";
        case 2: return "2";
        case 3: return "3";
        case 4: return "4";
        default:
            ESP_LOGW(TAG, "Vitesse invalide");
            return "?";
    }
}

// === Fonction de détection avec anti-rebond (debounce) ===
int Bouton_appuyer(int button) {
    if (gpio_get_level(button) == 1) { // Bouton enfoncé
        vTaskDelay(pdMS_TO_TICKS(50)); // Attente pour éviter les rebonds
        if (gpio_get_level(button) == 1) { // Vérification après le délai
            while (gpio_get_level(button) == 1) { // Attendre le relâchement
                vTaskDelay(pdMS_TO_TICKS(10));
            }
            return 1; // Bouton validé comme appuyé
            
        }
    }
    return 0; // Bouton non pressé ou rebondé
}

// === Tâche principale d'affichage ePaper ===
void init_epaper_task() {
    
    // Rotation de l'affichage
    iot_epaper_set_rotate(device, E_PAPER_ROTATE_270);
    iot_epaper_clean_paint(device, UNCOLORED);
    // Texte et ligne
    iot_epaper_draw_string(device, 200, 115, "YMAMOU Yassar", &epaper_font_12, COLORED);
    iot_epaper_draw_string(device, 10, 10, "SYSTEME DE CONTROLE", &epaper_font_16, COLORED);
    iot_epaper_draw_string(device, 10, 50, "Mode: ", &epaper_font_16, COLORED);
    iot_epaper_draw_string(device, 10, 80, "Vitesse: ", &epaper_font_16, COLORED);
    iot_epaper_draw_horizontal_line(device, 10, 27, 210, COLORED);
    // Affichage mode
    iot_epaper_draw_string(device, 70, 50, Mode[0], &epaper_font_16, COLORED);
    // Affichage vitesse
    iot_epaper_draw_string(device, 100, 80, char_vitesse(vitesse), &epaper_font_16, COLORED);
    // Affichage final
    iot_epaper_display_frame(device, NULL);
    // Attente + passage au mode suivant
    vTaskDelay(5000 / portTICK_PERIOD_MS);
}

// === Affichage du nouveau mode ===
void update_display_mode(int mode_index) {
    currentModeIndex = mode_index;
    // Efface la zone du texte du mode (70,50 à 170,70)
    ior_epaper_draw_filled_rectangle(device, 70, 50, 270, 70, UNCOLORED);
    // Réécrit le mode
    iot_epaper_draw_string(device, 70, 50, Mode[mode_index], &epaper_font_16, COLORED);
    // Rafraîchissement complet (ou partiel si supporté)
    iot_epaper_display_frame(device, NULL);
}

// === Affichage de la nouvelle vitesse ===
void update_display_vitesse(int vitesse_index) {
    vitesse = vitesse_index;
    // Efface la zone de la vitesse (100,80 à 130,100)
    ior_epaper_draw_filled_rectangle(device, 100, 80, 130, 100, UNCOLORED);
    // Réécrit la vitesse
    iot_epaper_draw_string(device, 100, 80, char_vitesse(vitesse), &epaper_font_16, COLORED);
    // Rafraîchissement
    iot_epaper_display_frame(device,NULL );
}

// === Tâche pour changer le mode (bouton CHOIX +) ===
void button_choix_plus_task(void *arg) {
    while (1) {
        if (Bouton_appuyer(BUTTON_CHOIX_PLUS)) {
            if (currentModeIndex < 3) {  
                currentModeIndex++;
                printf("Mode: %s\n", Mode[currentModeIndex]);
                update_display_mode(currentModeIndex);
            }
        }
        vTaskDelay(pdMS_TO_TICKS(10)); 
    }
}

// === Tâche pour changer le mode (bouton CHOIX -) ===
void button_choix_moins_task(void *arg) {
    while (1) {
        if (Bouton_appuyer(BUTTON_CHOIX_MOINS)) {
            if (currentModeIndex > 0) {
                currentModeIndex--;
                printf("Mode: %s\n", Mode[currentModeIndex]);
                update_display_mode(currentModeIndex);
            }
        }
        vTaskDelay(pdMS_TO_TICKS(10));
    }
}

// === Tâche pour augmenter la vitesse ===
void button_vitesse_plus_task(void *arg) {
    while (1) {
        if (Bouton_appuyer(BUTTON_VITESSE_PLUS)) {
            if (vitesse < VITESSE_MAX) {
                vitesse++;
                printf("Vitesse : %d\n", vitesse);
                update_display_vitesse(vitesse);
            } 
        }
        vTaskDelay(pdMS_TO_TICKS(10));
    }
}

// === Tâche pour diminuer la vitesse ===
void button_vitesse_moins_task(void *arg) {
    while (1) {
        if (Bouton_appuyer(BUTTON_VITESSE_MOINS)) {
            if (vitesse > VITESSE_MIN) {
                vitesse--;
                printf("Vitesse : %d\n", vitesse);
                update_display_vitesse(vitesse);
            } 
        }
        vTaskDelay(pdMS_TO_TICKS(10));
    }
}

// === Fonction principale ===
void app_main() {
    configure_gpio();
    ESP_LOGI(TAG, "Démarrage de l'exemple ePaper");
    ESP_LOGI(TAG, "Heap avant init : %lu", esp_get_free_heap_size());
    // Initialisation ePaper
    device = iot_epaper_create(NULL, &epaper_conf);
    init_epaper_task();

    xTaskCreate(button_choix_plus_task, "button_choix_plus_task", 4096, NULL, 10, NULL);
    xTaskCreate(button_choix_moins_task, "button_choix_moins_task", 4096, NULL, 10, NULL);
    xTaskCreate(button_vitesse_plus_task, "button_vitesse_plus_task", 4096, NULL, 10, NULL);
    xTaskCreate(button_vitesse_moins_task, "button_vitesse_moins_task", 4096, NULL, 10, NULL);
}
