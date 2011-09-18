CREATE TABLE servers (rowid INTEGER PRIMARY KEY, host, port INTEGER, user, pass, path, updated, enabled BOOLEAN);
CREATE TABLE trace (rowid INTEGER PRIMARY KEY, serverid INTEGER, eventid INTEGER, columnid INTEGER, enabled BOOLEAN);
--
--INSERT INTO "servers" VALUES (NULL, "192.168.82.187", NULL, "sa", "launchteltel", "c:\\ossim", datetime("now"), 0);
--
INSERT INTO servers (rowid, host, user, pass, path, updated, enabled)
       VALUES       (1, "192.168.82.187", "sa", "launchteltel", "c:\ossim", datetime("now"), 0);
INSERT INTO trace (serverid, eventid, columnid, enabled)
       VALUES     (1, 2, 3, 0);
