import React, { useState, useEffect } from 'react';
import Input from '../input/Input';

export type Option = {
    key: string;
    value: string;
};

export type MultiDropdownProps = {
    className?: string;
    options: Option[];
    value: Option[];
    onChange: (value: Option[]) => void;
    disabled?: boolean;
    getTitle: (value: Option[]) => string;

};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, options, value, onChange, disabled, getTitle }) => {
    const startedVal = value.length ? getTitle(value) : '';
    const [placeHolderText, setPlaceHolderText] = useState(getTitle(value))
    const [displayOpt, setDisplayOpt] = useState('none');
    const [inputVal, setInputVal] = useState(startedVal);
    const [flag, setFlag] = useState(true);
    const [parametrs, setParametrs] = useState(options)
    let sss: any = ''

    const handleOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('.multi__options') === null && (target !== target.closest('.multi__input')?.querySelector('input'))) {
            setFlag(false);
        } else {
            setFlag(true);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const clickInput = () => {
        setDisplayOpt(prevState => prevState === 'none' ? 'block' : 'none');
    };

    const handleInputChange = () => {
        console.log(parametrs);

    };

    const optionClick = (val: Option) => {
        let newValue: Option[] = [...value];
        let flag = false;
        let ind = '';
        newValue.forEach((v) => {
            if (v.key === val.key) {
                flag = true;
                ind = v.key;
            }
        });
        if (flag) {
            for (let i = 0; i < newValue.length; i++) {
                if (newValue[i].key === ind) {
                    newValue.splice(i, 1)
                }
            }
        } else {
            newValue.push(val);
        }

        onChange(newValue);
        setInputVal(getTitle(newValue));
    };

    let focusPocus = () => {
        setPlaceHolderText(inputVal);
        setInputVal('');
        document.addEventListener('keydown', (event) => {
            if (!event.ctrlKey && !event.altKey && !event.metaKey &&
                event.code !== "ShiftLeft" && event.code !== "ShiftRight" &&
                event.code !== "Backspace" && event.code !== "Space" &&
                event.code !== "Enter" && event.code !== 'Delete') {
                sss += event.key;
                setInputVal(sss);
                setParametrs(options.filter(qwe => {
                    return qwe.value.includes(sss);
                }));
            } else if (event.code === "Backspace") {
                sss = sss.slice(0, -1);
                setInputVal(sss);
                setParametrs(options.filter(qwe => {
                    return qwe.value.includes(sss);
                }));
            } if (event.code === "Delete") {
                sss = ''
                setInputVal(sss)
                setParametrs(options.filter(qwe => {
                    return qwe.value.includes(sss);
                }));
            }
        });
    }

    let unFocusPocus = () => {
        alert(3)
        setParametrs(options)
        document.removeEventListener('keydown', (event) => {
            if (!event.ctrlKey && !event.altKey && !event.metaKey &&
                event.code !== "ShiftLeft" && event.code !== "ShiftRight" &&
                event.code !== "Backspace" && event.code !== "Space" &&
                event.code !== "Enter" && event.code !== 'Delete') {
                sss += event.key;
                setInputVal(sss);
                setParametrs(options.filter(qwe => {
                    return qwe.value.includes(sss);
                }));
            } else if (event.code === "Backspace") {
                sss = sss.slice(0, -1);
                setInputVal(sss);
                setParametrs(options.filter(qwe => {
                    return qwe.value.includes(sss);
                }));
            } if (event.code === "Delete") {
                sss = ''
                setInputVal(sss)
                setParametrs(options.filter(qwe => {
                    return qwe.value.includes(sss);
                }));
            }
        })
    }
    return (
        <div className={className}>
            <Input
                placeholder={placeHolderText}
                value={inputVal}
                className='multi__input'
                onChange={() => handleInputChange}
                onClick={clickInput}
                onFocus={focusPocus}
                onBlur={() => unFocusPocus}
            />
            {(!disabled && parametrs.length > 0 && parametrs && flag) && (
                <div className="multi__options" style={{ display: displayOpt }}>
                    <ul>
                        {parametrs.map(option => (
                            options.includes(option) ? <li key={option.key} className='options__li' onClick={() => optionClick(option)} >{option.value}</li> : ''
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MultiDropdown;