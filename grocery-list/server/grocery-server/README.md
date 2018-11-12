## Run the server
```npm start run:dev```

## Call the REST Api
**Add a grocery item**: ```curl -d '{"itemName": "Cranberry"}' -X POST -H "Content-Type: application/json"  localhost:3000/items```\
**Get all grocery items**: ```curl localhost:3000/items```

## AWS Setup


### Install AWS command line tool 

Install the AWS command line tool from: https://docs.aws.amazon.com/cli/latest/userguide/installing.html


### Create the AWS User and Access Key

Sign up for a AWS Account, and Sign into the Console: https://console.aws.amazon.com/\
```Under Profile > My Security Credentials > Users > Add User```, Add a user\
```Click on the new user > Security Credentials > Create Access Key```, Create an access key, and note the Access Key Id and Secret

### Create the credential and config files

Before the AWS code can be used in node.js the credentials and configuration need to be provided. This information should not be checked into the code repository because is particular for each user.

```aws configure```\
Provide the access key Id and secret when prompted. The region used was ```us-west-2```

## DynamoDb commands
### Create the grocery-list table in DynamoDb
Create a DynamoDb table called 'grocery-item'.\
```aws dynamodb create-table --table-name grocery-item --attribute-definitions AttributeName=itemName,AttributeType=S --key-schema AttributeName=itemName,KeyType=HASH  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5```

### Various dynamodb command
**Delete table:** ```aws dynamodb delete-table --table-name grocery-item```\
**List tables:** ```aws dynamodb list-tables```\
**Query for an item named 'eggs':**\
```aws dynamodb query --table-name grocery-item --key-condition-expression "itemName = :name" --expression-attribute-values {\":name\":{\"S\":\"eggs\"}}```\
Ref: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html#Query.KeyConditionExpressions



