create table events
(
    end_date    datetime(6)  not null,
    start_date  datetime(6)  not null,
    description varchar(255) null,
    id          varchar(255) not null primary key,
    title       varchar(255) not null
);

create table instructors
(
    birthday date         not null,
    id       varchar(255) not null primary key,
    name     varchar(255) not null,
    surname  varchar(255) not null
);

create table instructors_events
(
    events_id            varchar(255) not null,
    instructor_entity_id varchar(255) not null,
    unique (events_id),
    foreign key (events_id) references events (id),
    foreign key (instructor_entity_id) references instructors (id)
);