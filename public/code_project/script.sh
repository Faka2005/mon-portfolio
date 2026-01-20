#!/bin/bash

# ===============================
#  Script d'installation Serveur complet Ubuntu
# (Samba, WireGuard, Net-tools, Tailscale, VSCode, Go, Node.js, Python,
# React, TypeScript, React Native, VirtualBox, Flutter, Gestion Users)
# ===============================

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# ===============================
# Fonctions utilitaires
# ===============================
apt_silent_update() {
    echo " Mise à jour des paquets..."
    sudo apt update -qq > /dev/null 2>&1
    [ $? -eq 0 ] && echo " apt update OK" || echo " Erreur update"
}

apt_silent_install() {
    local package="$1"
    echo " Installation de $package..."
    sudo apt install -qq -y "$package" > /dev/null 2>&1
    [ $? -eq 0 ] && echo " $package installé" || echo " Erreur sur $package"
}

ask_input() {
    local prompt="$1"
    local input_var
    while [[ -z "$input_var" ]]; do
        read -p "$prompt" input_var
    done
    echo "$input_var"
}

# ===============================
# Ajouter des utilisateurs à un groupe
# ===============================
ajoutegroup() {
    echo -e "${GREEN} Ajouter un utilisateur à un groupe${NC}"
    group=$(ask_input "Nom du groupe : ")
    user=$(ask_input "Nom de l'utilisateur : ")
    sudo usermod -aG "$group" "$user"
    echo -e "${GREEN}Utilisateur ajouté !${NC}"
}

# ===============================
# Installation Net-tools
# ===============================
install_net_tools() {
    echo -e "${GREEN} Installation de net-tools...${NC}"
    apt_silent_update
    apt_silent_install "net-tools"
}

# ===============================
# Installation Samba
# ===============================
install_samba() {
    echo -e "${GREEN} Installation de Samba...${NC}"
    apt_silent_update
    apt_silent_install "samba"

    share_name=$(ask_input "Entrez le nom du partage Samba : ")
    group_name=$(ask_input "Entrez le nom du groupe Samba : ")

    sudo groupadd "$group_name"
    echo -e "${GREEN}Groupe $group_name créé.${NC}"

    while true; do
        user_name=$(ask_input "Entrez un utilisateur à ajouter (ou 'fin' pour terminer) : ")
        if [[ "$user_name" == "fin" ]]; then break; fi
        if ! id -u "$user_name" > /dev/null 2>&1; then
            sudo useradd -m "$user_name"
        fi
        sudo usermod -aG "$group_name" "$user_name"
        sudo smbpasswd -a "$user_name"
        echo -e "${GREEN}$user_name ajouté à Samba.${NC}"
    done

    sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.bak

    cat <<EOL | sudo tee -a /etc/samba/smb.conf

[$share_name]
    path = /srv/samba/$share_name
    valid users = @$group_name
    guest ok = no
    writable = yes
    browseable = yes
    create mask = 0775
    directory mask = 0775
EOL

    sudo mkdir -p /srv/samba/"$share_name"
    sudo chown -R :"$group_name" /srv/samba/"$share_name"
    sudo chmod -R 0775 /srv/samba/"$share_name"
    sudo systemctl restart smbd

    echo -e "${GREEN} Samba configuré avec succès.${NC}"
}

# ===============================
# Installation WireGuard
# ===============================
install_wireguard() {
    echo -e "${GREEN} Installation de WireGuard...${NC}"
    apt_silent_update
    apt_silent_install "wireguard"

    SERVER_PRIVATE_KEY=$(wg genkey)
    SERVER_PUBLIC_KEY=$(echo $SERVER_PRIVATE_KEY | wg pubkey)
    CLIENT_PRIVATE_KEY=$(wg genkey)
    CLIENT_PUBLIC_KEY=$(echo $CLIENT_PRIVATE_KEY | wg pubkey)

    sudo mkdir -p /etc/wireguard

    cat <<EOL | sudo tee /etc/wireguard/wg0.conf
[Interface]
PrivateKey = $SERVER_PRIVATE_KEY
Address = 10.0.0.1/24
ListenPort = 51820
SaveConfig = true

[Peer]
PublicKey = $CLIENT_PUBLIC_KEY
AllowedIPs = 10.0.0.2/32
EOL

    sudo systemctl enable wg-quick@wg0
    sudo systemctl start wg-quick@wg0

    echo -e "${GREEN}WireGuard configuré.${NC}"
}

# ===============================
# Installation Tailscale
# ===============================
install_tailscale() {
    echo -e "${GREEN} Installation de Tailscale...${NC}"
    curl -fsSL https://tailscale.com/install.sh | sh
    sudo tailscale up
    tailscale ip
}

# ===============================
# VSCode
# ===============================
install_vscode() {
    echo -e "${GREEN} Installation de Visual Studio Code...${NC}"
    sudo snap install code --classic
}

# ===============================
# Go
# ===============================
install_go() {
    echo -e "${GREEN} Installation de Go...${NC}"
    apt_silent_update
    apt_silent_install "golang-go"
}

