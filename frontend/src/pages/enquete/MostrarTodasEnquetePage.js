import React, { Component } from "react"
import Enquete from "../../components/Enquete"
import EnqueteService from "../../services/enquete-service"

export default class MostrarTodasEnquetePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            enquetes: []
        }
    }

    componentDidMount() {
        EnqueteService.buscarTodos()
            .then(response => response.data)
            .then(enquetes => this.setState({ enquetes }))
            .catch(console.log)
    }

    onCreate = () => {
        this.props.history.push("/add")
    }

    render() {
        const enquetes = this.state.enquetes

        return (
            <div className="container">
                <button onClick={this.onCreate} className="btn btn-primary criar-enquete-button">Criar Enquete</button>
                <table className="todas-respostas-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Data de início</th>
                            <th>Data de término</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquetes.map((enquete, index) =>
                            <Enquete key={index} enquete={enquete} history={this.props.history}/>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}