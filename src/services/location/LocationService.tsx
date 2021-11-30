import networkAdapter from "../../adapters/NetworkAdapterFactory";
import AreaDTO from "../../dto/AreaDTO";
import LocationDTO from "../../dto/LocationDTO";
import IService from "../IService";
import LocationCreateRequestDTO from "./LocationCreateRequestDTO";
import LocationUpdateRequestDTO from "./LocationUpdateRequestDTO";

class LocationService implements IService<LocationDTO> {
    async loadAll(): Promise<LocationDTO[]> {
        return networkAdapter.get("locations")
            .then(response => response.data)
            .then(data => {
                let toReturn = [] as LocationDTO[];
                data.forEach((location: any) => {
                    console.log(location);
                    let locationDto: LocationDTO = new LocationDTO();
                    locationDto.area = location.area;
                    locationDto.locationId = location.id;
                    locationDto.latitude = location.latitude;
                    locationDto.longitude = location.longitude;
                    locationDto.name = location.name;
                    locationDto.radius = location.radius;
                    locationDto.delay = location.delay;
                    locationDto.linkedInterventions = location.linkedInterventions;
                    locationDto.areaId = locationDto.area.id;
                    toReturn.push(locationDto);
                });

                return toReturn;
            });
    }
    async loadOne(id: number): Promise<LocationDTO> {
        return networkAdapter.get("locations/" + id)
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
                locationDto.locationId = location.id;
                locationDto.latitude = location.latitude;
                locationDto.longitude = location.longitude;
                locationDto.name = location.name;
                locationDto.radius = location.radius;
                locationDto.delay = location.delay;
                locationDto.linkedInterventions = location.linkedInterventions;
                locationDto.area = Object.assign({}, areaDTO);
                locationDto.areaId = areaDTO.id;
                return locationDto;
            });
    }
    update(value: LocationDTO): Promise<void> {
        return networkAdapter.put("locations", new LocationUpdateRequestDTO(value));
    }
    async create(value: LocationDTO): Promise<void> {
        return networkAdapter.post("locations", new LocationCreateRequestDTO(value));
    }
    async delete(id: number): Promise<void> {
        return networkAdapter.delete("locations/" + id);
    }
}

export default LocationService;