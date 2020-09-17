import React, { Component } from "react"

export default class Resposta extends Component {
    render() {
        return (
            <tr className="resposta-row">
                <td>{this.props.index + 1}</td>
                <td className="resposta-row-1"><p>{this.props.descricao}</p></td>
                {this.props.readOnly &&
                <td className="resposta-row-2">Votos: {this.props.votos}</td>                
                }
                {!this.props.readOnly &&
                <td className="resposta-row-3">
                    <button className="btn" onClick={this.props.remover}>
                        <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-x" fill="red" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </td>
                }
                {this.props.readOnly &&
                <td className="resposta-row-4"><input className="voto-radio" type="radio" name="voto" disabled={this.props.disabled} value={this.props.resposta.id}/></td>
                }
            </tr>
        )
    }
}