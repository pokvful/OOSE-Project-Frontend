import AreaDTO from "./AreaDTO";
import InterventionDTO from "./InterventionDTO";

class LocationDTO {
    area: AreaDTO = new AreaDTO();
    locationId: number = 0;
    latitude: number = 0;
    longitude: number = 0;
    name: string = "";
    radius: number = 0;
    delay: number = 0;
<<<<<<< HEAD
    linkedInterventions : InterventionDTO[] = [];

=======
    
>>>>>>> 9a525c980ee4ae85570814fde2dec55fd9e7b2f8
    constructor(LocationDTO?: LocationDTO) {
        Object.assign(this, LocationDTO);
    };

}

export default LocationDTO;
