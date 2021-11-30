import networkAdapter from "../../adapters/NetworkAdapterFactory";
import FranchiseDTO from "../../dto/FranchiseDTO";
import IService from "../IService";

class FranchiseService implements IService<FranchiseDTO> {
    async loadAll(): Promise<FranchiseDTO[]> {
        return networkAdapter
            .get("franchise")
            .then(response => response.data)
            .then(data => {
                let toReturn = [] as FranchiseDTO[];
                data.forEach((franchise: any) => {
                    let franchiseDTO: FranchiseDTO = new FranchiseDTO();
                    franchiseDTO.id = franchise.id;
                    franchiseDTO.name = franchise.name;
                    toReturn.push(franchiseDTO);
                });
                return toReturn;
            });
    }
    async loadOne(id: number): Promise<FranchiseDTO> {
        return networkAdapter
        .get("franchise/" + id)
        .then(response => response.data)
        .then(data => {
            let toReturn: FranchiseDTO = new FranchiseDTO;
            toReturn.id = data.id;
            toReturn.name = data.name;

            return toReturn;
        });
    }

    update(value: FranchiseDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
    create(value: FranchiseDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export default FranchiseService;