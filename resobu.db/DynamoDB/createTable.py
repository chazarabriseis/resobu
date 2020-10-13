import boto3


def create_one_table():
    dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.create_table(
        TableName='ReSoBuTable',
        KeySchema=[
            {
                'AttributeName': 'UserSubId',
                'KeyType': 'HASH'  # Partition key
            },
            {
                'AttributeName': 'TypeInfo',
                'KeyType': 'RANGE'  # Sort key
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'UserSubId',
                'AttributeType': 'S'
            },
            {
                'AttributeName': 'TypeInfo',
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
    _table = create_one_table()
    print("Table status:", _table.table_status)
