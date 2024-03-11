import axios from "axios";

function getApi() {
    return axios.get("https://localhost:44388/api/Tree")
}

function postApi(parentId, title) {
    return axios.post("https://localhost:44388/api/Tree", {
      parentId: parentId,
      title:title,
    })
}
function deleteApi(id){
  return axios.delete("https://localhost:44388/api/Tree/" + id)
}

export {getApi, postApi, deleteApi}