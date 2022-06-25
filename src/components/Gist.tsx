import React from 'react'
import { Gist } from './GistList';


export const GistComponent:React.FC<{ gists: Array<Gist>, index: number, style: any }> = ({ gists, index,style }) => {
    
    const gist = gists[index];
    const keys = Object.keys(gist.files);

    return (
        <div className='gist-component' style={style}>
            <div className='avatar-block'>
                <img src={gist.owner.avatar_url} className="avatar-image" />
            </div>
            <div className='filename-block'>
                <p className='filename'>{gist.files[keys[0]].filename}</p>
            </div>
        </div>
  )

}

export default GistComponent;
