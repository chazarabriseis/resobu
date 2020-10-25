import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError


def handler(event, context):
    headers = {
        "Access-Control-Allow-Credentials": True,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Origin": "*",
    }

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table("ReSoBuTable-dev")

    try:
        _event_body = event["body"]
        event_body = json.loads(_event_body)

    except KeyError:
        print('problem')
        return {"headers": headers,
                "statusCode": 500,
                "body": json.dumps({"errorType": "KeyError",
                                    "message": "One of the required function parameters not present (body)",
                                    "statusCode": 500})
                }

    try:
        command_to_perform = event_body["request_type"]
        group_type = event_body["group_type"]
        user_sub_id = event_body["user_sub_id"]
    except KeyError:
        return {"headers": headers,
                "statusCode": 500,
                "body": json.dumps({"errorType": "KeyError",
                                    "message": "One of the required function parameters not present (request_type, user_sub_id, group_type)",
                                    "statusCode": 500})
                }

    user_sub_id = user_sub_id + '#' + group_type

    if command_to_perform == 'read_people':
        response = table.query(
            KeyConditionExpression=Key('UserSubIdGroupType').eq(user_sub_id) & Key('TypeInfo').begins_with('PERSON#')
        ),

        return {"headers": headers,
                "statusCode": 200,
                "body": json.dumps({"statusCode": 200, "response": response})
                }

    if command_to_perform == 'read_chat_parent':
        response = table.query(
            KeyConditionExpression=Key('UserSubIdGroupType').eq(user_sub_id) &
                                   Key('TypeInfo').begins_with('CHATPARENT#')
        ),

        return {"headers": headers,
                "statusCode": 200,
                "body": json.dumps({"statusCode": 200, "response": response})
                }

    if command_to_perform == 'read_activated_chat_parents':
        response = table.scan(
            FilterExpression=Attr('info.chatActivation').eq("True")
        )

        return {"headers": headers,
                "statusCode": 200,
                "body": json.dumps({"statusCode": 200, "response": response})
                }

    if command_to_perform == 'create_people':
        response = {"headers": headers,
                    "statusCode": 500,
                    "body": json.dumps({"errorType": "NoResponse",
                                        "message": "Empty response was returned",
                                        "statusCode": 500})
                    }

        try:
            info = event_body["person_info"]
            emails = event_body["emails"]

        except KeyError:
            return {"headers": headers,
                    "statusCode": 500,
                    "body": json.dumps({"errorType": "KeyError",
                                        "message": "One of the required function parameters not present (emails, person_info)",
                                        "statusCode": 500})
                    }

        for email in emails:
            type_info = 'PERSON#' + email
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
                    return {"headers": headers,
                            "statusCode": 200,
                            "body": json.dumps({"errorType": "ConditionalCheckFailedException",
                                                "message": "Hmm, it seems like email already exists",
                                                "statusCode": 500})
                            }

        return {"headers": headers,
                "statusCode": 200,
                "body": json.dumps({"statusCode": 200, "response": response})
                }

    if command_to_perform == 'create_person' or command_to_perform == 'create_chat_parent':
        response = {"headers": headers,
                    "statusCode": 500,
                    "body": json.dumps({"errorType": "NoResponse",
                                        "message": "Empty response was returned",
                                        "statusCode": 500})
                    }
        type_info = ''
        info = {}

        if command_to_perform == 'create_person':
            try:
                info = event_body["person_info"]
                email = event_body["email"]
                type_info = 'PERSON#' + email
            except KeyError:
                return {"headers": headers,
                        "statusCode": 500,
                        "body": json.dumps({"errorType": "KeyError",
                                            "message": "One of the required function parameters not present (email, person_info)",
                                            "statusCode": 500})
                        }

        if command_to_perform == 'create_chat_parent':
            try:
                info = event_body["chat_info"]
                type_info = 'CHATPARENT#'
            except KeyError:
                return {"headers": headers,
                        "statusCode": 500,
                        "body": json.dumps({"errorType": "KeyError",
                                            "message": "One of the required function parameters not present (chat_info, activated, next_chat)",
                                            "statusCode": 500})
                        }

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
                return {"headers": headers,
                        "statusCode": 200,
                        "body": json.dumps({"errorType": "ConditionalCheckFailedException",
                                            "message": "Hmm, it seems like email already exists",
                                            "statusCode": 500})
                        }

        return {"headers": headers,
                "statusCode": 200,
                "body": json.dumps({"statusCode": 200, "response": response})
                }

    if command_to_perform == 'update_person' or command_to_perform == 'update_chat_parent':
        response = {"headers": headers,
                    "statusCode": 500,
                    "body": json.dumps({"errorType": "NoResponse",
                                        "message": "Empty response was returned",
                                        "statusCode": 500})
                    }

        changes = {}
        type_info = ''

        if command_to_perform == 'update_person':
            try:
                email = event_body["email"]
                type_info = 'PERSON#' + email
                changes = event_body["changes"]
            except KeyError:
                return {"headers": headers,
                        "statusCode": 500,
                        "body": json.dumps({"errorType": "KeyError",
                                            "message": "One of the required function parameters not present (email, changes)",
                                            "statusCode": 500})
                        }

        if command_to_perform == 'update_chat_parent':
            try:
                changes = event_body["changes"]
                type_info = 'CHATPARENT#'
                print(type_info)
            except KeyError:
                return {"headers": headers,
                        "statusCode": 500,
                        "body": json.dumps({"errorType": "KeyError",
                                            "message": "One of the required function parameters not present (chat_info, activated, next_chat)",
                                            "statusCode": 500})
                        }

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
                return {"headers": headers,
                        "statusCode": 500,
                        "body": json.dumps({"errorType": "ConditionalCheckFailedException",
                                            "message": "Email already exists",
                                            "statusCode": 500})
                        }

        return {"headers": headers,
                "statusCode": 200,
                "body": json.dumps({"statusCode": 200, "response": response})
                }

    if command_to_perform == 'delete_person' or command_to_perform == 'delete_chat_parent':
        response = {"headers": headers,
                    "statusCode": 500,
                    "body": json.dumps({"errorType": "NoResponse",
                                        "message": "Empty response was returned",
                                        "statusCode": 500})
                    }
        type_info = ''

        if command_to_perform == 'delete_person':
            try:
                email = event_body["email"]
                type_info = 'PERSON#' + email
            except KeyError:
                return {"headers": headers,
                        "statusCode": 500,
                        "body": json.dumps({"errorType": "KeyError",
                                            "message": "One of the required function parameters not present (email)",
                                            "statusCode": 500})
                        }

        if command_to_perform == 'delete_chat_parent':
            try:
                type_info = 'CHATPARENT#'
            except KeyError:
                return {"headers": headers,
                        "statusCode": 500,
                        "body": json.dumps({"errorType": "KeyError",
                                            "message": "One of the required function parameters not present (activated, next_chat)",
                                            "statusCode": 500})
                        }

        try:
            response = table.delete_item(
                TableName='ReSoBuTable-dev',
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
                return {"headers": headers,
                        "statusCode": 500,
                        "body": json.dumps({"errorType": "ConditionalCheckFailedException",
                                            "message": "Email does not exist",
                                            "statusCode": 500})
                        }

        return {"headers": headers,
                "statusCode": 200,
                "body": json.dumps({"statusCode": 200, "response": response})}

    return {"headers": headers,
            "statusCode": 500,
            "body": json.dumps({"errorType": "noCommand",
                                "message": "request type does not exist",
                                "statusCode": 500})
            }


def get_update_expressions(changes, type_info):
    update_expression = ["set "]
    expression_attribute_values = {}
    for change in changes:
        update_expression.append(f" info.{change} = :{change},")
        expression_attribute_values[':' + change] = changes[change]
    expression_attribute_values[':type_info'] = type_info
    return "".join(update_expression)[:-1], expression_attribute_values

