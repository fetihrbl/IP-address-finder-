import { useEffect, useState } from 'react'; 
import ReactMapGL, { Marker } from 'react-map-gl'; 
import { RiUserLocationFill } from 'react-icons/ri'; 

const API_KEY = '<Your API KEy>';

function Map({ lat, lon }) {

    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: lon,
        zoom: 14,
        bearing: 0,
        pitch: 0,
        width: '100%',
        height: '100%',
    });

    const [loading, setLoading] = useState(true);

    // viewport'u lat, lon değiştiğinde güncelle
    useEffect(() => {
        if (lat && lon) {
            setViewport(prevViewport => ({
                ...prevViewport,
                latitude: lat,
                longitude: lon
            }));
            setLoading(false);
        }
    }, [lat, lon]);

    if (loading) {
        return <div>Loading map...</div>;
    }

    return (
        <div className="map">
            <ReactMapGL
                mapboxApiAccessToken={API_KEY}
                {...viewport}
                onViewportChange={(newViewport) => setViewport(newViewport)}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <Marker latitude={lat} longitude={lon}>
                    <div className="mark">
                        <RiUserLocationFill size="25px" color="blue" />
                    </div>
                </Marker>
            </ReactMapGL>
        </div>
    );
}

export default Map;
