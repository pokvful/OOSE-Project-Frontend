import './LocationDetail.css';
import { useState, useEffect } from 'react';
import LocationService from '../../services/LocationService';
import LocationDTO from '../../dto/LocationDTO';
import { useParams } from "react-router-dom";
import DetailTopSection from '../../components/detail-top-section/DetailTopSection';

function LocationDetail() {
  const [location, setLocation] = useState({} as LocationDTO);
  const [service, setService] = useState({} as LocationService);

  const params = useParams();
  useEffect(() => {
    const locationService = new LocationService();
    setService(locationService)
    locationService.loadOne(id)
    .then(val => {
      setLocation(val);
    })
  }, [])

  if(params.id === undefined) {
    return <div></div>
  }

  const id: number = Number.parseInt(params.id);

  return (
    <div className="location-detail">
      <DetailTopSection pageTitle={location.name} buttonTitle={'wijzigen'} navigationLink={'/locations/edit/' + location.locationId}/>
      <table className="location-detail-table">
        <tbody>
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
        </tbody>
      </table>

    </div>
  );
}

export default LocationDetail;
