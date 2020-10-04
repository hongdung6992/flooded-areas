import axiosClient from "./axiosClient";

class FloodplainApi {
  getAll = (params) => {
    const url = "/floodplains";
    return axiosClient.get(url, { params });
  };

  create = (params) => {
    console.log("param", params);
    const url = "/floodplains";
    return axiosClient.post(url, params, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
}

const floodplainApi = new FloodplainApi();
export default floodplainApi;
