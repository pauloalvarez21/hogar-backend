# hogar-backend

API de backend construida con [NestJS](https://nestjs.com/) (TypeScript) y base de datos SQLite a través de TypeORM. Incluye autenticación JWT (registro, login y protección de rutas por estrategia de Passport) y un ejemplo mínimo de ruta principal.

## Características

- NestJS 11 con TypeScript.
- Autenticación JWT con Passport: register y login bajo `/auth`.
- Base de datos SQLite (TypeORM + `better-sqlite3`) con sincronización automática de entidades.
- Configuración de entornos mediante `dotenv` y `ConfigModule`.
- Scripts de build, lint, formateo e tests.

## Prerrequisitos

- Node.js (establecido en la configuración del proyecto).
- `pnpm` como gestor de paquetes.

## Configuración

1. Clonar el repositorio y posicionarse en la carpeta raíz.
2. Crear el archivo `.env` en la raíz (no se incluye en el repositorio por estar en `.gitignore`):

   ```dotenv
   JWT_SECRET=una-secreta-super-segura
   PORT=3000
   ```

   Si no se define `JWT_SECRET`, la aplicación usa `dev-secret-no-leer` como fallback.

3. Instalar dependencias:

   ```bash
   pnpm install
   ```

## Compilar y ejecutar

```bash
# desarrollo con Watch mode
pnpm run start:dev

# modo producción
pnpm run start:prod
```

### Scripts disponibles

```bash
pnpm run build     # Compila el proyecto
pnpm run start     # Ejecuta la compilación en modo production
pnpm run start:dev # Ejecuta en modo desarrollo con Watch
pnpm run start:debug
pnpm run lint      # Lint con ESLint
pnpm run format    # Formateo con Prettier
pnpm test          # Unit tests
pnpm test:watch    # Unit tests en modo watch
pnpm test:cov      # Unit tests con cobertura
pnpm test:e2e      # Tests de extremo a extremo
```

## Arquitectura

```text
src/
  app.module.ts
  main.ts
  app.controller.ts
  app.service.ts
  auth/
    auth.module.ts
    auth.controller.ts
    auth.service.ts
    jwt.config.ts
    strategies/jwt.strategy.ts
    dto/
      create-user.dto.ts
      login-user.dto.ts
    entities/user.entity.ts
    interfaces/jwt-payload.interface.ts
    logger.ts
```

### Módulo `AuthModule`

- Controlador: `AuthController` (rutas `/auth`).
- Servicios: `AuthService`, `JwtConfigService`, `JwtStrategy`.
- Dependencias: `ConfigModule`, `TypeOrmModule`, `PassportModule`, `JwtModule`.
- Exporta `TypeOrmModule`, `JwtStrategy`, `PassportModule` y `JwtModule`.

### Autenticación

- Registro: `POST /auth/register`.
- Login: `POST /auth/login`.
- Protección de rutas: estrategia JWT de Passport mediante `ExtractJwt.fromAuthHeaderAsBearerToken()` en `JwtStrategy`.

### Dto de usuario

- `CreateUserDto`
  - `name: string` (obligatorio)
  - `password: string` (obligatorio)
- `LoginUserDto`
  - `name: string` (obligatorio)
  - `password: string` (obligatorio)

### Entidad `User`

| Campo    | Tipo     | Notas                                           |
| -------- | -------- | ----------------------------------------------- |
| `id`     | `string` | UUID generado.                                  |
| `name`   | `text`   | Único.                                          |
| `password` | `text` | No se selecciona por defecto (`select: false`). |
| `isActive` | `boolean` | Por defecto `true`.                            |
| `roles`  | `text[]` | Por defecto `['user']`.                         |

### Base de datos

- Tipo: `better-sqlite3`.
- Ruta del archivo: `./data/db.sqlite`.
- `synchronize: true` (se genera/actualiza el esquema automáticamente).
- La carpeta `data/` debe existir para guardar `db.sqlite`.

El archivo `data/.gitkeep` actúa de marcador para mantener la carpeta en control de versiones.

## Configuración del entorno

El bootstrap de `main.ts` carga `.env`, o `.env.production` en modo producción:

```ts
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
config({ path: envFile, override: true });
```

La aplicación escucha en el puerto indicado por `PORT` o `3000` por defecto.

## Despliegue

El proyecto está preparado para compilar con el script `build` del `package.json`.

```bash
pnpm run build
pnpm run start:prod
```

Pásate al directorio `dist` y ejecuta `node main` para el modo producción.

## Recursos y apoyo

- Documentación de NestJS: https://docs.nestjs.com
- Discord de NestJS: https://discord.gg/G7Qnnhy
- Courses oficiales: https://courses.nestjs.com
- Plataformas cloud compatibles con NestJS: https://mau.nestjs.com

## Licencia

NestJS está licenciada bajo la licencia MIT.
