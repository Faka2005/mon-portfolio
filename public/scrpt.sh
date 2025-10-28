#!/bin/bash

# Couleurs pour l'affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour exécuter `apt update` silencieusement
apt_silent_update() {
    echo "Mise à jour des listes de paquets en cours..."
    sudo apt update -qq > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "Mise à jour des listes de paquets réussie."
    else
        echo "Erreur lors de la mise à jour des listes de paquets." >&2
    fi
}

# Fonction pour exécuter `apt upgrade` silencieusement
apt_silent_upgrade() {
    echo "Mise à niveau des paquets en cours..."
    sudo apt upgrade -qq -y > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "Mise à niveau des paquets réussie."
    else
        echo "Erreur lors de la mise à niveau des paquets." >&2
    fi
}

# Fonction pour exécuter `apt install` silencieusement
apt_silent_install() {
    local package="$1"
    echo "Installation du paquet '$package' en cours..."
    sudo apt install -qq -y "$package" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "Installation de '$package' réussie."
    else
        echo "Erreur lors de l'installation de '$package'." >&2
    fi
}

# Fonction pour demander et vérifier une entrée utilisateur
ask_input() {
    local prompt="$1"
    local input_var
    while [[ -z "$input_var" ]]; do
        read -p "$prompt" input_var
    done
    echo "$input_var"
}

install_net-tools(){
    echo -e "${GREEN}Installation de net-tools...${NC}"
    
    # Utilisation des fonctions apt pour la mise à jour et installation de net-tools
    apt_silent_update
    apt_silent_install "net-tools"
}

# Fonction d'installation de Samba
install_samba() {
    echo -e "${GREEN}Installation de Samba...${NC}"
    
    # Utilisation des fonctions apt pour la mise à jour et installation de Samba
    apt_silent_update
    apt_silent_install "samba"

    # Demande des informations à l'utilisateur
    share_name=$(ask_input "Entrez le nom du partage Samba : ")
    group_name=$(ask_input "Entrez le nom du groupe Samba : ")

    # Création du groupe
    sudo groupadd "$group_name"
    echo -e "${GREEN}Le groupe $group_name a été créé.${NC}"

    # Ajouter des utilisateurs au groupe et à Samba
    while true; do
        user_name=$(ask_input "Entrez le nom d'utilisateur à ajouter à Samba (ou tapez 'fin' pour terminer) : ")
        if [[ "$user_name" == "fin" ]]; then
            break
        fi
        # Créer l'utilisateur s'il n'existe pas déjà
        if ! id -u "$user_name" > /dev/null 2>&1; then
            sudo useradd -m "$user_name"
            echo -e "${GREEN}L'utilisateur $user_name a été créé.${NC}"
        fi
        # Ajouter l'utilisateur au groupe et à Samba
        sudo usermod -aG "$group_name" "$user_name"
        sudo smbpasswd -a "$user_name"
        echo -e "${GREEN}L'utilisateur $user_name a été ajouté à Samba et au groupe $group_name.${NC}"
    done

    echo -e "${GREEN}Configuration de Samba...${NC}"
    # Sauvegarder l'ancienne configuration de Samba
    sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.bak

    # Ajouter la configuration du partage Samba
    cat <<EOL | sudo tee -a /etc/samba/smb.conf

[$share_name]
    path = /srv/samba/$share_name
    valid users = @${group_name}
    guest ok = no
    writable = yes
    browseable = yes
    create mask = 0775
    directory mask = 0775
EOL

    # Créer le répertoire de partage
    sudo mkdir -p /srv/samba/"$share_name"
    sudo chown -R :"$group_name" /srv/samba/"$share_name"
    sudo chmod -R 0775 /srv/samba/"$share_name"

    echo -e "${GREEN}Redémarrage du service Samba...${NC}"
    sudo systemctl restart smbd

    echo -e "${GREEN}Le serveur Samba avec le partage '$share_name' pour le groupe '$group_name' a été configuré avec succès.${NC}"
    echo -e "${GREEN} Il est disponible à l'adresse suivante '$(hostname -I | awk '{print $1}')\\$share_name'"
}


# Menu principal
while true; do
    echo -e "${GREEN}Bienvenue dans l'outil de configuration de serveur.${NC}"
    echo "Que voulez-vous configurer ?"

    # Créer une liste (tableau) avec quelques éléments
    menu=("Samba"  "Net-tools" "Arrêter le script")

    # Afficher le contenu de la liste avec les indices
    echo "Contenu de la liste :"
    for index in "${!menu[@]}"; do
        echo "$((index+1)) ) ${menu[$index]}"
    done

    # Demander à l'utilisateur de faire un choix
    read -p "Entrez votre choix [1-3]: " choice

    case $choice in
        1)
            install_samba
            ;;
        2)
            install_net-tools
            ;;
        3)
            echo -e "${RED}Sortie du script.${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Choix invalide, veuillez réessayer.${NC}"
            ;;
    esac
done
