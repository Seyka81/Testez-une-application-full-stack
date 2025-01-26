# **Yoga - Frontend**

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version **14.1.0**.

## **Installation et Lancement**

### **Étape 1 : Cloner le projet**

Commencez par cloner le dépôt :

```bash
git clone https://github.com/Seyka81/Testez-une-application-full-stack.git
cd front
```

### **Étape 2 : Installer les dépendances**

Une fois dans le dossier `front`, installez les dépendances nécessaires avec :

```bash
npm install
```

### **Étape 3 : Lancer le Frontend**

Pour démarrer le serveur de développement Angular, exécutez :

```bash
npm run start
```

Le projet sera accessible par défaut sur : [http://localhost:4200](http://localhost:4200).

## **Base de Données**

Assurez-vous que le backend et la base de données MySQL sont correctement configurés. Pour plus d'informations, consultez la documentation du backend.

## **Tests**

### **Tests End-to-End (E2E)**

1. **Lancer les tests E2E :**

   Pour exécuter les tests E2E, utilisez la commande suivante :

   ```bash
   npm run e2e
   ```

2. **Générer un rapport de couverture :**

   Avant de générer le rapport de couverture, assurez-vous d'avoir exécuté les tests E2E. Utilisez ensuite cette commande :

   ```bash
   npm run e2e:coverage
   ```

   Le rapport sera disponible ici :

   ```plaintext
   front/coverage/lcov-report/index.html
   ```

### **Tests Unitaires**

1. **Lancer les tests unitaires :**

   Pour exécuter les tests unitaires, utilisez :

   ```bash
   npm run test
   ```

2. **Générer un rapport de couverture :**

   Avant de générer le rapport de couverture, assurez-vous d'avoir exécuté les tests unitaires. Utilisez ensuite cette commande :

   ```bash
   npm run test:coverage
   ```
