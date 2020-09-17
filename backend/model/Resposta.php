<?php

declare(strict_types=1);

class Resposta {
    
    public $id;
    public $descricao;
    public $votos;
    public $enqueteId;

    private $tabela = "Resposta";

    public function buscarTodos($enqueteId) {

        $query = "SELECT * FROM $this->tabela WHERE Enquete_id = ?;";
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare($query);
        $stmt->bindParam(1, $enqueteId);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS, 'Resposta');
    }

    public function removerTodos($enqueteId) {

        $query = "DELETE FROM $this->tabela WHERE Enquete_id = ?;";
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare($query);
        $stmt->bindParam(1, $enqueteId);
        $stmt->execute();
    }

    public function salvar() {

        $query = "INSERT INTO $this->tabela (id, descricao, votos, Enquete_id) 
                  VALUES (?, ?, ?, ?);";
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->bindParam(2, $this->descricao);
        $stmt->bindParam(3, $this->votos);
        $stmt->bindParam(4, $this->enqueteId);
        $stmt->execute();

        return $conexao->lastInsertId();
    }

    public function votar($id) {
        $query = "UPDATE $this->tabela SET votos = votos + 1 WHERE id = ?;";
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
    }
}