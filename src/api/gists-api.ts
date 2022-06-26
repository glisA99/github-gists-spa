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

export type FetchResponse = {
    gists: Array<Gist>,
    navigationLinks: NavigationLinks
} | false

/**
 * Async function used for fetching gists from specified page
 * @param page number of page 
 * @param params query params (since,per_page) [optional]
 * @returns fetched gists as array or false if request failed
 */
export const fetchGists = async (page: number, params: Omit<GistsParams, 'page'> = {}): Promise<FetchResponse | false> => {
    var response: AxiosResponse<Array<Gist>>;
    const per_page: number = params.per_page || 30;
    try {
        response = await client.get("/gists/public", {
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
    return {
        gists: response.data,
        navigationLinks: extractResponseLinkHeaders(response)
    }
}

export type Rel = 'next' | 'prev' | 'last' | 'first';

export type NavigationLink = {
    url: string,
    pageNumber: number,
    rel: Rel
}

export type NavigationLinks = {
    next?: NavigationLink,
    prev?: NavigationLink,
    last?: NavigationLink,
    first?: NavigationLink
}

/**
 * Simple function used to extract pag/nav links to other pages (next,prev,first,last)
 * @param response - response object with headers
 * @returns navigation link objects
 */
const extractResponseLinkHeaders = ({ headers }: AxiosResponse):NavigationLinks => {
    const initialSplit: Array<string> = headers.link.split(",");
    const links:NavigationLinks = {};
    for (let i = 0; i < initialSplit.length; i++) {
        var [url, rel] = initialSplit[i].split(";");
        url = url.trim(); rel = rel.trim(); 
        url = url.substring(1,url.length - 1);
        rel = rel.split("=")[1]; 
        rel = rel.substring(1,rel.length - 1);
        const arr = url.split("=");
        links[rel as Rel] = {
            rel: rel as Rel,
            url,
            pageNumber: Number.parseInt(arr[arr.length - 1])
        }
    }
    console.log(links);
    return links;
}