import boto3


def create_people_table(dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.create_table(
        TableName='PeopleTable',
        KeySchema=[
            {
                'AttributeName': 'userSubId',
                'KeyType': 'HASH'  # Partition key
            },
            {
                'AttributeName': 'email',
                'KeyType': 'RANGE'  # Sort key
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'userSubId',
                'AttributeType': 'S'
            },
            {
                'AttributeName': 'email',
                'AttributeType': 'S'
            },

        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 10,
            'WriteCapacityUnits': 10
        }
    )
    return table

def create_resobu_table(dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.create_table(
        TableName='SocialButterflyChatsTable',
        KeySchema=[
            {
                'AttributeName': 'userSubId',
                'KeyType': 'HASH'  # Partition key
            },
            {
                'AttributeName': 'groupType',
                'KeyType': 'RANGE'  # Sort key
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'userSubId',
                'AttributeType': 'S'
            },
            {
                'AttributeName': 'groupType',
                'AttributeType': 'S'
            },

        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 10,
            'WriteCapacityUnits': 10
        }
    )
    return table

def create_chats_table(dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.create_table(
        TableName='ChatsTable',
        KeySchema=[
            {
                'AttributeName': 'chatId',  # could be date + chat partners
                'KeyType': 'HASH'  # Partition key
            },
            {
                'AttributeName': 'userSubId',
                'KeyType': 'RANGE'  # Sort key
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'chatId',
                'AttributeType': 'N'
            },
            {
                'AttributeName': 'userSubId',
                'AttributeType': 'S'
            },

        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 10,
            'WriteCapacityUnits': 10
        }
    )
    return table


if __name__ == '__main__':
    # people_table = create_people_table()
    resobu_table = create_resobu_table()
    # chat_table = create_chats_table()
    # print("Table status:", people_table.table_status)
    print("Table status:", resobu_table.table_status)
    # print("Table status:", chat_table.table_status)
