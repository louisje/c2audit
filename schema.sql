CREATE TABLE servers(rowid, host, port, user, pass, path, updated, enabled);
CREATE TABLE trace(rowid, eventid, columnid, enabled);
INSERT INTO "servers" VALUES (NULL, "192.168.82.187", NULL, "sa", "launchteltel", "c:\\ossim", datetime("now"), 0);
