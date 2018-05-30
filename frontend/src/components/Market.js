import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {notes} from "../actions";


class Market extends Component {

    componentDidMount() {
        this.props.fetchNotes();
    }

    state = {
        text: "",
        updateNoteId: null,
    }

    resetForm = () => {
        this.setState({text: "", updateNoteId: null});
    }

    selectForEdit = (id) => {
        let note = this.props.notes[id];
        this.setState({text: note.text, updateNoteId: id});
    }

    submitNote = (e) => {
        e.preventDefault();
        if (this.state.updateNoteId === null) {
            this.props.addNote(this.state.text).then(this.resetForm());
        } else {
            this.props.updateNote(this.state.updateNoteId, this.state.text).then(this.resetForm());
        }
    }

    render() {

        const appName = "Market";

        return (
            <div>

                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand">{appName}</a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="">Link</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>


                <div className="container">
                    <h3>Add new note</h3>
                    <form onSubmit={this.submitNote}>
                        <input
                            value={this.state.text}
                            placeholder="Enter note here..."
                            onChange={(e) => this.setState({text: e.target.value})}/>
                        <button onClick={this.resetForm}>Reset</button>
                        <input type="submit" value="Save Note"/>
                    </form>

                    <h3>Notes</h3>
                    <table>
                        <tbody>
                        {this.props.notes.map((note, id) => (
                            <tr key={`note_${id}`}>
                                <td>{note.text}</td>
                                <td>
                                    <button onClick={() => this.props.deleteNote(id)}>delete</button>
                                </td>
                                <td>
                                    <button onClick={() => this.selectForEdit(id)}>edit</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        notes: state.notes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNote: (text) => {
            return dispatch(notes.addNote(text));
        },
        updateNote: (id, text) => {
            return dispatch(notes.updateNote(id, text));
        },
        deleteNote: (id) => {
            dispatch(notes.deleteNote(id));
        },
        fetchNotes: () => {
            dispatch(notes.fetchNotes());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Market);