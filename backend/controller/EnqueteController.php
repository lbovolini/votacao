<?php

declare(strict_types=1);

$root = $_SERVER['DOCUMENT_ROOT'];
require_once $root.'/model/Enquete.php';
require_once $root.'/model/Resposta.php';

class EnqueteController {

    public function atualizar($dados) {

        $enquete = new Enquete();
        $enquete->id = $dados['id'];
        $enquete->titulo = $dados['titulo'];
        $enquete->inicio = $dados['inicio'];
        $enquete->fim = $dados['fim'];

        $enquete->atualizar();

        (new Resposta())->removerTodos($enquete->id);

        $respostas = $dados['respostas'];

        foreach($respostas as $res) {
            $resposta = new Resposta();
            $resposta->id = $res['id'];
            $resposta->descricao = $res['descricao'];
            $resposta->votos = $res['votos'];
            $resposta->enqueteId = $enquete->id;

            $resposta->salvar();
        }
    }

    public function buscar($id) {

        $enquete = (new Enquete())->buscar($id);
        $respostas = (new Resposta())->buscarTodos($id);

        $resultado = [
            'enquete' => $enquete,
            'respostas' => $respostas
        ];
 
        header('Content-Type: application/json');

		return json_encode($resultado);
    }

    public function buscarTodos() {

        $enquetes = (new Enquete())->buscarTodos();
        header('Content-Type: application/json');

		return json_encode($enquetes);
    }

    public function criar($dados) {

        $enquete = new Enquete();
        $enquete->id = null;
        $enquete->titulo = $dados['titulo'];
        $enquete->inicio = $dados['inicio'];
        $enquete->fim = $dados['fim'];

        $id = $enquete->salvar();

        $respostas = $dados['respostas'];

        foreach($respostas as $res) {
            $resposta = new Resposta();
            $resposta->id = null;
            $resposta->descricao = $res['descricao'];
            $resposta->votos = 0;
            $resposta->enqueteId = $id;

            $resposta->salvar();
        }
        
        return $id;
    }

    public function excluir($id) {
        (new Enquete())->excluir($id);
    }

}