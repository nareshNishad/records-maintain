from flask import Flask, request, jsonify, send_from_directory, Response
import sqlite3
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__, static_folder='../frontend/build/')
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

@app.route('/', methods=['GET'])
def working():
    return jsonify(message="Simple server is running")


@app.route('/api/getTasks', methods=['GET','OPTIONS'])
@cross_origin(origin='*')
def getTasks():
    # Connect to the database
    con = sqlite3.connect('database/database.db')
    cur = con.cursor()
    # Extract all tasks
    cur.execute("SELECT * FROM students")
    listOfTuples = cur.fetchall()
    con.close()
    students = []
    for tup in listOfTuples:
        students.append({
    'id': tup[0],        
    'roll_No' : tup[1],
    'name' : tup[2],
    'math_Marks' : tup[3],
    'physics_Marks' : tup[4],
    'chemistry_Marks' : tup[5],
    'total_Marks' : tup[6],
    'percentage_Marks'  : tup[7],
     })
    return jsonify({'students': students})


@app.route('/api/addTask', methods=['POST','OPTIONS'])
@cross_origin(origin='*')
def addTask():
    # Collect the description
    roll_No = request.get_json()['roll_no']
    name = request.get_json()['name']
    math_Marks = request.get_json()['math_marks']
    physics_Marks = request.get_json()['physics_marks']
    chemistry_Marks = request.get_json()['chemistry_marks']
    total_Marks = request.get_json()['total_marks']
    percentage = request.get_json()['percentage']
    # Add new task to database
    con = sqlite3.connect('database/database.db')
    cur = con.cursor()
    cur.execute("INSERT INTO students ('roll_No', 'name' ,'math_Marks' ,'physics_Marks' ,'chemistry_Marks' ,'total_Marks' ,'percentage') VALUES (?,?,?,?,?,?,?)",(roll_No, name ,math_Marks ,physics_Marks ,chemistry_Marks ,total_Marks ,percentage))
    con.commit()
    con.close()
    return jsonify({'result': 'New score added'})


if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)
