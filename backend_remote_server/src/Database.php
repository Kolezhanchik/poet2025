<?php


class Database
{
    public static function GetConnection()
    {
        return new SQLite3(CONFIG_DATABASE_PATH);
    }
}