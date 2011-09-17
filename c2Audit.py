import sys
import pymssql
import syslog
auditFilePath = 'c:\ossim'
auditUser = "sa"
auditPassword = "launchteltel"
auditDatabase = "master"
auditHost = "192.168.82.187"
auditLogFilename = "/tmp/c2.log"

def getTraceTable(_cursor,filename):
	#filter avt sql command
	auditFilterSQLCmd = "where (ApplicationName!= '"+'pymssql'+"'  and HostName != '"+'192.168.56.150'+"')"
	sql = "select cast(textdata as text) as textdata, applicationname,loginname,duration,starttime,endtime,cpu,ntusername,hostname from ::fn_trace_gettable('"+filename+"',default)"+auditFilterSQLCmd
	try:
		_cursor.execute(sql);
		row = _cursor.fetchall();
	except Exception, e:
		print sql
		print "getTraceTable:",e
	return row;

def auditTurnOn(_cursor,_ID):
	_cursor.execute("declare @rc int;exec @rc=sp_trace_setstatus "+str(_ID)+",1;select @rc");
	row=_cursor.fetchone();
	return row;
def auditTurnOff(_cursor,_ID):
	id = str(_ID)
	try:
		_cursor.execute("exec sp_trace_setstatus "+id+",0");
		_cursor.execute("exec sp_trace_setstatus "+id+",2");
	except Exception, e:
		print "auditTurnOff:",e
		return -1;
	return 0;
	
def enableNewAudit(_cursor,_filename):
	sql ="declare @rc int,@traceid int;exec @rc = sp_trace_create @traceid output,0,\""+_filename+"\";select @rc,@traceid,'"+_filename+"'"
	_cursor.execute(sql);
	row=_cursor.fetchone()
	if row[0] > 0:
		return -1;
	return row[1];