# ===============================
# Node.js + npm
# ===============================
install_node() {
    echo -e "${GREEN} Installation Node.js...${NC}"
    apt_silent_update
    apt_silent_install "nodejs"
    apt_silent_install "npm"
}

# ===============================
# Python
# ===============================
install_python() {
    echo -e "${GREEN} Installation Python...${NC}"
    apt_silent_update
    apt_silent_install "python3"
    apt_silent_install "python3-pip"
}

# ===============================
# React / TS / RN
# ===============================
install_react_ts() {
    echo -e "${GREEN} Installation React / TypeScript / React Native CLI...${NC}"
    sudo npm install -g create-react-app react-native-cli typescript
}

# ===============================
# Installation VirtualBox
# ===============================
install_virtualbox() {
    echo -e "${GREEN} Installation VirtualBox...${NC}"
    apt_silent_update
    apt_silent_install "virtualbox"
}

# ===============================
# Installation Flutter
# ===============================
install_flutter() {
    echo -e "${GREEN} Installation Flutter...${NC}"

    sudo apt install -y curl git unzip xz-utils zip libglu1-mesa > /dev/null 2>&1

    cd ~
    git clone https://github.com/flutter/flutter.git -b stable

    if ! grep -q "flutter/bin" ~/.bashrc; then
        echo 'export PATH="$PATH:$HOME/flutter/bin"' >> ~/.bashrc
    fi

    export PATH="$PATH:$HOME/flutter/bin"

    echo -e "${GREEN}Flutter installé !${NC}"
}

# ===============================
# Création Projet Flutter
# ===============================
creer_projet_flutter() {
    echo -e "${GREEN} Création d'un projet Flutter...${NC}"

    export PATH="$PATH:$HOME/flutter/bin"

    projet=$(ask_input "Nom du projet Flutter : ")
    flutter create "$projet"

    echo -e "${GREEN}Projet Flutter créé dans ~/$projet${NC}"
}




# ===============================
# Installer KiCad
# ===============================

install_kicad() {
    echo -e "${GREEN} Installation KiCad...${NC}"

    apt_silent_update

    sudo add-apt-repository --yes ppa:kicad/kicad-9.0-releases > /dev/null 2>&1
    apt_silent_update

    apt_silent_install kicad
    apt_silent_install kicad-footprints
    apt_silent_install kicad-symbols
    apt_silent_install kicad-packages3d

    echo -e "${GREEN} KiCad installé avec succès${NC}"
}

#============================
#Installer Android Studio
#===========================

install_android_studio() {
    set -e

    ANDROID_STUDIO_URL="https://redirector.gvt1.com/edgedl/android/studio/ide-zips/2024.1.2.12/android-studio-2024.1.2.12-linux.tar.gz"
    INSTALL_DIR="/opt"
    TMP_FILE="/tmp/android-studio.tar.gz"

    echo " Téléchargement d'Android Studio..."
    wget -O "$TMP_FILE" "$ANDROID_STUDIO_URL"

    echo " Extraction dans $INSTALL_DIR..."
    sudo tar -xzf "$TMP_FILE" -C "$INSTALL_DIR"

    echo " Permissions..."
    sudo chown -R $USER:$USER "$INSTALL_DIR/android-studio"

    echo " Création du lanceur..."
    "$INSTALL_DIR/android-studio/bin/studio.sh" &

    echo " Android Studio installé !"
    echo "➡ Lance-le avec : /opt/android-studio/bin/studio.sh"
}

# ===============================
# MENU PRINCIPAL
# ===============================
while true; do
    echo -e "\n${GREEN}=== MENU INSTALLATION SERVEUR ===${NC}"
    echo "1) Installer Samba"
    echo "2) Installer WireGuard"
    echo "3) Installer Net-tools"
    echo "4) Installer Tailscale"
    echo "5) Installer VSCode"
    echo "6) Installer Go"
    echo "7) Installer Node.js"
    echo "8) Installer Python"
    echo "9) Installer React / TypeScript / React Native"
    echo "10) Installer VirtualBox"
    echo "11) Installer Flutter"
    echo "12) Créer un projet Flutter"
    echo "13) Ajouter un utilisateur à un groupe"
    echo "14) Installer Kicad"
    echo "15) Installer Android Studio"
    echo "16)  Quitter"

    read -p "Votre choix [1-15]: " choice

    case $choice in
        1) install_samba ;;
        2) install_wireguard ;;
        3) install_net_tools ;;
        4) install_tailscale ;;
        5) install_vscode ;;
        6) install_go ;;
        7) install_node ;;
        8) install_python ;;
        9) install_react_ts ;;
        10) install_virtualbox ;;
        11) install_flutter ;;
        12) creer_projet_flutter ;;
        13) ajoutegroup ;;
        14) install_kicad;;
	15)install_android_studio;;
	16) echo -e "${RED} Fin du script.${NC}"; exit 0 ;;
        *) echo -e "${RED}Choix invalide.${NC}" ;;
    esac
done
