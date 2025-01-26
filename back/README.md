# Yoga App !

Une API pour la gestion de session de yoga, développée avec **Spring Boot**. Elle prend en charge la gestion des utilisateurs, des séances, et des interactions.

## **Prérequis**

- **Java 1.8**
- **Maven** pas forcément obligatoire car il est souvent intégré par les IDE mais peut être utile
- **Docker Desktop** installé et configuré.

## **Installation et Exécution**

### **Étape 1 : Cloner le projet**

```bash
git clone https://github.com/Seyka81/Testez-une-application-full-stack.git
cd backend
```
### **Étape 2 : Configuration de la base de données avec Docker**

1. Exécutez la commande suivante pour démarrer un conteneur MySQL avec Docker (springbootdb et springuser et secretpassword et rootpassword sont bien évidemment des valeurs par défault):

```bash
docker run -d --name springboot-mysql -e MYSQL_DATABASE=springbootdb -e MYSQL_USER=springuser -e MYSQL_PASSWORD=secretpassword -e MYSQL_ROOT_PASSWORD=rootpassword -p 3306:3306 mysql:latest
```

1. Ouvrez le fichier `src/main/resources/application.properties`.
2. Assurez-vous que les configurations MySQL correspondent aux paramètres du conteneur:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/springbootdb?allowPublicKeyRetrieval=true
spring.datasource.username=springuser
spring.datasource.password=secretpassword
```

### **Étape 3 : Démarrer le backend**

Vous pouvez utiliser plusieurs IDE pour développer et exécuter le projet. **IntelliJ IDEA** simple et efficace ou **Visual Studio Code**.

#### **1. Étapes pour démarrer le projet**

1. **Effectuer un `clean` et un `install` avec Maven** :
    - Ouvrez un terminal dans l'IDE.
    - Exécutez la commande suivante:

    ```bash
    mvn clean install
    ```

### **Étape 4 : Générer les tests** 
    
- Ouvrez un terminal dans l'IDE.
- Exécutez la commande suivante:

```bash
mvn test
```

### **Étape 5 : Consulter le coverage**

- Ouvrir le index.html qui se trouve dans /target/site/jacoco/index.html.


