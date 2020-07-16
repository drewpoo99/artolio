import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Artist = props => (
    <div className="card" style={{ width: "20rem" }}>
        <div className="card-body">
            <h5 className="card-title">{props.artist.name}</h5>
            <p className="card-text">{props.artist.notes}</p>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">
                <h6><u>Inspirations</u></h6>
                {
                    props.artist.inspirations.map(inspiration => {
                        return <p>{inspiration}</p>
                    })
                }
            </li>
            <li className="list-group-item">
                <h6><u>Interests</u></h6>
                {
                    props.artist.interests.map(interest => {
                        return <p>{interest}</p>
                    })
                }
            </li>
            <li className="list-group-item">
                <h6><u>Processes</u></h6>
                {
                    props.artist.processes.map(process => {
                        return <p>{process}</p>
                    })
                }
            </li>
            <li className="list-group-item">
                <h6><u>Links</u></h6>
                {
                    props.artist.links.map(link => {
                        return <a href={link} target="_blank">{link}</a>
                    })
                }
            </li>
        </ul>
        <div className="card-body">
            <Link to={"/edit/" + props.artist._id}>edit</Link> | <a href="#" onClick={() => { props.deleteArtist(props.artist._id) }}>delete</a>
        </div>
    </div>
)

export default class ArtistList extends Component {
    constructor(props) {
        super(props);

        this.deleteArtist = this.deleteArtist.bind(this)

        this.state = { artists: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/artists/')
            .then(response => {
                this.setState({ artists: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteArtist(id) {
        axios.delete('http://localhost:5000/artists/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            artists: this.state.artists.filter(el => el._id !== id)
        })
    }

    artistList() {
        return this.state.artists.map(currentArtist => {
            return <Artist artist={currentArtist} deleteArtist={this.deleteArtist} key={currentArtist._id} />;
        })
    }

    render() {
        return (
            <div>
                {this.artistList()}
            </div>
        );
    }
}
