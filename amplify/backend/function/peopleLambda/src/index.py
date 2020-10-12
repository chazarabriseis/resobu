import json
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

def handler(event, context):
  error = []
  try:
    dynamodb = boto3.resource('dynamodb')
  except KeyError:
    error.append('db error')
    raise Exception({
        "errorType": "Exception",
        "httpStatus": 500,
        "message": "One of the required function parameters not present (requestType, userSubId, tableName)"
    })

  body = {
      "message": "connected to",
      "db": dynamodb,
      "error": error
  }

  response = {
      "statusCode": 200,
      "body": json.dumps(body),
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
  }

  return response