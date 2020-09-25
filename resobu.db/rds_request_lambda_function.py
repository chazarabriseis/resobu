"""
Lambda function for the insertion of data to the DB

@author: julia.baldauf
"""
import simplejson
import base64
from sqlalchemy.exc import SQLAlchemyError
import db_helper_module as dbhm
import boto3
import functools

client = boto3.client('ssm')


def get_parameter():
    try:
        response = client.get_parameter(Name='resobu.db_cred',WithDecryption=True)
        return response['Parameter']['Value']
    except client.exceptions.ParameterNotFound:
        print("ParameterNotFound error")
        raise
   

def return_message(result_dict):
    # If any adds are successful, return success
    if 'Add successful' in result_dict['result']:
        return {"errorMessage": result_dict['result'], "errorType": "Add successful"}
    # If some keys already exist with no adds successful, return already exists
    elif 'Key already exists' in result_dict['result']:
        return {"errorMessage": result_dict['result'], "errorType": "Key already exists"}
    else:
        return {**result_dict['result']}


def catch_missing_event_params(func):
    @functools.wraps(func) # to keep function ID straight
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except KeyError as e:
            print('Following keys missing from request: ', e)
            raise Exception({
                    "errorType": "ParameterException",
                    "httpStatus": 400,
                    "message": "Required function parameters not present"
                    })
    return wrapper


@catch_missing_event_params
def get_vars_from_event(event,*keys):
    '''Func to cycle through event keys and return them, meant to be wrapped
    with the catch_missing_event_params decorator'''
    var_list = []
    for key in keys:
        var_list.append(event[key])
    return var_list


