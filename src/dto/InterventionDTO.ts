class InterventionDTO {
    id: number = 0;
    latitude: number = 0;
    longitude: number = 0;
    name: string = "";
    radius: number = 0;

    constructor(InterventionDTO?: InterventionDTO) {
        Object.assign(this, InterventionDTO);
    }

}

export default InterventionDTO;
