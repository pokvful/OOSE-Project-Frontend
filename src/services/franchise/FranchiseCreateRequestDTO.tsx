import FranchiseDTO from "../../dto/FranchiseDTO";

class LocationUpdateRequestDTO {
    name: String = "";
    
    constructor(franchiseDTO: FranchiseDTO) {
        this.name = franchiseDTO.name;
    };
}

export default LocationUpdateRequestDTO;