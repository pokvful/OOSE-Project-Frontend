import FranchiseDTO from "../../dto/FranchiseDTO";

class LocationUpdateRequestDTO {
    id: number = 0;
    name: String = "";
    
    constructor(franchiseDTO: FranchiseDTO) {
        this.id = franchiseDTO.id;
        this.name = franchiseDTO.name;
    };
}

export default LocationUpdateRequestDTO;