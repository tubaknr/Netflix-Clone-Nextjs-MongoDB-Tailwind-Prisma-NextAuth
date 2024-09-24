import axios from 'axios';

//fetching data using Axios
const fetcher = (url: string) => axios.get(url)
                                      .then((res) => res.data);
//a single parameter url of type string. This parameter is expected to be the URL from which you want to fetch data.

//axios.get(url):
//
//This method sends a GET request to the specified URL.
//It returns a promise that resolves to the response of the request.


//.then((res) => res.data):
//
//After the promise resolves, the then method is called, which takes a callback function. 
//This function receives the response object res.
//res.data accesses the data property of the response object, which contains the actual data returned from the server.
//This is the part of the response you usually care about.
//By returning res.data, you effectively transform the output of the fetcher function to directly return the data instead of the entire response object.

export default fetcher;

