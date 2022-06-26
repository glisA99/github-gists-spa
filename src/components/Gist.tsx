import React from 'react'
import { Gist } from './GistList';
import { GistSelectFn } from './VirtualizedList';

interface IGistComponentProps { 
    gists: Array<Gist>, 
    index: number, 
    style: any,
    onSelect: GistSelectFn,
    selected: boolean
}

export const GistComponent:React.FC<IGistComponentProps> = ({ gists, index, style, onSelect, selected }) => {
    
    const gist = gists[index];
    const keys = Object.keys(gist.files);

    const onGistClick = () => onSelect(gist.id,gist.owner.avatar_url);

    return (
        <div 
            className='gist-component' 
            style={style}
            onClick={onGistClick} 
        >
            <div className='avatar-block'>
                <div 
                    className={`avatar-image ${selected && "selected-gist-avatar"}`} 
                    style={{
                        backgroundImage: `url(${gist.owner.avatar_url})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover' 
                    }} 
                />
            </div>
            <div className={`filename-block ${selected && "selected-gist-avatar"}`}>
                <p className={`filename ${selected && "selected-gist-text"}`}>{gist.files[keys[0]].filename}</p>
            </div>
        </div>
  )

}

export default GistComponent;
