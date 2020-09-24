 #!/usr/bin/env python
# coding: utf-8

# # Notebook to replace the pgadmin which we use to query our DB

# ### Import necessary packages

# In[1]:


import numpy as np
import pickle
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib


# In[2]:


from sqlalchemy import Table, MetaData
from db_helper_module import (ExperimentTable, CapillaryTable,
                              ConcentrateResultTable,
                              FunctionalityResultTable,
                              TychosTable,
                              generate_engine,
                              generate_session)


# ### Onle the Data science Team has the credentials, so get in touch with them. They have read only credentials
# 
# Connect to the DB creating an egine using sqlalchemy

# In[16]:


# Setup db connection
FILEPATH_DB_CREDENTIALS = 'C:\\Users\\julia.baldauf\\Desktop\\Julia\\Scripts\\Postgres\\NT.Cloud DB\\prod_DB_cred'
engine = generate_engine(FILEPATH_DB_CREDENTIALS)
connection = engine.connect()


# ### List of table names in the DB

# In[14]:


metadata = MetaData()
engine.table_names()


# ### Change here the table name that you are interested in

# In[5]:


table_of_interest = 'tychos'
table = Table('tychos', metadata, autoload=True, autoload_with=engine)


# ### Overview of columns in the table

# In[15]:


table.columns.keys()


# ### Get entries from the table
# To get the several results use fetchmany(number of results), to fetch all fetchall() and for just one fetchone()
# 
# Examples for the quereis with sqlalchemy can befound here. SImple add query after query to the stmt statement.
# http://www.rmunn.com/sqlalchemy-tutorial/tutorial.html

# In[45]:


from sqlalchemy import or_, select, and_, not_, func


# In[46]:


stmt = select([table])
first_results = connection.execute(stmt).fetchmany(5)
pd.DataFrame(first_results)


# In[47]:


stmt = select([table])
stmt = stmt.where(table.columns.device_sn == 'T6-039')
results = connection.execute(stmt).fetchall()
pd.DataFrame(results)


# In[ ]:





# In[ ]:




