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

    # check for chats that are activated and which are happening soon
    # response = table.scan(
    #     FilterExpression=Attr('info.chatActivation').eq("True")
    # )
    response = 'lambda is online'

    return {"headers": headers,
            "statusCode": 200,
            "body": json.dumps({"statusCode": 200, "response": response})
            }

    # make a list of activated chats with this info to then pull the people
    # user_sub_id = user_sub_id + '#' + group_type


    # pull the people from the DB
    # response = table.query(
    #    KeyConditionExpression=Key('UserSubIdGroupType').eq(user_sub_id) & Key('TypeInfo').begins_with('PERSON#')
    #),

    #return {"headers": headers,
    #        "statusCode": 200,
    #        "body": json.dumps({"statusCode": 200, "response": response})
    #        }

    # pull the chat info from the DB
    #response = table.query(
    #    KeyConditionExpression=Key('UserSubIdGroupType').eq(user_sub_id) &
    #                            Key('TypeInfo').begins_with('CHATPARENT#')
    #),

    #return {"headers": headers,
    #        "statusCode": 200,
    #        "body": json.dumps({"statusCode": 200, "response": response})
    #        }

    # send the info to the group-builder Lambda to get the people lists
    ###
    
    
    # send invites out to all the groups by sending the group list to the lambda

    #updating the people list and chat ingo
    #if command_to_perform == 'update_person' or command_to_perform == 'update_chat_parent':
    #    response = {"headers": headers,
    #                "statusCode": 500,
    #                "body": json.dumps({"errorType": "NoResponse",
    #                                    "message": "Empty response was returned",
    #                                    "statusCode": 500})
    #                }

    #    changes = {}
    #    type_info = ''

    #    if command_to_perform == 'update_person':
    #        try:
    #            email = event_body["email"]
    #            type_info = 'PERSON#' + email
    #            changes = event_body["changes"]
    #        except KeyError:
    #            return {"headers": headers,
    #                    "statusCode": 500,
    #                    "body": json.dumps({"errorType": "KeyError",
    #                                        "message": "One of the required function parameters not present (email, changes)",
    #                                        "statusCode": 500})
    #                    }

    #    if command_to_perform == 'update_chat_parent':
    #        try:
    #            changes = event_body["changes"]
    #            type_info = 'CHATPARENT#'
    #            print(type_info)
    #        except KeyError:
    #            return {"headers": headers,
    #                    "statusCode": 500,
    #                    "body": json.dumps({"errorType": "KeyError",
    #                                        "message": "One of the required function parameters not present (chat_info, activated, next_chat)",
    #                                        "statusCode": 500})
    #                    }

    #    update_expression, expression_attribute_values = get_update_expressions(changes, type_info)

    #    try:
    #        response = table.update_item(
    #            Key={
    #                'UserSubIdGroupType': user_sub_id,
    #                'TypeInfo': type_info
    #            },
    #            UpdateExpression=update_expression,
    #            ConditionExpression="TypeInfo = :type_info",
    #            ExpressionAttributeValues=expression_attribute_values,
    #            ReturnValues="UPDATED_NEW"
    #        )
    #    except ClientError as e:
    #        print(e)
    #        if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
    #            return {"headers": headers,
    #                    "statusCode": 500,
    #                    "body": json.dumps({"errorType": "ConditionalCheckFailedException",
    #                                        "message": "Email already exists",
    #                                        "statusCode": 500})
    #                    }

    #    return {"headers": headers,
    #            "statusCode": 200,
    #            "body": json.dumps({"statusCode": 200, "response": response})
    #            }


def get_update_expressions(changes, type_info):
    update_expression = ["set "]
    expression_attribute_values = {}
    for change in changes:
        update_expression.append(f" info.{change} = :{change},")
        expression_attribute_values[':' + change] = changes[change]
    expression_attribute_values[':type_info'] = type_info
    return "".join(update_expression)[:-1], expression_attribute_values

