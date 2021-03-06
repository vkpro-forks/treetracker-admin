# Treetracker Admin Panel

This portion of the project is to process tree data. Treetracker's Admin Panel Frontend and RESTful API built with loopback.

See [Wiki](https://github.com/Greenstand/treetracker-admin-api/wiki) for more info on goals

Please add any missing content to this readme.

## Development Environment Quick Start

We support both front end and backend development in this repository currently.  Depending on which part of the admin panel you are contributing too, you have different options for setting up development.  

There are three options for setting up your development environment:
1. For frontend work only
   1. Skip installing and running the API locally
2. For backend work only
   1. Skip installing and running the frontend locally
   1. Use our development database credentials (available via team leads in slack)
3. As a completely local development environment
   1. Install postgres and postgis locally, install a database seed, and run database migrations
   1. Install and run the backend API, configured to use your local database
   1. Install and run the frontend, configured to user you local backend API

### Step 1: Install git

See https://git-scm.com/downloads for instructions.

### Step 2: Install Node.js

_Node.js version 12.x works best for now; later versions have exhibited some strange behaviour with this project.
If you encounter issues with the server, check your version of Node.js first._

We recommend using [nvm](https://github.com/nvm-sh/nvm) to install and manage your Node.js instances.  More details here: https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/
1. Install nvm: curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash
2. nvm install 12.20.0
3. nvm use 12.20.0

Alternatively, you can install Node.js directly from https://nodejs.org/dist/latest-v12.x/

_On MacOS, you can alleviate the need to run as sudo by using nvm or by [following John Papa's instructions](http://jpapa.me/nomoresudo)._

### Step 3: Fork and clone this repository

1. Click _Fork_ on this GitHub repo and follow the steps to fork the repo to your account
1. Open terminal
1. Go to a folder where you would like to install the project. Then type the following, replacing `<username>` with your GitHub username:

```
git clone https://github.com/<username>/treetracker-admin.git
```

Add Greenstand as a remote:
```
git remote add upstream https://github.com/Greenstand/treetracker-admin
```

### Step 4: Get configuration files

_Only required for backend/API development_

1. Get the server dev env file pinned to the #admin_panel_chat channel in Greenstand Slack: `.env.development` (Note that the leading `.` may be removed if you download the file from Slack, so you'll need to rename it)
1. Copy the file to the `./server` directory within your local repo
1. Add a `.env.local` file in the `./client` directory containing the following line:
```
REACT_APP_API_ROOT=http://localhost:3000
```

### Step 5: Install npm dependencies

```
npm install
```

### Step 6: Start server

Normally, to start server:

```
cd server
npm start
```

### Step 7: Start client

```
cd client
npm start
```

### Step 8: Start developing!

## Commit Message and PR Title Format

We use automatic semantic versioning, which looks at commit messages to determine how to increment the version number for deployment.

Your commit messages will need to follow the [Conventional Commits](https://www.conventionalcommits.org/) format, for example:
```
feat: add new button
```
Since we squash commits on merging PRs into `master`, this applies to PR titles as well.

## Keeping Your Fork in Sync

Your forked repo won't automatically stay in sync with Greenstand, so you'll need to occassionally sync manually (typically before starting work on a new feature).
```
git pull upstream master --rebase
git push origin master
```
You might also need to sync and merge `master` into your feature branch before submitting a PR to resolve any conflicts.
```
git checkout <feature_branch>
git merge master
```

## Advanced local development using docker

For developers familiar with docker, we offer a dockerized setup for local development.

To run docker on a local machine, you will have to install Docker first.
Docker is a linux container technology, so running it on Mac or Windows requires an application with an attached linux VM.
Docker provides one for each OS by default.

### Mac

Install Docker for Mac using homebrew, using the following command

```
$ brew cask install docker
```

You can alternatively install Docker via: [Docker for Mac](https://docs.docker.com/docker-for-mac/install/)

Once Docker is installed, lauch Docker from the Applications GUI.

### Windows

For most versions of Windows: [Docker for Windows](https://docs.docker.com/docker-for-windows/install/)

For some older versions or Win10 Home: [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/).
At least on one machine, to get this to work, when you get to the step to do QuickStart terminal script, instead, run:

```
docker-machine create default --virtualbox-no-vtx-check
```

then re-run the QuickStart terminal script.

> If you use Docker Toolbox, check the IP address in the output of the QuickStart terminal script.
> You will use this IP address later instead of `localhost`.

### Linux

To install on linux, you can run
`sudo apt-get install -y docker-ce`
but there is [additional setup](https://docs.docker.com/install/linux/docker-ce/ubuntu/#set-up-the-repository) to verify keys, etc.

### Install, build docker containers and go

Run the setup script. This script installs node modules, builds docker containers, and starts them

```
./dev/scripts/setup.sh
```

You can now view the Treetracker Admin Panel at http://localhost:8080.

> Note: If you try to access the site on port 3001 you will recieve a CORS error

> Note: If you used Docker Toolbox, you may need to use the IP address it reported, such as http://192.168.99.100:8080_

It may take a few seconds for the web and api servers to come up. You can monitor them using the docker logs commands as:

```
docker logs -f treetracker-admin-web
docker logs -f treetracker-admin-api
```

Also see [Scripts](#scripts) below

The REST API documentation can be viewed and explored by visiting http://localhost:3000/api/explorer

To stop the dev environment use

```
./dev/scripts/down.sh
```

To start the dev environment back up use

```
./dev/scripts/up.sh
```

Just edit as you normally would to view changes in your development environment.

### Alternative setup for MS Windows (Works on Linux and Mac also)

On Windows the easiest way to develop and debug Node.js applications is using Visual Studio Code.
It comes with Node.js support out of the box.

https://code.visualstudio.com/docs

### Still can not figure it out?

Here is our [wiki page for troubleshooting](https://github.com/Greenstand/treetracker-admin/wiki/Set-Up-Issues), take a look.

Help us to improve it by adding your experience solving this problem.



#### View the Treetracker Admin Panel

Visit http://localhost:3001

## Quick Start For API only development

Run the following command to start the REST API.

```
$ npm run start
```

Run the following command to run the linter.

```
$ npm run lint
```

## Login

Since version 2.3.0, we added user/login system to admin panel, so you need use an account to login the system. The default administrator account is: username: admin, password: admin.

### Scripts

Useful scripts are contained in /dev/scripts. Their uses are described here. Scripts are run from the repository root as /dev/scripts/{script-name}.sh

**install.sh** install or update npm modules for server and client projects

**build.sh** build docker images

**up.sh** bring up docker containers in docker as described by docker-compose.yml

**setup.sh** run install.sh, build.sh, and up.sh

**down.sh** bring down docker containers

**logs-api.sh** show logs for api server

**logs-web.sh** show logs for React.js dev server

**docker-clear-images.sh** clear out _all_ docker images

**docker-remove-containers.sh** clear out _all_ docker containers

## How to log

We use loglevel for logging, with some convention. Using loglevel, we will be able to open/close a single file's log by chaning the level of log on the fly, even in production env. For more information about loglevel, check [here](https://github.com/pimterry/loglevel).

The default of log level is set in the file: /src/init.js

```
log.setDefaultLevel('info');
```

To use loglevel in js file, we recommend following this convention:

```
import * as loglevel from 'loglevel'

const log = loglevel.getLogger('../components/TreeImageScrubber')

... ...

	log.debug('render TreeImageScrubber...')
```

The convention is: call the loglevel.getLogger() function with argument of 'the path to current file'. In above example, the js file is: /src/components/TreeImageScrumbber.js, so pass the path string: '../components/TreeImageScrubber' in, just like what we do in 'import' sentence, but the path just points to itself.

Acturally, we can pass in any string, following this convention is just for a UNIQUE key for the log object, now we can set the log level in browser to open/close log. To do so, open DevTools -> application -> localstorage -> add a key: 'loglevel:[the path]' and value: [the log level] (e.g. loglevel:../components/TreeImageScrubber -> DEBUG )
<img alt="snapshot" src="https://raw.githubusercontent.com/dadiorchen/treetracker-admin/master/client/loglevel.gif" width="600" >

## About Material-UI

We use Material-UI (4.0 currently) to build our UI.

We made some custom by setting the theme of Material-UI to fit our UI design. The customized theme file is located at /client/src/components/common/theme.js. If you find components do not work as you expect, please check section: overrides and props in theme, we override some default styles and behaviors.

We create some basic components, such as 'alert', 'confirm', 'form', feel free to pick what you want or copy the sample code. You can find them in our Storybook components gallery.

You can also pick the typographies and colors as you want in Storybook -> MaterialUITheme -> theme/typography/palette.

## About Storybook

We use Storybook to develop/test components independently.

Run the following command to start Storybook:

```
npm run storybook
```

Visit this URL in the browser: http://localhost:9009

All the stories are located at /client/src/stories/

About more usage of Storybook, check [here](https://storybook.js.org/)

## About Redux/Rematch

We use Rematch, it is a simple shell on Redux. Contrast to vanilla Redux,
Rematch has fewer boilerplate code.
Check [here](https://github.com/rematch/rematch) for more detail.

If you are not familiar with Redux/Rematch, please check our [simple tutorial](rematchTutorial.md),
there is a REAL example about how to convert a original React component to a
Redux-connected component, and how to test it.

## Code style guide

**Indention** 2 Spaces for indentation

**Semicolon** Use semicolons at the end of each line

**Characters** 80 characters per line

**Quotes** Use single quotes unless you are writing JSON

```js
const foo = 'bar';
```

**Braces** Opening braces go on the same line as the statment

```js
if (true) {
  console.log('here');
}
```

**Variable declaration** Declare one Varable per statment

```js
const dog = ['bark', 'woof'];
let cat = ['meow', 'sleep'];
```

**Variable, properties and function names** Use lowerCamelCase for variables, properties and function names

```js
const adminUser = db.query('SELECT * From users ...');
```

**Class names** Use UpperCamelCase for class names

```js
class Dog {
  bark(){
    console.log('woof');
  }
}
```

**Descriptive conditions** Make sure to to have a descriptive name that tells the use and meaning of the code

```js
const isValidPassword =
  password.length >= 4 && /^(?=.*\d).{4,}$/.test(password);
```

**Object/Array creation** Use trailing commas and put short declarations on a single line. Only quote keys when your interpreter complains:

```js
var a = ['hello', 'world'];
var b = {
  good: 'code',
  'is generally': 'pretty',
};
```

## Testing

### For client

Basically, we follow the React/Jest convention to build test, all test file are located at the same directory with the file to test, name convention: xxx.test.js , please at least make all the 'model' file to pass unit test, for client project, all model file at : /client/src/model/

To run test:

`npm test`

### For server

On server, we used a combination of JS and Typescript, and, because the Loopback would load services/controllers from the typescript output folder (dist), so it get tricky to test.

For the goal of protecting the shared development database, when running test, we will use a separate database.

Create a test environment file `server/.env.test` with the test database URL set as follows:

```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>?ssl=true
```

NOTE: Please do not set this URL to point to our development database, because the tests will clear all the data in the database. It would cause trouble if we don't have any data in the dev DB.

To locally install postgresDB, this app might be helpful: https://postgresapp.com/

To run test:

```
npm test
```

To make the test process more smooth, we suggest running a command to compile the Loopback files automatically when files change:

```
npm run watch
```

In this way, we can write the code and get the tests result immediately.

NOTE: when running tests, the files related to Loopback are loaded from ./dist folder. That's because for Jest, it does not output compiled files at all, and Loopback will try to load the controllers at runtime.


### See [Current Milestone](https://github.com/Greenstand/treetracker-admin/issues?q=is%3Aopen+is%3Aissue+milestone%3A1.1.0)

See [Contributing to The Cause](https://github.com/Greenstand/Development-Overview#contributing-to-the-cause)

### See [New Milestone](https://github.com/Greenstand/treetracker-admin/milestone/3)

New milestone is about our new version 2.0 for the admin panel. Currently, we are on branch 'v2' to build this version, so if you have finished tickets in this milestone, please push/PR to this branch(v2).

## Credit

- [Loopback](https://loopback.io/doc/en/lb4/index.html)
