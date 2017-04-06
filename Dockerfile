FROM node:6.9.1
RUN mkdir -p /usr/src/dockerapp/webgl-test-ci
WORKDIR /usr/src/dockerapp/webgl-test-ci

ENV DISPLAY :9.0

RUN apt-get update && \
	apt-get install -y \
	libgconf-2-4 \
	libgtk2.0-0 \
	libnss3 \
	libxss1 \
	libx11-xcb1 \
	libxtst6 \
	libgtkextra-dev \
	libasound2 \
	libxtst-dev \
	libxss1 \
	xvfb \
	&& rm -rf /var/lib/apt/lists/*


# Install app dependencies
COPY package.json /usr/src/dockerapp/webgl-test-ci
RUN npm install

# Bundle app source
COPY . .
RUN chmod +x ./docker.sh

EXPOSE 8084
CMD [ "./docker.sh" ]
