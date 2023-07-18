import json
import os
import uuid
import jwt
from dotenv import load_dotenv
from flask import Flask, request, jsonify, g
from flask_cors import CORS
import openai
import mysql.connector

# Load environment variables from .env file
load_dotenv()
port = os.getenv("port")
secretKey = os.getenv("secretKey")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
username = os.getenv("user_name")
password = os.getenv("password")
databasename = os.getenv("databasename")
host = os.getenv("host")

# Create Flask application
app = Flask(__name__)
CORS(app, origins='*')
app.config['SECRET_KEY'] = secretKey
app.config['OPENAI_API_KEY'] = OPENAI_API_KEY
app.config['MYSQL_HOST'] = host
app.config['MYSQL_USER'] = username
app.config['MYSQL_PASSWORD'] = password
app.config['MYSQL_DB'] = databasename
# print(username)
# mysql connection
try:
    connection = mysql.connector.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB']
    )
    if connection.is_connected():
        print("Connected to MYSQL")
except mysql.connector.Error as e:
    print(f"Error Connecting to MYSQL {e}")


# ------- utility functions ---------
# generating jwt
def generate_jwt_token(role, email, id):
    payload = {
        'role': role,
        'email': email,
        "id": id
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return token

# checking role before accessing protected routes (auth middleware)


def authenticate_and_authorize():
    def decorator(func):
        def wrapper(*args, **kwargs):
            # Check if Authorization header is present
            if 'Authorization' not in request.headers:
                return jsonify({'message': 'Authorization required'}), 401

            # Get the token from the Authorization header
            token = request.headers['Authorization'].split()[1]

            try:
                # Verify and decode the token
                payload = jwt.decode(
                    token, app.config['SECRET_KEY'], algorithms=['HS256'])

                # Check if the role matches the required role
                if payload['role']:
                    # Perform the protected action
                    # using g module of flask to attach mail to request object
                    g.user_email = payload["email"]
                    g.user_id = payload["id"]
                    print(payload["id"])
                    return func(*args, **kwargs)

                return jsonify({'message': 'Unauthorized access'}), 403

            except jwt.ExpiredSignatureError:
                return jsonify({'message': 'Token has expired'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'message': 'Invalid token'}), 401

        wrapper.__name__ = func.__name__
        return wrapper

    return decorator


# ------------------------ routes ----------------------
# home page
@app.route("/", methods=["GET"])
def home():
    return jsonify({"msg":"You are running BiteBook successfully"})

# user routes
@app.route('/register', methods=['POST'])
def register():
    email = request.json.get('email')
    password = request.json.get('password')
    role = request.json.get('role')

    # connecting with mysql
    cursor = connection.cursor()

    query = "INSERT INTO users ( email, password, role) VALUES (%s, %s, %s)"
    values = (email, password, role)
    cursor.execute(query, values)
    connection.commit()
    cursor.close()
    # connection.close()

    return jsonify({'message': 'User registered successfully'}), 201


@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    # connecting with db
    cursor = connection.cursor()
    query = "SELECT * FROM users WHERE email = %s"
    cursor.execute(query, (email,))
    user_data = cursor.fetchone()
    connection.commit()
    cursor.close()

    if user_data is not None and user_data[2] == password:
        role = user_data[3]
        id = user_data[0]
        token = generate_jwt_token(role, email, id)
        return jsonify({'token': token, 'role': role, 'email': email}), 200

    return jsonify({'message': 'Invalid credentials'}), 401


# non protected routes
@app.route('/chat', methods=['POST'])
def chat():
    # Get the user's message from the request
    user_message = request.json.get("user_message")
    # print(user_message)
    # Get the OpenAI API key from the app config
    openai_api_key = app.config['OPENAI_API_KEY']

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Welcome to the Food App Assistant! How can I assist you with your food-related queries?"},
            {"role": "user", "content": user_message}
        ],
        api_key=openai_api_key
    )

    # Get the response from OpenAI
    bot_response = response.choices[0].message.content

    # Return the bot's response to the client
    return jsonify({'response': bot_response})


#  menu route to show items avaialable to everyone
# does not contains reviews from customer
@app.route('/menu', methods=['GET'])
def get_menu():
    # mysql
    cursor = connection.cursor()
    query = "SELECT * FROM dishes WHERE availability = 'Yes'"
    cursor.execute(query)
    menu_items = []
    for item in cursor.fetchall():
        dish = {
            "id": item[0],
            "name": item[1],
            "price": item[2],
            "availability": item[3],
            "stock": item[4]
        }
        menu_items.append(dish)
    connection.commit()
    cursor.close()

    print(menu_items)
    return jsonify(menu_items), 200

# contains reviews from customer


