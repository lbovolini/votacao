import React, { Component } from "react"
import Resposta from "../../components/Resposta"

import EnqueteService from "../../services/enquete-service"
import { validate } from "../../validate/enquete-validate"

export default class EnquetePage extends Component {

    maxRespostaTamanho = 255
    readOnly = false

    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            titulo: "",
            inicio: "",
            fim: "",
            descricao: "",
            respostas: [],
            errors: {},
            validated: false,
            validatedResposta: false,
            respostaTamanho: this.maxRespostaTamanho,
            disabled: true,
            voto: null
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.setState({ id })

        if (this.props.readOnly) {
            this.readOnly = true
        }
        if (id) {
            EnqueteService.buscar(id)
                .then(response => response.data)
                .then(enquete => this.setState({
                    id: enquete.enquete.id,
                    titulo: enquete.enquete.titulo,
                    inicio: enquete.enquete.inicio,
                    fim: enquete.enquete.fim,
                    respostas: enquete.respostas
                }))
                .then(() => {
                    if ((new Date(this.state.inicio) - Date.now()) <= 0 
                        && (new Date(this.state.fim) - Date.now()) >= 0) {
                        this.setState({ disabled: false })
                    }
                })
                .catch(console.log)
        }
    }


    onSave = () => {
        const { id, titulo, inicio, fim, respostas } = this.state
        const enquete = {
            id,
            titulo,
            inicio,
            fim,
            respostas
        }

        const { errors, hasError } = validate(enquete)
        this.setState({ errors })
        this.setState({ validated: true })

        if (hasError) { return }

        if (this.state.id) {
            EnqueteService.atualizar(enquete)
                .then(() => this.props.history.push(`/show/${this.state.id}`))
                .catch(console.log)
        }
        else {
            EnqueteService.criar(enquete)
                .then(() => this.props.history.push("/"))
                .catch(console.log)
        }
    }

    onRemove = () => {
        EnqueteService.remover(this.state.id)
            .then(() => this.props.history.push("/"))
            .catch(console.log)
    }

    onEdit = () => {
        this.props.history.push(`/edit/${this.state.id}`)
    }

    onVote = () => {
        const respostaId = this.state.voto
        EnqueteService.votar(respostaId)
            .then(() => this.props.history.push("/"))
            .catch(console.log)
    }

    onChangeTitulo = (e) => {
        this.setState({ titulo: e.target.value })
    }

    onChangeInicio = (e) => {
        this.setState({ inicio: e.target.value })
    }

    onChangeFim = (e) => {
        this.setState({ fim: e.target.value })
    }

    onChangeDescricao = (e) => {
        if (this.state.respostaTamanho === 0 && e.target.value.length > this.maxRespostaTamanho) { return }
        this.setState({ descricao: e.target.value })
        this.setState({ respostaTamanho: this.maxRespostaTamanho - e.target.value.length })
    }

    onChangeResposta = (e) => {
        this.setState({ voto: e.target.value })
    }

    adicionarResposta = () => {
        if (this.state.descricao.length === 0) { return }
        if (this.state.descricao.length > 255) { 
            const errors = this.state.errors
            errors.respostas = "A opção de resposta não pode ser maior do que 255 caracteres"
            this.setState({ errors })
            this.setState({ validatedResposta: true })
            return;
        }
        const copyRespostas = Object.assign([], this.state.respostas)
        copyRespostas.push({ descricao: this.state.descricao, votos: 0 })
        this.setState({ respostas: copyRespostas })
        this.setState({ descricao: "" })
        this.setState({ respostaTamanho: this.maxRespostaTamanho })
        const errors = this.state.errors
        errors.respostas = ""
        this.setState({ errors })
    }

    removerResposta = (index) => {
        const copyRespostas = Object.assign([], this.state.respostas)
        copyRespostas.splice(index, 1)
        this.setState({ respostas: copyRespostas })
    }

    render() {
        const errors = this.state.errors
        const validated = this.state.validated
        const validatedResposta = this.state.validatedResposta
        const titulo = errors.titulo ? "is-invalid" : "is-valid"
        const inicio = errors.inicio ? "is-invalid" : "is-valid"
        const fim = errors.fim ? "is-invalid" : "is-valid"
        const respostas = errors.respostas ? "is-invalid" : "is-valid"

        return (
            <div className="container enquete-form">
                <label htmlFor="titulo">Título</label>
                <div>
                    <input name="titulo" id="titulo" className={"form-control " + (validated && titulo)} value={this.state.titulo} onChange={this.onChangeTitulo} readOnly={this.readOnly}/> 
                    {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
                </div>
                <div className="data-group">
                    <div className="data-inicio">
                        <label htmlFor="inicio">Data de início</label>
                        <div>
                            <input type="date" name="inicio" id="inicio" className={"form-control " + (validated && inicio)} value={this.state.inicio} onChange={this.onChangeInicio} readOnly={this.readOnly}/>
                            {errors.inicio && <div className="invalid-feedback">{errors.inicio}</div>}
                        </div>
                    </div>
                    <div className="data-fim">
                        <label htmlFor="fim">Data de término</label>
                        <div>
                            <input type="date" name="fim" id="fim" className={"form-control " + (validated && fim)} value={this.state.fim} onChange={this.onChangeFim} readOnly={this.readOnly}/>
                            {errors.fim && <div className="invalid-feedback">{errors.fim}</div>}
                        </div>
                    </div>
                </div>
                <div className="respostas">
                    <div className="resposta-area" hidden={this.readOnly}>
                        <label htmlFor="descricao">Opção de resposta</label>
                        <div>
                            <textarea className={"form-control " + ((validated || validatedResposta) && respostas)} id="descricao" value={this.state.descricao} onChange={this.onChangeDescricao}/>
                            {errors.respostas && <div className="invalid-feedback">{errors.respostas}</div>}
                        </div>
                        <div className="adicionar-button">
                            <button className="btn btn-secondary enquete-button" onClick={this.adicionarResposta}>Adicionar</button>
                        </div>
                        <div>
                            <p><small>Caracteres restantes: {this.state.respostaTamanho}</small></p>
                        </div>
                    </div>
                    <div>
                        <table className="respostas-table">
                            <tbody className="resposta-table-body" onChange={(e) => this.onChangeResposta(e)}>
                            {this.state.respostas.map((resposta, index) =>
                                <Resposta key={index} index={index} resposta={resposta} votos={resposta.votos} readOnly={this.readOnly} disabled={this.state.disabled} descricao={resposta.descricao} remover={this.removerResposta.bind(this, index)}/>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="button-group-actions" hidden={!this.readOnly}>
                    <button onClick={this.onEdit} className="btn btn-secondary">Editar</button>
                    <button onClick={this.onRemove} className="btn btn-danger">Remover</button>
                    <button type="submit" className="btn btn-primary enquete-button" onClick={this.onVote} disabled={this.state.disabled}>Votar</button>
                </div>
                <div hidden={this.readOnly}>
                    <button type="submit" className="btn btn-primary enquete-button" onClick={this.onSave}>Salvar</button>
                </div>
            </div>
        )
    }
}