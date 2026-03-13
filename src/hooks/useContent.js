import { useState } from 'react';

import contentData from '../data/content.json';

const defaultContent = contentData;

const useContent = () => {
    const [content] = useState(defaultContent);
    const loading = false;

    return { content, loading };
};

export default useContent;
