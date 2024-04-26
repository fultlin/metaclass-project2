import React from 'react';
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

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, options, value, onChange, disabled, getTitle,}) => {

    const wrapperRef = React.useRef<HTMLDivElement>(null)
    const ref = React.useRef<HTMLInputElement>(null)
    const [filter, setFilter] = React.useState('')
    const [isOpened, setIsOpened] = React.useState(false)

    const open = () => {
        setIsOpened(true)
    }

    React.useEffect(() => {
        const handlerClick = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
                setIsOpened(false)
            }
        }

        window.addEventListener('click', handlerClick)

        return () => {
            window.removeEventListener('click', handlerClick)
        }
    }, [])


    React.useEffect(() => {
        if (isOpened) {
            setFilter('')
        }
    }, [isOpened])


    const title = React.useMemo(() => getTitle(value), [getTitle, value])

    const isEmpty = value.length === 0

    const filteredOptions = React.useMemo(() => {
        const str = filter.toLocaleLowerCase()
        return options.filter(
            (o) => o.value.toLocaleLowerCase().indexOf(str) === 0
        )
    }, [filter, options])

    const selectedKeysSet = React.useMemo<Set<Option['key']>>(
        () => new Set(value.map(({ key }) => {
            return key
        })),
        [value]
    )

    const onSelect = React.useCallback(
        (option: Option) => {
            if (disabled) {
                return
            }

            if (selectedKeysSet.has(option.key)) {
                onChange([...value].filter(({ key }) => key !== option.key))
            } else {
                console.log(selectedKeysSet);
                onChange([...value, option])
            }
            ref.current?.focus()
        },
        [disabled, onChange, value, selectedKeysSet]
    )

    const opened = isOpened && !disabled

    return (
        <div className='seletcs' ref={wrapperRef}>
            <Input className='search__drop'
                onClick={open} disabled={disabled}
                placeholder={'Enter type'}
                value={opened ? filter : isEmpty ? '' : title}
                onChange={setFilter}
                ref={ref}
            />
            {opened && (
                <div className={''}>
                    {filteredOptions.map((option) => (
                        <button
                            className={''} key={option.key} onClick={() => onSelect(option)}>
                            {option.value}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
};

export default MultiDropdown;