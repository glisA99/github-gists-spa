import React from 'react';
import { fetchGists } from '../api/gists-api';
import { FixedSizeList as List } from 'react-window';
import { GistComponent } from './Gist';

const DISPLAY_COUNT = 30;

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
    const [error,setError] = React.useState<boolean>(false);

    React.useEffect(() => {
        const fetch = async () => {
            const gists = await fetchGists(page || 1);
            if (gists === false) {
                setError(true);
                return
            }
            setGists(gists);
            setPage(page || 1); 
            if (error === true) setError(false);
        }
        fetch();
    },[page]);

    if (page === undefined) return (
        <div className='loading-wide-block'>
            <p><i>Loading...</i></p>
        </div>
    )

    return (
        <div id='gists-block'>
            <List
                itemCount={DISPLAY_COUNT}
                height={550}
                width={"100%"}
                itemSize={80}
                itemData={gists}
                className="virtualized-list"
                layout='vertical'
                overscanCount={4}
            >
                {({ index, data, style }) => {
                    return (
                        <GistComponent 
                            gists={data} 
                            index={index} 
                            key={data[index].id} 
                            style={style}
                        />
                    )
                }}
            </List>
        </div>
    )

}

export default GistList;