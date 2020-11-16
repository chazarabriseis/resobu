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
        sender_name = event_body["senderName"]
        recipients_emails = event_body["recipientsEmails"]
        chat_invite_subject = event_body["chatInviteSubject"]
        chat_invite_text = event_body["chatInviteText"]
        chat_Date = event_body["chatDate"]

    except KeyError:
        print('problem')
        return {"headers": headers,
                "statusCode": 500,
                "body": json.dumps({"errorType": "KeyError",
                                    "message": "One of the required function parameters not present (subject, body, email, name)",
                                    "statusCode": 500})
                }
    
    if len(sender_name) == 0:
        sender_name = "Remote Social Butterfly"
    
                
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
    RECIPIENTS = recipients_emails
    # The subject line for the email.
    SUBJECT = chat_invite_subject
    
    # Replace placeholders in invite text
    chat_invite_text = chat_invite_text.replace('$DATE$', chat_Date['chatDate'])
    chat_invite_text = chat_invite_text.replace('$TIME$', chat_Date['chatTime'])
    chat_invite_text = chat_invite_text.replace('$CHATLENGTH$', chat_Date['chatLength']+' minutes')

    # The email body for recipients with non-HTML email clients.
    BODY_TEXT = chat_invite_text
                 
    # The HTML body of the email. Change out newlines for html line breaks
    message_body_html = chat_invite_text.replace('\n','</br>')
    
    BODY_HTML = chat_invite_text

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
                'ToAddresses': RECIPIENTS,
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

