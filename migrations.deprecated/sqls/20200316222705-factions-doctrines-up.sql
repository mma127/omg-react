CREATE TABLE factions
(
    id            int unsigned auto_increment primary key,
    name          varchar(50)                         null,
    display_name  varchar(50)                         null,
    const_name    varchar(5)                          not null,
    internal_name varchar(30)                         not null,
    side          enum ('ALLIED', 'AXIS')             not null,
    created_at    timestamp default CURRENT_TIMESTAMP not null
);

create table doctrines
(
    id            int unsigned auto_increment primary key,
    name          varchar(50)                         null,
    display_name  varchar(50)                         null,
    const_name    varchar(30)                         not null,
    internal_name varchar(30)                         not null,
    faction_id    int unsigned                        not null,
    created_at    timestamp default CURRENT_TIMESTAMP not null,
    constraint doctrines_faction_id_fk
        foreign key (faction_id) references factions (id)
            on delete cascade
);

