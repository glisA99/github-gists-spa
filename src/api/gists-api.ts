import axios, { AxiosResponse } from 'axios';
import { Gist } from '../components/GistList';

const BASE_URL = "https://api.github.com";
const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        ["accept"]: "application/vnd.github.v3+json"
    }
})

type GistsParams = {
    since?: Date,
    per_page?: number,
    page?: number
}

/**
 * Async function used for fetching gists from specified page
 * @param page number of page 
 * @param params query params (since,per_page) [optional]
 * @returns fetched gists as array or false if request failed
 */
 export const fetchGists = async (page: number, params: Omit<GistsParams,'page'> = {}):Promise<Array<Gist> | false> => {
    var response:AxiosResponse<Array<Gist>>;
    const per_page:number = params.per_page || 30;  
    try {
        response = await client.get("/gists/public",{
            params: {
                per_page,
                page,
                since: params.since // params that are null or undefined are not rendered in the URL
            }
        });
    } catch (ex: any) {
        return false;
    }

    if (response.status !== 200) return false;
    return response.data;
}