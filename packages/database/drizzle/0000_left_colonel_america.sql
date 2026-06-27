CREATE TABLE "insights" (
	"id" text PRIMARY KEY NOT NULL,
	"summary" text NOT NULL,
	"period_start" timestamp with time zone NOT NULL,
	"period_end" timestamp with time zone NOT NULL,
	"is_anomaly" boolean DEFAULT false NOT NULL,
	"generated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kpis" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"value" numeric(20, 4) NOT NULL,
	"unit" text,
	"recorded_at" timestamp with time zone NOT NULL
);
