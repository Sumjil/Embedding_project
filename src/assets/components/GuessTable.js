import React from 'react';
import { Table } from 'antd';

const GuessTable = ({ guesses }) => {
    const getColorFromSimilarity = (similarity) => {
        // Интерполируем значение similarity между красным (#ff42b3) и оранжевым (#ff7f0e) цветами
        // const red = Math.round(255 * (1 - similarity) + 255 * similarity * 0.5);
        // const green = Math.round(66 * (1 - similarity) + 127 * similarity);
        // const blue = Math.round(179 * (1 - similarity) + 14 * similarity);
        // Форматируем цвет в формат RGB
        // return `rgb(${red}, ${green}, ${blue})`;
        return 'rgb(0, 0, 0)';
    };
    
    

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Guess',
            dataIndex: 'guess',
            key: 'guess',
        },
        {
            title: 'Similarity',
            dataIndex: 'similarity',
            key: 'similarity',
            sorter: (a, b) => a.similarity - b.similarity,
            sortOrder: 'descend',
            render: (similarity) => (
                <span style={{ color: getColorFromSimilarity(similarity) }}>
                    {similarity}
                </span>
            ),
        },
    ];

    return <Table dataSource={guesses} columns={columns} rowKey="id" />;
};

export default GuessTable;
