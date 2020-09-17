import http from "../api/votacao"

class EnqueteService {

    atualizar(enquete) {
        return http.put("/", enquete)
    }

    buscar(id) {
        return http.get(`/?id=${id}`)
    }

    buscarTodos() {
        return http.get("/")
    }

    criar(enquete) {
        return http.post("/", enquete)
    }

    remover(id) {
        return http.delete(`/?id=${id}`)
    }

    votar(respostaId) {
        return http.put(`/?respostaId=${respostaId}`)
    }
}

export default new EnqueteService()