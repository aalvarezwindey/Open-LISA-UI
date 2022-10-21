# Open-LISA-UI

This repository is part of [Open LISA project](https://github.com/open-lisa):
* [Open LISA Server](https://github.com/open-lisa/Open-LISA-Server)
* [Open LISA SDK](https://github.com/open-lisa/Open-LISA-SDK)
* [Open LISA UI](https://github.com/open-lisa/Open-LISA-UI)

This UI provides an interface to administrate an [Open LISA Server](https://github.com/aalvarezwindey/Open-LISA-Server).

## Dependencies

- Node v16.13 (we suggest using [nvm](https://github.com/nvm-sh/nvm))
- Python 3
- You need [Open LISA Server](https://github.com/open-lisa/Open-LISA-Server) up and running (with SERIAL or TCP configuration)

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

## Manual

Check the [MANUAL](./docs/MANUAL.md) and learn how to use Open LISA UI
