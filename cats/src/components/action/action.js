import axios from "axios";
  // upload NFT images from Admin 
export const img_file_upload = async (payload) => {
    try {
        var form_data = new FormData()
        Object.values(payload.file).map((data,index)=>{
            console.log("map function",index,data)
            form_data.append(`folder${index}`,data)
        })
        form_data.append('Type',payload.location)
         console.log("form data",form_data);

      let Resp = await axios({
        'method': 'post',
        'url': 'http://localhost:2002/v1/token/img/upload',
        data: form_data
      });
      return {
        data: Resp.data
      }
    }
    catch (err) {
        return false
    }
  }
  // get images and image Name from db
  export const getMeta = async (payload) => {
    try {
       

      let Resp = await axios({
        'method': 'post',
        'url': 'http://localhost:2002/v1/token/getNftMetadata',
        data : payload
      });
      return {
        data: Resp.data
      }
    }
    catch (err) {
        return false
    }
  }
  // Update Function After Mint NFTs
  export const updatefather = async (payload) => {
    try {
      let Resp = await axios({
        'method': 'post',
        'url': 'http://localhost:2002/v1/token/updatefathernft',
        data : payload
      });
      return {
        data: Resp.data
      }
    }
    catch (err) {
        return false
    }
  }