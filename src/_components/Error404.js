import { Button, Result } from 'antd';
import React from 'react';

const Error404 = () => {
    return (
        <div className='Error404'>
            <Result
                status="403"
                title="403"
                subTitle="Desolé, Page non trouvé."
                extra={<Button type="primary">Retour</Button>}
            />
        </div>
    );
};

export default Error404;