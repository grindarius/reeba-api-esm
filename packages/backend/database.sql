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
  user_id text not null,
  session_start_time date not null,
  primary key (user_session_id),
  foreign key (user_id) references users(user_id)
);
