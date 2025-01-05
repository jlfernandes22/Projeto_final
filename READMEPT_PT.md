# What'sUP

**What'sUP** é uma aplicação de rede social, semelhante a plataformas como Instagram ou X, onde os utilizadores podem criar contas e fazer login. A aplicação permite que os utilizadores partilhem publicações, vejam conteúdos e gerenciem os seus perfis.

## Índice
1. [Funcionalidades](#funcionalidades)
2. [Requisitos](#requisitos)
3. [Instalação](#instalação)
    - [Configurar o XAMPP](#configurar-o-xampp)
    - [Configurar Base de Dados MySQL](#configurar-base-de-dados-mysql-com-o-xampp)
    - [Instalar Dependências](#instalar-dependências)
4. [Executar a Aplicação](#executar-a-aplicação)
5. [Demo](#demo)
6. [Configuração do MySQL](#mysql)
7. [Ficheiros da API](#ficheiros-da-api)
8. [Versão em Inglês](#versão-em-inglês)

## Funcionalidades
- **Criação de Contas**: Os utilizadores podem criar contas e fazer login.
- **Partilha de Publicações**: Os utilizadores podem partilhar publicações.
- **Gestão de Perfis**: Pode alterar o nome de utilizador, palavra-passe e foto de perfil. Também pode ver as suas publicações, seguidores e quem está a seguir.
- **Chats**: NÃO IMPLEMENTADO

## Requisitos
- **XAMPP**: Necessita de XAMPP para configurar um servidor local.
- **Node.js**: Certifique-se de que o Node.js está instalado.
- **Configuração da API**: Configure a API fornecida na sua máquina local para interagir com a base de dados e fornecer dados.

## Instalação

### Configurar o XAMPP
1. Instale o [XAMPP](https://www.apachefriends.org/index.html).
2. Abra o Painel de Controlo do XAMPP e inicie o Apache e o MySQL.
3. Navegue até à pasta de instalação do XAMPP, elimine o conteúdo da pasta `htdocs`, crie uma nova pasta chamada `restapi` e cole os ficheiros da [API](#ficheiros-da-api) nessa nova pasta.

### Configurar Base de Dados MySQL com o XAMPP
Siga as instruções na seção [Configuração do MySQL](#mysql).

### Instalar Dependências
1. Clone o repositório:
    ```bash
    git clone https://github.com/jlfernandes22/Projeto_final.git
    ```
2. Navegue para a pasta do projeto:
    ```bash
    cd Projeto_final
    ```
    ```bash
    cd FrontOffice
    ```
3. Instale as dependências do Node.js:
    ```bash
    npm install
    ```

## Executar a Aplicação
1. Inicie o servidor:
    ```bash
    npm run dev
    ```
2. Abra o navegador e aceda ao link que apareceu no seu terminal. Deve ser algo como: `http://localhost:3000`.

## Demo
![What'sUPScreenshot](Images/screenshot.png)

## MySQL
![MYphpadminScreenshot](Images/XampControlPanel.png)
1. Clique no botão "Admin" ao lado do MySQL.
   ![MYphpadminScreenshot](Images/CreateDataBase.png)
2. Crie uma base de dados chamada "users".
   ![MYphpadminScreenshot](Images/SqlCodesInput.png)
3. Selecione a nova base de dados, cole o código abaixo e pressione "GO":

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    profile_picture MEDIUMTEXT,  -- Para armazenar a string base64 da foto de perfil
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
