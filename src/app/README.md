## Backend (Application Server)
## Deep-Read API
- Run `./setup.sh` to set up and run the flask server.
- The flask server can also be run using `./app.py` in venv
- Transcripts and other data are stored in configurable repositories(in-memory or mongodb are available as of now).
    - In-memory storage is used by default but is supposed to be used for for testing.
    - MongoDB can be used by setting `REPOSITORY_NAME` as 'mongodb' in settings.py or as an environment variable(preferred).
    - `MONGODB_HOST` should also be set using the cluster connection string from Atlas.
    - `MONGODB_DATABASE` and `MONGODB_COLLECTION` can also be set accordingly.
    
## For using MongoDB    
     export REPOSITORY_NAME="mongodb"
     export MONGODB_HOST="<connection_string>"
