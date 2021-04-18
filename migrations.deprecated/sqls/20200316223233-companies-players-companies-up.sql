create table companies
(
    id           int unsigned auto_increment primary key,
    display_name varchar(50)                         null,
    type         enum ('WAR', 'FUN')                 not null,
    status       enum ('ACTIVE', 'DELETED') default 'ACTIVE' not null,
    faction_id   int unsigned                        not null,
    doctrine_id  int unsigned                        not null,
    manpower     int                                 not null,
    munitions    int                                 not null,
    fuel         int                                 not null,
    vps_earned   int default 0                       not null,
    created_at   timestamp default CURRENT_TIMESTAMP not null,
    updated_at   timestamp default CURRENT_TIMESTAMP not null,
    constraint companies_doctrine_id_fk
        foreign key (doctrine_id) references doctrines (id)
            on delete cascade,
    constraint companies_faction_id_fk
        foreign key (faction_id) references factions (id)
            on delete cascade
);

create table players_companies
(
    player_id    int unsigned        not null,
    company_id   int unsigned        not null,
    company_type enum ('WAR', 'FUN') not null,
    constraint players_companies_company_id_fk
        foreign key (company_id) references companies (id)
            on delete cascade,
    constraint players_companies_player_id_fk
        foreign key (player_id) references players (id)
            on delete cascade
);
