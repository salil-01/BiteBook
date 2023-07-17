import pytest
import json
from app import app
import mysql.connector
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify

load_dotenv()
username = os.getenv("user_name")
password = os.getenv("password")
databasename = os.getenv("databasename")

app.config['MYSQL_USER'] = username
app.config['MYSQL_PASSWORD'] = password
app.config['MYSQL_DB'] = databasename

# utilities
# fixtures


@pytest.fixture(autouse=True)
def client():
    app.config['TESTING'] = True

    connection = mysql.connector.connect(
        host='localhost',
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB']
    )

    with app.test_client() as client:
        yield client

    # Close the connection
    connection.close()

# interacting with db


def check_database(id):
    # Set up your MySQL database connection
    connection = mysql.connector.connect(
        host='localhost',
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB']
    )

    cursor = connection.cursor()

    # Execute the query to retrieve the inserted item
    query = "SELECT * FROM dishes WHERE id = %s"
    cursor.execute(query, (id,))
    created_item = cursor.fetchone()

    # Close the cursor and connection
    cursor.close()
    connection.close()

    return created_item


def check_database_by_name(item_data):
    # Set up your MySQL database connection
    connection = mysql.connector.connect(
        host='localhost',
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB']
    )

    cursor = connection.cursor()

    # Execute the query to retrieve the inserted item
    query = "SELECT * FROM dishes WHERE name = %s"
    cursor.execute(query, (item_data['name'],))
    created_item = cursor.fetchone()

    # Close the cursor and connection
    cursor.close()
    connection.close()

    return created_item
# menu route


def test_get_menu(client):
    response = client.get("/menu")
    data = response.get_json()
    assert response.status_code == 200
    # checking for random items if they are present in response
    assert any(item['name'] == 'Pizza' for item in data)
    assert any(item['name'] == 'Limca' for item in data)

# order placing


def test_place_order(client):
    payload = {
        "id": 1,
        "quantity": 1
    }

    # can be replaced with updated jwt
    jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJlbWFpbCI6Im11bm51QG1haWwiLCJpZCI6Mn0.KRCmP3B3ZrZuhE-zTMFgZ6MuKn3YErq_Bof49WbyhWo"

    # Set the JWT in the request headers
    headers = {
        'Authorization': f'Bearer {jwt}'
    }

    # making request
    response = client.post("/place-order", json=payload, headers=headers)
    data = response.get_json()

    # tests
    assert response.status_code == 200
    assert "message" in data
    assert data["message"] == "Order placed successfully"
    assert "total_price" in data
    assert data["total_price"] == 40


def test_create_dish(client):
    payload = {
        "name": "Sandwich",
        "price": 60,
        "availability": "Yes",
        "stock": 10
    }

    # can be replaced with updated jwt
    jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJlbWFpbCI6Im11bm51QG1haWwiLCJpZCI6Mn0.KRCmP3B3ZrZuhE-zTMFgZ6MuKn3YErq_Bof49WbyhWo"

    # Set the JWT in the request headers
    headers = {
        'Authorization': f'Bearer {jwt}'
    }

    # making request
    response = client.post("/dish", json=payload, headers=headers)
    data = response.get_json()

    # tests
    assert response.status_code == 200

    # Check the database for the created item
    created_item = check_database_by_name(payload)

    # Perform assertions on the created item
    assert created_item is not None
    assert created_item[1] == payload['name']
    assert created_item[2] == payload['price']
    assert created_item[3] == payload['availability']
    assert created_item[4] == payload['stock']


def test_update_dish(client):
    payload = {
        "price": 100,
        "stock": 20
    }

    # can be replaced with updated jwt
    jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJlbWFpbCI6Im11bm51QG1haWwiLCJpZCI6Mn0.KRCmP3B3ZrZuhE-zTMFgZ6MuKn3YErq_Bof49WbyhWo"

    # Set the JWT in the request headers
    headers = {
        'Authorization': f'Bearer {jwt}'
    }

    # making request
    response = client.patch("/dish/21", json=payload, headers=headers)
    data = response.get_json()

    # tests
    assert response.status_code == 200

    # Check the database for the created item
    created_item = check_database(21)

    # Perform assertions on the created item
    assert created_item is not None
    assert created_item[2] == payload['price']
    assert created_item[4] == payload['stock']


def test_delete_dish(client):
    # can be replaced with updated jwt
    jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJlbWFpbCI6Im11bm51QG1haWwiLCJpZCI6Mn0.KRCmP3B3ZrZuhE-zTMFgZ6MuKn3YErq_Bof49WbyhWo"

    # Set the JWT in the request headers
    headers = {
        'Authorization': f'Bearer {jwt}'
    }

    # making request
    response = client.delete("/dish/3", headers=headers)
    data = response.get_json()

    # tests
    assert response.status_code == 200

    # Check the database for the created item
    created_item = check_database(3)

    # Perform assertions on the created item
    assert created_item is None


def test_get_orders(client):

    jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJlbWFpbCI6Im11bm51QG1haWwiLCJpZCI6Mn0.KRCmP3B3ZrZuhE-zTMFgZ6MuKn3YErq_Bof49WbyhWo"

    # Set the JWT in the request headers
    headers = {
        'Authorization': f'Bearer {jwt}'
    }

    # making request
    response = client.get("/orders", headers=headers)
    data = response.get_json()

    assert response.status_code == 200
    # checking for random items if they are present in response
    assert any(item['email'] == "munnu@mail" for item in data["orders"])
    assert any(item['email'] == "chunnu@mail" for item in data["orders"])
