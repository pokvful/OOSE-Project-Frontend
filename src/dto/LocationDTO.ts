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
    linkedInterventions : InterventionDTO[] = [];

    constructor(LocationDTO?: LocationDTO) {
        Object.assign(this, LocationDTO);
    };

}

export default LocationDTO;
