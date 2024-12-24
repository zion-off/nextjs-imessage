# React iMessage Clone

First, setup this [server](https://github.com/zion-off/fastapi-sqlite-server). Clone the repository and run these commands:

```
source .venv/bin/activate
pip install requirements.txt
uvicorn main:app --reload
```

Then start the client (this repository):

```
npm install
npm run dev
```

Navigate to `localhost:3000` and authenticate to send and receive messages.