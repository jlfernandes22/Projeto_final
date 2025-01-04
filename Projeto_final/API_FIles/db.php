<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "users";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    error_log("Database connection successful!"); // Log success
} catch (PDOException $e) {
    error_log("Connection failed: " . $e->getMessage()); // Log error
    die("Connection failed: " . $e->getMessage());
}
?>