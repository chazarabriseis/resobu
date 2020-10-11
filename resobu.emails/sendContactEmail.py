import json
import textwrap
import boto3
from botocore.exceptions import ClientError


def lambda_handler(event, context):

    userattributeslist = [ "given_name","family_name","email"]
    try:
        accesstoken = event["accessToken"]
        message_header = event['subject']
        message_body = event['body']

    except KeyError as e:
        raise Exception({
            "errorType" : "Exception",
            "httpStatus": 500,
            "message": "Required function parameters are not present {}".format(e)
        })

    # identity information
    try:
        # Create new cognito idp resource
        print("Starting IDP information requests...")
        idp = boto3.client('cognito-idp')
        idp_response = idp.get_user(AccessToken=accesstoken)
        print(idp_response["UserAttributes"])

        userattributes={}
        for attrib in userattributeslist:
            try:
                userattributes[attrib] = [kvpair_obj["Value"] for kvpair_obj in idp_response["UserAttributes"] if kvpair_obj["Name"] == attrib][0]
            except IndexError as e:
                userattributes[attrib] = ""
                print("Warn: no "+userattributes[(attrib)])
            else:
                print("...got: "+userattributes[attrib])

    except ClientError as e:
        message = "Failed! Requested: "+accesstoken+" IDP Response"+e.response['Error']['Message']
        print(message)
        raise Exception({
                "errorType" : "Exception",
                "httpStatus": 500,
                "message": message
            })
    else:
        # for userattrib, value in userattributes.items(): print("...got userattributes[\""+userattrib+"\"]: "+value)
        print("...got", userattributes)
        print("Success: IDP identity info")

        # set intermediate variables for convenience
        lastname = userattributes["family_name"]
        firstname = userattributes["given_name"]
        email = userattributes["email"]


	# debug information	
    DEBUG = (f"Request ID: {context.aws_request_id} \r\n"
        f"Mem. limits(MB): {context.memory_limit_in_mb} \r\n"
        f"LambdaContext vars : {vars(context)} \r\n"
        f"cognito_identity_id: {context.identity.cognito_identity_id} "
        )
    
    print(DEBUG)
    
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
    SUBJECT = "RESOBU: Contact from %s" % firstname

    
    # Also add text wrapping here to mimic what the user typed in 
    # (if the box size changes the character length must too!)
    # message_body_html = message_body.replace('\n','</br>')
    # message_body_html = '\n'.join(textwrap.wrap(message_body_html, 100))

    # The email body for recipients with non-HTML email clients.
    BODY_TEXT = ("A user has contacted you\r\n"
                 "User info:\r\n"
                 f"First Name: {firstname} \r\n"
                 f"Last Name: {lastname} \r\n"
                 f"Email: {email} \r\n"
                 "Text:\r\n"
                 f"{message_body} \r\n" 
                 )
                 
    # The HTML body of the email. Change out newlines for html line breaks
    message_body_html = message_body.replace('\n','</br>')
    #message_body_html = message_body_html.replace('\n','</br>')
    BODY_HTML = """
                <html>
                <head></head>
                <body>
                <h1>A user has contacted you</h1>
                <p>User info:</p>
                <p><b>First Name:</b> %s</br>
                <b>Last Name:</b> %s</br>
                <b>Email:</b> %s</br>
                <b>Contact:</b></br></br>
                %s
                </br></br>
                </body>
                </html>
                """ % (firstname,lastname,email,message_body_html)

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
        raise Exception({
                "errorType" : "Exception",
                "httpStatus": 500,
                "message": message
            })

