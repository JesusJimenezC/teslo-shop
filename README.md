<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

### 1. Clone Project
```bash
git clone
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Clone .env.template and rename it to .env
```bash
cp .env.template .env
```

### 4. Change env variables
```bash
# .env
DB_PASSWORD=password
DB_NAME=teslo
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=teslo
```

### 5. Build DB
```bash
docker-compose up -d
```

### 6. Run Project
```bash
pnpm run start:Dev
```

### 7. Execute SEED
```angular2html
http://localhost:3000/api/seed
```