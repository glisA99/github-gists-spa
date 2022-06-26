import React, { DOMElement } from "react";
import { FixedSizeList as List } from 'react-window';
import { GistComponent } from "./Gist";
import { Gist } from "./GistList";

const DISPLAY_COUNT = 30;

export type GistSelectFn = (id: string, avatar_url: string) => void;

interface IVirtualizedListProps {
    gists: Array<Gist>
}

export const VirtualizedList:React.FC<IVirtualizedListProps> = ({ gists }) => {

    const [selected,setSelected] = React.useState<string | undefined>(undefined);

    const selectGist:GistSelectFn = (gist_id: string, avatar_url: string) => {
        setSelected(gist_id);
        const element = (document.getElementById("fade-in-image") as HTMLElement);
        const newElement = element.cloneNode() as HTMLElement;
        newElement.style.backgroundImage = `url(${avatar_url})`;
        newElement.style.display = "block";
        newElement.style.backgroundSize = "cover";
        //(element.parentElement as any).replaceChild(element,newElement);
        element.parentElement?.appendChild(newElement);
        element.remove();
        setTimeout(() => {
            console.log(newElement);
            (newElement as HTMLElement).style.display = "none";
        }, 2000);
    }

    return (
        <List
            itemCount={DISPLAY_COUNT}
            height={550}
            width={"100%"}
            itemSize={80}
            itemData={gists}
            className="virtualized-list"
            layout="vertical"
            overscanCount={4}
        >
        {({ index, data, style }) => {
            return (
            <GistComponent
                gists={data}
                index={index}
                key={data[index].id}
                style={style}
                onSelect={selectGist}
                selected={selected !== undefined && selected === gists[index].id}
            />
            );
        }}
        </List>
    );

};

export default VirtualizedList;
