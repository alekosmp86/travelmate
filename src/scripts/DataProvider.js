import axios from "axios";

class DataProviderClass {
  async getData(options) {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (err) {
      return { errorMessage: err.message };
    }
  }
}

let DataProvider = new DataProviderClass();
export default DataProvider;
