import './InterventionDetail.css';
import '../../services/InterventionService';
import { useState, useEffect } from 'react';
import InterventionService from '../../services/InterventionService';
import InterventionDTO from '../../dto/InterventionDTO';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import DetailTopSection from '../../components/detail-top-section/DetailTopSection';

function InterventionDetail() {
  const [intervention, setIntervention] = useState({} as InterventionDTO);
  const [service, setService] = useState({} as InterventionService);

  const params = useParams();
  useEffect(() => {
    const interventionService = new InterventionService();
    setService(interventionService)
    interventionService.loadOne(id)
    .then(val => {
      setIntervention(val);
    })
  }, [])

  if(params.id === undefined) {
    return <div></div>
  }

  const id: number = Number.parseInt(params.id);

  return (
    <div className="intervention-detail">
      <DetailTopSection pageTitle={intervention.name} buttonTitle={'wijzigen'} navigationLink={'/interventions/edit/' + intervention.id}/>
      <table className="intervention-detail-table">
        <tbody>
          <tr>
            <td className="table-min-width">Lengtegraad:</td>
            <td>{intervention.longitude + "°"}</td>
          </tr>
          <tr>
            <td className="table-min-width">Breedtegraad:</td>
            <td>{intervention.latitude + "°"}</td>
          </tr>
          <tr>
            <td className="table-min-width">Straal:</td>
            <td>{intervention.radius + " meter"}</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default InterventionDetail;
