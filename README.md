This is the README file for the website of the "Hermann Gmeiner" Vocational School in Tirana, Albania

## About the school

The "Hermann Gmeiner" Vocational School in Tirana, Albania is a vocational school that offers a variety of courses in
different fields. The school is named after Hermann Gmeiner, the founder of the SOS Children's Villages organization.
The school aims to provide high-quality education and training to young people in Albania, helping them to develop the
skills and knowledge they need to succeed in their chosen careers.

## Our mission

Our mission is to provide young people in Albania with the opportunity to gain the skills and knowledge they need to
succeed in their chosen careers. We aim to offer high-quality education and training that is relevant to the needs of
the job market, helping our students to develop the skills and competencies they need to secure employment and build
successful careers.

## About the Project:

- Start it within Docker compose config with:

```bash
docker-compose up --build
```

- And the website will be available at:
```bash
http://localhost:3000/
```

- Create a admin user with the following command:

```bash
docker exec -it <container_id> node /app/db/operations/create-admin-user.js --email=<email> --password=<password> --username=<username>
```

- This will start the next.js project and the postgres database.
- If you want to fork the project and run it locally, you need to have installed Docker.


- To migrate the database, you need to run the following command:

```bash
docker exec -it <container-id> npx drizzle-kit push:pg
```

- To get the container id, you can run:

```bash
docker ps
```

- And you will see the container id of the db container.

## Technologies used:

- Next.js
- Postgres
- Docker
- Drizzle-kit
- Tailwind CSS
- React
- Node.js

## Build with:

- zenn-ui

## Creators:

- zennit

