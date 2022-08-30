# Open-LISA-UI

## Run with docker

Only works for Linux O.S. due to `network_mode` in `docker-compose.yaml` file.

```bash
./start-ui.sh
```

## Run without docker

You need node installed (version specified at `frontend/.nvmrc`).

Go to `frontend` folder:

1. Install dependencies

```bash
yarn
```

2. Start the UI

```bash
yarn start
```

In another therminal go to `web-server` folder and run

```bash
./start.sh
```
