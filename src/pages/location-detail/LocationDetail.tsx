import './LocationDetail.css';
import { useState, useEffect } from 'react';
import LocationService from '../../services/location/LocationService';
import LocationDTO from '../../dto/LocationDTO';
import { useParams } from "react-router-dom";
import DetailTopSection from '../../components/detail-top-section/DetailTopSection';

function LocationDetail() {
  const [location, setLocation] = useState<LocationDTO>();
  const [locationServiceState, setLocationServiceState] = useState({} as LocationService);

  const params = useParams();

  useEffect(() => {
    const locationService = new LocationService();
    setLocationServiceState(locationService)
    locationService.loadOne(id)
    .then(val => {
      setLocation(val);
    })
  }, [])

  if(params.id === undefined) {
    return <div></div>
  }

  const id: number = Number.parseInt(params.id);

  if(!location) {
    return null;
  }

  return (
    <div className="location-detail">
      <DetailTopSection pageTitle={location.name} buttonTitle={'wijzigen'} navigationLink={'/locations/edit/' + location.locationId}/>
      <table className="location-detail-table">
        <tbody>
          <tr>
            <td className="table-min-width">Gebied:</td>
            <td>{location.area.name}</td>
          </tr>
          <tr>
            <td className="table-min-width">Lengtegraad:</td>
            <td>{location.longitude + "°"}</td>
          </tr>
          <tr>
            <td className="table-min-width">Breedtegraad:</td>
            <td>{location.latitude + "°"}</td>
          </tr>
          <tr>
            <td className="table-min-width">Straal:</td>
            <td>{location.radius + " meter"}</td>
          </tr>
          <tr>
            <td className="table-min-width">Triggertijd:</td>
            <td>{location.delay + (location.delay > 1 ? " seconden" : " seconde")}</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default LocationDetail;
