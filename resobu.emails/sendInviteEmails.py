"""
Lambda function to forward Tycho automatic cloud upload data to the proper endpoint. Also extracts 
relevant user sub ID from Cognito for the DB insertion request based on Tycho SN in the JSON data

@author: christopher.battle
"""
import json
import boto3
import urllib
from botocore.exceptions import ClientError

client = boto3.client('ssm')
# Constant for email functions
CHARSET = "UTF-8"

# return stage dependent DB credentials
def get_user_pool_id(stage):
    try:
        if stage in ('stage', 'prod'):
            # stage & prod have same user pool
            response = client.get_parameter(Name='user_pool_id_prod',
                                            WithDecryption=True)
        else:
            response = client.get_parameter(Name='user_pool_id_dev',
                                            WithDecryption=True)
        return response['Parameter']['Value']
    except client.exceptions.ParameterNotFound:
        print("ParameterNotFound error")
        raise

# return tycho user pool ID
def get_tycho_user_pool_id():
    try:
        response = client.get_parameter(Name='user_pool_id_tycho',
                                        WithDecryption=True)

        return response['Parameter']['Value']
    except client.exceptions.ParameterNotFound:
        print("ParameterNotFound error")
        raise

def get_endpoint(stage, resource):
    try:
        response = client.get_parameter(Name='endpoint_tycho_upload',
                                            WithDecryption=True)
        endpoint = response['Parameter']['Value'] + f'{stage}/{resource}'
        return endpoint
    except client.exceptions.ParameterNotFound:
        print("ParameterNotFound error")
        raise

# return 'dev' as default value   
def get_env(context):
    # get the Alias name from the Lambda Function ARN
    try:
        split_arn = context.invoked_function_arn.split(':')
        env = split_arn[len(split_arn) - 1]
        if env in ('dev', 'stage', 'prod'):
            return env
        else: 
            print("invoked_function_arn has no stage - default value used")
            return "dev" 
    except:
        print("exception in get_env(context): - default value used")
        return "dev"    


def create_email_ntt(device_sn, user_sub, message_ntt, error_list_ntt, 
                    charset=CHARSET, message_sent=False):
    # to email address
    RECIPIENT = "nt.cloud@nanotempertech.com"
    # The subject line for the email.
    SUBJECT = "User Access Request Tycho {device_sn}"

    # The email body for recipients with non-HTML email clients.
    BODY_TEXT = (f"User with user sub ID: {user_sub} requested access to Tycho SN: {device_sn}r\n"
                f"Message NTT: {message_ntt}r\n"
                f"Error list: {error_list_ntt}r\n"
                f"Message sent to Tycho admin: {message_sent}")
                 

    BODY_HTML = f"""
                <html>
                <head></head>
                <body>
                <p>User with user sub ID: {user_sub} requested access to Tycho SN: {device_sn}</p></br>
                <p>Message NTT: {message_ntt}</p>
                <p>Error list: {error_list_ntt}</p>
                <p>Message sent to Tycho admin: {message_sent}</p>
                </body>
                </html>
                """

 
    destination_dict = {
        'ToAddresses': [RECIPIENT]
    }
    message_dict = {
        'Body': {
            'Html': {
                'Charset': charset,
                'Data': BODY_HTML,
                },
        'Text': {
            'Charset': charset,
            'Data': BODY_TEXT,
            },
        },
        'Subject': {
            'Charset': charset,
            'Data': SUBJECT,
            },
        }
    return (destination_dict, message_dict)

def create_email_admin(device_sn, user_email, recipient, charset=CHARSET):
    # The subject line for the email.
    SUBJECT = f"Registration Request for Tycho {device_sn}"

    # The email body for recipients with non-HTML email clients.
    BODY_TEXT = ("Dear Tycho Admin,\r\n"
                f"Someone has requested access to Tycho serial number: {device_sn}.\r\n"
                f"The user's email address is: \r\n"
                f"{user_email}\r\n"
                f"\r\n"
                f"You can add the user by going to your Tycho.Cloud settings page, " 
                f"clicking the Manage Users button, and entering their email address "
                f"into the Add Users field. Please only add users whose email you recognize.\r\n"
                f"\r\n"
                f"\r\n"
                f"Greetings from the Cloud,\r\n"
                f"Your Tycho.Cloud Team"
                )
                 

    BODY_HTML = f"""
                <html>
                <head></head>
                <body>
                <p>Dear Tycho Admin,</p></br>
                <p>Someone has requested access to Tycho serial number: {device_sn}</p>
                <p>The user's email address is: {user_email}</p>
                <p>You can add the user by going to your Tycho.Cloud settings page,  
                clicking the Manage Users button, and entering their email address 
                into the Add Users field.</p> 
                <p>Please only add users whose email you recognize.</p></br>
                <p>Greetings from the Cloud,</p>
                <p>Your Tycho.Cloud Team</p>
                </body>
                </html>
                """

 
    destination_dict = {
        'ToAddresses': [recipient]
    }
    message_dict = {
        'Body': {
            'Html': {
                'Charset': charset,
                'Data': BODY_HTML,
                },
        'Text': {
            'Charset': charset,
            'Data': BODY_TEXT,
            },
        },
        'Subject': {
            'Charset': charset,
            'Data': SUBJECT,
            },
        }
    return (destination_dict, message_dict)