def enableEventType(_cursor,_eventId):
	#http://msdn.microsoft.com/en-us/library/ms186265.aspx
	sql = "declare @on bit\
	set @on=1\
	exec sp_trace_setevent {id}, 14, 1, @on\
	exec sp_trace_setevent {id}, 14, 9, @on\
	exec sp_trace_setevent {id}, 14, 6, @on\
	exec sp_trace_setevent {id}, 14, 8, @on\
	exec sp_trace_setevent {id}, 14, 10, @on\
	exec sp_trace_setevent {id}, 14, 14, @on\
	exec sp_trace_setevent {id}, 14, 11, @on\
	exec sp_trace_setevent {id}, 14, 12, @on\
	exec sp_trace_setevent {id}, 15, 15, @on\
	exec sp_trace_setevent {id}, 15, 16, @on\
	exec sp_trace_setevent {id}, 15, 9, @on\
	exec sp_trace_setevent {id}, 15, 17, @on\
	exec sp_trace_setevent {id}, 15, 6, @on\
	exec sp_trace_setevent {id}, 15, 8, @on\
	exec sp_trace_setevent {id}, 15, 10, @on\
	exec sp_trace_setevent {id}, 15, 14, @on\
	exec sp_trace_setevent {id}, 15, 18, @on\
	exec sp_trace_setevent {id}, 15, 11, @on\
	exec sp_trace_setevent {id}, 15, 12, @on\
	exec sp_trace_setevent {id}, 15, 13, @on\
	exec sp_trace_setevent {id}, 17, 1, @on\
	exec sp_trace_setevent {id}, 17, 8, @on\
	exec sp_trace_setevent {id}, 17, 9, @on\
	exec sp_trace_setevent {id}, 17, 6, @on\
	exec sp_trace_setevent {id}, 17, 10, @on\
	exec sp_trace_setevent {id}, 17, 14, @on\
	exec sp_trace_setevent {id}, 17, 11, @on\
	exec sp_trace_setevent {id}, 17, 12, @on\
	exec sp_trace_setevent {id}, 10, 15, @on\
	exec sp_trace_setevent {id}, 10, 16, @on\
	exec sp_trace_setevent {id}, 10, 9, @on\
	exec sp_trace_setevent {id}, 10, 8, @on\
	exec sp_trace_setevent {id}, 10, 17, @on\
	exec sp_trace_setevent {id}, 10, 2, @on\
	exec sp_trace_setevent {id}, 10, 10, @on\
	exec sp_trace_setevent {id}, 10, 18, @on\
	exec sp_trace_setevent {id}, 10, 11, @on\
	exec sp_trace_setevent {id}, 10, 12, @on\
	exec sp_trace_setevent {id}, 10, 13, @on\
	exec sp_trace_setevent {id}, 10, 6, @on\
	exec sp_trace_setevent {id}, 10, 14, @on\
	exec sp_trace_setevent {id}, 12, 15, @on\
	exec sp_trace_setevent {id}, 12, 16, @on\
	exec sp_trace_setevent {id}, 12, 1, @on\
	exec sp_trace_setevent {id}, 12, 8, @on\
	exec sp_trace_setevent {id}, 12, 9, @on\
	exec sp_trace_setevent {id}, 12, 17, @on\
	exec sp_trace_setevent {id}, 12, 6, @on\
	exec sp_trace_setevent {id}, 12, 10, @on\
	exec sp_trace_setevent {id}, 12, 14, @on\
	exec sp_trace_setevent {id}, 12, 18, @on\
	exec sp_trace_setevent {id}, 12, 11, @on\
	exec sp_trace_setevent {id}, 12, 12, @on\
	exec sp_trace_setevent {id}, 12, 13, @on\
	exec sp_trace_setevent {id}, 13, 1, @on\
	exec sp_trace_setevent {id}, 13, 8, @on\
	exec sp_trace_setevent {id}, 13, 9, @on\
	exec sp_trace_setevent {id}, 13, 6, @on\
	exec sp_trace_setevent {id}, 13, 10, @on\
	exec sp_trace_setevent {id}, 13, 14, @on\
	exec sp_trace_setevent {id}, 13, 11, @on\
	exec sp_trace_setevent {id}, 13, 12, @on"
	#print sql.replace("{id}",str(_eventId));
	_cursor.execute(sql.replace("{id}",str(_eventId)));
	return 0;

newAuditFileSQL = "select '"+auditFilePath+"'+REPLACE(REPLACE(REPLACE(CONVERT(VARCHAR(19), getdate(), 120),':',''),' ',''),'-','') "
conn = pymssql.connect(host=auditHost, user=auditUser, password=auditPassword, database=auditDatabase)
cur = conn.cursor()
cur.execute(newAuditFileSQL)
row = cur.fetchone()
newAuditFileName = row[0]

#----get old filename------
oldAuditFileSQL = "select traceid,convert(nvarchar(1000),value) as filename from ::fn_trace_getinfo(default) where property=2"
oldAuditFilename = "NoFile"
oldAuditID = -1;
try:
	cur.execute(oldAuditFileSQL);
	row=cur.fetchall();
	if cur.rowcount > 0:
		oldAuditFilename = row[0][1]
		oldAuditID=row[0][0]
except Exception, e:
   print "Error: unable to fecth data:", e

if oldAuditFilename == "NoFile":
	print "File not found"
else:
	auditTurnOff(cur,oldAuditID);

newAuditID = enableNewAudit(cur,newAuditFileName);
#print rc
enableEventType(cur,newAuditID);
auditTurnOn(cur,newAuditID);
if oldAuditFilename =="NoFile":
	print "no old file"
	conn.close();
	sys.exit(-1)
rc = getTraceTable(cur,oldAuditFilename+".trc")
#logFile = open(auditLogFilename,'w+')
for rec in rc:
	recLine = "[C2Audit]";
	for field in rec:
		recLine += str(field)+'||'
	syslog.syslog(recLine);
#	logFile.write(recLine+"\n");
#logFile.close();
conn.close()
print "done"
sys.exit(0);
