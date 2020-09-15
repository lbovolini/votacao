<?php

declare(strict_types=1);

class Conexao {

    private static $conexao;

    private static $host;
    private static $dbname;
    private static $username;
    private static $password;

    private function __construct() {}

    public static function getInstance() {
        if (is_null(self::$conexao)) {
            try {
                self::$conexao = new PDO("mysql:host=localhost; dbname=votacao", "lbovolini", "lbovolini");
                self::$conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$conexao->exec('set names utf8');
            } catch (PDOException $e) {
                echo $e->getMessage();
            }
        }

        return self::$conexao;
    }

}
