import './LocationEdit.css';
import '../../services/LocationService';
import { useState, useEffect, FormEvent } from 'react';
import LocationService from '../../services/LocationService';
import LocationDTO from '../../dto/LocationDTO';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';

const LocationEdit : React.FC = () => {
  const [location, setLocation] = useState({} as LocationDTO);
  const [service, setService] = useState({} as LocationService);
  
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      const res = await service.create(location)
        console.log(res)
        toast.success("Locatie aangemaakt!");
    } else {
      await service.update(location)
        toast.success("Locatie bijgewerkt!");
    }
    navigate("/locations");
  }

  useEffect(() => {
    const locationService = new LocationService();
    setService(locationService)
    if(!isEdit) {
      setLocation(new LocationDTO())
    } else {
      locationService.loadOne(id)
      .then(val => {
        setLocation(val);
      })
    }
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLocation({...location, [e.target.id]: e.target.value})
  }

  return (
    <div className="location-edit-add">
      <h2>{isEdit ? location.name + " Wijzigen" : "Locatie aanmaken"}</h2>
      <form onSubmit={onSubmit}>
<<<<<<< HEAD
        <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={location.name}/>
        <br/>
        <Input placeholderText={'Lengtegraad'} inputName={'longitude'} inputType={'number'} inputLabel={'Lengtegraad'} onChange={handleChange} value={location.longitude === 0 ? "" : location.longitude }/>
        <br/>
        <Input placeholderText={'Breedtegraad'} inputName={'latitude'} inputType={'number'} inputLabel={'Breedtegraad'} onChange={handleChange} value={location.latitude === 0 ? "" : location.latitude}/>
        <br/>
        <Input placeholderText={'Straal in meters'} inputName={'radius'} inputType={'number'} inputLabel={'Straal'} onChange={handleChange} value={location.radius === 0 ? "" : location.radius}/>
        <br/>
        <Input placeholderText={'Triggertijd in seconden'} inputName={'delay'} inputType={'number'} inputLabel={'Straal'} onChange={handleChange} value={location.radius === 0 ? "" : location.delay}/>
=======
        <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={area.name} errors={[]}/>
        <br/>
        <Input placeholderText={'Lengtegraad'} inputName={'longitude'} inputType={'text'} inputLabel={'Lengtegraad'} onChange={handleChange} value={area.longitude === 0 ? "" : area.longitude } errors={[]}/>
        <br/>
        <Input placeholderText={'Breedtegraad'} inputName={'latitude'} inputType={'text'} inputLabel={'Breedtegraad'} onChange={handleChange} value={area.latitude === 0 ? "" : area.latitude} errors={[]}/>
        <br/>
        <Input placeholderText={'Straal in meters'} inputName={'radius'} inputType={'text'} inputLabel={'Straal'} onChange={handleChange} value={area.radius === 0 ? "" : area.radius} errors={[]}/>
>>>>>>> 00d5c6bc30f3e7c93e554eb0158fb6a2fa326825
        <br/>
        <SubmitButton inputType={'submit'} value={isEdit ? "Wijzig" : "Voeg toe"}/>
      </form>
    </div>
  );
}

export default LocationEdit
