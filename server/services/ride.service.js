


export async function getFare(pickup, destination) {
    
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }; 


    const distanceTime = await mapService.getDistanceTime(pickup, );


    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };


    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };


    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.vaca)))
    };

    return fare;

};



function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();

        return otp;
    };

    return generateOtp(num);
};


export const createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All feilds are required');
    };

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user:user,
        pickup: pickup,
        destination: destination,
        otp: getOtp(6),
        fare: fare[ vehicleType ]
    });

    return ride;
}