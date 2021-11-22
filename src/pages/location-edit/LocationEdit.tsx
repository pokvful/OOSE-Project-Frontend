import './LocationEdit.css';
import '../../services/AreaService';
import { useState, useEffect, FormEvent } from 'react';
import AreaService from '../../services/AreaService';
import AreaDTO from '../../dto/AreaDTO';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';

const AreaEdit : React.FC = () => {
  const [area, setArea] = useState({} as AreaDTO);
  const [service, setService] = useState({} as AreaService);
  
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      const res = await service.create(area)
        console.log(res)
        toast.success("Gebied aangemaakt!");
    } else {
      await service.update(area)
        toast.success("Gebied bijgewerkt!");
    }
    navigate("/areas");
  }

  useEffect(() => {
    const areaService = new AreaService();
    setService(areaService)
    if(!isEdit) {
      setArea(new AreaDTO())
    } else {
      areaService.loadOne(id)
      .then(val => {
        setArea(val);
      })
    }
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setArea({...area, [e.target.id]: e.target.value})
  }

  return (
    <div className="area-edit-add">
      <h2>{isEdit ? area.name + " wijzigen" : "Gebied aanmaken"}</h2>
      <form onSubmit={onSubmit}>
        <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={area.name} errors={[]}/>
        <br/>
        <Input placeholderText={'Lengtegraad'} inputName={'longitude'} inputType={'text'} inputLabel={'Lengtegraad'} onChange={handleChange} value={area.longitude === 0 ? "" : area.longitude } errors={[]}/>
        <br/>
        <Input placeholderText={'Breedtegraad'} inputName={'latitude'} inputType={'text'} inputLabel={'Breedtegraad'} onChange={handleChange} value={area.latitude === 0 ? "" : area.latitude} errors={[]}/>
        <br/>
        <Input placeholderText={'Straal in meters'} inputName={'radius'} inputType={'text'} inputLabel={'Straal'} onChange={handleChange} value={area.radius === 0 ? "" : area.radius} errors={[]}/>
        <br/>
        <SubmitButton inputType={'submit'} value={isEdit ? "Wijzig" : "Voeg toe"}/>
      </form>
    </div>
  );
}

export default AreaEdit
