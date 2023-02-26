import { UnauthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resoureceUserId) => {
    if(requestUser.id === resoureceUserId.toString()) {  
        return;
    }
    throw new UnauthenticatedError("Not authorized to access this resource");
}

export default checkPermissions;