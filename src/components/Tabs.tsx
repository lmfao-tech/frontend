import React from 'react';

interface Props {
    items: Array<{
        name: string;
        component: React.ReactNode;
        disabled?: boolean;
    }>;
    activeTab?: (arg0: number) => void;
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

    const [active, setActive] = React.useState<number>(0);
    activeTab?.(active);

    return (
        <div className={`${extendTailwind?.parent}`}>
            <div className={`flex gap-1 w-full ${extendTailwind?.tabButtons?.list}`}>
                {items?.map((item, index) => {
                    if (item.disabled) {
                        return (
                            <button key={index} disabled={item.disabled} data-tip="You need to login to upload to twitter" onClick={() => {
                                setActive(index);
                            }} className={`disabled:text-gray-600 disabled:hover:bg-transparent ${extendTailwind?.tabButtons?.each} ${index === active && extendTailwind?.tabButtons?.active} text-white px-5 rounded py-3 ${index === active ? 'bg-blue-500' : 'text-gray-400 hover:bg-blue-500 hover:text-white transition'}`}>
                                {item.name}
                            </button>
                        );
                    }
                    return (
                        <button key={index} disabled={item.disabled} onClick={() => {
                            setActive(index);
                        }} className={`disabled:text-gray-600 disabled:hover:bg-transparent ${extendTailwind?.tabButtons?.each} ${index === active && extendTailwind?.tabButtons?.active} text-white px-5 rounded py-3 ${index === active ? 'bg-blue-500' : 'text-gray-400 hover:bg-blue-500 hover:text-white transition'}`}>
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
