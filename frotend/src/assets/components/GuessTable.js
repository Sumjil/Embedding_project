import React from 'react';
import { Table, Progress } from 'antd';

const GuessTable = ({ guesses }) => {
    // const getColorFromSimilarity = (similarity) => {
    //     // Interpolate the similarity value between red (#ff42b3) and orange (#ff7f0e)
    //     const red = Math.round(255 * (1 - similarity) + 255 * similarity * 0.5);
    //     const green = Math.round(66 * (1 - similarity) + 127 * similarity);
    //     const blue = Math.round(179 * (1 - similarity) + 14 * similarity);
    //     // Format the color in RGB format
    //     return `rgb(${red}, ${green}, ${blue})`;
    // };

    const closenessToPercent = (similarity) => {
        // Convert similarity from range [-1, 1] to [0, 100]
        return ((similarity + 1) * 50).toFixed(2);;
        // return ((similarity) * 100).toFixed(2);
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
            // render: (similarity) => (
            //     <span style={{ color: getColorFromSimilarity(similarity) }}>
            //         {similarity.toFixed(2)}
            //     </span>
            // ),
            render: (similarity) => similarity.toFixed(2),

            
        },
        {
            title: 'Closeness',
            dataIndex: 'similarity',
            key: 'closeness',
            render: (similarity) => (
                <Progress percent={closenessToPercent(similarity)} status="active" />
            ),
        },
        
    ];

    return <Table dataSource={guesses} columns={columns} rowKey="id" />;
};

export default GuessTable;
