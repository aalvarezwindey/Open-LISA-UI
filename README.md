# Open-LISA-UI

## Dependencies

- Node v16.13 (we suggest using [nvm](https://github.com/nvm-sh/nvm))
- Python 3

## Run project

You need node installed (version specified at `frontend/.nvmrc`).

### Web server

Go to `web-server` folder and run

```bash
./start.sh
```

The web server will be running in http://localhost:5000

### UI

Go to `frontend` folder:

1. Install dependencies

```bash
yarn
```

or

```bash
npm install
```

2. Start the UI

```bash
yarn start
```

or

```bash
npm run start
```

The UI will be running in http://localhost:3000, access it through your browser.

## Run with docker (Linux only)

Only works for Linux O.S. due to `network_mode` in `docker-compose.yaml` file.

```bash
./start-ui.sh
```
