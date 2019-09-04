const Qs = require("qs");
const axios = require("axios");
const axiosConfig = {
  prefixUrl: "",
  setUrl(url) {
    return axiosConfig.prefixUrl + url;
  },
  PostParam: function(url, param) {
    var config = {
      url: axiosConfig.setUrl(url),
      method: "post",
      transformRequest: [
        function(param) {
          return Qs.stringify(param);
        }
      ],
      data: param
    };
    return axios(config);
  },
  getParam: function(url, param) {
    var config = {
      url: axiosConfig.setUrl(url),
      method: "get",
      transformRequest: [
        function(param) {
          return Qs.stringify(param);
        }
      ],
      data: param
    };
    return axios(config);
  }
};
export default axiosConfig;
