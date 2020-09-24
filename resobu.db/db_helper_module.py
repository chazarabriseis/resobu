# -*- coding: utf-8 -*-
"""
Created on Tue August 4th 2020

Module of functions needed for communication with Postgres DB using SQL
Alchemy. Should be imported for functions like create_table, load_data,
and so on.

Classes here are to hold the different tables - defines database schema.
The Base = declarative_base() call beforehand defines a base class from
which mapped classes inherit; each class definition generates a Table and
mapper.


@author: chris battle, edited by julia baldauf
"""
import numpy as np
import numbers
import base64
import os
import ast
from datetime import datetime
from sqlalchemy import and_
from sqlalchemy.engine.url import URL
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import relationship, load_only, sessionmaker
from sqlalchemy import (Column, String, Float, Numeric, Boolean, Integer, DateTime, ForeignKey,
                        LargeBinary, create_engine, inspect, Sequence)
from sqlalchemy.dialects.postgresql import JSONB, ARRAY
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


# Define table classes
class EmployeesTable(Base):
    __tablename__ = 'employees'
    employeeEmail = Column(String, primary_key=True)
    employeeId = Column(Integer, Sequence("employee_Id_sequence")) #sometimes a number was missed when testing...
    userSubId = Column(String)
    teamColleagues = Column(ARRAY(String))
    projectColleagues = Column(ARRAY(String))
    connectedColleagues = Column(ARRAY(String))


class SocialButterflyChatsTable(Base):
    __tablename__ = 'socialbutterflychats'
    userSubId = Column(String, primary_key=True)
    meetingId = Column(Integer, Sequence("meeting_Id_sequence"))
    meetingInfo = Column(JSONB)


class ChatsTable(Base):
    __tablename__ = 'chats'
    chatId = Column(Integer, primary_key=True, autoincrement=True)
    userSubId = Column(String)
    participants = Column(ARRAY(String))
    date = Column(DateTime)


def get_postgres_credentials(filepath_db_credentials):
    """
    Load a postgres database credentials file with the format of a python dict.
    File must have following format:
    {'drivername': 'postgres',
    'username': <database_user>,
    'password': <password>,
    'host': <host>,
    'port': <port>}
    saved as a txt file. Gives an UnboundLocalError at the return statement
    if an eval statement failed.

    Update: Now the file can be passed a python dictionary directly or a string
    containing the credentials in the format given above.

    Parameters
    ----------
    filepath str to database credentials file, dict, or str of credentials -
    string or dict must be in the format above

    Returns
    -------
    dict
        Dictionary representation postgres db credentials or error string

    """
    # if the credentials are passed directly as a dict, pass them on
    if isinstance(filepath_db_credentials, dict):
        db_credentials_dict = filepath_db_credentials
    # if filepath exists read it in
    elif os.path.exists(filepath_db_credentials):
        try:
            # use ast lib to do safe eval
            with open(filepath_db_credentials) as f:
                db_credentials_dict = ast.literal_eval(f.read().strip('\n'))
        except (ValueError, SyntaxError):
            print('ReadError: Error converting database credentials into dict')
    # otherwise try to convert it, if string, to dictionary
    elif isinstance(filepath_db_credentials, str):
        try:
            db_credentials_dict = ast.literal_eval(filepath_db_credentials)
        except (ValueError, SyntaxError):
            print('ReadError: Error converting database credentials into dict')
    # check that a dictionary was returned
    try:
        assert isinstance(db_credentials_dict, dict)
    except AssertionError:
        print("CredentialTypeError: Database credentials not 'dict' type.")
    return db_credentials_dict
    

def generate_engine(filepath_db_credentials):
    """
    Create an SQL Alchemy engine to connect with the postgres DB

    Parameters
    ----------
    filepath :  str
        path to database credentials file.

    Returns
    -------
    SQL Alchemy engine object

    """
    postgres_db = get_postgres_credentials(filepath_db_credentials)
    engine = create_engine(URL(**postgres_db))
    return engine


def generate_session(engine):
    """
    Create an SQL Alchemy session to add/fetch records from DB
    Parameters
    ----------
    SQL Alchemy engine object

    Returns
    -------
    SQL Alchemy session object

    """
    Session = sessionmaker()
    Session.configure(bind=engine)
    session = Session()
    return session


def create_all_tables(Table, engine):
    """
    Creates all user-defined tables in db (from db_helper_module). Uses
    metadata from the declarative base class, so only one of the user-
    defined tables needs to be passed to this function for it to create
    all the tables.

    Parameters
    ----------
    database engine object and user-defined table with metadata

    Returns
    -------
    Error string

    """
    try:
        Table.metadata.create_all(bind=engine)
        return 'Tables successfully created.'
    except SQLAlchemyError as e:
        return e


def create_db_table(Table, engine):
    """
    Creates a user-defined table in db (from db_helper_module).

    Parameters
    ----------
    database engine object and user-defined table

    Returns
    -------
    None or error

    """
    try:
        Table.__table__.create(bind=engine)
        return 'Table successfully created.'
    except SQLAlchemyError as e:
        return e


