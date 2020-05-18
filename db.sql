drop table if exists posts;
drop table if exists users;
drop extension if exists Pgcrypto;

CREATE extension if not exists Pgcrypto;

create table if not exists users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar (100) not null,
  email text not null unique, 
  password text not null
);

create table if not exists posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar (100) not null,
  body text not null,
  user_id UUID not null ,
  foreign key (user_id) references users
);


