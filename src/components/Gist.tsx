import React from 'react'
import { Gist } from './GistList';


export const GistComponent:React.FC<{ gists: Array<Gist>, index: number }> = ({ gists, index }) => {
    
    const gist = gists[index];
    const keys = Object.keys(gist.files);

    return (
        <div className='gist-component'>
            <div className='avatar-block'>
                <image href={gist.owner.avatar_url}/>
            </div>
            <div className='filename-block'>
                <p>{gist.files[keys[0]].filename}</p>
            </div>
        </div>
  )

}

export default GistComponent;
