# Cache block traces

## Requisites

- mongodb > 4
- node >= 10.16.0

## Install

```shell

git clone https://github.com/rsksmart/rsk-explorer-api.git --branch traceCache
cd rsk-explorer-api
npm install

```

## Create config

```shell
cp config-example.json config.json
```

Edit config.json and replace 'source' to add nodes

```json
  "source": [
    {
      "url":"http://[RSKJ-NODE_1-IP:PORT]"
    },
    {
      "url":"http://[RSKJ-NODE_2-IP:PORT]"
    },
        {
      "url":"http://[RSKJ-NODE_3-IP:PORT]"
    }
  ]
```

## Start

```shell
pm2 start dist/tools/cacheBlocksTraces.js
```

## Monitoring

 ```shell
 node dist/tools/showBlocksTraces.js [time-in-ms]
 ```
