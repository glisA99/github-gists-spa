import React from 'react';
import { fetchGists, FetchResponse, NavigationLinks } from '../api/gists-api';
import { Pagination } from './Pagination';
import VirtualizedList from './VirtualizedList';

export type Gist = {
    id: string,
    owner: { avatar_url: string},
    files: { [key: string]: { filename: string } },
    [key: string]: any
}

type State = { gists: Array<Gist>, links: NavigationLinks };

export const GistList:React.FC = () => {
   
    const [state,setState] = React.useState<State>({} as State);
    const [page,setPage] = React.useState<number>(1);
    const [loading,setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        fetch(page);
    },[page]);

    const fetch = async (_page: number = 1) => {
        setLoading(true);
        const response:FetchResponse = await fetchGists(_page);
        if (response === false) {
            // no specific requirement for handling errors
            return
        }
        setState({ 
            gists: response.gists,
            links: response.navigationLinks
        });
        setLoading(false);
    }

    const goToPage = (pageNumber: number) => {
        setPage(pageNumber);
    }

    if (loading) return (
        <div className='loading-wide-block'>
            <p><i>Loading...</i></p>
        </div>
    )

    return (
        <React.Fragment>
            <div id='gists-block'>
                <VirtualizedList gists={state.gists} />
            </div>
            <div className="footer">
                <Pagination 
                    // alternatively  use page === state.links.last.pageNumber 
                    disabledNext={state.links.next === undefined}
                    // alternatively use page === 1
                    disabledPrevious={state.links.prev === undefined}
                    goToPage={goToPage}
                    currentPage={page}
                    numberOfPages={state.links.last ? state.links.last.pageNumber : page}
                />
            </div>
        </React.Fragment>
    )

}

export default GistList;