import React from 'react';
import Button from './Button'

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                error: null,
                isLoaded: false,
                places:[]
            };
    }

    componentDidMount() {
        const url = `https://api.sygictravelapi.com/1.2/en/places/list?query=${this.props.destination}`
        fetch((url), {
        method: "GET",
        headers: {
            'x-api-key': process.env.REACT_APP_TRAVELAPIKEY,
        },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        places: result.data.places
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, places } = this.state;
        console.log(places)
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            return (
                <div className="container p-fix">
                    <div className="columns is-mobile is-multiline">
                    {places.map(place => (
                        <div className="column is-one-third">
                        <div className="card" style={{ height: '325px' }}>
                        <div className="card-image">
                            <figure className="image is-16by9">
                                <img src={ place.thumbnail_url ? place.thumbnail_url : "https://placeimg.com/640/480/nature"} alt={ place.name } />
                            </figure>
                         <span className="icon is-small fav-dest">
                            <a href="#" className="likes" ><i className="fa fa-heart likes" aria-hidden="true"></i></a>
                         </span>
                       </div>
                       <div className="card-content">
                         <div className="media">
                           {/* <div className="media-left">
                             <figure className="image is-48x48">
                             <img src={ place.thumbnail_url ? place.thumbnail_url : "https://placeimg.com/48/48/nature"} alt={ place.name  } />
                             </figure>
                           </div> */}
                           <div className="media-content has-text-left">
                             <p className="title is-6">{place.name}</p>
                             <p className="subtitle is-6"><a href={place.url} target="_blank" rel="noreferrer">{place.name_suffix}</a></p>
                           </div>
                         </div>
                       </div>
                        <Button place={place} />
                     </div>
                     </div>
                    ))}
                    </div>
                </div>
            );
        }
    }
}

export default SearchResults;