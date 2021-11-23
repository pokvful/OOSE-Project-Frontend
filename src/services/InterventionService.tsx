import axios from "axios";
import InterventionDTO from "../dto/InterventionDTO";
import IService from "./IService";

class InterventionService implements IService<InterventionDTO> {
    async loadAll(): Promise<InterventionDTO[]> {
        return axios.get("http://localhost:8080/interventions")
        .then(response => response.data)
        .then(data => {
            let toReturn = [] as InterventionDTO[];
            data.forEach((intervention: any) => {
                let interventionDto: InterventionDTO = new InterventionDTO();
                interventionDto.id = intervention.id;
                interventionDto.latitude = intervention.latitude;
                interventionDto.longitude = intervention.longitude;
                interventionDto.name = intervention.name;
                interventionDto.radius = intervention.radius;
                toReturn.push(interventionDto);
            });

            return toReturn;
        });
    }
    async loadOne(id: number): Promise<InterventionDTO> {
        return axios.get("http://localhost:8080/interventions/" + id)
        .then(response => response.data)
        .then(intervention => {
            let interventionDto: InterventionDTO = new InterventionDTO();
            interventionDto.id = intervention.id;
            interventionDto.latitude = intervention.latitude;
            interventionDto.longitude = intervention.longitude;
            interventionDto.name = intervention.name;
            interventionDto.radius = intervention.radius;
           return interventionDto;
        });
    }
    update(value: InterventionDTO): Promise<void> {
        return axios.put("http://localhost:8080/interventions", value);
    }
    create(value: InterventionDTO): Promise<void> {
        return axios.post("http://localhost:8080/interventions", value);
    }
    delete(id: number): Promise<void> {
        return axios.delete("http://localhost:8080/interventions/" + id);
    }
}

export default InterventionService;