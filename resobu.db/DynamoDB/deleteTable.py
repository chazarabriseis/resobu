import boto3


def delete_resobu_table(dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")
    table = dynamodb.Table('ReSoBuTable')
    table.delete()


if __name__ == '__main__':
    delete_resobu_table()
    print("Movies table deleted.")
