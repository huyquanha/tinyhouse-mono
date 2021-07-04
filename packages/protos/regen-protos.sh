#!/bin/bash

# This enables the usage of '**' to match all sub-directories.
shopt -s globstar

package=$1;

# The first dir is the directory the symlink points to.
# The second dir is the directory the symlink resides.
# NOTE that the first dir has to be RELATIVE to the second dir to point correctly, so for profile-client,
# to make the symlink points to this `profile` directory it cannot be "./profile" but has to be "../../protos/profile".
ln -s ../../protos/$package ../$package-client/src/protos
yarn proto-loader-gen-types --keepCase --grpcLib=@grpc/grpc-js --outDir=../$package-client/src/types ./$package/**/*.proto
yarn format:protos ../$package-client/src/types/**/*.ts