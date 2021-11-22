import './InterventionEdit.css';
import '../../services/InterventionService';
import { useState, useEffect, FormEvent } from 'react';
import InterventionService from '../../services/InterventionService';
import InterventionDTO from '../../dto/InterventionDTO';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';
import Select from '../../components/select/Select';

const InterventionEdit : React.FC = () => {
  const [intervention, setIntervention] = useState({} as InterventionDTO);
  const [service, setService] = useState({} as InterventionService);
  
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      await service.create(intervention)
        toast.success("Gebied aangemaakt!");
    } else {
      await service.update(intervention)
        toast.success("Gebied bijgewerkt!");
    }
    navigate("/interventions");
  }

  useEffect(() => {
    const interventionService = new InterventionService();
    setService(interventionService)
    if(!isEdit) {
      setIntervention(new InterventionDTO())
    } else {
      interventionService.loadOne(id)
      .then(val => {
        setIntervention(val);
      })
    }
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setIntervention({...intervention, [e.target.id]: e.target.value})
  }

  return (
    <div className="intervention-edit-add">
      <h2>{isEdit ? intervention.name + " Wijzigen" : "Interventie aanmaken"}</h2>
      {/* <form onSubmit={onSubmit}>
        <Select placeholderText={'Type interventie'} selectName={'interventiontype'} selectLabel={''} options={["interventie"]}/>
        <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={intervention.name}/>
        <br/>
        <Input placeholderText={'Commando'} inputName={'command'} inputType={'text'} inputLabel={'Commando'} onChange={handleChange} value={intervention.radius === 0 ? "" : intervention.radius}/>
        <br/>
        <SubmitButton inputType={'submit'} value={isEdit ? "Wijzig" : "Voeg toe"}/>
      </form> */}
    </div>
  );
}

export default InterventionEdit
