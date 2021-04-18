CREATE TABLE players
(
    id           int unsigned auto_increment primary key,
    display_name varchar(50)                         null,
    open_id      varchar(255)                        null,
    avatar       varchar(255)                        null,
    created_at   timestamp default CURRENT_TIMESTAMP not null,
    last_active  timestamp default CURRENT_TIMESTAMP not null
);
