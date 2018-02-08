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

STAGING="STAGING"
ENV_STAGING="equithon-website-staging"
PRODUCTION="PRODUCTION"
ENV_PRODUCTION="equithon-website-production"

checkSuccess() {
  if [[ $? -ne 0 ]]; then
    echo "ERROR: Something went wrong with the command: $1"
    exit 3
  fi
}

if [[ -z ${1+x} ]]; then
  echo 'ERROR: Deployment environment must be specified (one of [ STAGING | PRODUCTION ])'
  exit 1
fi

# Deploy an already existing application version if we are deploying to production.
if [[ "$1" == "${PRODUCTION}" && -n "$2" ]]; then
  eb deploy "${ENV_PRODUCTION}" --version "$2"
  exit $?
fi

# Otherwise we should be deploying to STAGING.
if [[ "$1" != "${STAGING}" ]]; then
  echo "ERROR: Not deploying to staging nor production. What is ${1}?"
  exit 1
elif [[ -z "$2" ]]; then
  echo "ERROR: Application version (new or existing) to deploy must be specified."
  exit 1
fi


# Secure bundle by removing debug packages.
echo "Removing package insecure"
meteor remove insecure
echo "Removing package autopublish"
meteor remove autopublish

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

sed -i "s/meteor run/node main.js/" 'package.json' # Substitute meteor run
sed -i "s/\"version\": \".*\"/\"version\": \"${2}\"/" 'package.json' # Substitute new version number.

echo "Bundle was built successfully"

echo "Deploying application bundle to Elastic Beanstalk"
if [[ "$1" == "${STAGING}" && -n "$2" && -n "$3" ]]; then
  eb deploy "${ENV_STAGING}" -l "$2" -m "$3"
elif [[ "$1" == "${STAGING}" && -n "$2" ]]; then
  eb deploy "${ENV_STAGING}" -l "$2"
else
  echo "ERROR: Invalid combination of environments and application versions. Not deploying."
fi

popd
