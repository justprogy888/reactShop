const checkApiKey = (req) =>{
    const apiKey = req.headers["api-key"]
    if (apiKey === process.env._API_KEY){
        return true
    }else{
        return false
    }
}
export default checkApiKey