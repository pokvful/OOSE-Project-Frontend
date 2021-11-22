import './InterventionList.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import InterventionService from '../../services/InterventionService';
import InterventionDTO from '../../dto/InterventionDTO';

function InterventionList() {
  const [interventions, setInterventions] = useState([] as InterventionDTO[]);
  const [service, setService] = useState({} as InterventionService);

  const navigate = useNavigate();

  useEffect(() => {
    const interventionService = new InterventionService();
    setService(interventionService)
    interventionService.loadAll()
    .then(val => {
      setInterventions(val);
    })
  }, [])

  const deleteIntervention = (id: number) => {
    setInterventions(interventions.filter(x => x.id !== id))
    service.delete(id);
  }

  const search = () => {
    console.log("search")
  }

  return (
    <div className="intervention-list">
      <TopSection pageTitle={'Interventie'} buttonTitle={'Toevoegen'} navigationLink={'/interventions/edit/0'} onClick={search}/>
        {interventions.map(intervention => {
          return (
            <div key={intervention.id}>
              <TableRow title={intervention.name} onEditLink={"/interventions/edit/" + intervention.id} onDeleteClick={() => deleteIntervention(intervention.id)} navigationLink={"interventions/" + intervention.id}/>
            </div>
          )
        })}
    </div>
  );
}

export default InterventionList;
