const LocalArea = require("../models/locationAdmin");

module.exports = class LocationDAL {
    async findByUserId(userId) {
        return await LocalArea.findOne({ userId: userId }).populate(
            "userId",
            "fullName email"
        );
    }
    async updateLocation(userId, lon, lat, deviceName) {
        const userLocation = {
            type: "Point",
            coordinates: [lon, lat],
        };
        return await LocalArea.findOneAndUpdate({ userId: userId }, { userLocation, deviceName }, { new: true });
    }
    async mainLocation(userId, lon, lat, deviceName) {
        let locationChange = false;
        const userLocation = {
            type: "Point",
            coordinates: [lon, lat],
        };
        const user = await LocalArea.findOne({
            userId: userId,
        });
        // console.log("user find location", user);
        if (!user) {
            //location create
            let location = await LocalArea.create({ userId, userLocation, deviceName });
            locationChange = false;
        } else {
            // mutiply with the 
            const radius = 1 / 6378.1;

            const postionUser = await LocalArea.findOne({
                userId: userId,
                deviceName: deviceName,
                userLocation: {
                    $geoWithin: {
                        $centerSphere: [
                            [lon, lat], radius
                        ],
                    },
                },
            });
            if (!postionUser) {
                console.log("change user");
                locationChange = true;
            } else {
                console.log("postion", postionUser);
                console.log("not change user");

                let location = await LocalArea.findByIdAndUpdate(
                    user._Id, { userLocation, deviceName }, { new: true }
                );
                locationChange = false;
            }
        }
        return locationChange;
    }
};