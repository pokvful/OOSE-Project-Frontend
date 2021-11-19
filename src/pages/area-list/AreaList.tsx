import './AreaList.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import AreaService from '../../services/AreaService';
import AreaDTO from '../../dto/AreaDTO';

function AreaList() {
  const [areas, setAreas] = useState([] as AreaDTO[]);
  const [service, setService] = useState({} as AreaService);

  const navigate = useNavigate();

  useEffect(() => {
    const areaService = new AreaService();
    setService(areaService)
    areaService.loadAll()
    .then(val => {
      setAreas(val);
    })
  }, [])

  const deleteArea = (id: number) => {
    setAreas(areas.filter(x => x.id !== id))
    service.delete(id);
  }

  const search = () => {
    console.log("search")
  }

  return (
    <div className="area-list">
      <TopSection pageTitle={'Gebieden'} buttonTitle={'Toevoegen'} navigationLink={'/areas/edit/0'} onClick={search}/>
        {areas.map(area => {
          return (
            <div key={area.id}>
              <TableRow title={area.name} onEditLink={"edit/" + area.id} onDeleteClick={() => deleteArea(area.id)} navigationLink={area.id.toString()}/>
            </div>
          )
        })}
    </div>
  );
}

export default AreaList;
