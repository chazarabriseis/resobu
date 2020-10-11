import boto3
from boto3.dynamodb.conditions import Key
from pprint import pprint


def query_table(user_sub, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.Table('PeopleTable')
    response = table.query(
        KeyConditionExpression=Key('userSubId').eq(user_sub)
    )
    return response['Items']


if __name__ == '__main__':
    user_sub_id = "123"
    print(f"Movies from {user_sub_id}")
    queryResponse = query_table(user_sub_id)
    pprint(queryResponse)
