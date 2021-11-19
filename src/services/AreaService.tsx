import axios from "axios";
import AreaDTO from "../dto/AreaDTO";
import IService from "./IService";

class AreaService implements IService<AreaDTO> {
    async loadAll(): Promise<AreaDTO[]> {
        return axios.get("http://localhost:8080/areas")
        .then(response => response.data)
        .then(data => {
            let toReturn = [] as AreaDTO[];
            data.forEach((area: any) => {
                let areaDto: AreaDTO = new AreaDTO();
                areaDto.id = area.id;
                areaDto.latitude = area.latitude;
                areaDto.longitude = area.longitude;
                areaDto.name = area.name;
                areaDto.radius = area.radius;
                toReturn.push(areaDto);
            });

            return toReturn;
        });
    }
    async loadOne(id: number): Promise<AreaDTO> {
        return axios.get("http://localhost:8080/areas/" + id)
        .then(response => response.data)
        .then(area => {
            let areaDto: AreaDTO = new AreaDTO();
            areaDto.id = area.id;
            areaDto.latitude = area.latitude;
            areaDto.longitude = area.longitude;
            areaDto.name = area.name;
            areaDto.radius = area.radius;
           return areaDto;
        });
    }
    update(value: AreaDTO): Promise<void> {
        return axios.put("http://localhost:8080/areas", value);
    }
    create(value: AreaDTO): Promise<void> {
        return axios.post("http://localhost:8080/areas", value);
    }
    delete(id: number): Promise<void> {
        return axios.delete("http://localhost:8080/areas/" + id);
    }
}

export default AreaService;