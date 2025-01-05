# What'sUP

**What'sUP** is a social media web application, similar to platforms like Instagram or X, where users can create accounts, log in. The application allows users to share posts, view content, and manage their profiles.

## Index
1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation](#installation)
    - [Set Up XAMPP](#set-up-xampp)
    - [Set Up MySQL Database](#set-up-mysql-database-with-xampp)
    - [Install Dependencies](#install-dependencies)
4. [Run the Application](#run-the-application)
5. [Demo](#demo)
6. [MySQL Setup](#mysql)
7. [API Files](#api-files)
8. [Portuguese Version](#portuguese-version)

## Features
- **Account Creation**: Users can create their accounts and log in.
- **Post Sharing**: Users can share posts.
- **Profile Management**: You can change your username, password, and profile picture. You can also see your posts, followers, and who you're following.
- **Chats**: NOT IMPLEMENTED

## Requirements
- **XAMPP**: You'll need XAMPP to set up a local server.
- **Node.js**: Make sure Node.js is installed.
- **API Configuration**: Configure the provided API on your local machine to interact with the database and serve data.

## Installation

### Set Up XAMPP
1. Install [XAMPP](https://www.apachefriends.org/index.html).
2. Open the XAMPP Control Panel and start Apache and MySQL.
3. Navigate to your XAMPP installation and delete what's inside the `htdocs` folder. Create a folder inside called `restapi` and paste the [API](#api-files) files into it.

### Set Up MySQL Database with XAMPP
Follow the instructions in the [MySQL section](#mysql).

### Install Dependencies
1. Clone the repository:
    ```bash
    git clone https://github.com/jlfernandes22/Projeto_final.git
    ```
2. Navigate to the project folder:
    ```bash
    cd Projeto_final
    ```
    ```bash
    cd FrontOffice
    ```
3. Install Node.js dependencies:
    ```bash
    npm install
    ```

## Run the Application
1. Start the server:
    ```bash
    npm run dev
    ```
2. Open your browser and go to the link that appeared in your console. It should be something like this: `http://localhost:3000`.

## Demo
![What'sUPScreenshot](Images/screenshot.png)

## MySQL
![MYphpadminScreenshot](Images/XampControlPanel.png)
1. Click the "Admin" button next to MySQL.
   ![MYphpadminScreenshot](Images/CreateDataBase.png)
2. Create a database named "users".
   ![MYphpadminScreenshot](Images/SqlCodesInput.png)
3. Select the new database, paste the code below, and press "GO":

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    profile_picture MEDIUMTEXT,  -- To store the base64 string of the profile picture
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
    image_base64 MEDIUMTEXT,  -- To store the base64-encoded image data
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
    UNIQUE(follower_id, followed_id)  -- Prevent duplicate follow relationships
);
```
## API Files
[users.php](Projeto_final/API_FIles/users.php)
[db.php](Projeto_final/API_FIles/db.php)
