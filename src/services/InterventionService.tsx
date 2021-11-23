import netwerkAdapter from "../adapters/NetwerkAdapterFactory";
import InterventionDTO from "../dto/InterventionDTO";
import IService from "./IService";

class InterventionService implements IService<InterventionDTO> {
    async loadAll(): Promise<InterventionDTO[]> {
        return netwerkAdapter.get("interventions")
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
        return netwerkAdapter.get("interventions/" + id)
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
        return netwerkAdapter.put("interventions", value);
    }
    create(value: InterventionDTO): Promise<void> {
        return netwerkAdapter.post("interventions", value);
    }
    delete(id: number): Promise<void> {
        return netwerkAdapter.delete("interventions/" + id);
    }
}

export default InterventionService;