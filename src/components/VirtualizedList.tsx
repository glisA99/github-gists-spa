import React from "react";
import { FixedSizeList as List } from 'react-window';
import { GistComponent } from "./Gist";
import { Gist } from "./GistList";

const DISPLAY_COUNT = 30;

export type GistSelectFn = (id: string) => void;

interface IVirtualizedListProps {
    gists: Array<Gist>
}

export const VirtualizedList:React.FC<IVirtualizedListProps> = ({ gists }) => {

    const [selected,setSelected] = React.useState<string | undefined>(undefined);

    const selectGist:GistSelectFn = (gist_id: string) => {
        setSelected(gist_id);
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