@app.route('/menu-with-reviews', methods=['GET'])
def get_dishes_with_reviews():

    cursor = connection.cursor()

    # Execute the query to fetch dishes with reviews = > joining tables
    query = '''
        SELECT dishes.id, dishes.name,dishes.availability,dishes.price,dishes.stock, reviews.email,reviews.rating, reviews.review_comment
        FROM dishes
        LEFT JOIN reviews ON dishes.id = reviews.dish_id
        ORDER BY reviews.id DESC
        '''
    cursor.execute(query)
    rows = cursor.fetchall()
    connection.commit()
    cursor.close()
    # print(rows)
    # Group the reviews by dish_id
    dishes = {}
    for row in rows:
        dish_id = row[0]
        if dish_id not in dishes:
            dishes[dish_id] = {
                'id': dish_id,
                'name': row[1],
                'availability': row[2],
                'price': row[3],
                'stock': row[4],
                'reviews': []
            }
        if row[5]:
            dishes[dish_id]['reviews'].append({
                'email': row[5],
                'rating': row[6],
                'review_comment': row[7]
            })

    # Convert the dictionary of dishes to a list
    dishes_list = list(dishes.values())

    # Close the connection

    return jsonify(dishes_list), 200


# multiple order taking facility
@app.route('/place-order', methods=['POST'])
@authenticate_and_authorize()
def place_order():

   # mysql
   # Get data from the request body
    user_email = g.user_email
    user_id = int(g.user_id)
    data = request.json
    item_id = int(data.get('id'))
    quantity = int(data.get('quantity'))

    # Validate the order data
    if not item_id or not quantity:
        return jsonify({'message': 'Invalid order data'}), 400

     # Find the selected food item
    cursor = connection.cursor()
    select_query = "SELECT * FROM dishes WHERE id = %s"
    cursor.execute(select_query, (item_id,))
    food_item = cursor.fetchone()
    # print(food_item)
    if food_item is None:
        cursor.close()
        return jsonify({'message': 'Invalid food item ID'}), 400

    # Check if the food item is available
    if food_item[3] != 'Yes':
        cursor.close()
        return jsonify({'message': 'Food item is not available'}), 400

    # Check if the quantity is greater than the available stock

    if quantity > food_item[4]:
        cursor.close()
        return jsonify({'message': 'Insufficient stock'}), 400

    # Calculate the total price for the current item
    total_price = food_item[2] * quantity

    # Update the stock of the food item
    new_stock = food_item[4] - quantity
    update_query = "UPDATE dishes SET stock = %s, availability = %s WHERE id = %s"
    update_values = (new_stock, 'No' if new_stock == 0 else 'Yes', item_id)
    cursor.execute(update_query, update_values)
    connection.commit()

    # Insert the order into the orders table
    rating = 0
    insert_query = "INSERT INTO orders (email, total_price, status, user_id,item_id,rating) VALUES (%s, %s, %s,%s,%s,%s)"
    insert_values = (user_email, total_price, 'Received',
                     user_id, item_id, rating)
    # print(insert_values)
    cursor.execute(insert_query, insert_values)
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Order placed successfully', 'total_price': total_price}), 200

# protected routes with admin access only
# list of all the items avaialable in inventory


@app.route("/dish", methods=["GET"])
@authenticate_and_authorize()
def get_all_items():

    # mysql
    # Create a cursor object to execute queries
    cursor = connection.cursor()

    # Execute the SELECT query to fetch all items
    cursor.execute("SELECT * FROM dishes")

    # Fetch all rows from the result set
    items = cursor.fetchall()
    connection.commit()
    cursor.close()


    # Convert the list of tuples to a list of dictionaries
    items_list = []
    for item in items:
        item_dict = {
            "id": item[0],
            "name": item[1],
            "price": item[2],
            "availability": item[3],
            "stock": item[4]
        }
        items_list.append(item_dict)

    # Close the cursor and database connection

    # Return the list of items as JSON response
    return jsonify(items_list), 200


# create a food item
@app.route("/dish", methods=["POST"])
@authenticate_and_authorize()
def create_dish():
    data = request.get_json()
    # mysql code
    cursor = connection.cursor()
    query = "INSERT INTO dishes (name, price, availability, stock) VALUES (%s, %s, %s, %s)"
    dish_values = (data['name'], data['price'],
                   data['availability'], data['stock'])
    cursor.execute(query, dish_values)
    connection.commit()
    cursor.close()
    return jsonify({"msg": "Dish Created Successfully"})

# update dish


@app.route('/dish/<dish_id>', methods=['PATCH'])
@authenticate_and_authorize()
def update_dish(dish_id):
    # mysql
    cursor = connection.cursor()
    query = "SELECT * FROM dishes WHERE id = %s"
    cursor.execute(query, (dish_id,))
    dish = cursor.fetchone()

    if not dish:
        cursor.close()
        return jsonify({'message': 'Dish not found'}), 404

    data = request.get_json()
    name = data.get('name', dish[1])
    price = data.get('price', dish[2])
    stock = data.get('stock', dish[4])
    availability = data.get('availability', dish[3])

    # Reset stock to zero if availability is set to "No"
    if availability == 'No':
        stock = 0
    if stock == 0:
        availability = 'No'

    update_query = "UPDATE dishes SET name = %s, price = %s, stock = %s, availability = %s WHERE id = %s"
    update_values = (name, price, stock, availability, dish_id)
    cursor.execute(update_query, update_values)
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Dish updated successfully'}), 200

