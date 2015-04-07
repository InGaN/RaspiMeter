# Add all data from the previous day.

import MySQLdb as mdb
import datetime

con = mdb.connect(PYTHON_CONNECT);

with con:
	value = 0;
	cur = con.cursor()	
	cur.execute(PYTHON_QUERY_DAY_COUNT)
	
	for i in range(cur.rowcount):
		row = cur.fetchone()
        value = row[0]
		
	cur.execute(PYTHON_QUERY_DAY_INSERT)	
	con.commit()
	print("Value "+str(value)+" was added")
