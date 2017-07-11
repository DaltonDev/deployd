# deployd
Testing out Deployd

## Setup
### From NPM
1. npm install deployd -g
2. dpd create "project name" (excluding the "" chars)
3. cd "project name" (excluding the "" chars)
4. dpd -d 

## Error fix
### If "Failed to start MongoDB (Make sure 'mongod' are in your $PATH or use dpd --mongod option."
Make sure to run dpd --mongod "c:/Path/to/mongod.exe" (including the "" chars)
