import LocationDTO from "../../dto/LocationDTO";

class LocationUpdateRequestDTO {
    areaId: number = 0;
    locationId: number = 0;
    latitude: number = 0;
    longitude: number = 0;
    name: string = "";
    radius: number = 0;
    delay: number = 0;
    

    constructor(locationDTO: LocationDTO) {
        this.areaId = locationDTO.area.id;
    };

}

export default LocationUpdateRequestDTO;
