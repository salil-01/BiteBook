# Bite Book

![Book Bite App Logo]()

## Description

Bite Book is a full-stack web application that allows users to explore various delicious food items, view their details, and place orders for their favorite dishes. The application is designed to provide a seamless and user-friendly experience for food enthusiasts to discover and order their desired meals.

This project was developed as a learning experience to explore new technology stacks, including Angular, Flask, and Tailwind CSS. As a beginner, I was not familiar with these technologies, but with the help of generative AI and the guidance provided, I was able to learn and implement them effectively within a short period of time.

## Features

- **User Registration and Login**: Users can create an account and log in to access personalized features.

- **Menu Exploration**: Users can browse through a wide variety of dishes available in the menu.

- **Dish Details**: Each dish in the menu has detailed information, including its name, price, and a brief description.

- **Place Orders**: Authenticated users can place orders for their desired dishes.

- **Admin Dashboard**: Admin users have access to an admin dashboard where they can manage the menu, view orders, and perform various administrative tasks.

- **Review and Ratings**: Users can leave reviews and ratings for dishes they have ordered.

## Technologies Used

- **Frontend**: Angular, HTML, ES6, TypeScript

- **Backend**: Flask (Python), Relational DB (MySQL)

- **Styling**: Tailwind CSS, CSS, Angular Material

- **Authentication**: JWT (JSON Web Tokens)

## Deployment

- The BiteBook App is deployed and accessible at [https://bitebook.netlify.app/](https://bitebook.netlify.app/)

## Installation and Setup

1. Install Node.js and npm:

   - Download and install Node.js from the official website: https://nodejs.org/en/download/
   - npm (Node Package Manager) will be installed along with Node.js.

2. Clone the Bite Book App repository:

   ```
   git clone https://github.com/salil-01/BiteBook
   cd BiteBook
   ```

3. Set up the Flask backend:

   - Navigate to the `BitebBook/server` directory:
     ```
     cd server
     ```
   - Create a virtual environment (optional but recommended):
     ```
     python3 -m venv myenv
     source myenv/bin/activate   # On Windows:
     myenv\Scripts\activate      # On Linux / MacOS:
     ```
   - Install Flask and other dependencies:
     ```
     pip install -r requirements.txt
     ```
   - Set up the database and initialize tables (assuming you have PostgreSQL installed):
     ```
     createdb your_database_name
     python manage.py db init
     python manage.py db migrate
     python manage.py db upgrade
     ```
   - Create a `.env` file in the backend directory and add any sensitive data, such as database credentials, API keys, etc.:
     ```
     secretKey = your_secret_key
     port = your_port
     OPENAI_API_KEY = your_openai_api_key
     user_name = your_username(mysql)
     password = your_password(mysql)
     host = your_host(mysql)
     databasename = your_databasename(mysql)
     ```

4. Run the Flask development server:

   ```
   python app.py
   ```

5. Set up the Angular frontend:

   - Navigate to the `BiteBook/client` directory:
     ```
     cd ../client
     ```
   - Install Angular CLI (if not already installed):
     ```
     npm install -g @angular/cli
     ```
   - Install frontend dependencies:
     ```
     npm install
     ```
   - Update the backend URL in `src/environments/environment.ts`:
     ```
     export const environment = {
       production: false,
       backendUrl: 'http://localhost:5000', // Update this URL with your Flask app's URL
     };
     ```
   - Save the file after making changes.

6. Run the Angular app:

   ```
   npm run ng serve
   ```

   - The app should now be accessible at `http://localhost:4200`.

7. Open your browser and navigate to `http://localhost:4200` to see the Bite Book App in action.

## Usage

1. Open your web browser and navigate to `http://localhost:4200` to access the Book Bite App frontend after completing necessary installation
   or you can access it on web at `https://bitebook.netlify.app/`.

3. Register as a new user or log in using your existing credentials.

4. Explore the menu to view the available dishes and their details.

5. Place an order for your favorite dish.

6. If you are an admin user, log in to the admin dashboard to manage the menu and view orders.

## Project Structure

```
.
├── client
│   └── src
│       └── app
│           ├── components
│           ├── services
│           ├── constants
│           ├── guards
│           ├── pages
│           └── routing
└── server
    ├── app.py
    └── requirements.txt
```

## Contribution

If you would like to contribute to the Bite Book App, please follow these steps:

1. Fork the repository from GitHub.

2. Create a new branch for your feature or bug fix.

3. Make your changes and commit them.

4. Push your changes to your forked repository.

5. Create a pull request to the original repository.

## Contact

If you have any questions or suggestions, please feel free to contact us at upsalil.01@gmail.com.

## Screenshots

![Screenshot 1](link-to-your-screenshot-1)

![Screenshot 2](link-to-your-screenshot-2)

