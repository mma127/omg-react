CREATE TABLE battles
(
    id         int unsigned auto_increment primary key,
    size       int                                                                             not null,
    created_at timestamp default CURRENT_TIMESTAMP                                             not null,
    updated_at timestamp default CURRENT_TIMESTAMP                                             not null,
    type       enum ('WAR', 'FUN')                                                             not null,
    status     enum ('OPEN', 'STARTING', 'IN_PROGRESS', 'REPORTING', 'FINALIZED', 'CANCELLED') not null
);

create table battles_players
(
    battle_id int unsigned not null,
    player_id int unsigned not null,
    updated_at timestamp default CURRENT_TIMESTAMP                                             not null,
    constraint battles_players_battle_id_fk
        foreign key (battle_id) references battles (id)
            on delete cascade,
    constraint battles_players_player_id_fk
        foreign key (player_id) references players (id)
);


