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
                locationDto.linkedInterventions = location.linkedInterventions;
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
            let areaData = location.area;
            let areaDTO: AreaDTO = new AreaDTO();
            areaDTO.name = areaData.name;
            areaDTO.id = areaData.id;
            areaDTO.radius = areaData.radius;
            areaDTO.longitude = areaData.longitude;
            areaDTO.latitude = areaData.latitude;
            locationDto.locationId = location.locationId;
            locationDto.latitude = location.latitude;
            locationDto.longitude = location.longitude;
            locationDto.name = location.name;
            locationDto.radius = location.radius;   
            locationDto.delay = location.delay;
            locationDto.linkedInterventions = location.linkedInterventions;
            locationDto.area = Object.assign({}, areaDTO);
           return locationDto;
        });
    }
    update(value: LocationDTO): Promise<void> {
        return axios.put("http://localhost:8080/locations", new LocationUpdateRequestDTO(value));
    }
    async create(value: LocationDTO): Promise<void> {
        return axios.post("http://localhost:8080/locations", value);
    }
    async delete(id: number): Promise<void> {
        return axios.delete("http://localhost:8080/locations/" + id);
    }
}

export default LocationService;