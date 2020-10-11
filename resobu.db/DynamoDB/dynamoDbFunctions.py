import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError


def lambda_handler(event):
    dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    try:
        command_to_perform = event["requestType"]
        user_sub_id = event["userSubId"]
        table_name = event["tableName"]
    except KeyError:
        raise Exception({
            "errorType": "Exception",
            "httpStatus": 500,
            "message": "One of the required function parameters not present (requestType, userSubId, tableName)"
        })

    if command_to_perform == 'fetchList':
        try: table = dynamodb.Table(table_name)
        except ClientError as e:
            if e.response['Error']['Code'] == 'EndpointConnectionError':
                raise Exception({
                    "errorType": "EndpointConnectionError",
                    "httpStatus": 500,
                    "message": "Could not connect to DB"
                })

        response = table.query(
            KeyConditionExpression=Key('userSubId').eq(user_sub_id)
        )
        return response['Items']

    if command_to_perform == 'insertRow':
        if table_name == "PeopleTable":
            table = dynamodb.Table(table_name)
            try:
                email = event["email"]
            except KeyError:
                raise Exception({
                    "errorType": "Exception",
                    "httpStatus": 500,
                    "message": "One of the required function parameters not present (email)"
                })
            try:
                response = table.put_item(
                    Item={
                        'email': email,
                        'userSubId': user_sub_id,
                        'info': {
                            'teamColleagues': [],
                            'projectColleagues': [],
                            'connectedColleagues': []
                        }
                    },
                    ConditionExpression="email <> :email",
                    ExpressionAttributeValues={':email': email}
                )
            except ClientError as e:
                if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
                    raise Exception({
                        "errorType": "ConditionalCheckFailedException",
                        "httpStatus": 500,
                        "message": "Email already exists"
                    })
            return response
        if table_name == "SocialButterflyChatsTable":
            table = dynamodb.Table(table_name)
            try:
                group_type = event["groupType"]
                info = event["info"]
            except KeyError:
                raise Exception({
                    "errorType": "Exception",
                    "httpStatus": 500,
                    "message": "One of the required function parameters not present (groupType, info)"
                })
            try:
                response = table.put_item(
                    Item={
                        'groupType': group_type,
                        'userSubId': user_sub_id,
                        'info': info
                    }
                )
            except ClientError as e:
                if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
                    raise Exception({
                        "errorType": "ConditionalCheckFailedException",
                        "httpStatus": 500,
                        "message": "Email already exists"
                    })
            return response

    if command_to_perform == 'updateRow':
        if table_name == 'PeopleTable':
            try:
                email = event["email"]
                changes = event["changes"]
            except KeyError:
                raise Exception({
                    "errorType": "Exception",
                    "httpStatus": 500,
                    "message": "One of the required function parameters not present (requestType, userSubId, tableName)"
                })
            update_expression, expression_attribute_values = get_update_expressions(changes)
            table = dynamodb.Table(table_name)
            try:
                response = table.update_item(
                    Key={
                        'userSubId': user_sub_id,
                        'email': email
                    },
                    UpdateExpression=update_expression,
                    ExpressionAttributeValues=expression_attribute_values,
                    ReturnValues="UPDATED_NEW"
                )
            except ClientError as e:
                if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
                    raise Exception({
                        "errorType": "ConditionalCheckFailedException",
                        "httpStatus": 500,
                        "message": "Email already exists"
                    })
            return response
        elif table_name == "SocialButterflyChatsTable":
            try:
                group_type = event["groupType"]
                changes = event["changes"]
            except KeyError:
                raise Exception({
                    "errorType": "Exception",
                    "httpStatus": 500,
                    "message": "One of the required function parameters not present (requestType, userSubId, tableName)"
                })
            update_expression, expression_attribute_values = get_update_expressions(changes)
            table = dynamodb.Table(table_name)
            try:
                response = table.update_item(
                    Key={
                        'userSubId': user_sub_id,
                        'groupType': group_type
                    },
                    UpdateExpression=update_expression,
                    ExpressionAttributeValues=expression_attribute_values,
                    ReturnValues="UPDATED_NEW"
                )
            except ClientError as e:
                if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
                    raise Exception({
                        "errorType": "ConditionalCheckFailedException",
                        "httpStatus": 500,
                        "message": "Email already exists"
                    })
            return response

    if command_to_perform == 'deleteRow':
        if table_name == 'PeopleTable':
            table = dynamodb.Table(table_name)
            try:
                email = event["email"]
            except KeyError:
                raise Exception({
                    "errorType": "Exception",
                    "httpStatus": 500,
                    "message": "One of the required function parameters not present (email)"
                })
            try:
                response = table.delete_item(
                    TableName='PeopleTable',
                    Key={
                        'userSubId': user_sub_id,
                        'email': email
                    }
                )
            except ClientError as e:
                if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                    print(e.response['Error']['Message'])
                else:
                    raise
            else:
                return response


def get_update_expressions(changes):
    update_expression = 'set '
    expression_attribute_values = {}
    for change in changes:
        update_expression = update_expression + 'info.' + change + '=:' + change
        expression_attribute_values[':'+change] = changes[change]
    return update_expression, expression_attribute_values
