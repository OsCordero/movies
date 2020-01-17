import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWE5Mzg3MTQzMWJiYTlhZWI3OTk1NmJmYTMxM2MzNCIsInN1YiI6IjVlMWNjOTY3NmEzMDBiMDAxNjVlYmIzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wcJ_MpMTVXz603adA-FqxjXEurcgXyMisBtUiPH3S0s',
  },
});
