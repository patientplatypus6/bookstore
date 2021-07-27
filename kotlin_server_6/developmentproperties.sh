#!/bin/bash

cat << EOF > ./src/main/resources/application.properties

  logging.level.org.springframework.data.r2dbc=DEBUG
  spring.r2dbc.initialization-mode=always
  # spring.r2dbc.url=r2dbc:h2:mem:///pocdb?options=DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
  spring.r2dbc.url=r2dbc:h2:file://././src/main/resources/stargazer;DB_CLOSE_DELAY=-1;USER=username
  # spring.r2dbc.url=r2dbc:h2:file:~/dbname;DB_CLOSE_DELAY=-1;USER=username
  spring.r2dbc.name=sa
  spring.r2dbc.password=
  -Dspring.devtools.restart.enabled=true
  spring.http.multipart.enabled = true
  spring.codec.max-in-memory-size = 50MB
  spring.servlet.multipart.max-file-size = 50MB
  spring.servlet.multipart.max-request-size = 50MB
  spring.web.resources.static-locations[0]=file:src/main/resources/static/
  spring.web.resources.static-locations[1]=classpath:/static/

  spring.datasource.NODE_SERVER_URL=http://localhost
  spring.datasource.NODE_SERVER_PORT=4000

  spring.datasource.REACT_SERVER_URL=http://localhost
  spring.datasource.REACT_SERVER_PORT=3000

  spring.datasource.REACT_CROSSORIGIN=http://localhost:3000

EOF