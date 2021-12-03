import networkAdapter from "../../adapters/NetworkAdapterFactory";
import GoalDTO from "../../dto/GoalDTO";
import IService from "../IService";

class GoalService implements IService<GoalDTO> {
    async loadAll(): Promise<GoalDTO[]> {
        return networkAdapter
            .get("goals")
            .then(response => response.data)
            .then(data => {
                let toReturn = [] as GoalDTO[];
                data.forEach((goal: any) => {
                    let goalDTO: GoalDTO = new GoalDTO();
                    goalDTO.id = goal.id;
                    goalDTO.name = goal.name;
                    toReturn.push(goalDTO);
                });
                return toReturn;
            });
    }
    
    async loadOne(id: number): Promise<GoalDTO> {
        return networkAdapter
            .get("goals")
            .then(response => response.data)
            .then(data => {
                let toReturn = new GoalDTO();
                let goalDTO: GoalDTO = new GoalDTO();
                goalDTO.id = data.id;
                goalDTO.name = data.name;
                return toReturn;
            });
    }
    update(value: GoalDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
    create(value: GoalDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        return networkAdapter.delete("goals/" + id);
    }
}

export default GoalService;