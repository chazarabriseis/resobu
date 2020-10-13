import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError


def lambda_handler(event):
    # MISSING: would like to check that connection and table exists
    dynamodb_client = boto3.client('dynamodb', endpoint_url="http://localhost:8000")
    print(dynamodb_client.list_tables()['TableNames'])
    # if "PeopleTable" in dynamodb_client.list_tables()['TableNames']:
    #    print('table is in ')
    #    dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")
    #    table = dynamodb.Table("PeopleTable")
    # else:
    #    print('table is out ')
    #    return {"errorType": "DBConnection",
    #            "httpStatus": 500,
    #            "message": "No connection to DB or table doesn't exist"}

    dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")
    table = dynamodb.Table("ReSoBuTable")

    try:
        command_to_perform = event["request_type"]
        group_type = event["group_type"]
        user_sub_id = event["user_sub_id"]
    except KeyError:
        return {'ResponseMetadata': {"errorType": "KeyError",
                                     "HTTPStatusCode": 500,
                                     "message": "One of the required function parameters not present "
                                                "(request_type, user_sub_id, group_type)"}}
    user_sub_id = user_sub_id + '#' + group_type

    if command_to_perform == 'list_people':
        response = table.query(
            KeyConditionExpression=Key('UserSubId').eq(user_sub_id) & Key('TypeInfo').begins_with('PERSON#')
        ),

        return response

    if command_to_perform == 'list_chat_parents':
        response = table.query(
            KeyConditionExpression=Key('UserSubId').eq(user_sub_id) & Key('TypeInfo').begins_with('CHATPARENT#')
        ),

        return response

    if command_to_perform == 'list_activated_chat_parents':
        response = table.query(
            KeyConditionExpression=Key('UserSubId').eq(user_sub_id) & Key('TypeInfo').begins_with('CHATPARENT#True#')
        ),

        return response

    if command_to_perform == 'insert_person':
        try:
            email = event["email"]
            email = 'PERSON#' + email
        except KeyError:
            return {'ResponseMetadata': {"errorType": "KeyError",
                                         "HTTPStatusCode": 500,
                                         "message": "One of the required function parameters not present (email)"}}
        try:
            response = table.put_item(
                Item={
                    'UserSubId': user_sub_id,
                    'TypeInfo': email,

                    'info': {
                        'teamColleagues': [],
                        'projectColleagues': [],
                        'connectedColleagues': []
                    }
                },
                ConditionExpression="TypeInfo <> :email",
                ExpressionAttributeValues={':email': email}
            )
        except ClientError as e:
            print(e)
            if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
                return {'ResponseMetadata': {"errorType": "ConditionalCheckFailedException",
                                             "HTTPStatusCode": 500,
                                             "message": "Email already exists"}}

        return response

    if command_to_perform == 'insert_chat_parent':
        try:
            chat_info = event["chat_info"]
            activated = event["activated"]
            next_chat = event["next_chat"]
            chat = 'CHATPARENT#' + str(activated) + '#' + next_chat
        except KeyError:
            return {'ResponseMetadata': {"errorType": "KeyError",
                                         "HTTPStatusCode": 500,
                                         "message": "One of the required function parameters not present "
                                                    "(chat_info, activated, next_chat)"}}
        try:
            response = table.put_item(
                Item={
                    'UserSubId': user_sub_id,
                    'TypeInfo': chat,

                    'info': chat_info
                },
                ConditionExpression="TypeInfo <> :chat",
                ExpressionAttributeValues={':chat': chat}
            )
        except ClientError as e:
            print(e)
            if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
                return {'ResponseMetadata': {"errorType": "ConditionalCheckFailedException",
                                             "HTTPStatusCode": 500,
                                             "message": "Chat already exists"}}

        return response

    if command_to_perform == 'update_person':
        try:
            email = event["email"]
            email = 'PERSON#' + email
            changes = event["changes"]
        except KeyError:
            return {'ResponseMetadata': {"errorType": "KeyError",
                                         "HTTPStatusCode": 500,
                                         "message": "One of the required function parameters not present "
                                                    "(email,changes)"}}

        update_expression, expression_attribute_values = get_update_expressions(changes, email)

        try:
            response = table.update_item(
                Key={
                    'userSubId': user_sub_id,
                    'TypeInfo': email
                },
                UpdateExpression=update_expression,
                ConditionExpression="TypeInfo = :email",
                ExpressionAttributeValues=expression_attribute_values,
                ReturnValues="UPDATED_NEW"
            )
        except ClientError as e:
            print(e)
            if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
                return {'ResponseMetadata': {"errorType": "ConditionalCheckFailedException",
                                             "HTTPStatusCode": 500,
                                             "message": "Email does not exist"}}

        return response

    if command_to_perform == 'delete_person':
        try:
            email = event["email"]
            email = 'PERSON#' + email
        except KeyError:
            return {'ResponseMetadata': {"errorType": "KeyError",
                                         "HTTPStatusCode": 500,
                                         "message": "One of the required function parameters not present (email)"}}

        try:
            response = table.delete_item(
                TableName='PeopleTable',
                Key={
                    'userSubId': user_sub_id,
                    'TypeInfo': email
                },
                ConditionExpression="TypeInfo = :email",
                ExpressionAttributeValues={':email': email}

            )
        except ClientError as e:
            print(e)
            if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                return {'ResponseMetadata': {"errorType": "ConditionalCheckFailedException",
                                             "HTTPStatusCode": 500,
                                             "message": "Email does not exist"}}

        return response

    return {'ResponseMetadata': {"errorType": "No command matches",
                                 "HTTPStatusCode": 500,
                                 "message": "command_to_perform does not exist"}}


def get_update_expressions(changes, email):
    update_expression = 'set '
    expression_attribute_values = {}
    for change in changes:
        update_expression = update_expression + 'info.' + change + '=:' + change
        expression_attribute_values[':'+change] = changes[change]
    expression_attribute_values[':email'] = email
    return update_expression, expression_attribute_values