def send_mail_ntt(destination_dict, message_dict, aws_ses_region, sender):
        try:
            ses = boto3.client('ses',region_name=aws_ses_region)
            # Provide the contents of the email.
            ses_response = ses.send_email(
                Destination=destination_dict,
                Message=message_dict,
                Source=sender
            )
            return(ses_response)
        except ClientError as e:
            message = "Failed: "+" SES Response"+e.response['Error']['Message']
            return({
                    "errorType" : "Exception",
                    "httpStatus": 500,
                    "message": message
                })


def lambda_handler(event, context):
    context.callbackWaitsForEmptyEventLoop = 'false'
    TIMEOUT = 10 # wait time for urllib request
    env = get_env(context)
    RESOURCE = 'device/get-tycho-admins' # endpoint

    # Email params
    AWS_SES_REGION = "eu-west-1"
    # from email address. This address must be verified with Amazon SES.
    SENDER = "NanoTemper NT.Cloud <nt.cloud@nanotempertech.com>"

    print(env)
    user_pool_id = get_user_pool_id(env)

    # Default return is that all is good - don't give error info!!!
    default_response = {
            "errorType": "Success",
            "httpStatus": 200,
            "message": "An email has been sent to the Tycho admin."
            }

    # Create an error list to email to NT.Cloud account 
    error_list_ntt = []
    message_ntt = ''

    try:
        device_sn = event['deviceSn']
        print(device_sn)     
        user_sub = event['userSubId']
    except KeyError as e:
        print('Following keys missing from request: ', e)
        raise Exception({
                "errorType": "Exception",
                "httpStatus": 400,
                "message": "Required function parameters not present"
                })

    # Get expected device account
    tycho_username = device_sn.lower() + '.at.nanotempertech.com'

    #### First check if Tycho and user sub ID are valid ##############
    # Check if Tycho in Cognito
    tycho_sub_id = None
    try:
        # First look in stage Cognito pool. This can be taken out in
        # the future once all Tychos have been moved to the Tycho
        # user pool
        cognito_client = boto3.client('cognito-idp')
        cognito_response = cognito_client.admin_get_user(
            UserPoolId=user_pool_id,
            Username=tycho_username
        )
        tycho_sub_id = [item['Value'] for item in cognito_response['UserAttributes']
                        if item['Name']=='sub'][0]
    except cognito_client.exceptions.UserNotFoundException:
        print(f'Tycho not found in {env} user pool, looking in Tycho user pool...')
        try:
            tycho_user_pool_id = get_tycho_user_pool_id()
            cognito_response = cognito_client.admin_get_user(
                UserPoolId=tycho_user_pool_id,
                Username=tycho_username
            )
            tycho_sub_id = [item['Value'] for item in cognito_response['UserAttributes']
                            if item['Name']=='sub'][0]
            message_ntt = message_ntt + f"Tycho sub ID: {tycho_sub_id} found.\r\n"
        except cognito_client.exceptions.UserNotFoundException:
            error_message_ntt = f"{tycho_username} doesn't exist"
            print(error_message_ntt)
            error_list_ntt.append(error_message_ntt)

    # Get user making request info
    try:
        filter_user_sub = f"sub = \"{user_sub}\""
        cognito_response = cognito_client.list_users(UserPoolId=user_pool_id,
                                                    AttributesToGet=['email'],
                                                    Filter=filter_user_sub)
        if cognito_response['Users']:
            user_email = cognito_response['Users'][0]['Attributes'][0]['Value']
            message_ntt = message_ntt + f"User email: {user_email} found.\r\n"
    except cognito_client.exceptions.UserNotFoundException:
        error_message_ntt = f"{user_sub} doesn't exist"
        print(error_message_ntt)
        error_list_ntt.append(error_message_ntt)

    # If we've already accumulated errors, abort request and notify NTT
    if error_list_ntt:
        destination_dict, message_dict = create_email_ntt(device_sn, user_sub, message_ntt, error_list_ntt)   
        ses_response = send_mail_ntt(destination_dict, message_dict, AWS_SES_REGION, SENDER)
        print(ses_response)
        # And finally return response to the user (saying an email has been sent, no error info)
        return default_response

    #### Second, call endpoint and see Tycho has admins ##############
    URL = get_endpoint(env,RESOURCE)
    print(URL)
    request_payload = {
        "tychoSubId": tycho_sub_id
    }

    request_payload = json.dumps(request_payload).encode('utf8')
    request = urllib.request.Request(URL, 
                                    data=request_payload, 
                                    headers={'content-type': 'application/json'})
    response = None
    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT) as opened_url:
            response = opened_url.read().decode('utf-8')
            response = json.loads(response)
            print("HTTP response code: ", opened_url.getcode())
            print(response)
    except urllib.error.HTTPError as e:
        error_message_ntt = f"HTTP error while sending POST request! Check permissions. Error: {e}"
        print(error_message_ntt)
        error_list_ntt.append(error_message_ntt)
    except urllib.error.URLError as e:
        error_message_ntt = f"URL error while sending POST request! Check endpoint. Error: {e}"
        print(error_message_ntt)
        error_list_ntt.append(error_message_ntt)
    except Exception as e:
        error_message_ntt = f"Unknown exception while sending POST request: {e}"
        print(error_message_ntt)
        error_list_ntt.append(error_message_ntt)

    if response:
        try:
            tycho_admin_list = response["adminList"]
        except KeyError as e:
            error_message_ntt = f"Following keys missing from request: {e}"
            print(error_message_ntt)
            error_list_ntt.append(error_message_ntt)
            tycho_admin_list = []
    else:
        print("No response, specifically response was: ", response)
        tycho_admin_list = []


    if not tycho_admin_list:
        error_message_ntt = f"No admins returned for Tycho {device_sn}"
        print(error_message_ntt)
        error_list_ntt.append(error_message_ntt)
        # Send email to NTT and return to user
        destination_dict, message_dict = create_email_ntt(device_sn, user_sub, message_ntt, error_list_ntt)   
        ses_response = send_mail_ntt(destination_dict, message_dict, AWS_SES_REGION, SENDER)
        print(ses_response)
        return default_response
    
    # If we have admins in the response then try to retrieve from Cognito

    admin_email_list = []
    for admin_sub_id in tycho_admin_list:
        try:
            filter_user_sub = f"sub = \"{admin_sub_id}\""
            cognito_response = cognito_client.list_users(UserPoolId=user_pool_id,
                                                        AttributesToGet=['email'],
                                                        Filter=filter_user_sub)
            if cognito_response['Users']:
                admin_email = cognito_response['Users'][0]['Attributes'][0]['Value']
                message_ntt = message_ntt + f"User email: {admin_email} found.\r\n"
                admin_email_list.append(admin_email)
        except cognito_client.exceptions.UserNotFoundException:
            error_message_ntt = f"{admin_sub_id} doesn't exist"
            print(error_message_ntt)
            error_list_ntt.append(error_message_ntt)

    # If no emails are found, return and notify NTT
    if not admin_email_list:
        error_message_ntt = f"No admins emails found for user sub IDs {tycho_admin_list}"
        print(error_message_ntt)
        error_list_ntt.append(error_message_ntt)
        # Send email to NTT and return to user
        destination_dict, message_dict = create_email_ntt(device_sn, user_sub, message_ntt, error_list_ntt)   
        ses_response = send_mail_ntt(destination_dict, message_dict, AWS_SES_REGION, SENDER)
        print(ses_response)
        return default_response

    # Otherwise send the admins an email..
    for admin_email in admin_email_list:
        try:
            destination_dict, message_dict = create_email_admin(device_sn, user_email, admin_email)
            ses = boto3.client('ses',region_name=AWS_SES_REGION)
            # Provide the contents of the email.
            ses_response = ses.send_email(
                Destination=destination_dict,
                Message=message_dict,
                Source=SENDER
            )
            print(ses_response)
            message_ntt = message_ntt + f"Email sent to: {admin_email}.\r\n"
            message_ntt = message_ntt + f"Response was: {ses_response}.\r\n"
        except ClientError as e:
            error_message_ntt = (f"Failed: SES Response {e.response['Error']['Message']}"
                                f"To email address: {admin_email}")
            print(error_message_ntt)
            error_list_ntt.append(error_message_ntt)

    # Then send NTT an email...
    print(message_ntt)
    # Send email to NTT and return to user
    destination_dict, message_dict = create_email_ntt(device_sn, user_sub, message_ntt, error_list_ntt, message_sent=True)   
    ses_response = send_mail_ntt(destination_dict, message_dict, AWS_SES_REGION, SENDER)
    print(ses_response)
    # ...and finally return to user
    return default_response




#############################
    
