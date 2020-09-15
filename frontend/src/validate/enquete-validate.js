export const validate = (enquete) => {

    var hasError = false
    const errors = {}

    if (!enquete.titulo || !enquete.titulo.length) {
        errors.titulo = "Informe o título"
    }

    if (enquete.titulo && enquete.titulo.length > 255) {
        errors.titulo = "O título não pode ser maior do que 255 caracteres"
    }

    if (!enquete.inicio || !enquete.inicio.length) {
        errors.inicio = "Informe a data de início"
    }

    if (!enquete.fim || !enquete.fim.length) {
        errors.fim = "Informe a data de término"
    }

    if (enquete.inicio > enquete.fim) {
        errors.inicio = "A data de início não pode ser maior do que a data de término"
    }

    if (enquete.respostas.length < 3) {
        errors.respostas = "A enquete deve possuir no mínimo 3 opções de resposta"
    }

    for (let error in errors) {
        hasError = true;
        break;
    }

    return { errors, hasError }
}