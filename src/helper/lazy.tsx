import React, { lazy, Suspense } from 'react';

const Lazy = (importFunc: () => Promise<any>) => {
    const Component = lazy(importFunc);
    return function LazyWrapper(props: any) {
        return (
            <Suspense fallback={<div>Cargando...</div>}>
                <Component {...props} />
            </Suspense>
        );
    };
};

export default Lazy;