<?php

include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

cors();

switch ($method) {
    case 'GET':
        handleGet($pdo, $input);
        break;
    case 'POST':
        handlePost($pdo, $input);
        break;
    case 'PUT':
        handlePut($pdo, $input);
        break;
    case 'DELETE':
        handleDelete($pdo, $input);
        break;
    case 'LOGIN':
        handleLogin($pdo, $input);
        break;
    case 'POSTS':
        handlePosts($pdo, $input);
        break;
    case 'FOLLOW':
        handleFollow($pdo, $input);
        break;
    case 'UNFOLLOW':
        handleUnfollow($pdo, $input);
        break;
    case 'GET_FOLLOWERS':
        handleGetFollowers($pdo, $input);
        break;
    case 'GET_FOLLOWED':
        handleGetFollowed($pdo, $input);
        break;
    case 'PROFILE_PICTURE':
        handleProfilePicture($pdo, $input);
        break;
    default:
        echo json_encode(['message' => 'Invalid request method']);
        break;
}

function handleGet($pdo, $input)
{
    if (!isset($input['id'])) {
        // Select both id, name, and profile_picture from users
        $sql = "SELECT id, name, profile_picture FROM users";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    } else {
        // Select id, name, and profile_picture for a specific user by id
        $sql = "SELECT id, name, profile_picture FROM users WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id' => $input['id']]);
    }
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}

function handlePost($pdo, $input)
{
    if (!$input || !isset($input['name']) || !isset($input['pass'])) {
        echo json_encode(['error' => 'Invalid input data']);
        return;
    }

    $checkSql = "SELECT COUNT(*) FROM users WHERE name = :name";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->execute(['name' => $input['name']]);
    $count = $checkStmt->fetchColumn();

    if ($count > 0) {
        echo json_encode(['error' => 'Name is already in use']);
        return;
    }

    $hashedPass = password_hash($input['pass'], PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (name, pass) VALUES (:name, :pass)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['name' => $input['name'], 'pass' => $hashedPass]);
    echo json_encode(['message' => 'User created successfully']);
}

function handlePut($pdo, $input)
{
    // Check if the password is being updated
    if (isset($input['pass']) && !empty($input['pass'])) {
        // Hash the password before updating
        $hashedPass = password_hash($input['pass'], PASSWORD_DEFAULT);
        $input['pass'] = $hashedPass;
    }

    // Prepare the SQL query
    $sql = "UPDATE users SET name = :name, pass = :pass";
    $params = [
        'name' => $input['name'],
        'pass' => $input['pass'],
        'id' => $input['id']
    ];

    // Check if there's a profile picture and handle it
    if (isset($input['profile_picture']) && is_array($input['profile_picture'])) {
        // Extract the first element of the array (the base64 string)
        $profilePicture = $input['profile_picture'][0];

        // Validate the base64 data format
        if (preg_match('/^data:image\/[a-zA-Z]+;base64,/', $profilePicture)) {
            // Store the base64 string directly (no need to JSON encode)
            $params['profile_picture'] = $profilePicture;
            $sql .= ", profile_picture = :profile_picture";
        } else {
            echo json_encode(['error' => 'Invalid profile picture format']);
            return;
        }
    }

    // Add the WHERE clause to the query
    $sql .= " WHERE id = :id";
    
    // Execute the SQL query
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    // Return success message
    echo json_encode(['message' => 'User updated successfully']);
}



function handleDelete($pdo, $input)
{
    $sql = "DELETE FROM users WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $input['id']]);
    echo json_encode(['message' => 'User deleted successfully']);
}

function handleLogin($pdo, $input)
{
    if (!$input || !isset($input['name']) || !isset($input['pass'])) {
        echo json_encode(['error' => 'Missing username or password']);
        return;
    }

    $sql = "SELECT * FROM users WHERE name = :name";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['name' => $input['name']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['error' => 'User not found']);
        return;
    }

    if (password_verify($input['pass'], $user['pass'])) {
        unset($user['pass']);
        echo json_encode(['message' => 'Login successful', 'user' => $user]);
    } else {
        echo json_encode(['error' => 'Invalid username or password']);
    }
}

function handleProfilePicture($pdo, $input)
{
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        // Update profile picture
        if (!isset($input['user_id']) || !isset($input['profile_picture'])) {
            echo json_encode(['error' => 'Invalid input']);
            return;
        }

        $sql = "UPDATE users SET profile_picture = :profile_picture WHERE id = :user_id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'profile_picture' => $input['profile_picture'],
            'user_id' => $input['user_id']
        ]);
        echo json_encode(['message' => 'Profile picture updated successfully']);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Fetch profile picture
        if (!isset($input['user_id'])) {
            echo json_encode(['error' => 'User ID is required']);
            return;
        }

        $sql = "SELECT profile_picture FROM users WHERE id = :user_id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['user_id' => $input['user_id']]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode(['profile_picture' => $result['profile_picture']]);
        } else {
            echo json_encode(['error' => 'User not found']);
        }
    }
}



