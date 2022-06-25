import React from 'react';
import { fetchGists } from '../api/gists-api';
import { GistComponent } from './Gist';
import { Pagination } from './Pagination';
import VirtualizedList from './VirtualizedList';

export type Gist = {
    id: string,
    owner: { avatar_url: string},
    files: { [key: string]: { filename: string } },
    [key: string]: any
}

// state shaped like record (lookup-table) KEY: gist_id -> VALUE: Gist
// type GistsState = Record<string,Gist> & Iterable<Gist>;

// const initialGistsState:GistsState = {
//     [Symbol.iterator]: function factory() {
//         const self = this;
//         const keys = Object.keys(self);
//         var count = 0;
//         return {
//             next: function() {
//                 if (count < keys.length) return {
//                     value: self[keys[count++]],
//                     done: false
//                 }
//                 return {
//                     value: undefined,
//                     done: true
//                 }
//             }
//         }
//     }
// }

// const mergeState = (newRecord: any):GistsState => {
//     newRecord[Symbol.iterator] = initialGistsState[Symbol.iterator];
//     return newRecord;
// } 

export const GistList:React.FC = () => {
   
    const [gists,setGists] = React.useState<Array<Gist>>([]);
    const [page,setPage] = React.useState<number | undefined>(undefined);
    const [loading,setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        fetch(page);
    },[page]);

    const fetch = async (page: number = 1) => {
        setLoading(true);
        const gists = await fetchGists(page);
        if (gists === false) {
            return
        }
        setGists(gists);
        setPage(page || 1); 
        setLoading(false);
    }

    const onNextClick = () => {
        if (page === undefined) return;
        fetch(page + 1);
    }

    const onPreviousClick = async () => {
        if (page === undefined) return;
        fetch(page - 1);
    }

    if (loading) return (
        <div className='loading-wide-block'>
            <p><i>Loading...</i></p>
        </div>
    )

    return (
        <React.Fragment>
            <div id='gists-block'>
                <VirtualizedList gists={gists} />
            </div>
            <div className="footer">
                <Pagination 
                    disabledNext={false}
                    disabledPrevious={page === 1}
                    onNextClick={onNextClick}
                    onPreviousClick={onPreviousClick}
                />
            </div>
        </React.Fragment>
    )

}

export default GistList;