import { forwardRef, useEffect, useRef } from 'react';
export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'text-sm focus:border-indigo-500 focus:ring-indigo-500 shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});
