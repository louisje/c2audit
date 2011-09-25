System Requirement:

 * SQLite
 * Apache + PHP5
 * PHP5 modules
   + php5-sqlite
   + php5-sybase

Installation Steps:

 1. Opne indes.php in browser and follow the instructions

Files Description:

 * README.txt - what you are reading
 * db/        - data file folder (should be writable)
 * jqgrid/    - jqGrid library
 * schema.sql - SQLite schema
 * servers.php
 * trace.php
 * common.php
 * main.js
 * index.php

Schema Description:

 * servers
   + rowid
   + host
   + port
   + user
   + pass
   + path
   + updated
   + enabled

 * trace
   + rowid
   + serverid
   + eventid
   + columnid
   + enabled
