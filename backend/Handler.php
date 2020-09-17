<?php

declare(strict_types=1);

class Handler {

    private $controller;

    public function __construct($controller) {
        $this->controller = $controller;
    }

    public function handle() {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
        header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');

        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case 'DELETE':
                $this->controller->excluir($_GET['id']);
                break;
            case 'GET':
                if (isset($_GET['id'])) {
                    echo $this->controller->buscar($_GET['id']);
                } else {
                    echo $this->controller->buscarTodos();
                }
                break;
            case 'POST':
                $enquete = json_decode(file_get_contents('php://input'), true);
                $this->controller->criar($enquete);
                break;
            case 'PUT':
                if (isset($_GET['respostaId'])) {
                    $this->controller->votar($_GET['respostaId']);
                } else {
                    $enquete = json_decode(file_get_contents('php://input'), true);
                    $this->controller->atualizar($enquete);
                }
                break;
        }
    }
}