import json
import boto3
from botocore.exceptions import ClientError

def handler(event, context):
    headers = {
        "Access-Control-Allow-Credentials": True,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Origin": "*",
    }
    
    try:
        _event_body = event["body"]
        event_body = json.loads(_event_body)
    
    except KeyError:
        return {"headers": headers,
                "statusCode": 500,
                "body": json.dumps({"errorType": "KeyError",
                                    "message": "One of the required function parameters not present (body)",
                                    "statusCode": 500})
                }

    try:
        message_header = event_body["subject"]
        message_body = event_body["text"]
        sender_email = event_body["email"]
        sender_name = event_body["name"]

    except KeyError:
        print('problem')
        return {"headers": headers,
                "statusCode": 500,
                "body": json.dumps({"errorType": "KeyError",
                                    "message": "One of the required function parameters not present (subject, body, email, name)",
                                    "statusCode": 500})
                }
    
    if len(sender_name) == 0:
        sender_name = "Someone"
    
                
    # function mail settings
    # AWS SES region (not all available)
    AWS_SES_REGION = "eu-west-1"
    # The character encoding for the email.
    CHARSET = "UTF-8"

    # function s3 settings
    # AWS S3 region
    AWS_S3_REGION = "eu-central-1"
    
    # from email address. This address must be verified with Amazon SES.
    SENDER = "Remote Social Butterfly <remote.social.butterfly@gmail.com>"
    # to email address
    RECIPIENT = "remote.social.butterfly@gmail.com"
    # The subject line for the email.
    SUBJECT = "ReSoBu: Contact by %s" % sender_name
    
    # The email body for recipients with non-HTML email clients.
    BODY_TEXT = (f"{sender_name} user has contacted you\r\n"
                 f"{sender_name} Email: {sender_email} \r\n"
                 "Subject:\r\n"
                 f"{message_header} \r\n" 
                 "Text:\r\n"
                 f"{message_body} \r\n" 
                 )
                 
    # The HTML body of the email. Change out newlines for html line breaks
    message_body_html = message_body.replace('\n','</br>')
    #message_body_html = message_body_html.replace('\n','</br>')
    BODY_HTML = """
                <h2>%s contacted you</h2>
                <p><strong>%s Email:</strong> %s</p>
                <p><strong>Subject:</strong> %s</p>
                <p><strong>Text:</strong> %s</p>
                """ % (sender_name,sender_name,sender_email,message_header,message_body_html)

    #
    # Mail Notification
    #
    # catch mail client exceptions
    try:
        print("Starting SES mail send...")
        # Create a new SES resource and specify a region.
        ses = boto3.client('ses',region_name=AWS_SES_REGION)
        #Provide the contents of the email.
        ses_response = ses.send_email(
            Destination={
                'ToAddresses': [
                    RECIPIENT,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': CHARSET,
                        'Data': BODY_HTML,
                    },
                    'Text': {
                        'Charset': CHARSET,
                        'Data': BODY_TEXT,
                    },
                },
                'Subject': {
                    'Charset': CHARSET,
                    'Data': SUBJECT,
                },
            },
            Source=SENDER
        )
    except ClientError as e:
        message = "Failed: "+" SES Response"+e.response['Error']['Message']
        print(message)
        return {"headers": headers,
                "statusCode": 500,
                "body": json.dumps({"errorType": "KeyError",
                                    "message": message,
                                    "statusCode": 500})
                }
    
    response = {'message': "success"}
                
    return {"headers": headers,
                "statusCode": 200,
                "body": json.dumps({"statusCode": 200, "response": response})
                }

