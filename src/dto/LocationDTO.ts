class LocationDTO {
    locationId: number = 0;
    latitude: number = 0;
    longitude: number = 0;
    name: string = "";
    radius: number = 0;
    areaId: number = 0;
    delay: number = 0;

    constructor(LocationDTO?: LocationDTO) {
        Object.assign(this, LocationDTO);
    }

}

export default LocationDTO;
