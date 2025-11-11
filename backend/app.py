from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow frontend at localhost:3000

def get_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='mrit',
        database='blogdb'
    )

@app.route('/tables', methods=['GET'])
def showtables():
    con = get_connection()  
    cursor = con.cursor()
    cursor.execute("SHOW TABLES;")
    tables = cursor.fetchall()
    cursor.close()
    con.close()
    table_names = [table[0] for table in tables]
    return jsonify({"tables": table_names}), 200


@app.route('/backend/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    con = get_connection()
    cursor = con.cursor()
    query = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
    values = (username, email, password)
    cursor.execute(query, values)
    con.commit()

    cursor.close()
    con.close()

    return jsonify({"message": "User registered successfully!"}), 201


if __name__ == "__main__":
    print("connecting to DB")
    app.run(debug=True)
