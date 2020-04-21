import Axios from "axios";
import { SEARCH_DISCIPLINES } from "../constants";

const findDisciplines = (disciplines) => ({
    type: SEARCH_DISCIPLINES,
    disciplines
});

export const searchDisciplines = () => (dispatch) => {
    return Axios.get("/api/discipline/")
      .then(res => res.data)
      .then(disciplines => dispatch(findDisciplines(disciplines)))
      .catch(error => { throw new Error(error) })
  }