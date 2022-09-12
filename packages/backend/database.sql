-- create database "reeba-esm";

drop table if exists "users";
drop table if exists "user_sessions";

create table "users" (
  user_id text not null unique,
  user_username text not null unique,
  user_email text not null unique,
  user_password text not null,
  primary key (user_id)
);

create table "user_sessions" (
  user_session_id text not null unique,
  user_session_data jsonb not null,
  user_session_end_datetime timestamptz not null,
  primary key (user_session_id)
);
