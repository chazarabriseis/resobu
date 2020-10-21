import json
import boto3
from boto3.dynamodb.conditions import Key
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
                "body" : json.dumps({"errorType": "KeyError",
                                     "message": "One of the required function parameters not present (body)",
                                     "event": event})
                }
    
    try:
        command_to_perform = event_body["request_type"]
        group_type = event_body["group_type"]
        user_sub_id = event_body["user_sub_id"]
    except KeyError:
        return {"headers": headers,
                "statusCode": 500,
                "body" : json.dumps({"errorType": "KeyError",
                                     "message": "One of the required function parameters not present (request_type, user_sub_id, group_type)",
                                     "event": event 
                                     })
                }

    user_sub_id = user_sub_id + '#' + group_type

    if command_to_perform == 'read_people':
        response = table.query(
            KeyConditionExpression=Key('UserSubIdGroupType').eq(user_sub_id) & Key('TypeInfo').begins_with('PERSON#')
        ),

        return {"headers": headers,
                "statusCode": 200,
                "body": json.dumps(response)}
