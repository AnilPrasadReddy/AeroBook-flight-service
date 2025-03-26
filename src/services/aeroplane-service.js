const { AeroplaneRepository } = require('../repositories');
const aeroplaneRepository = new AeroplaneRepository();

async function createPlane(data){
    try {
      const aeroplane = await aeroplaneRepository.create(data);
      return  aeroplane;
    } catch (error) {
        throw error;
    }
}

module.exports={
    createPlane
}