def insert_row(Table, input_dict, engine, session):
    """
    Convert an input dictionary to a row object and insert in database. Input
    dictionary must have been previously formatted.

    Parameters
    ----------
    - SQL Alchemy Table object
    - dictionary of input values
    - database engine object
    - session object

    Returns
    -------
    Success or error message string

    """
    # Retrieve column names from table
    col_names = Table.__table__.columns.keys()

    # Build a dictionary to pass as a row to the table
    row_dict = {}
    for name in col_names:
        if name in input_dict.keys():
            row_dict[name] = input_dict[name]
        else:
            row_dict[name] = None
    if all(val is None for val in row_dict.values()):
        return('Row empty, was not added')
    row = Table(**row_dict)
    # Add and commit row
    try:
        session.add(row)
        session.commit()
        session.flush()  # Do this to be able to catch psycopg2 errors
        return 'Add successful'
    except SQLAlchemyError as e:
        session.rollback()  # Do this to be able to catch psycopg2 errors
        if 'duplicate key value' in e.args[0]:  # flag if key exists
            return('Key already exists')
        else:
            return e


def insert_row_and_return_row(Table, input_dict, engine, session):
    """
    Convert an input dictionary to a row object and insert in database. Input
    dictionary must have been previously formatted.

    Parameters
    ----------
    - SQL Alchemy Table object
    - dictionary of input values
    - database engine object
    - session object

    Returns
    -------
    Inserted row

    """
    # Retrieve column names from table
    col_names = Table.__table__.columns.keys()

    # Build a dictionary to pass as a row to the table
    row_dict = {}
    for name in col_names:
        if name in input_dict.keys():
            row_dict[name] = input_dict[name]
        else:
            row_dict[name] = None
    if all(val is None for val in row_dict.values()):
        return('Row empty, was not added')
    row = Table(**row_dict)
    # Add and commit row
    try:
        session.add(row)
        session.commit()
        session.flush()  # Do this to be able to catch psycopg2 errors
        return row
    except SQLAlchemyError as e:
        session.rollback()  # Do this to be able to catch psycopg2 errors
        if 'duplicate key value' in e.args[0]:  # flag if key exists
            return('Key already exists')
        else:
            return e
            

def row_object_as_dict(row):
    """
    Function to convert row returned from query to dictionary. The row object
    is an instance of the Table class that it is queried from. This is more
    complicated than it should be because row.__dict__ accesses the internal
    dict of the Table object and adds an extra column '_sa_instance_state'. I
    originally just popped it off but then changed to building another
    dictionary filtered by the table's column values to make it more robust.
    Useful discussion is here:

    https://stackoverflow.com/questions/1958219/convert-sqlalchemy-row-object-to-python-dict

    Note that some of the more popular answers here do funny things like
    convert the dict values to strings and don#t work with my filtering via
    load_only in the row_data_list function below. Be careful!

    Parameters
    ----------
    row from SQL Alchemy query (Table object)

    Returns
    -------
    dictionary

    """
    # Stopped using these after trying them since they both mess up filtering 
    # by field list in row_data_list function below
    
    # row_dict = {c.key: getattr(row, c.key)
    #             for c in inspect(row).mapper.column_attrs}

    # row_dict = {}
    # for column in row.__table__.columns:
    #     row_dict[column.name] = str(getattr(row, column.name))

    row_dict = row.__dict__
    # Get rid of extra columns from comversion, like '_sa_instance_state'
    # Have to add to empty dict to avoid errors with changing a dict while 
    # iterating over it
    row_subdict = {}
    for key, value in row_dict.items():
        if key in inspect(row).mapper.column_attrs:
            row_subdict[key] = value

    return row_subdict


def format_row_object_list(row_list):
    """
    Change input list of row objects in-place to a list of dicts with
    timestamps converted to unix style epoch floats

    Parameters
    ----------
    list of rows from SQL Alchemy query (Table objects)

    Returns
    -------
    dictionary (with datetime objects converted to floats)

    """
    for idx, item in enumerate(row_list):
            row_dict = row_object_as_dict(item)
            convert_datetime_to_unix_epoch(row_dict)
            row_list[idx] = row_dict


def convert_datetime_to_unix_epoch(dict_in):
    """
    Function that searches through dictionary and in-place
    converts the datetime objects to unix epoch time (float).
    To convert back do
    datetime.fromtimestamp(ts)
    which returns a datetime object from the float. Note that datetime objects
    are stored without timezone!

    Parameters
    ----------
    dictionary (with datetime objects)

    Returns
    -------
    dictionary with datetime objects converted to floats

    """
    for key, value in dict_in.items():
        if isinstance(value, datetime):
            dict_in[key] = value.timestamp()


def get_row_data_list(filter_value, filter_key, field_list, Table,
                      engine, session):
    """
    Retrieve a list of records from the database based on a filter key. Setting
    a filter key or value to '' will return all values in table. An empty field
    list will return all columns matching the filter search. Converts datetime
    objects to unix epoch timestamp without timezone

    Parameters
    ----------
    value to filter on (str), table column name to filter on (string), fields
    to include in returned list, Table object, SQL Alchemy engine
    object, SQL Alchemy session object

    Returns
    -------
    list of dictionary representations of the database records. Traces stored
    as binary data and must be decoded with transform_trace_data_to_nparray

    """
    try:
        # If filter key and filter value are '', return all records
        if (filter_value == '') | (filter_key == ''):
            row_list = session.query(Table).all()
        # Or if field list is empty return all rows matching filter_key
        elif not field_list:
            row_list = session.query(Table).filter(getattr(Table, filter_key) ==
                                                   filter_value).all()
        # Otherwise return subset of column rows filtered on filter_key value
        else:
            row_list = session.query(Table).filter(getattr(Table, filter_key) ==
                                                   filter_value).options(
                                                   load_only(*field_list)).all()
        # Convert row objects in list to dictionary and to unix epoch timestamp
        format_row_object_list(row_list)
        return row_list

    except SQLAlchemyError as e:
        message = ' Check that field values in list exist in table'
        if len(e.args) >= 1:
            e.args = (e.args[0] + message,) + e.args[1:]
        return e
