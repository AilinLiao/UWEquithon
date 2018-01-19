# README #

To install Meteor, follow this [link](https://www.meteor.com/install) and run the right command.

To run the meteor server, use
```bash
$ meteor npm install
$ meteor
```
and go to `localhost:3000`.

## Deploying the App ##
To deploy the meteor application, you will need to setup the necessary command line tools including
  - awscli
  - ebcli
Install the AWS and AWS EB command lines and configure them by running `aws configure`. You will need to have
a user with our AWS account.

Then run:
```bash
./build_and_deploys.sh ENVIRONMENT APP_VERSION_LABEL APP_VERSION_DESCRIPTION
```
This will build the nodejs bundle using `meteor build` and deploy to elastic beanstalk using `eb deploy`.
The ENVIRONMENT parameter for now is STAGING. Once we get the production server up we will add another environment.