#  delete dish


@app.route('/dish/<dish_id>', methods=['DELETE'])
@authenticate_and_authorize()
def delete_dish(dish_id):
    # mysql
    cursor = connection.cursor()
    query = "SELECT * FROM dishes WHERE id = %s"
    cursor.execute(query, (dish_id,))
    dish = cursor.fetchone()

    if not dish:
        cursor.close()
        return jsonify({'message': 'Dish not found'}), 404

    delete_review = "DELETE FROM reviews WHERE dish_id = %s"
    cursor.execute(delete_review, (dish_id,))
    connection.commit()
    delete_query = "DELETE FROM dishes WHERE id = %s"
    cursor.execute(delete_query, (dish_id,))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Dish deleted successfully'})


# all orders
@app.route("/orders", methods=["GET"])
@authenticate_and_authorize()
def display_orders():

    # mysql
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM orders")

    # Fetch all rows from the result set
    orders = cursor.fetchall()
    connection.commit()
    cursor.close()
    # print(orders)
    result = []
    for item in orders:
        order_dict = {
            "id": item[0],
            "email": item[1],
            "total_price": item[2],
            "status": item[3],
            "user_id": item[4],
            "item_id": item[5],
            "rating": item[6]
        }
        result.append(order_dict)
    # print(result)
    return jsonify({'orders': result}), 200

# orders of specific user


@app.route('/orders-user', methods=['GET'])
@authenticate_and_authorize()
def get_user_orders():
    # taking user id from g object
    user_id = g.user_id
    cursor = connection.cursor()
    query = "SELECT * FROM orders WHERE user_id = %s"
    cursor.execute(query, (user_id,))
    orders = cursor.fetchall()
    connection.commit()
    cursor.close()
    # print(orders)
    result = []
    for item in orders:
        order_dict = {
            "id": item[0],
            "email": item[1],
            "total_price": item[2],
            "status": item[3],
            "user_id": item[4],
            "item_id": item[5],
            "rating": item[6]
        }
        result.append(order_dict)

    return jsonify({'orders': result}), 200


@app.route("/orders/<order_id>", methods=["PATCH"])
@authenticate_and_authorize()
def update_status(order_id):
    # mysql
    data = request.get_json()
    # print(data)
    # Create a cursor object to execute queries
    cursor = connection.cursor()

    query = "SELECT * FROM orders WHERE id = %s"
    cursor.execute(query, (order_id,))
    order = cursor.fetchone()

    if not order:
        cursor.close()
        return jsonify({'message': 'Order not found'}), 404

    # Update the order status in the database
    cursor.execute("UPDATE orders SET status = %s WHERE id = %s",
                   (data["status"], order_id))

    # Commit the changes to the database
    connection.commit()

    # Close the cursor and database connection
    cursor.close()

    return jsonify({'message': 'Order updated successfully'}), 200

# update the review in orders


@app.route("/orders-user/<order_id>", methods=["PATCH"])
@authenticate_and_authorize()
def update_rating(order_id):
    # mysql
    data = request.get_json()
    # print(data)
    # Create a cursor object to execute queries
    cursor = connection.cursor()

    query = "SELECT * FROM orders WHERE id = %s"
    cursor.execute(query, (order_id,))
    order = cursor.fetchone()

    if not order:
        cursor.close()
        return jsonify({'message': 'Order not found'}), 404

    # Update the order status in the database
    cursor.execute("UPDATE orders SET rating = %s WHERE id = %s",
                   (data["rating"], order_id))

    # Commit the changes to the database
    connection.commit()

    # Close the cursor and database connection
    cursor.close()

    return jsonify({'message': 'Order updated successfully'}), 200


# Endpoint to add a review and rating
@app.route('/reviews', methods=['POST'])
@authenticate_and_authorize()
def add_review():
    user_email = g.user_email
    # Get the review data from the request
    review_data = request.json

    # Extract the relevant fields from the review data
    dish_id = review_data.get('dish_id')
    rating = review_data.get('rating')
    review_comment = review_data.get('review_comment')

    # Validate the required fields
    if not dish_id or not user_email or not rating or not review_comment:
        return jsonify({'message': 'Incomplete review data'}), 400

    try:
        # Create a MySQL connection
        cursor = connection.cursor()

        # Insert the review into the review table
        query = "INSERT INTO reviews (dish_id, email, rating, review_comment) VALUES (%s, %s, %s, %s)"
        values = (dish_id, user_email, rating, review_comment)
        cursor.execute(query, values)

        # Commit the changes and close the connection
        connection.commit()
        cursor.close()

        return jsonify({'message': 'Review added successfully'}), 201

    except mysql.connector.Error as error:
        return jsonify({'message': f'Error adding review: {str(error)}'}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0",port=port or 5000)
