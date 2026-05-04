# TontineChain API - Core Backend

**Inclusion Financiere, IA & Blockchain au Benin | Hackathon MIABE 2026 - Domaine D02**

![TontineChain Architecture](tontinechain_architecture_premium_1777719060614.png)

TontineChain Backend est le moteur central d'orchestration de la plateforme. Il gere l'authentification securisee, l'analyse predictive des risques, l'interfacage avec la blockchain Polygon et l'integration des passerelles de paiement locales.

---

## Architecture Technique

Le backend est construit sur une architecture **Service-Oriented** (SOA) au-dessus de Laravel 12, garantissant une separation stricte des preoccupations et une extensibilite maximale.

### 1. Couche de Services (Core Logic)
- **RiskAnalysisService** : Moteur d'IA (ML-based) qui evalue le score de confiance des membres et predit les risques de defaut de paiement avant chaque cycle.
- **BlockchainService** : Gere les interactions avec les Smart Contracts sur **Polygon PoS**. Utilise des transactions signees via un relayer pour offrir une experience sans frais de gaz (Gasless) aux utilisateurs.
- **PaymentService** : Integration de l'API **FedaPay** pour la gestion des flux Mobile Money (MTN, Moov).
- **NotificationService** : Orchestre les alertes multi-canaux (SMS & WhatsApp via **Infobip**) pour les OTP et les rappels de cotisation.

### 2. Couche de Persistance
- **SQL** : SQLite (Developpement) / PostgreSQL (Production) pour les donnees structurees.
- **Blockchain** : Stockage immuable des preuves de paiement et des etats des cycles de tontine.

### 3. Securite & Authentification
- **Sanctum** : Gestion des tokens API pour le frontend.
- **OTP Login** : Authentification a deux facteurs native via SMS/WhatsApp pour une securite adaptee au contexte local.

---

## Stack Technologique

- **Framework** : Laravel 12 (PHP 8.2+)
- **Smart Contracts** : Solidity (Deployes sur Polygon)
- **Paiements** : FedaPay SDK
- **Communications** : Infobip API (WhatsApp Business & SMS)
- **Documentation** : Swagger / L5-Swagger

---

## Installation & Configuration

### Pre-requis
- PHP 8.2+
- Composer
- SQLite (ou un serveur PostgreSQL)

### Etapes d'installation

1. **Cloner le projet** :
   ```bash
   git clone [url-du-repo]
   cd TonnineBenin
   ```

2. **Installer les dependances** :
   ```bash
   composer install
   ```

3. **Configuration de l'environnement** :
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Note : Configurez vos cles Infobip, FedaPay et vos credentials Polygon dans le `.env`.*

4. **Migration et Seed** (Base de donnees) :
   ```bash
   php artisan migrate --seed
   ```

5. **Lancer le serveur de developpement** :
   ```bash
   php artisan serve --port=8000
   ```

---

## Documentation API
La documentation complete des endpoints (Swagger) est accessible une fois le serveur lance a l'adresse suivante :
`http://localhost:8000/api/documentation`

---

## Analyse IA & Blockchain
Le systeme integre nativement :
- **Proof of Payout** : Chaque ramassage est verifie par un contrat intelligent.
- **Dynamic Trust Scoring** : Un algorithme qui ajuste le score de confiance des utilisateurs en temps reel selon leur comportement transactionnel.

---

## Licence
Projet developpe dans le cadre du **Hackathon MIABE 2026**.
Domaine : D02 - Inclusion Financiere.
