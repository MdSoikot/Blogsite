import  Axios  from "axios";
const fetchApi=Axios.create();
fetchApi.defaults.headers.common['authorization']=localStorage.getItem("jwt");
export default fetchApi;
