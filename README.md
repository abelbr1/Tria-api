

This is a Nest.js application.

## Running Locally

```bash
git clone <repository-url>
cd <project-directory>
npm install
npm run start:dev
```

The server will start running at http://localhost:3000.

## Running with Docker Compose

Make sure you have Docker and Docker Compose installed on your machine.

```bash
git clone <repository-url>
cd <project-directory>
docker-compose up --build
```

The Nest.js application will be running inside a Docker container, and you can access it at http://localhost:3000.

## Environment Variables

You can configure the application using environment variables. Create a `.env` file in the project root and define your variables there.

Example .env file:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=mydatabase1
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
```

## API Documentation

You can find the API documentation at http://localhost:3000/api when running the application locally.
```