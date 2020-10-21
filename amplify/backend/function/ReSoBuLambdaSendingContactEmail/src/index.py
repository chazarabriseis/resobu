import json

def handler(event, context):
  headers = {
      "Access-Control-Allow-Credentials": True,
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      "Access-Control-Allow-Origin": "*",
  }
  response = {'message': 'I want to send emails',
              'event': event}
  return {"headers": headers,
          "statusCode": 200,
          "body": json.dumps(response)}
