import FranchiseDTO from "../../dto/FranchiseDTO";

class FranchiseUpdateRequestDTO {
    name: String = "";
    
    constructor(franchiseDTO: FranchiseDTO) {
        this.name = franchiseDTO.name;
    };
}

export default FranchiseUpdateRequestDTO;