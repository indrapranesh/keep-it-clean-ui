#!/bin/bash
STACK_NAME_1="keep-it-clean-dev-web-backend"
STACK_NAME_2="keep-it-clean-dev-base-infra"
REGION='us-east-1'
​
function generate_config() {
    
    outputs=$(aws cloudformation describe-stacks --region $REGION --stack-name $STACK_NAME_1 | jq '.Stacks | .[] |
    .Outputs | .[]')
    #echo $outputs
​
    service_endpoint=$(echo $outputs | jq --raw-output 'select(.OutputKey == "ServiceEndpoint") | .OutputValue')
​
    outputs=$(aws cloudformation describe-stacks --region $REGION --stack-name $STACK_NAME_2 | jq '.Stacks | .[] |
    .Outputs | .[]')
    #echo $outputs
​
    cloudfront_endpoint='d142f6gul28ax5.cloudfront.net'
    distribution_id='EW4RFHG8SMJ34'
    userpool_id=$(echo $outputs | jq --raw-output 'select(.OutputKey == "UserPoolId") | .OutputValue')
    userpool_client_id=$(echo $outputs | jq --raw-output 'select(.OutputKey == "UserPoolClientId") | .OutputValue')
    origin_bucket='keep-it-clean-ui-origin'
    idp_id=$(echo $outputs | jq --raw-output 'select(.OutputKey == "IdentityPoolId") | .OutputValue')
​
    echo '{' > ./src/assets/environment.json
    echo '"server_endpoint":"'$service_endpoint'",' >> ./src/assets/environment.json
    echo '"cloudfront_endpoint":"'$cloudfront_endpoint'",' >> ./src/assets/environment.json
    echo '"userpool_id":"'$userpool_id'",' >> ./src/assets/environment.json
    echo '"userpool_client_id":"'$userpool_client_id'",' >> ./src/assets/environment.json
    echo '"origin_bucket":"'$origin_bucket'",' >> ./src/assets/environment.json
    echo '"idp_id":"'$idp_id'"' >> ./src/assets/environment.json 
    echo '}' >> ./src/assets/environment.json
​
    #info "deploying building and deploying front-end to s3"
    npm run build && aws s3 sync dist/keep-it-clean-ui s3://$origin_bucket --delete && aws cloudfront create-invalidation --distribution-id $distribution_id --path "/*"
}
generate_config