-- NixDock database schema
-- Intended for a fresh local PostgreSQL database.

-- 1. Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    age INTEGER NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL
);

-- 2. Clients
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    user_id INTEGER NOT NULL,
    email VARCHAR,

    CONSTRAINT clients_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id),

    CONSTRAINT clients_id_user_id_unique
        UNIQUE (id, user_id)
);

-- 3. Projects
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    client_id INTEGER,
    user_id INTEGER NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'Not Started',
    deadline DATE,

    CONSTRAINT projects_status_check
        CHECK (status IN ('Not Started', 'In Progress', 'Completed')),

    CONSTRAINT projects_client_id_fkey
        FOREIGN KEY (client_id) REFERENCES clients(id),

    CONSTRAINT projects_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id),

    CONSTRAINT projects_client_owner_fkey
        FOREIGN KEY (client_id, user_id)
        REFERENCES clients(id, user_id),

    CONSTRAINT projects_id_user_id_unique
        UNIQUE (id, user_id)
);

-- 4. Tasks
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    project_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'To Do',
    deadline DATE NOT NULL,

    CONSTRAINT tasks_status_check
        CHECK (status IN ('To Do', 'In Progress', 'Completed')),

    CONSTRAINT tasks_project_id_fkey
        FOREIGN KEY (project_id) REFERENCES projects(id),

    CONSTRAINT tasks_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id),

    CONSTRAINT tasks_project_owner_fkey
        FOREIGN KEY (project_id, user_id)
        REFERENCES projects(id, user_id)
);

-- 5. Deliverables
CREATE TABLE deliverables (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    project_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT deliverables_project_id_fkey
        FOREIGN KEY (project_id) REFERENCES projects(id),

    CONSTRAINT deliverables_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id),

    CONSTRAINT deliverables_project_owner_fkey
        FOREIGN KEY (project_id, user_id)
        REFERENCES projects(id, user_id)
);
