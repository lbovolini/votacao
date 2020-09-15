<?php

declare(strict_types=1);

$root = $_SERVER['DOCUMENT_ROOT'];
require_once $root.'/Conexao.php';

class Enquete {

    public $id;
    public $titulo;
    public $inicio;
    public $fim;

    private $tabela = "Enquete";

    public function atualizar() {

        $query = "UPDATE $this->tabela 
                  SET titulo = ?, 
                      inicio = ?, 
                      fim = ? 
                  WHERE id = ?;";
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare($query);
        $stmt->bindParam(1, $this->titulo);
        $stmt->bindParam(2, $this->inicio);
        $stmt->bindParam(3, $this->fim);
        $stmt->bindParam(4, $this->id);
        $stmt->execute();
    }

    public function buscar($id) {

        $query = "SELECT * FROM $this->tabela WHERE id = $id;";
        $conexao = Conexao::getInstance();
        $stmt = $conexao->query($query);

        return $stmt->fetchObject('Enquete');
    }

    public function buscarTodos() {

        $query = "SELECT * FROM $this->tabela;";
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS, 'Enquete');
    }

    public function excluir($id) {

        $query = "DELETE FROM $this->tabela WHERE id = $id;";
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare($query);
        $stmt->execute();
    }

    public function salvar() {

        $query = "INSERT INTO $this->tabela (id, titulo, inicio, fim) 
                  VALUES (?, ?, ?, ?);";
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->bindParam(2, $this->titulo);
        $stmt->bindParam(3, $this->inicio);
        $stmt->bindParam(4, $this->fim);
        $stmt->execute();

        return $conexao->lastInsertId();
    }
}