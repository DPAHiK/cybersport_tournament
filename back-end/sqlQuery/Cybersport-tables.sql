CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "team_members" (
	"id" serial NOT NULL UNIQUE,
	"team_id" bigint NOT NULL,
	"user_id" bigint NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"role" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "tournaments" (
	"id" serial NOT NULL UNIQUE,
	"title" varchar(255) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"organizer_id" bigint,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "engaged_teams"(
	"id" serial NOT NULL UNIQUE,
	"tournament_id" bigint NOT NULL,
	"team_id" bigint NOT NULL,
	"team_grid_status" int NOT NULL,
	PRIMARY KEY ("id")

);

CREATE TABLE IF NOT EXISTS "team_queries" (
	"id" serial NOT NULL UNIQUE,
	"team_id" bigint,
	"tournament_id" bigint NOT NULL,
	"sending_date" date NOT NULL,
	"status" boolean,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "tournament_results" (
	"id" serial NOT NULL UNIQUE,
	"tournament_id" bigint NOT NULL,
	"team_id" bigint NOT NULL,
	"place" bigint NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "matches" (
	"id" serial NOT NULL UNIQUE,
	"tournament_id" bigint NOT NULL,
	"is_team1_winner" boolean,
	"grid_level" int NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"team1_id" bigint,
	"team2_id" bigint,
	PRIMARY KEY ("id")
);

ALTER TABLE "team_members" ADD CONSTRAINT "team_members_fk4" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE;
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_fk5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE "engaged_teams" ADD CONSTRAINT "engaged_team_fk5" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE CASCADE;
ALTER TABLE "engaged_teams" ADD CONSTRAINT "engaged_team_fk6" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE;

ALTER TABLE "team_queries" ADD CONSTRAINT "team_query_fk1" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE set null;
ALTER TABLE "team_queries" ADD CONSTRAINT "team_query_fk2" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE CASCADE;

ALTER TABLE "tournament_results" ADD CONSTRAINT "tournament_result_fk1" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE CASCADE;

ALTER TABLE "tournament_results" ADD CONSTRAINT "tournament_Result_fk2" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE;

ALTER TABLE "matches" ADD CONSTRAINT "match_fk1" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE CASCADE;
ALTER TABLE "matches" ADD CONSTRAINT "match_fk5" FOREIGN KEY ("team1_id") REFERENCES "teams"("id") ON DELETE set null;
ALTER TABLE "matches" ADD CONSTRAINT "match_fk6" FOREIGN KEY ("team2_id") REFERENCES "teams"("id") ON DELETE set null;
