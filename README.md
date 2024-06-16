### Project Information 

- Nextjs: 14.2.3
- Tailwind: 3.4.1
- Zustand: 4.5.2
- Dummy server documentation: https://dummyjson.com/docs 

### File Structure Explanning 

- 📁 `src`
  - 📁 `api`contains functions for getting data from the server
  - 📁 `app` Nextjs app pages
  - 📁 `components` contains components that are used in diffirence pages
  - 📁 `constants` contains variables that are used in the project
  - 📁 `hooks` contains React hooks
  - 📁 `store` contains Zustand store defining 
  - 📁 `utils` contains utility functions

### Run the project

```
COPY .env.example .env
```

#### Production mode
```
npm i
npm run build
npm run start
```

#### Development mode
```
npm run dev
```

### Demo Account 

```
username: emilys
password: emilyspass
```

### Run testing 

#### Run testing 
```
npm run test

npm run test:watch
```

#### Run testing coverage
```
npm run test:coverage
```