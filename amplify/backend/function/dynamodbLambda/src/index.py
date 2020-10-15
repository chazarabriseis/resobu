import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError


def handler(event, context):
    # MISSING: would like to check that connection and table exists
    # dynamodb_client = boto3.client('dynamodb', endpoint_url="http://localhost:8000")
    # print(dynamodb_client.list_tables()['TableNames'])

    dynamodb = boto3.resource('dynamodb')
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

    if command_to_perform == 'read_people':
        response = table.query(
            KeyConditionExpression=Key('UserSubIdGroupType').eq(user_sub_id) & Key('TypeInfo').begins_with('PERSON#')
        ),

        return response

    if command_to_perform == 'read_chat_parents':
        response = table.query(
            KeyConditionExpression=Key('UserSubIdGroupType').eq(user_sub_id) &
            Key('TypeInfo').begins_with('CHATPARENT#')
        ),

        return response

    if command_to_perform == 'read_activated_chat_parents':
        response = table.query(
            KeyConditionExpression=Key('UserSubIdGroupType').eq(user_sub_id) &
            Key('TypeInfo').begins_with('CHATPARENT#True#')
        ),

        return response

    if command_to_perform == 'create_person' or command_to_perform == 'create_chat_parent':
        response = {'ResponseMetadata': {"errorType": "EmptyResponse",
                                         "HTTPStatusCode": 500,
                                         "message": "DB query returned nothing"}}
        type_info = ''
        info = {}

        if command_to_perform == 'create_person':
            try:
                info = event["person_info"]
                email = event["email"]
                type_info = 'PERSON#' + email
            except KeyError:
                return {'ResponseMetadata': {"errorType": "KeyError",
                                             "HTTPStatusCode": 500,
                                             "message": "One of the required function parameters not present "
                                                        "(email, person_info)"}}

        if command_to_perform == 'create_chat_parent':
            try:
                info = event["chat_info"]
                activated = event["activated"]
                next_chat = event["next_chat"]
                type_info = 'CHATPARENT#' + str(activated) + '#' + next_chat
            except KeyError:
                return {'ResponseMetadata': {"errorType": "KeyError",
                                             "HTTPStatusCode": 500,
                                             "message": "One of the required function parameters not present "
                                                        "(chat_info, activated, next_chat)"}}

        try:
            response = table.put_item(
                Item={
                    'UserSubIdGroupType': user_sub_id,
                    'TypeInfo': type_info,

                    'info': info
                },
                ConditionExpression="TypeInfo <> :type_info",
                ExpressionAttributeValues={':type_info': type_info}
            )
        except ClientError as e:
            print(e)
            if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
                return {'ResponseMetadata': {"errorType": "ConditionalCheckFailedException",
                                             "HTTPStatusCode": 500,
                                             "message": "Email already exists"}}

        return response

    if command_to_perform == 'update_person' or command_to_perform == 'update_chat_parent':
        response = {'ResponseMetadata': {"errorType": "EmptyResponse",
                                         "HTTPStatusCode": 500,
                                         "message": "DB query returned nothing"}}
        changes = {}
        type_info = ''

        if command_to_perform == 'update_person':
            try:
                email = event["email"]
                type_info = 'PERSON#' + email
                changes = event["changes"]
            except KeyError:
                return {'ResponseMetadata': {"errorType": "KeyError",
                                             "HTTPStatusCode": 500,
                                             "message": "One of the required function parameters not present "
                                                        "(email,changes)"}}
        if command_to_perform == 'update_chat_parent':
            try:
                changes = event["changes"]
                activated = event["activated"]
                next_chat = event["next_chat"]
                type_info = 'CHATPARENT#' + str(activated) + '#' + next_chat
            except KeyError:
                return {'ResponseMetadata': {"errorType": "KeyError",
                                             "HTTPStatusCode": 500,
                                             "message": "One of the required function parameters not present "
                                                        "(chat_info, activated, next_chat)"}}

        update_expression, expression_attribute_values = get_update_expressions(changes, type_info)

        try:
            response = table.update_item(
                Key={
                    'UserSubIdGroupType': user_sub_id,
                    'TypeInfo': type_info
                },
                UpdateExpression=update_expression,
                ConditionExpression="TypeInfo = :type_info",
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

    if command_to_perform == 'delete_person' or command_to_perform == 'delete_chat_parent':
        response = {'ResponseMetadata': {"errorType": "EmptyResponse",
                                         "HTTPStatusCode": 500,
                                         "message": "DB query returned nothing"}}
        type_info = ''

        if command_to_perform == 'delete_person':
            try:
                email = event["email"]
                type_info = 'PERSON#' + email
            except KeyError:
                return {'ResponseMetadata': {"errorType": "KeyError",
                                             "HTTPStatusCode": 500,
                                             "message": "One of the required function parameters not present (email)"}}

        if command_to_perform == 'delete_chat_parent':
            try:
                activated = event["activated"]
                next_chat = event["next_chat"]
                type_info = 'CHATPARENT#' + str(activated) + '#' + next_chat
            except KeyError:
                return {'ResponseMetadata': {"errorType": "KeyError",
                                             "HTTPStatusCode": 500,
                                             "message": "One of the required function parameters not present "
                                                        "(activated, next_chat)"}}

        try:
            response = table.delete_item(
                TableName='ReSoBuTable',
                Key={
                    'UserSubIdGroupType': user_sub_id,
                    'TypeInfo': type_info
                },
                ConditionExpression="TypeInfo = :typeinfo",
                ExpressionAttributeValues={':typeinfo': type_info}

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


def get_update_expressions(changes, type_info):
    update_expression = 'set '
    expression_attribute_values = {}
    for change in changes:
        update_expression = update_expression + 'info.' + change + '=:' + change
        expression_attribute_values[':'+change] = changes[change]
    expression_attribute_values[':type_info'] = type_info
    return update_expression, expression_attribute_values
