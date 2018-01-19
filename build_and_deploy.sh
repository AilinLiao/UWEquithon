#! /bin/bash
# Build the nodejs application bundle to be deployed to AWS Elastic Beanstalk.
#
# This script has a number of parameters:
# $1 - Environment to build and deploy the bundle to. Currently only [ STAGING ].
# $2 - An optional name of the application version to deploy. If the version already exists in EB,
#      the script won't deploy the version it builds. It will just redeploy
#      the existing application version in EB.
# $3 - An optional description message of the application version (requires providing application version).
#
# This script also assumes the following:
# - aws is configured on the running machine with the proper AWS secrets.

BUILD_DIR='../build'

checkSuccess() {
  if [[ $? -ne 0 ]]; then
    echo "ERROR: Something went wrong with the command: $1"
    exit 2
  fi
}

if [[ -z ${1+x} ]]; then
  echo 'ERROR: Deployment environment must be specified (one of [STAGING])'
  exit 1
fi


# Build bundle
echo "Building bundle"
if [[ -d "${BUILD_DIR}" ]]; then
  echo "ERROR: ${BUILD_DIR} already exists. Please move or delete this old build directory."
  exit 2
fi
meteor build --directory "${BUILD_DIR}" --architecture 'os.linux.x86_64'
checkSuccess 'meteor build'

cp -r '.ebextensions' '../build/bundle/'
cp -r '.elasticbeanstalk' '../build/bundle/'
cp 'package.json' '../build/bundle'

pushd '../build/bundle/'

# Substitute meteor run
sed -i "s/meteor run/node main.js/" 'package.json'

echo "Bundle was built successfully"

echo "Deploying application bundle to Elastic Beanstalk"
ENV=""
if [[ "$1" == "STAGING" ]]; then
  ENV="equithon-website-staging"
fi

if [[ -n "$2" && -n "$3" ]]; then
  eb deploy "$ENV" -l "$2" -m "$3"
elif [[ -n "$2" ]]; then
  eb deploy "$ENV" -l "$2"
else
  eb deploy "$ENV"
fi

popd
