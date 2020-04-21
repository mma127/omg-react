import "regenerator-runtime/runtime";
import pool from '../utils/pool';


export const getDoctrineByName = async (name) => {
    let [result] = await pool.query(
        'SELECT * FROM doctrines where name = ?',
        [name]
    );

    return result[0];
}

export const getDoctrineById = async (id) => {
    let [result] = await pool.query(
        'SELECT * FROM doctrines where id = ?',
        [id]
    );

    return result[0];
}

export const getDoctrinesById = async () => {
    let [result] = await pool.query(
        'SELECT * from doctrines'
    )

    return result.reduce((accum, current) => {
        accum[current.id] = current;
        return accum;
    }, {})
}