def lambda_handler(event, context):
    context.callbackWaitsForEmptyEventLoop = 'false'
    filepath_db_credentials = get_parameter()

    # just return all columns 
    employees_field_list = dbhm.EmployeesTable.__table__.columns.keys()
    socialbutterflychats_field_list = dbhm.SocialButterflyChatsTable.__table__.columns.keys()
    chats_field_list = dbhm.ChatsTable.__table__.columns.keys()

    try:
        user_sub = event["usertoken"]
        command_to_perform = event["requesttype"]
        print(command_to_perform)

    except KeyError:
        raise Exception({
                "errorType": "Exception",
                "httpStatus": 500,
                "message": "Required function parameters not present"
                })

    try:
        engine = dbhm.generate_engine(filepath_db_credentials)
        session = dbhm.generate_session(engine)
        if session:
            print("Session opened")

        if command_to_perform == 'listemployees':
            filter_key = 'userSubId'
            # filter result based on user id to only return relevant results
            result = dbhm.get_row_data_list(user_sub, filter_key, employees_field_list,
                                            dbhm.EmployeesTable, engine, session)

            # return simplejson.dumps with default str to avoid datetime problems
            return simplejson.dumps(result, ignore_nan=True, default=str)

        if command_to_perform == 'listmeeting':
            filter_key = 'userSubId'
            # filter result based on user id to only return relevant results
            result = dbhm.get_row_data_list(user_sub, filter_key,
                                       socialbutterflychats_field_list,
                                       dbhm.SocialButterflyChatsTable,
                                       engine, session)

            # return simplejson.dumps with default str to avoid datetime problems
            return simplejson.dumps(result, ignore_nan=True, default=str)

        if command_to_perform == 'listchats':
            filter_key = 'userSubId'
            # filter result based on user id to only return relevant results
            result = dbhm.get_row_data_list(user_sub, filter_key,
                                       chats_field_list,
                                       dbhm.ChatsTable,
                                       engine, session)

            # return simplejson.dumps with default str to avoid datetime problems
            return simplejson.dumps(result, ignore_nan=True, default=str)

        if command_to_perform == 'insertrows':
            try:
                table_name = event['table_name']
                list_to_insert = event['list_to_insert']

            except KeyError:
                raise Exception({
                        "errorType": "Exception",
                        "httpStatus": 500,
                        "message": "Required function parameters not present"
                        })
            # Store results in db
            try:
                if table_name == 'EmployeesTable':
                    for row in list_to_insert:
                        input_dict = row
                        db_add_row = dbhm.insert_row(dbhm.EmployeesTable,
                                                     input_dict, engine, session)
                if table_name == 'SocialButterflyChatsTable':
                    for row in list_to_insert:
                        input_dict = row
                        db_add_row = dbhm.insert_row(dbhm.SocialButterflyChatsTable,
                                                     input_dict, engine, session)

                if table_name == 'ChatsTable':
                    for row in list_to_insert:
                        input_dict = row
                        db_add_row = dbhm.insert_row(dbhm.ChatsTable,
                                                     input_dict, engine, session)

                print(db_add_row)
            except SQLAlchemyError:
                print("SQLAlchemyError")
                raise

        if command_to_perform == 'insertrow':
            try:
                table_name = event['table_name']
                input_dict = event['input_dict']   
                input_dict['user_sub_id'] = user_sub

            except KeyError:
                raise Exception({
                        "errorType": "Exception",
                        "httpStatus": 500,
                        "message": "Required function parameters not present"
                        })
            # Store results in db
            try:
                if table_name == 'EmployeesTable' :
                    db_add_result = dbhm.insert_row(dbhm.EmployeesTable,
                                                    input_dict, engine, session)
                if table_name == 'SocialButterflyChatsTable' :
                    db_add_result = dbhm.insert_row(dbhm.SocialButterflyChatsTable,
                                                    input_dict, engine, session)
                if table_name == 'ChatsTable' :
                    db_add_result = dbhm.insert_row(dbhm.ChatsTable,
                                                    input_dict, engine, session)

                print(db_add_result)
            except SQLAlchemyError:
                print("SQLAlchemyError")
                raise

        if command_to_perform == 'changerowvalues':
            # Insert specific columns to the DB
            try:
                table_name = event['table_name']
                col_id = event['col_id']
                changes = event['changes']
            except KeyError:
                raise Exception({
                    "errorType": "Exception",
                    "httpStatus": 500,
                    "message": "Event function parameters missing."
                })

            if table_name == 'EmployeesTable':
                for change in changes:
                    if change not in employees_field_list:
                        return {"errorMessage": "Can't find column name in Employee table!",
                                "errorType": "Invalid column name",
                                "stackTrace": ""}

                # Try to add to table
                result = []
                row = session.query(dbhm.EmployeesTable).filter(
                    dbhm.EmployeesTable.employeeId == col_id).first()
                for change in changes:
                    setattr(row, change, changes[change])
                try:
                    session.add(row)
                    session.commit()
                    session.flush()
                    result.append('Add successful')
                except SQLAlchemyError:
                    session.rollback()
                    raise

            if table_name == 'SocialButterflyChatsTable':
                for change in changes:
                    if change not in socialbutterflychats_field_list:
                        return {"errorMessage": "Can't find column name in Social Butterly Chats table!",
                                "errorType": "Invalid column name",
                                "stackTrace": ""}

                # Try to add to table
                result = []
                row = session.query(dbhm.SocialButterflyChatsTable).filter(
                    dbhm.SocialButterflyChatsTable.userSubId == user_sub).first()
                for change in changes:
                    setattr(row, change, changes[change])
                try:
                    session.add(row)
                    session.commit()
                    session.flush()
                    result.append('Add successful')
                except SQLAlchemyError:
                    session.rollback()
                    raise

            if table_name == 'ChatsTable':
                for change in changes:
                    if change not in chats_field_list:
                        return {"errorMessage": "Can't find column name in Chat table!",
                                "errorType": "Invalid column name",
                                "stackTrace": ""}

                # Try to add to table
                result = []
                row = session.query(dbhm.ChatsTable).filter(
                    dbhm.ChatsTable.chatId == col_id).first()
                for change in changes:
                    setattr(row, change, changes[change])
                try:
                    session.add(row)
                    session.commit()
                    session.flush()
                    result.append('Add successful')
                except SQLAlchemyError:
                    session.rollback()
                    raise

            return {"errorMessage": result, "errorType": "Add successful", "stackTrace": ""}

        if command_to_perform == 'deleterow':
            # This command needs the table name, the column name to filter on, a user sub ID column,
            # and a unique ID to delete the row. If there are foreign key constraints this
            # can fail - for example in the case of capillaries/experiments/best_matches.

            # Typical use case is to delete a row from a results table by giving the result ID. In
            # the case of an entry without an explicit user sub ID column, need to modify filter rule
            # via a join or like operator (with exp_user_uid for CapillaryTable)

            # Get relevant vars from event
            table_name, uid_column_name, usertoken_column_name, uid = get_vars_from_event(event,
                                                                                        'tableName',
                                                                                        'uidColumnName',
                                                                                        'usertokenColumnName',
                                                                                        'uid')

            # Get table object
            table = dbhm.__dict__[table_name]

            # Create filter rule - filter also on user sub to make sure record belongs to requesting user
            filter_rule = (getattr(table,uid_column_name) == uid) & (getattr(table, usertoken_column_name) == user_sub)

            try:
                num_entries_deleted = session.query(table).filter(filter_rule).delete()
                print(f"{num_entries_deleted} records were deleted")
                if num_entries_deleted == 0:
                    message = "Employee could not not be found, possibly already deleted"
                    print(message)
                    return  {"errorType": "NoRecordFoundError",
                            "httpStatus": 400,
                            "message": message}
                session.commit()
                session.flush()
                message = 'Delete successful'
                print(message)
                return  {"errorType": "Success",
                        "httpStatus": 200,
                        "message": message}
            except SQLAlchemyError:
                session.rollback()
                raise
            except AttributeError as e:
                # Catch cases where entry doesn't exist/already deleted
                message = str(e)
                print(message)
                return  {"errorType": str(type(e).__name__),
                        "httpStatus": 400,
                        "message": message}

        else:
            print('Unknown command')

    except SQLAlchemyError:
        print("SQLAlchemyError")
        raise
    finally:
        # Put engine dispose first, in case session never gets created
        engine.dispose()
        session.close()
        print("Session closed")

