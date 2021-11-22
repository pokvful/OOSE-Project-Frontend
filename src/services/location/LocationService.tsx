import axios from "axios";
import AreaDTO from "../../dto/AreaDTO";
import LocationDTO from "../../dto/LocationDTO";
import IService from "../IService";
import LocationUpdateRequestDTO from "./LocationUpdateRequestDTO";

class LocationService implements IService<LocationDTO> {
    async loadAll(): Promise<LocationDTO[]> {
        return axios.get("http://localhost:8080/locations")
        .then(response => response.data)
        .then(data => {
            let toReturn = [] as LocationDTO[];
            data.forEach((location: any) => {
                let locationDto: LocationDTO = new LocationDTO();
                locationDto.area = location.area;
                locationDto.locationId = location.locationId;
                locationDto.latitude = location.latitude;
                locationDto.longitude = location.longitude;
                locationDto.name = location.name;
                locationDto.radius = location.radius;
                locationDto.delay = location.delay;
                toReturn.push(locationDto);
            });

            return toReturn;
        });
    }
    async loadOne(id: number): Promise<LocationDTO> {
        return axios.get("http://localhost:8080/locations/" + id)
        .then(response => response.data)
        .then(location => {
            let locationDto: LocationDTO = new LocationDTO();
            locationDto.area = location.area;
            locationDto.locationId = location.locationId;
            locationDto.latitude = location.latitude;
            locationDto.longitude = location.longitude;
            locationDto.name = location.name;
            locationDto.radius = location.radius;   
            locationDto.delay = location.delay;
           return locationDto;
        });
    }
    update(value: LocationDTO): Promise<void> {
        return axios.put("http://localhost:8080/locations", new LocationUpdateRequestDTO(value));
    }
    create(value: LocationDTO): Promise<void> {
        return axios.post("http://localhost:8080/locations", value);
    }
    delete(id: number): Promise<void> {
        return axios.delete("http://localhost:8080/locations/" + id);
    }
}

export default LocationService;