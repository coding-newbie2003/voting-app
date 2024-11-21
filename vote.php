<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $option = $_POST['option'];
    $topic_id = $_POST['topic_id'];


    $conn = new mysqli('', '', '', '');

    // 接続時にUTF-8を設定
    $conn->set_charset('utf8mb4');

    if ($conn->connect_error) {
        die('Unable to connect to the database. Please try again later.');
    }

    $stmt = $conn->prepare('UPDATE votes SET vote_count = vote_count + 1 WHERE option_name = ? AND topic_id = ?');
    $stmt->bind_param('si', $option, $topic_id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo 'Vote counted successfully.';
    } else {
        echo 'Failed to count the vote.';
    }

    $stmt->close();
    $conn->close();
}
?>