function handlePosts($pdo, $input)
{
    error_log("Input Data: " . print_r($input, true)); // Log input data

    if ($input['action'] == 'create') {
        if (!isset($input['user_id']) || !isset($input['caption']) || !isset($input['images'])) {
            error_log("Missing required fields for creating a post");
            echo json_encode(['error' => 'Invalid input data']);
            return;
        }

        try {
            // Insert the post
            $sql = "INSERT INTO posts (user_id, caption) VALUES (:user_id, :caption)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(['user_id' => $input['user_id'], 'caption' => $input['caption']]);
            $postId = $pdo->lastInsertId();

            // Insert the images
            foreach ($input['images'] as $imageBase64) {
                $imgSql = "INSERT INTO post_images (post_id, image_base64) VALUES (:post_id, :image_base64)";
                $imgStmt = $pdo->prepare($imgSql);
                $imgStmt->execute(['post_id' => $postId, 'image_base64' => $imageBase64]);
            }

            echo json_encode(['message' => 'Post created successfully', 'post_id' => $postId]);
        } catch (PDOException $e) {
            error_log("Database Error: " . $e->getMessage());
            echo json_encode(['error' => 'Database error']);
        }
    } elseif ($input['action'] == 'fetch') {
        if (!isset($input['user_id'])) {
            error_log("Missing user_id for fetching posts");
            echo json_encode(['error' => 'User ID is required']);
            return;
        }

        try {
            $sql = "SELECT p.id AS post_id, p.caption, p.created_at, pi.image_base64
                    FROM posts p
                    LEFT JOIN post_images pi ON p.id = pi.post_id
                    WHERE p.user_id = :user_id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(['user_id' => $input['user_id']]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Group images by post_id
            $grouped = [];
            foreach ($result as $row) {
                $postId = $row['post_id'];
                if (!isset($grouped[$postId])) {
                    $grouped[$postId] = [
                        'post_id' => $row['post_id'],
                        'caption' => $row['caption'],
                        'created_at' => $row['created_at'],
                        'images' => []
                    ];
                }
                $grouped[$postId]['images'][] = $row['image_base64'];
            }

            echo json_encode(array_values($grouped));
        } catch (PDOException $e) {
            error_log("Database Error: " . $e->getMessage());
            echo json_encode(['error' => 'Database error']);
        }
    }
}

function handleFollow($pdo, $input)
{
    error_log("Input Data in handleFollow: " . print_r($input, true)); // Log input data

    // Validate input data
    if (!isset($input['action']) || $input['action'] !== 'follow') {
        error_log("Invalid or missing action");
        echo json_encode(['error' => 'Invalid action']);
        return;
    }
    if (!isset($input['follower_id']) || !is_numeric($input['follower_id'])) {
        error_log("Invalid or missing follower_id");
        echo json_encode(['error' => 'Invalid follower_id']);
        return;
    }
    if (!isset($input['followed_id']) || !is_numeric($input['followed_id'])) {
        error_log("Invalid or missing followed_id");
        echo json_encode(['error' => 'Invalid followed_id']);
        return;
    }

    try {
        // Check if the follow relationship already exists
        $checkSql = "SELECT COUNT(*) FROM followers WHERE follower_id = :follower_id AND followed_id = :followed_id";
        $checkStmt = $pdo->prepare($checkSql);
        $checkStmt->execute([
            'follower_id' => $input['follower_id'],
            'followed_id' => $input['followed_id']
        ]);
        $count = $checkStmt->fetchColumn();

        if ($count > 0) {
            error_log("Follow relationship already exists");
            echo json_encode(['error' => 'Already following this user']);
            return;
        }

        // Insert the follow relationship
        $sql = "INSERT INTO followers (follower_id, followed_id) VALUES (:follower_id, :followed_id)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'follower_id' => $input['follower_id'],
            'followed_id' => $input['followed_id']
        ]);

        echo json_encode(['message' => 'Followed successfully']);
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        echo json_encode(['error' => 'Database error']);
    }
}

function handleUnfollow($pdo, $input)
{
    if (!isset($input['follower_id']) || !isset($input['followed_id'])) {
        echo json_encode(['error' => 'Missing follower_id or followed_id']);
        return;
    }

    $sql = "DELETE FROM followers WHERE follower_id = :follower_id AND followed_id = :followed_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'follower_id' => $input['follower_id'],
        'followed_id' => $input['followed_id']
    ]);

    echo json_encode(['message' => 'Unfollowed successfully']);
}

function handleGetFollowers($pdo, $input)
{
    if (!isset($input['user_id'])) {
        echo json_encode(['error' => 'Missing user_id']);
        return;
    }

    $sql = "SELECT u.id, u.name
            FROM users u
            JOIN followers f ON u.id = f.follower_id
            WHERE f.followed_id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['user_id' => $input['user_id']]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
}

function handleGetFollowed($pdo, $input)
{
    if (!isset($input['user_id'])) {
        echo json_encode(['error' => 'Missing user_id']);
        return;
    }

    $sql = "SELECT u.id, u.name
            FROM users u
            JOIN followers f ON u.id = f.followed_id
            WHERE f.follower_id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['user_id' => $input['user_id']]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
}

function cors()
{
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, LOGIN, POSTS, FOLLOW, UNFOLLOW, GET_FOLLOWERS, GET_FOLLOWED");
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        exit(0);
    }
}

?>