import db from "./db"

export default async function getPaginationLimit() {

    try {
        const setting = await db.globalSettings.findFirst({
            where:{
                settingName :"noOfElementInAPage"
            }
        })
        return setting.value
        
    } catch (error) {
        console.log(error)
        return -1
    }
    
}