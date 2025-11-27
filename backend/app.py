from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app, resources={r"/backend/*": {"origins": "http://localhost:5173"}})

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="mrit",
        database="blogdb"
    )


@app.route('/backend/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    conn = get_connection()
    cursor = conn.cursor()

    
    cursor.execute("SELECT id FROM users WHERE email=%s", (email,))
    exists = cursor.fetchone()

    if exists:
        return jsonify({"success": False, "message": "Email already exists"}), 200

    
    hashed_password = generate_password_hash(password)

    cursor.execute(
        "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
        (name, email, hashed_password)
    )
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"success": True, "message": "User registered successfully!"}), 201


@app.route('/backend/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user and check_password_hash(user["password"], password):
        return jsonify({
            "success": True,"user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"]
            }}
        )
    else:
        return jsonify({"success": False, "message": "Invalid credentials"})



@app.route('/backend/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    user_id = data.get("user_id")
    title = data.get("title")
    body = data.get("body")
    image = data.get("image")

    if not title or not body:
        return jsonify({"success": False, "message": "Title and body required"}), 400

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO blogs (user_id, title, body, image) VALUES (%s, %s, %s, %s)",
        (user_id, title, body, image)
    )
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"success": True, "message": "Blog created"}), 201


@app.route('/backend/posts', methods=['GET'])
def fetch_posts():
    user_id = request.args.get("user_id")

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT id, title, body, image FROM blogs WHERE user_id=%s",
        (user_id,)
    )
    posts = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({"success": True, "posts": posts})


@app.route('/backend/post/<int:post_id>', methods=['GET'])
def get_post(post_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM blogs WHERE id=%s", (post_id,))
    post = cursor.fetchone()

    cursor.close()
    conn.close()

    if post:
        return jsonify({"success": True, "post": post})
    else:
        return jsonify({"success": False, "message": "Post not found"}), 404


@app.route('/backend/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM blogs WHERE id=%s", (post_id,))
    conn.commit()
    deleted = cursor.rowcount
    cursor.close()
    conn.close()

    if deleted:
        return jsonify({"success": True, "message": "Post deleted"})
    else:
        return jsonify({"success": False, "message": "Post not found"}), 404

@app.route('/backend/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    data = request.get_json()
    title = data.get("title")
    body = data.get("body")
    image = data.get("image")

    if not title or not body:
        return jsonify({"success": False, "message": "Title and body are required"}), 400

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE blogs SET title=%s, body=%s, image=%s WHERE id=%s",
        (title, body, image, post_id)
    )
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"success": True, "message": "Post updated"})


if __name__ == '__main__':
    app.run(debug=True)
