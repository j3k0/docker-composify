# docker-composify

> Generate a docker-compose.yml file from an existing docker container.

Internally, use information exposed by `docker inspect` and format this as compose file.

### Installation

git clone this repo.

### Usage

```sh
docker inspect container1 container2 | node index.js > docker-compose.yml
```

### Limitations

The tool currently exports only a very limited set of data:

 - container name
 - image name
 - command and entrypoint
 - port definitions
 - environment variables

For more advanced use cases, PRs are welcome!

### License

GPL v2
