# What'sUP

**What'sUP** é uma aplicação web de redes sociais, semelhante a plataformas como Instagram ou X, onde os utilizadores podem criar contas, fazer login, partilhar publicações, visualizar conteúdos e gerir os seus perfis.

## Funcionalidades:
- **Criação de Conta**: Os utilizadores podem criar contas e fazer login.
- **Partilha de Publicações**: Permite aos utilizadores partilhar publicações.
- **Gestão de Perfil**: Possibilidade de alterar o nome de utilizador, palavra-passe e foto de perfil, bem como visualizar as suas publicações, seguidores e quem está a seguir.
- **Chats**: NÃO IMPLEMENTADO.

## Requisitos:
- **XAMPP**: É necessário o XAMPP para configurar um servidor local.
- **Node.js**: Certifique-se de que o Node.js está instalado.
- **Configuração da API**: Configure a API fornecida na sua máquina local para interagir com a base de dados e fornecer dados.

## Instalação:

1. **Configurar o XAMPP**:
   - Instale o [XAMPP](https://www.apachefriends.org/index.html).
   - Abra o Painel de Controlo do XAMPP e inicie o Apache e MySQL.
   - Navegue até à pasta de instalação do XAMPP, elimine o conteúdo da pasta "htdocs", crie uma nova pasta chamada "restapi" e coloque os ficheiros da [API](#ficheiros-da-api) dentro dessa nova pasta.
     
2. **Configurar a Base de Dados MySQL no XAMPP**:
   - Consulte a secção [MySQL](#mysql).

3. **Instalar Dependências**:
   - Clone o repositório:
     ```bash
     git clone https://github.com/jlfernandes22/Projeto_final.git
     ```
   - Navegue até à pasta do projeto:
     ```bash
     cd Projeto_final
     ```
     ```bash
     cd FrontOffice
     ```
   - Instale as dependências do Node.js:
     ```bash
     npm install
     ```
   
4. **Executar a Aplicação**:
   - Inicie o servidor:
     ```bash
     npm run dev
     ```
   - Abra o seu navegador e aceda ao link que aparece no seu terminal, algo como `http://localhost:3000`.

## Demonstração

![Captura de Ecrã do What'sUP](Images/screenshot.png)

## MySQL
![Captura de Ecrã do Painel de Controlo do XAMPP](Images/XampControlPanel.png)
- Clique no botão "Admin" ao lado de MySQL.
![Captura de Ecrã do phpMyAdmin](Images/CreateDataBase.png)
- Crie uma nova base de dados com o nome "users".
![Captura de Ecrã do phpMyAdmin](Images/SqlCodesInput.png)
- Seleccione a nova base de dados criada, cole o código abaixo e pressione "GO".
  
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    profile_picture MEDIUMTEXT,  -- Para armazenar a string em base64 da foto de perfil
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE post_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    image_base64 MEDIUMTEXT,  -- Para armazenar os dados da imagem codificados em base64
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);
CREATE TABLE followers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT NOT NULL,
    followed_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(follower_id, followed_id)  -- Prevenir relações de seguimento duplicadas
);
```

## Ficheiros da API
[users.php](Projeto_final/API_FIles/users.php)  
[db.php](Projeto_final/API_FIles/db.php)
