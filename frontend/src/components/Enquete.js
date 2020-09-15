import React, { Component } from "react"

export default class Enquete extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reload: false
        }
    }

    onShow = () => {
        this.props.history.push(`/show/${this.props.enquete.id}`)
    }

    getLocalDate = (date) => {
        return new Date(date).toLocaleDateString('br', { timeZone: "UTC" })
    }

    render() {
        const enquete = this.props.enquete

        return (
            <tr>
                <td onClick={this.onShow}>{enquete.titulo}</td>
                <td>{this.getLocalDate(enquete.inicio)}</td>
                <td>{this.getLocalDate(enquete.fim)}</td>
            </tr>
        )
    }
}