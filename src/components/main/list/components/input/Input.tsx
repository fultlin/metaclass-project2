import React from 'react';
export type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
> & {
    value?: string;
    onChange: (value: string) => void;
    afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ value, onChange, afterSlot, className, ...rest }, ref) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        };

        return (
            <div className={className + ' super-input-block'}>
                <input
                    {...rest}
                    ref={ref}
                    value={value}
                    onChange={handleChange}
                    type='text'
                    className='super-input'
                    placeholder='Enter name'
                />
                {afterSlot && <div className='input-icon'></div>}
            </div>
        );
    }
);

export default Input;