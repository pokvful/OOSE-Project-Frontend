import './LocationList.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import LocationService from '../../services/location/LocationService';
import LocationDTO from '../../dto/LocationDTO';
import AreaService from '../../services/AreaService';
import AreaDTO from '../../dto/AreaDTO';

function LocationList() {
  const [locations, setLocations] = useState([] as LocationDTO[]);
  const [locationServiceState, setLocationServiceState] = useState({} as LocationService);

  const navigate = useNavigate();

  useEffect(() => {
    const locationService = new LocationService();
    setLocationServiceState(locationService)
    locationService.loadAll()
    .then(val => {
      setLocations(val);
    })
  }, [])

  const deleteLocation = (locationId: number) => {
    setLocations(locations.filter(x => x.locationId !== locationId))
    locationServiceState.delete(locationId);
  }

  const search = () => {
    console.log("search")
  }

  return (
    <div className="location-list">
      <TopSection pageTitle={'Locaties'} buttonTitle={'Toevoegen'} navigationLink={'/locations/edit/0'} onClick={search}/>
        {locations.map(location => {
          return (
            <div key={location.locationId}>
              <TableRow title={location.name} subtitle={location.area.name} onEditLink={"edit/" + location.locationId} onDeleteClick={() => deleteLocation(location.locationId)} navigationLink={ "/locations/" + location.locationId }/>
            </div>
          )
        })}
    </div>
  );
}

export default LocationList;
