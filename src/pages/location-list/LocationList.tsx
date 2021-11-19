import './LocationList.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import LocationService from '../../services/LocationService';
import LocationDTO from '../../dto/LocationDTO';
import AreaService from '../../services/AreaService';
import AreaDTO from '../../dto/AreaDTO';

function LocationList() {
  const [locations, setLocations] = useState([] as LocationDTO[]);
  const [areas, setAreas] = useState([] as AreaDTO[]);
  const [locationServiceState, setLocationServiceState] = useState({} as LocationService);
  const [areaServiceState, setAreaServiceState] = useState({} as AreaService);

  const navigate = useNavigate();

  useEffect(() => {
    const locationService = new LocationService();
    setLocationServiceState(locationService)
    locationService.loadAll()
    .then(val => {
      setLocations(val);
    })
  }, [])

  useEffect(() => {
    const areaService = new AreaService();
    setAreaServiceState(areaService)
    areaService.loadAll()
    .then(val => {
      setAreas(val);
    })
  }, [])

  const deleteLocation = (locationId: number) => {
    setLocations(locations.filter(x => x.locationId !== locationId))
    locationServiceState.delete(locationId);
  }

  const search = () => {
    console.log("search")
  }

  console.log(locations);
  return (
    <div className="location-list">
      <TopSection pageTitle={'Locaties'} buttonTitle={'Toevoegen'} navigationLink={'/locations/edit/0'} onClick={search}/>
        {locations.map(location => {
          return (
            <div key={location.locationId}>
              <TableRow title={location.name} subtitle={areas[location.areaId].name} onEditLink={"edit/" + location.locationId} onDeleteClick={() => deleteLocation(location.locationId)} navigationLink={location.locationId.toString()}/>
            </div>
          )
        })}
    </div>
  );
}

export default LocationList;
