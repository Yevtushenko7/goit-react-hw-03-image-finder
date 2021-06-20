import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";

const ApiKey = "21345777-2727fb6864ad43e7f3b061981";

const getImage = (query, page) =>
  axios
    .get(
      `?q=${query}&page=${page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((res) => res.data.hits);

export default { getImage };
