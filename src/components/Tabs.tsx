import React from 'react';

interface Props {
    items: Array<{
        name: string;
        component: React.ReactNode;
    }>;
    activeTab?: number;
    extendTailwind?: {
        tabButtons?: {
            list?: string;
            each?: string;
            active?: string;
        };
        tabContent?: string;
        parent?: string;
    };
}

const Tabs = ({ items, activeTab, extendTailwind }: Props) => {

    const [active, setActive] = React.useState<number>(activeTab || 0);

    return (
        <div className={`${extendTailwind?.parent}`}>
            <div className={`flex gap-1 ${extendTailwind?.tabButtons?.list}`}>
                {items.map((item, index) => {
                    return (
                        <button key={index} onClick={() => {
                            setActive(index);
                        }} className={`${extendTailwind?.tabButtons?.each} ${index === active && extendTailwind?.tabButtons?.active} text-white px-5 rounded py-3 ${index === active ? 'bg-blue-500' : 'text-gray-400 hover:bg-blue-500 hover:text-white transition'}`}>
                            {item.name}
                        </button>
                    );
                })}
            </div>
            <div className={`${extendTailwind?.tabContent}`}>
                {items[active]?.component}
            </div>
        </div>
    )
}

export default Tabs;