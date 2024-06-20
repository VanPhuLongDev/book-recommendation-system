# Book recommendation system

Welcome to the Book recommendation system! This repository contains the full stack of a book recommendation and sales system. The project is organized into three main directories:

1. `backend-ai` - A RESTful API for book recommendations using AI models.
2. `BE` - A RESTful API for the book sales system.
3. `FE` - The frontend of the book sales and recommendation system.
Demo: vanphulong.id.vn

## Table of Contents

- [Project Structure](#project-structure)
- [Backend-AI](#backend-ai)
  - [Installation](#installation)
  - [Usage](#usage)
  - [AI Models](#ai-models)
- [BE (Backend)](#be-backend)
  - [Installation](#installation-1)
  - [Usage](#usage-1)
  - [API Endpoints](#api-endpoints)
- [FE (Frontend)](#fe-frontend)
  - [Installation](#installation-2)
  - [Usage](#usage-2)
- [Contributing](#contributing)
- [License](#license)


## Backend-AI

The `backend-ai` directory contains a RESTful API built with Flask. It offers book recommendations using various AI models.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/VanPhuLongDev/book-recommendation-system.git
    cd your-repo/backend-ai
    ```

2. Create and activate a virtual environment:
    ```sh
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

### Usage

1. Start the Flask application:
    ```sh
    flask run
    ```

2. Access the API at `http://127.0.0.1:5000/`.

### AI Models

The API includes three AI models:

1. **Content-Based Recommendation**: Recommends books based on content similarity.
2. **Collaborative Filtering**: Recommends books based on user behavior and preferences.
3. **Embedding-Based Recommendation**: Uses embedding techniques to understand book descriptions and make recommendations.

## BE (Backend)

The `BE` directory contains a RESTful API built with Spring Boot. It is a complete API for a book sales system.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/VanPhuLongDev/book-recommendation-system.git
    cd your-repo/BE
    ```

2. Build the project using Maven:
    ```sh
    mvn clean install
    ```

### Usage

1. Run the Spring Boot application:
    ```sh
    mvn spring-boot:run
    ```

2. Access the API at `http://localhost:8080/`.

### API Endpoints

The API includes endpoints for:

- User registration and login
- Fetching book details
- Pagination
- Managing book inventory
- Order processing

## FE (Frontend)

The `FE` directory contains the frontend of the book sales and recommendation system, built with Angular.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/VanPhuLongDev/book-recommendation-system.git
    cd your-repo/FE
    ```

2. Install the required packages:
    ```sh
    npm install
    ```

### Usage

1. Start the Angular application:
    ```sh
    ng serve
    ```

2. Access the frontend at `http://localhost:4200/`.

## Authors

This project is developed and maintained by:

- **Văn Phú Long** - [GitHub Profile](https://github.com/VanPhuLongDev)
- **Nguyễn Phước Đại Toàn** - [GitHub Profile](https://github.com/NguyenPhuocDaiToan)
- **Nguyễn Quốc Tĩnh** - [GitHub Profile](https://github.com/tinh2406)
- **Nguyễn Đức Duy** - [GitHub Profile](https://github.com/DuyNguyen347)
