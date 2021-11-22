import './LocationEdit.css';
import '../../services/location/LocationService';
import { useState, useEffect, FormEvent } from 'react';
import LocationService from '../../services/location/LocationService';
import LocationDTO from '../../dto/LocationDTO';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';
import AreaDTO from '../../dto/AreaDTO';
import InterventionDTO from '../../dto/InterventionDTO';
import InterventionService from '../../services/InterventionService';

function LocationEdit() {
  const [location, setLocation] = useState({} as LocationDTO);
  const [allInterventions, setAllInterventions] = useState([] as InterventionDTO[]);
  const [service, setService] = useState({} as LocationService);
  const [errors, setErrors] = useState({} as any);
  
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      const res = await service.create(location)
        .then(() => {
          toast.success("Locatie aangemaakt!");
          navigate("/locations");
        }).catch(err => {
          setErrors(err.response.data);
          console.log(err.response.data)
          return;
        });
    } else {
      await service.update(location)
      .then(() => {
        toast.success("Locatie bijgewerkt!");
        navigate("/locations");
      }).catch(err => {
        setErrors(err.response.data);
        return;
      });
    }
  }

  useEffect(() => {
    const locationService = new LocationService();
    const interventionService = new InterventionService();
    setService(locationService)
    interventionService
      .loadAll()
      .then(interventions => {
        setAllInterventions(interventions);
      })
    if(!isEdit) {
      let locDTO: LocationDTO = new LocationDTO();
      locDTO.area = new AreaDTO();
      setLocation(locDTO)
    } else {
      locationService.loadOne(id)
      .then(val => {
        setLocation(val);
        console.log(val);
      })
    }
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLocation({...location, [e.target.id]: e.target.value})
  }

  const removeIntervention = (id:number) : void => {
    const newLoc : LocationDTO = new LocationDTO(location);
    newLoc.linkedInterventions = newLoc.linkedInterventions.filter(x => x.id !== id);

    setLocation(newLoc);
  }

  const addIntervention = (e: FormEvent) : void => {
    e.preventDefault();
    var select = document.getElementById('new-intervention') as any;
    var value = select.options[select.selectedIndex].value;;
    const newLoc : LocationDTO = new LocationDTO(location);
    newLoc.linkedInterventions.push(allInterventions.find(x => x.id === Number(value)) as InterventionDTO);

    setLocation(newLoc);
  }

  if(!allInterventions || !location || !location.linkedInterventions) {
    return null;
  }

  return (
    <div className="location-edit-add">
      <h2>{isEdit ? location.name + " Wijzigen" : "Locatie aanmaken"}</h2>
      <form onSubmit={onSubmit}>
          <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={location.name} errors={errors.name}/>
          <br/>
          <Input placeholderText={'Gebied'} inputName={'areaId'} inputType={'text'} inputLabel={'Gebied'} onChange={handleChange} value={location.area.name} errors={errors.areaId}/>
          <br/>
          <Input placeholderText={'Lengtegraad'} inputName={'longitude'} inputType={'number'} inputLabel={'Lengtegraad'} onChange={handleChange} value={location.longitude === 0 ? "" : location.longitude} errors={errors.longitude}/>
          <br/>
          <Input placeholderText={'Breedtegraad'} inputName={'latitude'} inputType={'number'} inputLabel={'Breedtegraad'} onChange={handleChange} value={location.latitude === 0 ? "" : location.latitude} errors={errors.latitude}/>
          <br/>
          <Input placeholderText={'Straal in meters'} inputName={'radius'} inputType={'number'} inputLabel={'Straal'} onChange={handleChange} value={location.radius === 0 ? "" : location.radius} errors={errors.radius}/>
          <br/>
          <Input placeholderText={'Triggertijd in seconden'} inputName={'delay'} inputType={'number'} inputLabel={'Delay'} onChange={handleChange} value={location.radius === 0 ? "" : location.delay} errors={errors.delay}/>
          <br/>
          <SubmitButton value={isEdit ? "Wijzig" : "Voeg toe"}/>
      </form>
      {location.linkedInterventions.map(intervention => {
        return <p>{intervention.name}</p>
      })}
      <form onSubmit={addIntervention}>
        <select id="new-intervention">
          {allInterventions.filter(x => location.linkedInterventions.find(y => y.id === x.id) === undefined).map(intervention => {
            return <option value={intervention.id}>{intervention.name}</option>
          })}
        </select>
        <SubmitButton value="Voeg toe"/>
      </form>

    </div>
  );
}

export default LocationEdit
