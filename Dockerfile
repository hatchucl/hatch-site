# NAME: mbellgb/omnidash

# Use the barebones version of Ruby 2.4.1.
FROM ruby:2.4.2-slim

# Setting environment variables using sane defaults
# These can be overwritten at run time

ENV RAILS_DB_HOSTNAME localhost
ENV RAILS_DB_PORT 5432
ENV RAILS_DB_USER postgres
ENV RAILS_DB_PASS changeme

ENV RAILS_ADMIN_USER_EMAIL admin@example.com
ENV RAILS_ADMIN_USER_FIRSTNAME Admin
ENV RAILS_ADMIN_USER_LASTNAME User
ENV RAILS_ADMIN_USER_PASS changeme

ENV WORK_DIR /dashboard

# Install dependencies:
ADD https://dl.yarnpkg.com/debian/pubkey.gpg /tmp/yarn-pubkey.gpg
RUN apt-key add /tmp/yarn-pubkey.gpg && rm /tmp/yarn-pubkey.gpg
RUN echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -qq -y --no-install-recommends \
  build-essential libpq-dev curl imagemagick
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get update && apt-get install -qq -y --no-install-recommends nodejs yarn
RUN npm install --global yarn

# This sets the context of where commands will be ran
RUN mkdir -p $WORK_DIR
WORKDIR $WORK_DIR

# Use COPY for copying local files
# relative paths are:
# first arg: relative to the path passed to `docker build`
# second arg: relative to WORKDIR
COPY ./Gemfile $WORK_DIR/Gemfile
COPY ./Gemfile.lock $WORK_DIR/Gemfile.lock

RUN bundle install

# Copy the application code
COPY . $WORK_DIR/

COPY ./.env .env

RUN yarn --pure-lockfile

# TODO: Might need fixing
RUN cd $WORK_DIR/client && yarn run build:production
RUN ls

CMD ["sh", "run-prod.sh"]

# Use VOLUME to specify directories where files are changed at runtime
# if the app is down, these should still exist
# eg: /tmp, /log, /uploads ...

# commenting this because I don't know yet what these are
#VOLUME ["/var/upload","/var/logs/omnidash"]

## Build (and tag) this image:
#> docker build -t mbellgb/omnidash-prod .

## Publish to registry (necessary to deploy)
#> docker push mbellgb/omnidash-prod
