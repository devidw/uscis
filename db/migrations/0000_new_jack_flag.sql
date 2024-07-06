CREATE TABLE IF NOT EXISTS "cases" (
	"id" varchar(13) PRIMARY KEY NOT NULL,
	"email" varchar(256),
	"last_status" varchar(256) DEFAULT '',
	"last_check" date
);
