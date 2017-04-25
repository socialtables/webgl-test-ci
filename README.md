## WebGL-Test-CI
an example of how we run WebGL tests on CI(continuous integration).

CircleCI

[![CircleCI](https://circleci.com/gh/socialtables/webgl-test-ci.svg?style=svg&circle-token=823a8a192f2ef57e987371e7918c5c37a126cedd)](https://circleci.com/gh/socialtables/webgl-test-ci)


TravisCI

[![Build Status](https://travis-ci.com/socialtables/webgl-test-ci.svg?token=ttyGPvHTywxXgN8yBeaM&branch=master)](https://travis-ci.com/socialtables/webgl-test-ci)

One of the pain points for running WebGL test on CI is most CIs don't have GPU support, especially for client side rendering. For server side rendering, we could use [headless-gl](https://github.com/stackgl/headless-gl). The tests we are running here is focus on client side WebGL rendering utilizing image comparison.


#### Enviroments
* Electron

	We use Electron as our client side rendering for WebGL. Since most popular CI tools don’t provide a GPU and WebGL will not work without a GPU by default in Chromium environments, we need to pass **--ignore-gpu-blacklist** to Electron to made sure our WebGL application runs in non-GPU environment.We’ve also found it useful to print logging on the server console using **--enable-logging**, like this.


```
electron test/. --ignore-gpu-blacklist --enable-logging
```

* Docker

	Docker is used to make sure the environment we run the tests in is the same on local and CI.

* CircleCI/TravisCI

	We use CircleCI and TravisCI here as the CI examples. As long as the CI supports Docker, our tests should run fine.

* Webpack

	We use webpack to bundle our test client.


#### Run

``` npm run test ```

Every time we run the test, we will run our test inside Docker, which is same as when we run our test on CI. The images we generate inside Docker will copy out to our local using shared volume.

For image comparison, there are multiple libraries could do that. We use [pixel-compare](https://github.com/tiansijie/pixel-compare) as our image comparison library.
